import { mkdir, readdir, unlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { chromium } from 'playwright-core';

const root = fileURLToPath(new URL('../..', import.meta.url));
const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:5173';
const outputDir = process.env.SCREENSHOT_DIR ?? path.join(root, 'artifacts', 'react');
const chrome =
  process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const resultsPath =
  process.env.BROWSER_RESULTS_PATH ?? path.join(tmpdir(), 'byulmaru-react-browser-results.json');
const failures = [];
const evidence = [];
let assertionCount = 0;

function check(condition, label, detail = undefined) {
  assertionCount += 1;
  if (!condition) {
    failures.push({ label, detail });
  }
}

function closeTo(actual, expected, tolerance = 0.6) {
  return Math.abs(actual - expected) <= tolerance;
}

async function settle(page) {
  await page.waitForLoadState('load');
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images].map((image) =>
        image.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              image.addEventListener('load', resolve, { once: true });
              image.addEventListener('error', resolve, { once: true });
            }),
      ),
    );
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  });
}

async function gotoSettled(page, pathname) {
  const response = await page.goto(`${baseUrl}${pathname}`, { waitUntil: 'load' });
  await settle(page);
  check(response?.status() === 200, `${pathname} responds 200`, response?.status());
}

async function checkDocumentContract(page, expectedTitle, label) {
  const contract = await page.evaluate(() => ({
    title: document.title,
    lang: document.documentElement.lang,
    favicon: document.querySelector('link[rel="icon"]')?.getAttribute('href'),
    images: [...document.images].map((image) => ({
      alt: image.alt,
      complete: image.complete,
      naturalWidth: image.naturalWidth,
    })),
  }));
  check(contract.title === expectedTitle, `${label}: title`, contract.title);
  check(contract.lang === 'en', `${label}: html lang`, contract.lang);
  check(contract.favicon === '/favicon.ico', `${label}: favicon link`, contract.favicon);
  check(
    contract.images.every((image) => image.complete && image.naturalWidth > 0),
    `${label}: all images loaded`,
    contract.images,
  );
}

async function checkHeaderBreakpoint(page, width, label) {
  const header = await page.evaluate(() => {
    const primary = document.querySelector('nav[aria-label="Primary"]');
    const menuButton = document.querySelector('button[aria-controls="mobile-nav"]');
    const logo = document.querySelector('img[alt="별마루 Byulmaru"]');
    return {
      primaryDisplay: primary ? getComputedStyle(primary).display : null,
      menuDisplay: menuButton ? getComputedStyle(menuButton).display : null,
      logoWidth: logo?.getBoundingClientRect().width,
    };
  });
  const desktop = width >= 1024;
  const expectedLogoWidth = desktop ? 320 : width >= 640 ? 208 : 160;
  check(
    desktop ? header.primaryDisplay === 'block' : header.primaryDisplay === 'none',
    `${label}: primary nav breakpoint`,
    header,
  );
  check(
    desktop ? header.menuDisplay === 'none' : header.menuDisplay === 'flex',
    `${label}: menu button breakpoint`,
    header,
  );
  check(closeTo(header.logoWidth, expectedLogoWidth), `${label}: logo width`, header);
}

async function captureScreenshots(browser) {
  await mkdir(outputDir, { recursive: true });
  for (const file of await readdir(outputDir)) {
    if (file.endsWith('.png')) {
      await unlink(path.join(outputDir, file));
    }
  }

  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 1,
  });
  const viewports = {
    mobile: { width: 375, height: 812 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1280, height: 900 },
  };

  for (const [name, viewport] of Object.entries(viewports)) {
    await page.setViewportSize(viewport);
    await gotoSettled(page, '/');
    await page.screenshot({ path: path.join(outputDir, `home-${name}.png`), fullPage: false });
  }

  await page.setViewportSize(viewports.mobile);
  await gotoSettled(page, '/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  );
  await page.screenshot({
    path: path.join(outputDir, 'home-mobile-menu-open.png'),
    fullPage: false,
  });

  for (const [name, viewport] of Object.entries(viewports)) {
    await page.setViewportSize(viewport);
    await gotoSettled(page, '/about-us');
    await page.screenshot({ path: path.join(outputDir, `about-us-${name}.png`), fullPage: false });
  }

  const tabs = [
    { name: 'Overview', slug: 'overview' },
    { name: 'MVP Scope', slug: 'mvp-scope' },
    { name: 'User Journey', slug: 'user-journey' },
    { name: 'Architecture', slug: 'architecture' },
    { name: 'Data & Ops', slug: 'data-and-ops' },
  ];

  for (const [name, viewport] of Object.entries(viewports)) {
    for (const tab of tabs) {
      await page.setViewportSize(viewport);
      await gotoSettled(page, '/our-work');
      if (tab.name !== 'Overview') {
        await page.getByRole('tab', { name: new RegExp(`^${tab.name}`) }).click();
        await settle(page);
      }
      else {
        await page.waitForFunction(() => document.querySelectorAll('[data-star]').length === 120);
      }
      await page.screenshot({
        path: path.join(outputDir, `our-work-${tab.slug}-${name}.png`),
        fullPage: false,
      });
    }
  }

  await page.close();
  const screenshots = (await readdir(outputDir)).filter((file) => file.endsWith('.png')).sort();
  check(screenshots.length === 22, 'screenshot inventory has 22 PNG files', screenshots);
  evidence.push({ screenshots });
}

async function checkHomeAndAbout(page, width) {
  const label = `${width}px home`;
  await gotoSettled(page, '/');
  await checkDocumentContract(page, 'Byulmaru', label);
  await checkHeaderBreakpoint(page, width, label);

  const spacer = await page.locator('div[aria-hidden="true"].invisible').evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return {
      visibility: getComputedStyle(element).visibility,
      width: rect.width,
      height: rect.height,
    };
  });
  check(spacer.visibility === 'hidden', `${label}: spacer remains invisible`, spacer);
  check(
    spacer.width > 0 && closeTo(spacer.width, spacer.height),
    `${label}: spacer preserves square layout`,
    spacer,
  );

  if (width === 375) {
    const button = page.getByRole('button', { name: 'Open menu' });
    check((await button.getAttribute('aria-expanded')) === 'false', 'mobile menu starts closed');
    await button.click();
    check(
      (await page.getByRole('button', { name: 'Close menu' }).getAttribute('aria-expanded')) ===
        'true',
      'mobile menu opens',
    );
    check(
      await page.getByRole('navigation', { name: 'Mobile navigation' }).isVisible(),
      'mobile navigation is visible',
    );
    await page.getByRole('button', { name: 'Close menu' }).click();
    check(
      (await page.locator('nav[aria-label="Mobile navigation"]').count()) === 0,
      'mobile menu closes with button',
    );
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page
      .getByRole('navigation', { name: 'Mobile navigation' })
      .getByRole('link', { name: 'About us' })
      .click();
    await page.waitForURL(`${baseUrl}/about-us`);
    check(
      new URL(page.url()).pathname === '/about-us',
      'mobile navigation changes route',
      page.url(),
    );
    check(
      (await page.locator('nav[aria-label="Mobile navigation"]').count()) === 0,
      'mobile menu closes after navigation',
    );
  }

  await gotoSettled(page, '/about-us');
  await checkDocumentContract(page, 'About us', `${width}px about`);
  await checkHeaderBreakpoint(page, width, `${width}px about`);
  const avatars = await page.locator('img[alt$=" profile"]').evaluateAll((images) =>
    images.map((image) => {
      const rect = image.getBoundingClientRect();
      const parent = image.parentElement;
      return {
        objectFit: getComputedStyle(image).objectFit,
        width: rect.width,
        height: rect.height,
        parentOverflow: parent ? getComputedStyle(parent).overflow : null,
        complete: image.complete,
        naturalWidth: image.naturalWidth,
      };
    }),
  );
  check(avatars.length === 3, `${width}px about: three avatars`, avatars);
  check(
    avatars.every(
      (avatar) =>
        avatar.objectFit === 'cover' &&
        avatar.parentOverflow === 'hidden' &&
        closeTo(avatar.width, avatar.height) &&
        avatar.complete &&
        avatar.naturalWidth > 0,
    ),
    `${width}px about: avatar crop contract`,
    avatars,
  );
}

async function checkOurWork(page, width) {
  const label = `${width}px our-work`;
  await gotoSettled(page, '/our-work');
  await checkDocumentContract(page, 'Our Work — 별마루', label);
  await checkHeaderBreakpoint(page, width, label);
  await page.waitForFunction(() => document.querySelectorAll('[data-star]').length === 120);

  const tabs = page.getByRole('tab');
  check((await tabs.count()) === 5, `${label}: five tabs`);
  check((await page.locator('[role="tabpanel"]').count()) === 1, `${label}: one active panel`);
  check(
    (await page.locator('[role="tabpanel"]').getAttribute('id')) === 'panel-overview',
    `${label}: Overview keeps original tabpanel role`,
  );
  check(
    (await tabs.nth(0).getAttribute('aria-selected')) === 'true',
    `${label}: overview selected`,
  );
  for (let index = 1; index < 5; index += 1) {
    check(
      (await tabs.nth(index).getAttribute('aria-selected')) === 'false',
      `${label}: inactive tab ${index + 1}`,
    );
  }
  check((await tabs.nth(0).getAttribute('tabindex')) === '0', `${label}: active tab is tabbable`);
  for (let index = 1; index < 5; index += 1) {
    check(
      (await tabs.nth(index).getAttribute('tabindex')) === '-1',
      `${label}: inactive tab ${index + 1} is roving`,
    );
  }

  const responsive = await page.evaluate(() => {
    const tab = document.querySelector('[role="tab"]');
    const tabList = tab?.parentElement;
    const tabDesc = tab?.querySelector('span:last-child');
    const shell = tabList?.parentElement?.parentElement;
    const heroTitle = document.querySelector('h1');
    const heroDesc = heroTitle?.nextElementSibling;
    const heroInner = heroTitle?.parentElement;
    const sectionContainer = document.querySelector(
      '[class*="_ow-section_"] > [class*="_container_"]',
    );
    const reasonGrid = document.querySelector('[class*="_reason-grid_"]');
    const buildGrid = document.querySelector('[class*="_build-grid_"]');
    const userRow = document.querySelector('[class*="_user-row_"]');
    const columnCount = (element) =>
      element
        ? getComputedStyle(element).gridTemplateColumns.split(/\s+/).filter(Boolean).length
        : null;
    return {
      documentScrollWidth: document.documentElement.scrollWidth,
      innerWidth,
      tabList: tabList && {
        overflowX: getComputedStyle(tabList).overflowX,
        clientWidth: tabList.clientWidth,
        scrollWidth: tabList.scrollWidth,
      },
      tabMinWidth: tab ? getComputedStyle(tab).minWidth : null,
      tabDescDisplay: tabDesc ? getComputedStyle(tabDesc).display : null,
      shellPosition: shell ? getComputedStyle(shell).position : null,
      shellTop: shell ? getComputedStyle(shell).top : null,
      heroBreakDisplays: [
        ...(heroTitle?.querySelectorAll('br') ?? []),
        ...(heroDesc?.querySelectorAll('br') ?? []),
      ].map((br) => getComputedStyle(br).display),
      heroTitleText: heroTitle?.textContent,
      heroDescText: heroDesc?.textContent,
      heroTitleLines: heroTitle
        ? heroTitle.getBoundingClientRect().height /
          Number.parseFloat(getComputedStyle(heroTitle).lineHeight)
        : null,
      heroPaddingTop: heroInner ? getComputedStyle(heroInner).paddingTop : null,
      sectionPaddingLeft: sectionContainer ? getComputedStyle(sectionContainer).paddingLeft : null,
      reasonColumns: columnCount(reasonGrid),
      buildColumns: columnCount(buildGrid),
      userColumns: columnCount(userRow),
    };
  });
  check(
    responsive.documentScrollWidth <= responsive.innerWidth,
    `${label}: no document horizontal scroll`,
    responsive,
  );
  check(
    responsive.tabList?.overflowX === 'auto',
    `${label}: tab list horizontal overflow`,
    responsive,
  );
  if (width === 375) {
    check(
      responsive.tabList.scrollWidth > responsive.tabList.clientWidth,
      `${label}: tabs are horizontally scrollable`,
      responsive,
    );
  }
  const mobileCss = width <= 640;
  check(
    responsive.tabDescDisplay === (mobileCss ? 'none' : 'block'),
    `${label}: tab description breakpoint`,
    responsive,
  );
  check(
    responsive.tabMinWidth === (mobileCss ? '132px' : '152px'),
    `${label}: tab minimum width breakpoint`,
    responsive,
  );
  check(
    responsive.shellPosition === 'sticky' && responsive.shellTop === '0px',
    `${label}: sticky CSS`,
    responsive,
  );
  check(
    responsive.heroBreakDisplays.every((display) =>
      mobileCss ? display === 'none' : display !== 'none',
    ),
    `${label}: hero line break breakpoint`,
    responsive,
  );
  check(
    responsive.heroTitleText === '트위터를 대체할 우리만의 SNS를 만듭니다',
    `${label}: hero heading whitespace`,
    responsive.heroTitleText,
  );
  check(
    responsive.heroDescText ===
      '마스토돈 인스턴스로 시작한 동인 커뮤니티 플랫폼을, ActivityPub 기반의 자체 SNS 서비스로 재개발합니다. 이 페이지는 페디버스를 처음 접하는 개발자를 위해 작성했어요.',
    `${label}: hero description whitespace`,
    responsive.heroDescText,
  );
  if (width === 375) {
    check(
      closeTo(responsive.heroTitleLines, 2, 0.02),
      `${label}: hero heading stays two lines`,
      responsive,
    );
  }
  check(
    responsive.heroPaddingTop === (mobileCss ? '44px' : '84px'),
    `${label}: hero padding breakpoint`,
    responsive,
  );
  check(
    responsive.sectionPaddingLeft === (width >= 1024 ? '64px' : '24px'),
    `${label}: section padding breakpoint`,
    responsive,
  );
  check(
    responsive.reasonColumns === (mobileCss ? 1 : 2),
    `${label}: reason grid columns`,
    responsive,
  );
  check(
    responsive.buildColumns === (mobileCss ? 1 : 3),
    `${label}: build grid columns`,
    responsive,
  );
  check(responsive.userColumns === (mobileCss ? 1 : 3), `${label}: user grid columns`, responsive);

  const tables = await page.locator('table').evaluateAll((elements) =>
    elements.map((table) => {
      const wrapper = table.parentElement;
      const rect = wrapper?.getBoundingClientRect();
      return {
        overflowX: wrapper ? getComputedStyle(wrapper).overflowX : null,
        left: rect?.left,
        right: rect?.right,
        clientWidth: wrapper?.clientWidth,
        scrollWidth: wrapper?.scrollWidth,
      };
    }),
  );
  check(tables.length === 2, `${label}: two table wrappers`, tables);
  check(
    tables.every((table) => table.overflowX === 'auto'),
    `${label}: table wrappers overflow-x auto`,
    tables,
  );
  check(
    tables.every((table) => table.left >= 0 && table.right <= width + 0.6),
    `${label}: table wrappers contained by viewport`,
    tables,
  );
  if (width === 375) {
    check(
      tables[0].scrollWidth > tables[0].clientWidth,
      `${label}: comparison table scrolls inside wrapper`,
      tables[0],
    );
  }

  const shellInitialTop = await page
    .locator('section[aria-label="Our Work categories"]')
    .evaluate((element) => element.getBoundingClientRect().top + scrollY);
  await page.evaluate((target) => scrollTo(0, target + 400), shellInitialTop);
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  );
  const stickyTop = await page
    .locator('section[aria-label="Our Work categories"]')
    .evaluate((element) => element.getBoundingClientRect().top);
  check(
    closeTo(stickyTop, 0, 1),
    `${label}: sticky tab remains at viewport top after scroll`,
    stickyTop,
  );
  await page.evaluate(() => scrollTo(0, 0));

  if (width === 375) {
    await tabs.nth(0).focus();
    await tabs.nth(0).press('ArrowLeft');
    check(
      (await tabs.nth(4).getAttribute('aria-selected')) === 'true',
      'keyboard ArrowLeft wraps to Data & Ops',
    );
    check(
      await tabs.nth(4).evaluate((element) => document.activeElement === element),
      'keyboard wrap moves focus to Data & Ops',
    );
    await tabs.nth(4).press('ArrowRight');
    check(
      (await tabs.nth(0).getAttribute('aria-selected')) === 'true',
      'keyboard ArrowRight wraps to Overview',
    );
    check(
      await tabs.nth(0).evaluate((element) => document.activeElement === element),
      'keyboard wrap returns focus to Overview',
    );
    await page.waitForFunction(() => document.querySelectorAll('[data-star]').length === 120);
    const initialStar = await page.locator('[data-star]').first().getAttribute('style');
    await page.getByRole('tab', { name: /^MVP Scope/ }).click();
    check((await page.locator('[data-star]').count()) === 0, 'stars unmount outside Overview');
    check(
      (await page.locator('[role="tabpanel"]').count()) === 0,
      'MVP preserves original id-only panel semantics',
    );
    await page.getByRole('tab', { name: /^Overview/ }).click();
    await page.waitForFunction(() => document.querySelectorAll('[data-star]').length === 120);
    const remountedStar = await page.locator('[data-star]').first().getAttribute('style');
    check(
      (await page.locator('[data-star]').count()) === 120,
      'overview reentry creates 120 stars',
    );
    check(initialStar !== remountedStar, 'overview reentry regenerates star descriptors', {
      initialStar,
      remountedStar,
    });
  }

  await page.getByRole('tab', { name: /^Data & Ops/ }).click();
  await settle(page);
  check(
    (await page.locator('[role="tabpanel"]').count()) === 0,
    `${label}: Data & Ops preserves original id-only panel semantics`,
  );
  const schema = await page.evaluate(() => {
    const grid = document.querySelector('[class*="_schema-grid_"]');
    return {
      cards: document.querySelectorAll('[class*="_schema-card_"]').length,
      columns: grid
        ? getComputedStyle(grid).gridTemplateColumns.split(/\s+/).filter(Boolean).length
        : null,
    };
  });
  check(schema.cards === 9, `${label}: nine schema cards`, schema);
  check(schema.columns === (width <= 900 ? 2 : 4), `${label}: schema column breakpoint`, schema);

  await page.getByRole('tab', { name: /^Architecture/ }).click();
  check(
    (await page.locator('[role="tabpanel"]').count()) === 1,
    `${label}: Architecture keeps original tabpanel role`,
  );
  check(
    (await page.locator('[role="tabpanel"]').getAttribute('id')) === 'panel-architecture',
    `${label}: Architecture tabpanel id`,
  );

  evidence.push({ width, responsive, tables, schema });
}

async function checkRouteNavigationContract(page) {
  await page.setViewportSize({ width: 1280, height: 900 });
  await gotoSettled(page, '/');

  const announcer = page.locator('#route-announcer');
  check(
    (await announcer.getAttribute('aria-live')) === 'assertive',
    'route announcer uses assertive live updates',
  );
  check(
    (await announcer.getAttribute('aria-atomic')) === 'true',
    'route announcer reads its full title',
  );
  check((await announcer.textContent()) === '', 'route announcer starts empty');

  const aboutLink = page
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('link', { name: 'About us' });
  const preloadSelector = 'link[rel="prefetch"], link[rel="modulepreload"]';
  const preloadHrefsBeforeHover = await page
    .locator(preloadSelector)
    .evaluateAll((links) => links.map((link) => link.href));
  const aboutUsRouteModuleHref = await page.evaluate(() => {
    const moduleHref = window.__reactRouterManifest?.routes['routes/about-us']?.module;
    return typeof moduleHref === 'string' ? new URL(moduleHref, location.href).href : null;
  });
  await aboutLink.hover();
  await page.waitForFunction(
    ({ before, selector }) =>
      [...document.querySelectorAll(selector)].some(
        (link) => link instanceof HTMLLinkElement && !before.includes(link.href),
      ),
    { before: preloadHrefsBeforeHover, selector: preloadSelector },
  );
  const preloadHrefsAfterHover = await page
    .locator(preloadSelector)
    .evaluateAll((links) => links.map((link) => link.href));
  const intentPreloads = preloadHrefsAfterHover.filter(
    (href) => !preloadHrefsBeforeHover.includes(href),
  );
  check(
    aboutUsRouteModuleHref !== null && intentPreloads.includes(aboutUsRouteModuleHref),
    'hover intent adds the About Us route module preload',
    { expected: aboutUsRouteModuleHref, before: preloadHrefsBeforeHover, added: intentPreloads },
  );

  await aboutLink.focus();
  await aboutLink.click();
  await page.waitForURL(`${baseUrl}/about-us`);
  await page.waitForFunction(
    () => document.querySelector('#route-announcer')?.textContent === document.title,
  );

  const navigation = await page.evaluate(() => ({
    path: location.pathname,
    title: document.title,
    announcement: document.querySelector('#route-announcer')?.textContent,
    bodyFocused: document.activeElement === document.body,
    bodyTabIndex: document.body.getAttribute('tabindex'),
  }));
  check(navigation.path === '/about-us', 'client navigation updates the route', navigation);
  check(navigation.title === 'About us', 'client navigation updates the title', navigation);
  check(
    navigation.announcement === 'About us',
    'client navigation announces the new title',
    navigation,
  );
  check(navigation.bodyFocused, 'client navigation resets focus to body', navigation);
  check(navigation.bodyTabIndex === null, 'body focus helper restores tabindex', navigation);

  evidence.push({ routeNavigation: navigation });
}

const browser = await chromium.launch({ headless: true, executablePath: chrome });
try {
  await captureScreenshots(browser);

  const favicon = await (await fetch(`${baseUrl}/favicon.ico`)).arrayBuffer();
  const robotsResponse = await fetch(`${baseUrl}/robots.txt`);
  check(favicon.byteLength > 0, 'favicon public asset has bytes', favicon.byteLength);
  check(robotsResponse.status === 200, 'robots public asset responds 200', robotsResponse.status);
  check((await robotsResponse.text()).length > 0, 'robots public asset has content');

  const breakpoints = [
    { width: 375, height: 812 },
    { width: 640, height: 900 },
    { width: 768, height: 1024 },
    { width: 900, height: 900 },
    { width: 1024, height: 900 },
    { width: 1280, height: 900 },
  ];
  const page = await browser.newPage({ viewport: breakpoints[0], deviceScaleFactor: 1 });
  await checkRouteNavigationContract(page);
  for (const viewport of breakpoints) {
    await page.setViewportSize(viewport);
    await checkHomeAndAbout(page, viewport.width);
    await checkOurWork(page, viewport.width);
  }
  await page.close();
}
finally {
  await browser.close();
}

const result = { assertionCount, failureCount: failures.length, failures, evidence };
await writeFile(resultsPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(`TASK7_BROWSER_ASSERTIONS=${assertionCount}`);
console.log(`TASK7_BROWSER_FAILURES=${failures.length}`);
console.log(`TASK7_BROWSER_RESULTS=${resultsPath}`);
if (failures.length > 0) {
  console.error(JSON.stringify(failures, null, 2));
  process.exitCode = 1;
}
