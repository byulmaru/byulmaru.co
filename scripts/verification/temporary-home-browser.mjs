import { mkdir, readdir, unlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { chromium } from 'playwright-core';

const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:8787';
const outputDir =
  process.env.SCREENSHOT_DIR ?? path.join(tmpdir(), 'byulmaru-temporary-home-screenshots');
const chrome =
  process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const resultsPath =
  process.env.BROWSER_RESULTS_PATH ??
  path.join(tmpdir(), 'byulmaru-temporary-home-browser-results.json');

const expected = {
  title: '새 단장 중 — 별마루',
  heading: '별마루는 지금 새 단장을 준비하고 있어요.',
  description: '더 정확한 팀과 프로젝트 이야기를 담아 곧 돌아오겠습니다.',
  action: '문의하기 →',
  actionHref: 'mailto:hello@byulmaru.co',
  actionBackground: 'rgb(221, 249, 91)',
  actionColor: 'rgb(21, 17, 31)',
  focusColor: 'rgb(99, 216, 255)',
};

const viewports = [
  { name: '375', width: 375, height: 812 },
  { name: '768', width: 768, height: 1024 },
  { name: '1024', width: 1024, height: 900 },
  { name: '1440', width: 1440, height: 1000 },
];

const failures = [];
const evidence = [];
let assertionCount = 0;

function check(condition, label, detail = undefined) {
  assertionCount += 1;
  if (!condition) {
    failures.push({ label, detail });
  }
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

async function resetScreenshots() {
  await mkdir(outputDir, { recursive: true });
  for (const file of await readdir(outputDir)) {
    if (file.endsWith('.png')) {
      await unlink(path.join(outputDir, file));
    }
  }
}

async function checkRedirect(pathname) {
  const response = await fetch(`${baseUrl}${pathname}`, { redirect: 'manual' });
  check(response.status === 302, `${pathname} responds 302`, response.status);
  check(response.headers.get('location') === '/', `${pathname} redirects to /`, {
    location: response.headers.get('location'),
  });
}

await resetScreenshots();
await checkRedirect('/about-us');
await checkRedirect('/our-work');

const browser = await chromium.launch({ headless: true, executablePath: chrome });
try {
  const page = await browser.newPage({ viewport: viewports[0], deviceScaleFactor: 1 });
  const consoleErrors = [];
  const pageErrors = [];

  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text());
    }
  });
  page.on('pageerror', (error) => pageErrors.push(error.message));

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    const response = await page.goto(`${baseUrl}/`, { waitUntil: 'load' });
    await settle(page);

    check(response?.status() === 200, `${viewport.name}px: / responds 200`, response?.status());

    const contract = await page.evaluate(({ heading, description, action, actionHref }) => {
      const headings = [...document.querySelectorAll('h1')];
      const logo = document.querySelector('img[alt="별마루"]');
      const contact = [...document.querySelectorAll('a')].find(
        (link) => link.textContent?.trim() === action,
      );
      const contactStyle = contact ? getComputedStyle(contact) : null;
      const contactRect = contact?.getBoundingClientRect();
      const headingPhrases = [...document.querySelectorAll('[data-heading-phrase]')].map(
        (phrase) => ({
          text: phrase.textContent?.trim(),
          lineCount: phrase.getClientRects().length,
          top: Math.round(phrase.getBoundingClientRect().top),
        }),
      );

      return {
        title: document.title,
        lang: document.documentElement.lang,
        headingCount: headings.length,
        heading: headings[0]?.textContent?.trim(),
        headingPhrases,
        descriptionVisible: [...document.querySelectorAll('p')].some(
          (paragraph) => paragraph.textContent?.trim() === description,
        ),
        actionHref: contact?.getAttribute('href'),
        actionHeight: contactRect?.height,
        actionBackground: contactStyle?.backgroundColor,
        actionColor: contactStyle?.color,
        logoComplete: logo instanceof HTMLImageElement && logo.complete && logo.naturalWidth > 0,
        logoVisible: Boolean(logo?.getBoundingClientRect().width),
        navigationCount: document.querySelectorAll('nav').length,
        footerCount: document.querySelectorAll('footer').length,
        horizontalOverflow: document.documentElement.scrollWidth - window.innerWidth,
        approvedHeading: heading,
        approvedActionHref: actionHref,
      };
    }, expected);

    check(contract.title === expected.title, `${viewport.name}px: document title`, contract.title);
    check(contract.lang === 'ko', `${viewport.name}px: document language`, contract.lang);
    check(contract.headingCount === 1, `${viewport.name}px: one h1`, contract.headingCount);
    check(contract.heading === expected.heading, `${viewport.name}px: approved heading`, {
      actual: contract.heading,
      expected: contract.approvedHeading,
    });
    check(
      contract.headingPhrases.length === 3 &&
        contract.headingPhrases.every((phrase) => phrase.lineCount === 1),
      `${viewport.name}px: Korean heading phrases do not split internally`,
      contract.headingPhrases,
    );
    check(
      new Set(contract.headingPhrases.map((phrase) => phrase.top)).size ===
        (viewport.width < 768 ? 3 : 2),
      `${viewport.name}px: heading uses the intended line count`,
      contract.headingPhrases,
    );
    check(
      contract.descriptionVisible,
      `${viewport.name}px: approved description is visible`,
      contract.descriptionVisible,
    );
    check(contract.actionHref === expected.actionHref, `${viewport.name}px: mail action`, {
      actual: contract.actionHref,
      expected: contract.approvedActionHref,
    });
    check(
      typeof contract.actionHeight === 'number' && contract.actionHeight >= 44,
      `${viewport.name}px: action target is at least 44px high`,
      contract.actionHeight,
    );
    check(
      contract.actionBackground === expected.actionBackground,
      `${viewport.name}px: action uses Acid background`,
      contract.actionBackground,
    );
    check(
      contract.actionColor === expected.actionColor,
      `${viewport.name}px: action uses Ink content`,
      contract.actionColor,
    );
    check(contract.logoComplete, `${viewport.name}px: official logo loaded`, contract.logoComplete);
    check(contract.logoVisible, `${viewport.name}px: official logo visible`, contract.logoVisible);
    check(contract.navigationCount === 0, `${viewport.name}px: navigation absent`, {
      count: contract.navigationCount,
    });
    check(contract.footerCount === 0, `${viewport.name}px: footer absent`, {
      count: contract.footerCount,
    });
    check(contract.horizontalOverflow <= 0, `${viewport.name}px: no horizontal overflow`, {
      overflow: contract.horizontalOverflow,
    });

    await page.screenshot({
      path: path.join(outputDir, `temporary-home-${viewport.name}.png`),
      fullPage: false,
    });

    evidence.push({ viewport, contract });
  }

  await page.setViewportSize(viewports[0]);
  await page.goto(`${baseUrl}/`, { waitUntil: 'load' });
  await settle(page);
  await page.keyboard.press('Tab');

  const focus = await page.evaluate(() => {
    const active = document.activeElement;
    const style = active ? getComputedStyle(active) : null;
    return {
      tagName: active?.tagName,
      text: active?.textContent?.trim(),
      href: active?.getAttribute('href'),
      outlineColor: style?.outlineColor,
      outlineStyle: style?.outlineStyle,
      outlineWidth: style?.outlineWidth,
    };
  });

  check(focus.tagName === 'A', 'keyboard focus reaches a link', focus);
  check(focus.text === expected.action, 'keyboard focus reaches the contact action', focus);
  check(focus.href === expected.actionHref, 'focused action preserves mail target', focus);
  check(focus.outlineColor === expected.focusColor, 'focused action uses Cyan outline', focus);
  check(focus.outlineStyle === 'solid', 'focused action exposes a solid outline', focus);
  check(focus.outlineWidth === '2px', 'focused action exposes a 2px outline', focus);
  check(consoleErrors.length === 0, 'browser console has no errors', consoleErrors);
  check(pageErrors.length === 0, 'browser page has no errors', pageErrors);

  evidence.push({ focus, consoleErrors, pageErrors });
  await page.close();
}
finally {
  await browser.close();
}

const screenshots = (await readdir(outputDir)).filter((file) => file.endsWith('.png')).sort();
check(
  screenshots.length === viewports.length,
  'screenshot inventory has four PNG files',
  screenshots,
);
evidence.push({ screenshots });

const result = { assertionCount, failureCount: failures.length, failures, evidence };
await writeFile(resultsPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(`TEMPORARY_HOME_BROWSER_ASSERTIONS=${assertionCount}`);
console.log(`TEMPORARY_HOME_BROWSER_FAILURES=${failures.length}`);
console.log(`TEMPORARY_HOME_BROWSER_RESULTS=${resultsPath}`);
console.log(`TEMPORARY_HOME_SCREENSHOTS=${outputDir}`);

if (failures.length > 0) {
  console.error(JSON.stringify(failures, null, 2));
  process.exitCode = 1;
}
