# DSN-23 Temporary Renovation Home Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the outdated public team-site experience with a reversible Midnight Signal renovation notice while preserving search visibility and temporarily redirecting existing subpages to the home page.

**Architecture:** A focused `TemporaryHome` component becomes the only content rendered by the root app shell. Cloudflare Static Assets handles `/about-us` and `/our-work` with repository-owned `302` rules, while the original route modules stay untouched for the final renewal work. Unit tests lock the public copy and shell takeover; build and browser checks lock metadata, accessibility, responsive layout, and deployed routing behavior.

**Tech Stack:** React 19, React Router 8, Tailwind CSS 4, Vitest, Testing Library, Playwright Core, Cloudflare Workers Static Assets

## Global Constraints

- Use `design-system/MASTER.md` and `design-system/pages/home.md` as the canonical visual contract.
- Keep `/` indexable with `200`; do not add `noindex`, `503`, or `Retry-After`.
- Redirect `/about-us` and `/our-work` to `/` with `302`.
- Preserve the existing route implementation files without editing their content.
- Show exactly the approved title, description, and `문의하기 →` action.
- Use only the official white Korean logo asset, SUIT Variable, Pretendard Variable, and Midnight Signal semantic colors.
- Do not add illustrations, cards, countdowns, progress indicators, ambient effects, or animation.
- Do not deploy until the user separately approves the verified implementation.
- Do not edit `package.json` by hand.

---

### Task 1: Add the temporary home component

**Files:**
- Create: `app/components/TemporaryHome.test.tsx`
- Create: `app/components/TemporaryHome.tsx`

**Interfaces:**
- Consumes: `app/assets/logo-white-korean.svg`
- Produces: `TemporaryHome(): JSX.Element`, a route-independent public landing screen

- [ ] **Step 1: Write the failing component contract**

```tsx
import { render, screen } from '@testing-library/react';

import { TemporaryHome } from './TemporaryHome';

it('shows the approved renovation notice and only its contact action', () => {
  render(<TemporaryHome />);

  expect(screen.getByRole('img', { name: '별마루' })).toBeVisible();
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    '별마루는 지금 새 단장을 준비하고 있어요.',
  );
  expect(
    screen.getByText('더 정확한 팀과 프로젝트 이야기를 담아 곧 돌아오겠습니다.'),
  ).toBeVisible();
  expect(screen.getByRole('link', { name: '문의하기 →' })).toHaveAttribute(
    'href',
    'mailto:hello@byulmaru.co',
  );
  expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `pnpm test app/components/TemporaryHome.test.tsx`

Expected: FAIL because `./TemporaryHome` does not exist.

- [ ] **Step 3: Implement the minimal Midnight Signal screen**

```tsx
import logoWhiteKorean from '~/assets/logo-white-korean.svg';

export function TemporaryHome() {
  return (
    <div className="min-h-screen bg-[var(--color-canvas)] px-5 py-6 text-[var(--color-text-primary)] sm:px-8 sm:py-8 lg:px-16 lg:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-[1152px] flex-col border-t border-[var(--color-border-decorative)] sm:min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-6rem)]">
        <header className="py-6 sm:py-8">
          <img className="h-auto w-[7.75rem]" src={logoWhiteKorean} alt="별마루" />
        </header>
        <main className="flex flex-1 items-center py-16 sm:py-20">
          <div className="flex max-w-[48rem] flex-col items-start">
            <h1 className="text-balance font-['SUIT_Variable','SUIT',sans-serif] text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.98] font-[770] tracking-[-0.045em]">
              별마루는 지금 새 단장을 준비하고 있어요.
            </h1>
            <p className="mt-8 max-w-[42rem] font-['Pretendard_Variable','Pretendard',sans-serif] text-[clamp(1.0625rem,2vw,1.25rem)] leading-[1.7] tracking-[-0.008em] text-[var(--color-text-secondary)]">
              더 정확한 팀과 프로젝트 이야기를 담아 곧 돌아오겠습니다.
            </p>
            <a
              className="mt-12 inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--color-action)] px-6 py-3 font-['Pretendard_Variable','Pretendard',sans-serif] text-sm font-semibold tracking-[0.04em] text-[var(--color-on-signal)] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus)]"
              href="mailto:hello@byulmaru.co"
            >
              문의하기 →
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `pnpm test app/components/TemporaryHome.test.tsx`

Expected: PASS with one test.

- [ ] **Step 5: Commit the component checkpoint**

```bash
av commit -A -m "DSN-23 임시 리뉴얼 안내 화면을 추가"
```

### Task 2: Make the root app shell temporary and accessible

**Files:**
- Create: `app/root.test.tsx`
- Modify: `app/root.tsx`
- Modify: `app/app.css`

**Interfaces:**
- Consumes: `TemporaryHome`
- Produces: one Korean document contract and one public screen for every rendered route

- [ ] **Step 1: Write the failing shell takeover test**

```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import App from './root';

it('replaces the normal site shell with the temporary home', () => {
  render(<App />, { wrapper: MemoryRouter });

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    '별마루는 지금 새 단장을 준비하고 있어요.',
  );
  expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
  expect(screen.queryByText('동인이 만드는,')).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run the shell test and verify RED**

Run: `pnpm test app/root.test.tsx`

Expected: FAIL because the current root renders Header, Outlet, and Footer.

- [ ] **Step 3: Replace the shell and document metadata**

Use this root document and app shell shape while retaining the existing error-message selection logic:

```tsx
import './app.css';

import type { ReactNode } from 'react';
import { isRouteErrorResponse, Links, Scripts, ScrollRestoration } from 'react-router';

import type { Route } from './+types/root';
import { TemporaryHome } from './components/TemporaryHome';

const description = '더 정확한 팀과 프로젝트 이야기를 담아 곧 돌아오겠습니다.';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <meta name="text-scale" content="scale" />
        <title>새 단장 중 — 별마루</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.css"
        />
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <TemporaryHome />;
}
```

Keep the existing `ErrorBoundary` decision logic, but give its `<main>` a canvas background, primary text, minimum viewport height, and the same responsive gutters.

Replace `app/app.css` with:

```css
@import 'tailwindcss';

:root {
  --primitive-ink-950: #15111f;
  --primitive-cream-050: #f7f3ed;
  --primitive-mauve-200: #c9c0cf;
  --primitive-plum-700: #40344a;
  --primitive-acid-400: #ddf95b;
  --primitive-cyan-400: #63d8ff;
  --color-canvas: var(--primitive-ink-950);
  --color-text-primary: var(--primitive-cream-050);
  --color-text-secondary: var(--primitive-mauve-200);
  --color-border-decorative: var(--primitive-plum-700);
  --color-action: var(--primitive-acid-400);
  --color-focus: var(--primitive-cyan-400);
  --color-on-signal: var(--primitive-ink-950);
}

html,
body {
  min-height: 100%;
  margin: 0;
  background: var(--color-canvas);
  color: var(--color-text-primary);
  font-family: 'Pretendard Variable', Pretendard, system-ui, sans-serif;
}

::selection {
  background: var(--color-action);
  color: var(--color-on-signal);
}
```

- [ ] **Step 4: Run the shell and component tests and verify GREEN**

Run: `pnpm test app/root.test.tsx app/components/TemporaryHome.test.tsx`

Expected: PASS with both tests and no warnings.

- [ ] **Step 5: Commit the shell checkpoint**

```bash
av commit -A -m "DSN-23 공개 사이트 셸을 임시 홈으로 전환"
```

### Task 3: Add Cloudflare temporary redirects and build assertions

**Files:**
- Modify: `scripts/verify-build.mjs`
- Create: `public/_redirects`

**Interfaces:**
- Consumes: Cloudflare Workers Static Assets `_redirects` support
- Produces: `/about-us -> /` and `/our-work -> /` as `302` responses in preview and production

- [ ] **Step 1: Make build verification require the temporary deployment contract**

Add `build/client/_redirects` to the required asset list. Replace the old route-specific title and English-language assertions with a loop that checks every prerendered HTML file for:

```js
const expectedTitle = '<title>새 단장 중 — 별마루</title>';
const expectedLang = '<html lang="ko">';
const retiredCopy = ['동인이 만드는,', '당사자의 시선으로', 'MVP Scope'];
```

Every HTML file must contain the expected title and language and must contain none of the retired copy.

- [ ] **Step 2: Run the build and verify RED**

Run: `pnpm build`

Expected: FAIL because `build/client/_redirects` does not exist.

- [ ] **Step 3: Add the static redirect rules**

```text
/about-us / 302
/our-work / 302
```

- [ ] **Step 4: Run the production build and verify GREEN**

Run: `pnpm build`

Expected: PASS; `_redirects` exists in `build/client`, and all prerendered documents expose the temporary metadata without retired public copy.

- [ ] **Step 5: Commit the deployment checkpoint**

```bash
av commit -A -m "DSN-23 기존 공개 경로를 임시 홈으로 연결"
```

### Task 4: Add current-state browser verification

**Files:**
- Create: `scripts/verification/temporary-home-browser.mjs`

**Interfaces:**
- Consumes: `BASE_URL`, `CHROME_PATH`, `SCREENSHOT_DIR`, `BROWSER_RESULTS_PATH`
- Produces: JSON evidence, four screenshots, and a non-zero exit code for any contract failure

- [ ] **Step 1: Implement a focused browser verifier**

Reuse the existing verifier's `check`, font/image settling, screenshot-directory cleanup, and JSON result pattern. Verify:

- `/` responds `200`;
- title is `새 단장 중 — 별마루` and document language is `ko`;
- one `h1`, the approved description, the `mailto:` CTA, and the official logo are visible;
- no navigation or footer exists;
- CTA bounding box is at least `44px` high and its computed colors match Acid/Ink;
- keyboard `Tab` reaches the CTA and exposes a Cyan focus outline;
- document width does not overflow viewport width;
- `/about-us` and `/our-work` finish at `/` when run against Wrangler preview;
- screenshots are captured at `375×812`, `768×1024`, `1024×900`, and `1440×1000`.

- [ ] **Step 2: Start the built site through Wrangler**

Run: `pnpm preview`

Expected: the server listens on `127.0.0.1:8787` and applies `_redirects`.

- [ ] **Step 3: Run the focused browser verifier**

Run: `BASE_URL=http://127.0.0.1:8787 node scripts/verification/temporary-home-browser.mjs`

Expected: zero failures, four PNG screenshots, and a JSON evidence file.

- [ ] **Step 4: Inspect all four screenshots**

Confirm the logo, Korean line breaks, contact action, vertical centering, and lack of overflow. Any visual issue requires a failing assertion where practical before the style fix.

- [ ] **Step 5: Commit the browser-verification checkpoint**

```bash
av commit -A -m "DSN-23 임시 홈 브라우저 검증을 추가"
```

### Task 5: Run full regression verification

**Files:**
- Verify only; modify files only if a failing check exposes an in-scope regression

**Interfaces:**
- Consumes: all DSN-23 changes
- Produces: fresh evidence that the branch is reviewable before any deployment decision

- [ ] **Step 1: Run all unit and type checks**

Run: `pnpm check`

Expected: PASS with zero type errors and zero failed tests.

- [ ] **Step 2: Run formatting and lint checks**

Run: `pnpm lint`

Expected: PASS with zero Prettier or ESLint errors.

- [ ] **Step 3: Run a fresh production build**

Run: `pnpm build`

Expected: PASS including `scripts/verify-build.mjs`.

- [ ] **Step 4: Re-run the browser verifier against a fresh Wrangler preview**

Run: `BASE_URL=http://127.0.0.1:8787 node scripts/verification/temporary-home-browser.mjs`

Expected: zero browser failures and four current screenshots.

- [ ] **Step 5: Review the final change boundary**

Run: `git status --short && git diff origin/main...HEAD --check && git diff origin/main...HEAD --stat`

Expected: clean worktree, no whitespace errors, and changes limited to the DSN-23 spec, plan, temporary component/shell, redirect rule, and focused verification.

- [ ] **Step 6: Present evidence and request separate deployment approval**

Do not run `pnpm deploy`, push, open a PR, or change DSN-23 to Done until the user has reviewed the screenshots and explicitly approved the corresponding external action.
