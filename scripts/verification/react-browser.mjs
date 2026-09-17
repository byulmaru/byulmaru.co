import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { chromium } from 'playwright-core';

// Install the matching bundled browser with: pnpm exec playwright-core install chromium
// Never fall back to a system Chrome installation.
const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:5173';
const outputDir = process.env.SCREENSHOT_DIR ?? path.join(tmpdir(), 'byulmaru-react-screenshots');
const resultsPath =
  process.env.BROWSER_RESULTS_PATH ?? path.join(tmpdir(), 'byulmaru-react-browser-results.json');
const viewports = [
  { width: 320, height: 740 },
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 844, height: 390 },
  { width: 1024, height: 768 },
  { width: 1280, height: 720 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
];
const routes = [
  ['/', 'Byulmaru'],
  ['/about-us', 'About us'],
  ['/our-work', 'Our Work — 별마루'],
];
const failures = [];
let checks = 0;
function check(condition, label) {
  checks += 1;
  if (!condition) {
    failures.push(label);
  }
}
await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage();
  page.on('pageerror', (error) => failures.push(error.message));
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    for (const [route, title] of routes) {
      const label = `${route} ${viewport.width}x${viewport.height}`;
      const response = await page.goto(new URL(route, baseUrl).href);
      await page.evaluate(() => document.fonts.ready);
      check(response?.status() === 200, `${label}: HTTP 200`);
      check(new URL(page.url()).pathname === route, `${label}: route is not redirected`);
      check((await page.title()) === title, `${label}: title`);
      check(
        (await page.locator('html').getAttribute('lang')) === 'ko',
        `${label}: Korean document`,
      );
      check((await page.locator('main h1').count()) === 1, `${label}: one page heading`);
      check(await page.getByRole('contentinfo').isVisible(), `${label}: shared footer`);
      check(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
        ),
        `${label}: no entrance overflow`,
      );
      for (const section of await page.locator('main section').all()) {
        await section.scrollIntoViewIfNeeded();
      }
      await page.getByRole('contentinfo').scrollIntoViewIfNeeded();
      check(
        await page.evaluate(
          () =>
            [...document.images].filter((image) => image.complete && !image.naturalWidth).length ===
            0,
        ),
        `${label}: no failed images`,
      );
      if (route === '/') {
        const style = await page.evaluate(() => {
          const hero = getComputedStyle(document.querySelector('.home-hero'));
          return {
            heroMin: hero.minHeight,
            heroBottom: hero.paddingBottom,
            teamPadding: getComputedStyle(document.querySelector('.home-team')).paddingTop,
            summary: getComputedStyle(document.querySelector('.team-row p:not(.profile-role)'))
              .fontSize,
            role: getComputedStyle(document.querySelector('.team-row .profile-role')).fontSize,
          };
        });
        if (viewport.width >= 768 && viewport.width < 1280) {
          check(
            style.heroMin === '0px' && style.heroBottom === '88px',
            `${label}: tablet hero spacing`,
          );
          check(style.teamPadding === '48px', `${label}: tablet team spacing`);
        }
        if (viewport.width < 768) {
          check(
            style.summary === '15px' && style.role === '13px',
            `${label}: mobile summary and metadata sizes`,
          );
        }
      }
      await page.screenshot({
        path: path.join(outputDir, `${route.slice(1) || 'home'}-${viewport.width}.png`),
        fullPage: true,
      });
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(new URL('/our-work', baseUrl).href);
  for (const name of ['짧은 근황', '낙서 첨부', '작품 소개']) {
    await page.getByRole('button', { name, exact: true }).click();
    check(
      (await page.getByRole('button', { name, exact: true }).getAttribute('aria-pressed')) ===
        'true',
      `composer selection: ${name}`,
    );
  }
  check(
    (await page.getByRole('button', { name: /공개 범위/ }).count()) === 0,
    'visibility capture is noninteractive',
  );
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.keyboard.press('Escape');
  check(
    await page
      .getByRole('button', { name: 'Open menu' })
      .evaluate((el) => el === document.activeElement),
    'menu restores focus',
  );
}
finally {
  await browser.close();
}
await writeFile(resultsPath, JSON.stringify({ checks, failures }, null, 2));
console.log(JSON.stringify({ checks, failures, resultsPath, outputDir }, null, 2));
assert.equal(failures.length, 0, 'Browser verification failures');
