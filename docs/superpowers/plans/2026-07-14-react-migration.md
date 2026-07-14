# React Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 현재 SvelteKit 사이트의 세 경로, 콘텐츠, 디자인, 상호작용, 정적 HTML 및 Cloudflare 배포 동작을 보존하면서 모든 페이지를 React 컴포넌트로 전환한다.

**Architecture:** React Router v8 Framework Mode를 `ssr: false`와 명시적 정적 프리렌더 경로로 사용한다. 공통 셸과 세 라우트를 React로 구현하고, 큰 Our Work 페이지는 상태 제어·별 효과·다섯 패널·콘텐츠 데이터·CSS Module 경계로만 분리한다. Cloudflare Workers는 런타임 서버 없이 `build/client` 정적 자산을 제공한다.

**Tech Stack:** React 19.2.7+, React Router 8, TypeScript 6, Vite 8, Tailwind CSS 4, Vitest, React Testing Library, Cloudflare Wrangler 4

## Global Constraints

- Node.js 22.22.0 이상을 사용한다. 현재 로컬 Node.js는 26.5.0이다.
- 공개 URL은 `/`, `/about-us`, `/our-work`만 유지한다.
- 디자인, 문구, 콘텐츠, 접근성 정책, UX를 개선하지 않는다.
- 모든 페이지와 공통 셸을 React 컴포넌트로 구현하되 애니메이션 라이브러리와 새 모션은 추가하지 않는다.
- `package.json`은 직접 편집하지 않고 `pnpm add`, `pnpm remove`, `pnpm pkg set`, `pnpm pkg delete`만 사용한다.
- `/favicon.ico`, `/robots.txt`, `byulmaru.co` custom domain, observability, preview URL, workers.dev 설정을 보존한다.
- 프로덕션 배포와 PR merge/Ready 전환은 수행하지 않는다.
- 각 작업은 자동 검증 후 한국어 체크포인트 커밋으로 끝낸다.

---

## File Map

- `app/root.tsx`: 문서 셸, 공통 Header/main/Footer, 오류 경계
- `app/routes.ts`: 세 정적 라우트 선언
- `app/routes/home.tsx`: `/` 콘텐츠와 제목
- `app/routes/about-us.tsx`: `/about-us` 콘텐츠와 제목
- `app/routes/our-work.tsx`: `/our-work` 활성 탭 상태와 패널 조합
- `app/components/{Header,Footer,Divider}.tsx`: 공통 UI
- `app/our-work/components/OurWorkTabs.tsx`: 탭 ARIA, 키보드, 포커스 이동
- `app/our-work/components/StarField.tsx`: hydration 후 별 120개 생성
- `app/our-work/panels/*.tsx`: 기존 다섯 패널 마크업
- `app/our-work/content.ts`: 기존 반복 콘텐츠 데이터와 타입
- `app/app.css`: Tailwind import와 전역 배경/폰트
- `app/our-work/our-work.module.css`: Our Work 범위 CSS
- `app/test/setup.ts`: Vitest DOM matcher 정리
- `scripts/verify-build.mjs`: 정적 산출물 계약 검사
- `react-router.config.ts`: `ssr: false`, 세 프리렌더 경로
- `vite.config.ts`: React Router와 Tailwind 플러그인
- `vitest.config.ts`: jsdom, alias, setup 파일
- `tsconfig.json`: React Router/Vite/React TypeScript 설정
- `eslint.config.js`: Svelte 규칙 제거와 React Hooks 규칙 추가
- `.prettierrc`: Svelte parser 제거와 Tailwind stylesheet 경로 변경
- `wrangler.jsonc`: `build/client` Static Assets 설정
- `public/*`: favicon과 robots

---

### Task 1: 변환 전 기준선과 React 정적 프리렌더 골격

**Files:**
- Create: `artifacts/baseline/`의 라우트·뷰포트별 PNG
- Create: `app/root.tsx`
- Create: `app/routes.ts`
- Create: `app/routes/home.tsx`
- Create: `react-router.config.ts`
- Create: `vitest.config.ts`
- Modify: `vite.config.ts`
- Modify: `tsconfig.json`
- Modify: `eslint.config.js`
- Modify: `.prettierrc`
- Modify through pnpm CLI: `package.json`, `pnpm-lock.yaml`

**Interfaces:**
- Produces: React Router가 인식하는 `Layout`, default root route, `routes` 배열, `/` route module
- Produces: `pnpm run dev`, `build`, `check`, `lint`, `test`, `verify:build` 스크립트 계약

- [ ] **Step 1: 현재 Svelte 기준선을 캡처한다**

Run: `pnpm run dev -- --host 127.0.0.1`

Capture: `/`, `/about-us`, `/our-work`의 375×812, 768×1024, 1280×900 화면. `/our-work`는 다섯 탭 각각을 기록한다.

Expected: 모바일/태블릿/데스크톱 기준 PNG와 메뉴·탭 동작 메모가 `artifacts/baseline/`에 존재한다.

- [ ] **Step 2: Svelte 의존성을 pnpm CLI로 제거한다**

```bash
pnpm remove @sveltejs/adapter-cloudflare @sveltejs/kit @sveltejs/vite-plugin-svelte eslint-plugin-svelte lucide-svelte prettier-plugin-svelte svelte svelte-check
```

Expected: `package.json`과 `pnpm-lock.yaml`에서 해당 패키지가 사라진다.

- [ ] **Step 3: React와 테스트 의존성을 pnpm CLI로 설치한다**

```bash
pnpm add react@^19.2.7 react-dom@^19.2.7 react-router@^8.2.0 lucide-react
pnpm add -D @react-router/dev@^8.2.0 @testing-library/jest-dom @testing-library/react @testing-library/user-event @types/react @types/react-dom eslint-plugin-react-hooks eslint-plugin-react-refresh jsdom vitest
```

Expected: React Router, React DOM, 테스트 및 lint 도구가 manifest와 lockfile에 기록된다.

- [ ] **Step 4: 스크립트를 pnpm CLI로 교체한다**

```bash
pnpm pkg set scripts.dev='react-router dev'
pnpm pkg set scripts.build='react-router build && pnpm run verify:build'
pnpm pkg set scripts.prepare='react-router typegen'
pnpm pkg set scripts.check='react-router typegen && tsc --noEmit && vitest run'
pnpm pkg set scripts.check:watch='vitest'
pnpm pkg set scripts.test='vitest run'
pnpm pkg set scripts.test:watch='vitest'
pnpm pkg set scripts.verify:build='node scripts/verify-build.mjs'
pnpm pkg delete scripts.gen scripts.cf-typegen
```

Expected: `dev`, `build`, `preview`, `prepare`, `check`, `lint`, `format`, `test`, `deploy`, `verify:build`만 목적에 맞게 남는다.

- [ ] **Step 5: 최소 React Router 골격을 작성한다**

`react-router.config.ts`의 완성 형태:

```ts
import type { Config } from '@react-router/dev/config';

export default {
  ssr: false,
  prerender: ['/', '/about-us', '/our-work'],
} satisfies Config;
```

`app/routes.ts`의 완성 형태:

```ts
import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('about-us', 'routes/about-us.tsx'),
  route('our-work', 'routes/our-work.tsx'),
] satisfies RouteConfig;
```

`app/root.tsx`는 `Meta`, `Links`, `Outlet`, `Scripts`, `ScrollRestoration`을 포함하는 `Layout`과 공통 셸을 노출한다. 아직 없는 두 라우트는 임시로 현재 제목을 가진 최소 route module을 두어 typegen/build가 성공하게 한다.

- [ ] **Step 6: 설정을 React용으로 교체하고 골격을 검증한다**

Run: `pnpm exec react-router typegen && pnpm exec tsc --noEmit && pnpm exec react-router build`

Expected: 세 route module이 타입 생성되고 `build/client/index.html`, `build/client/about-us/index.html`, `build/client/our-work/index.html`이 만들어진다.

- [ ] **Step 7: 체크포인트 커밋**

```bash
av commit -A -m "build: React 정적 프리렌더 골격으로 전환"
```

---

### Task 2: 공통 셸과 Home/About Us 마이그레이션

**Files:**
- Create: `app/components/Header.test.tsx`
- Create: `app/components/Header.tsx`
- Create: `app/components/Footer.tsx`
- Create: `app/components/Divider.tsx`
- Create: `app/routes/content.test.tsx`
- Modify: `app/root.tsx`
- Modify: `app/routes/home.tsx`
- Modify: `app/routes/about-us.tsx`
- Create: `app/app.css`
- Move: `src/lib/assets/*` → `app/assets/*`

**Interfaces:**
- Produces: `type NavItem = { href: string; label: string }`
- Produces: `Header({ navItems }: { navItems: readonly NavItem[] })`
- Produces: `Footer({ navItems }: { navItems: readonly NavItem[] })`
- Produces: `Divider(): ReactElement`

- [ ] **Step 1: Header 상호작용 실패 테스트를 작성한다**

```tsx
it('toggles and closes the mobile menu', async () => {
  const user = userEvent.setup();
  render(<Header navItems={navItems} />, { wrapper: BrowserRouter });
  const button = screen.getByRole('button', { name: 'Open menu' });
  await user.click(button);
  expect(button).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  await user.click(screen.getAllByRole('link', { name: 'About us' }).at(-1)!);
  expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument();
});
```

Run: `pnpm exec vitest run app/components/Header.test.tsx`

Expected: FAIL because `Header.tsx` does not exist.

- [ ] **Step 2: Header, Footer, Divider와 root 공통 셸을 구현한다**

Svelte의 nav item 순서, logo alt, class 문자열, 모바일 상태, ARIA 속성, link URL을 JSX로 그대로 옮긴다. Header는 `useState(false)`, `MenuIcon`, `XIcon`, React Router `Link`를 사용한다.

Run: `pnpm exec vitest run app/components/Header.test.tsx`

Expected: PASS.

- [ ] **Step 3: Home/About Us 콘텐츠 실패 테스트를 작성한다**

```tsx
it('preserves the home and team copy', () => {
  const { rerender } = render(<Home />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('동인이 만드는,동인을 위한 플랫폼');
  expect(screen.getByRole('link', { name: '메일 보내기 →' })).toHaveAttribute('target', '_blank');
  rerender(<AboutUs />);
  expect(screen.getAllByRole('article')).toHaveLength(3);
  expect(screen.getByText('유키')).toBeVisible();
  expect(screen.getByText('샤샤')).toBeVisible();
  expect(screen.getByText('헤헤즈')).toBeVisible();
});
```

Run: `pnpm exec vitest run app/routes/content.test.tsx`

Expected: FAIL until both route contents are ported.

- [ ] **Step 4: Home/About Us 마크업과 전역 CSS를 옮긴다**

현재 Svelte의 텍스트, HTML 요소 순서, Tailwind 클래스, 이미지 import, invisible spacer, Gmail URL, document title을 JSX와 route `meta`로 그대로 옮긴다. `layout.css`의 Tailwind import와 body 배경은 `app/app.css`로 이동한다.

Run: `pnpm exec vitest run app/components/Header.test.tsx app/routes/content.test.tsx`

Expected: PASS.

- [ ] **Step 5: 체크포인트 커밋**

```bash
av commit -A -m "feat: 공통 셸과 소개 페이지를 React로 전환"
```

---

### Task 3: Our Work 탭과 별 효과 마이그레이션

**Files:**
- Create: `app/our-work/components/OurWorkTabs.test.tsx`
- Create: `app/our-work/components/OurWorkTabs.tsx`
- Create: `app/our-work/components/StarField.test.tsx`
- Create: `app/our-work/components/StarField.tsx`
- Create: `app/our-work/content.ts`
- Modify: `app/routes/our-work.tsx`

**Interfaces:**
- Produces: `type OurWorkTabId = 'overview' | 'mvp' | 'journey' | 'architecture' | 'data'`
- Produces: `OUR_WORK_TABS: readonly { id: OurWorkTabId; label: string; desc: string }[]`
- Produces: `OurWorkTabs({ activeTab, onChange })`
- Produces: `StarField(): ReactElement`

- [ ] **Step 1: 탭 키보드 실패 테스트를 작성한다**

```tsx
it.each([
  ['ArrowRight', 'mvp'],
  ['ArrowLeft', 'data'],
  ['End', 'data'],
  ['Home', 'overview'],
])('moves focus with %s', async (key, expected) => {
  const onChange = vi.fn();
  render(<OurWorkTabs activeTab="overview" onChange={onChange} />);
  const overview = screen.getByRole('tab', { name: /Overview/ });
  overview.focus();
  fireEvent.keyDown(overview.parentElement!, { key });
  expect(onChange).toHaveBeenCalledWith(expected);
  expect(document.activeElement).toBe(document.getElementById(`tab-${expected}`));
});
```

Run: `pnpm exec vitest run app/our-work/components/OurWorkTabs.test.tsx`

Expected: FAIL because the component does not exist.

- [ ] **Step 2: 현재 탭 클릭·ARIA·키보드 동작을 구현한다**

현재 다섯 tab label/description, roving tabIndex, wrapping, Home/End, focus 호출, sticky shell 마크업을 그대로 구현한다.

Run: `pnpm exec vitest run app/our-work/components/OurWorkTabs.test.tsx`

Expected: PASS.

- [ ] **Step 3: 별 생성 실패 테스트를 작성한다**

```tsx
it('adds 120 stars after mount', async () => {
  const { container } = render(<StarField />);
  expect(container.querySelectorAll('[data-star]')).toHaveLength(0);
  await waitFor(() => expect(container.querySelectorAll('[data-star]')).toHaveLength(120));
});
```

Run: `pnpm exec vitest run app/our-work/components/StarField.test.tsx`

Expected: FAIL because the component does not exist.

- [ ] **Step 4: hydration 이후 별 120개 생성을 구현한다**

`useEffect` 안에서 120개의 `{ size, left, top, duration, delay, opacity }`를 만들고 CSS custom property가 포함된 `CSSProperties`로 렌더한다. effect cleanup은 unmount 후 state update가 없으므로 추가하지 않는다.

Run: `pnpm exec vitest run app/our-work/components/StarField.test.tsx`

Expected: PASS.

- [ ] **Step 5: route state와 탭별 조건부 mount를 연결한다**

`app/routes/our-work.tsx`가 `useState<OurWorkTabId>('overview')`를 소유하고 `OurWorkTabs`와 정확히 하나의 panel을 렌더하도록 한다.

- [ ] **Step 6: 체크포인트 커밋**

```bash
av commit -A -m "feat: Our Work 탭과 별 효과를 React로 전환"
```

---

### Task 4: Our Work Overview 콘텐츠 마이그레이션

**Files:**
- Create: `app/our-work/panels/OverviewPanel.test.tsx`
- Create: `app/our-work/panels/OverviewPanel.tsx`
- Modify: `app/our-work/content.ts`

**Interfaces:**
- Consumes: `StarField`, `Divider`, 반복 콘텐츠 배열
- Produces: `OverviewPanel(): ReactElement`

- [ ] **Step 1: 콘텐츠 수량 실패 테스트를 작성한다**

```tsx
it('preserves overview sections and item counts', async () => {
  const { container } = render(<OverviewPanel />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('트위터를 대체할우리만의 SNS를 만듭니다');
  expect(container.querySelectorAll(`.${styles['reason-card']}`)).toHaveLength(4);
  expect(container.querySelectorAll(`.${styles['build-card']}`)).toHaveLength(6);
  expect(container.querySelectorAll(`.${styles['user-card']}`)).toHaveLength(3);
  expect(container.querySelectorAll(`.${styles['stat-chip']}`)).toHaveLength(6);
  expect(container.querySelectorAll(`.${styles['insight-card']}`)).toHaveLength(4);
  expect(container.querySelectorAll(`.${styles['pain-table']} tbody tr`)).toHaveLength(9);
});
```

Run: `pnpm exec vitest run app/our-work/panels/OverviewPanel.test.tsx`

Expected: FAIL until the panel exists.

- [ ] **Step 2: Overview 마크업과 데이터를 그대로 변환한다**

원본 `src/routes/our-work/+page.svelte:356-748`의 요소 순서, 모든 문구, 비교표 6행, 이유 4개, 기능 6개, 사용자 3개, 통계 6개, 인사이트 4개, pain 9행을 JSX와 typed data로 옮긴다. `#each` key는 React `key`, Svelte 조건은 JSX 조건으로만 변환한다.

Run: `pnpm exec vitest run app/our-work/panels/OverviewPanel.test.tsx`

Expected: PASS.

- [ ] **Step 3: 체크포인트 커밋**

```bash
av commit -A -m "feat: Our Work 개요 콘텐츠를 React로 전환"
```

---

### Task 5: 나머지 Our Work 패널 마이그레이션

**Files:**
- Create: `app/our-work/panels/RemainingPanels.test.tsx`
- Create: `app/our-work/panels/MvpPanel.tsx`
- Create: `app/our-work/panels/JourneyPanel.tsx`
- Create: `app/our-work/panels/ArchitecturePanel.tsx`
- Create: `app/our-work/panels/DataOpsPanel.tsx`
- Modify: `app/our-work/content.ts`
- Modify: `app/routes/our-work.tsx`

**Interfaces:**
- Produces: 네 panel component와 `launchMetrics` 공유 데이터

- [ ] **Step 1: 패널별 대표 콘텐츠와 수량 실패 테스트를 작성한다**

```tsx
it('preserves the four remaining panels', () => {
  const cases = [
    [<MvpPanel />, 'MVP 범위', styles['feature-card'], 4],
    [<JourneyPanel />, '가입부터 연합, 탐색, 통합 피드까지의 핵심 여정', styles['journey-item'], 6],
    [<ArchitecturePanel />, 'Inner Architecture', `${styles['arch-node']}.${styles.domain}`, 9],
    [<DataOpsPanel />, 'DB Schema', styles['schema-card'], 8],
  ] as const;
  for (const [panel, title, selector, count] of cases) {
    const { container, unmount } = render(panel);
    expect(screen.getByText(title)).toBeVisible();
    expect(container.querySelectorAll(`.${selector}`)).toHaveLength(count);
    unmount();
  }
});
```

Run: `pnpm exec vitest run app/our-work/panels/RemainingPanels.test.tsx`

Expected: FAIL until all panels exist.

- [ ] **Step 2: MVP와 Journey를 변환한다**

원본 `750-837`의 기능 4개, 범위 6개, 제외 9개, 지표 11개, 여정 6개를 JSX와 content 배열로 그대로 옮긴다.

- [ ] **Step 3: Architecture와 Data/Ops를 변환한다**

원본 `838-1176`의 서비스 9개, 워커 5개, 외부 4개, 발신 7단계, 수신 8단계, CI/CD 5단계, 테이블 8개, 원칙 6개, 지표 11개를 그대로 옮긴다. `launchMetrics`는 한 배열을 두 패널에서 공유한다.

Run: `pnpm exec vitest run app/our-work/panels/RemainingPanels.test.tsx`

Expected: PASS.

- [ ] **Step 4: 다섯 탭 통합 테스트를 실행한다**

Run: `pnpm exec vitest run app/our-work`

Expected: 모든 탭·별·패널 테스트 PASS.

- [ ] **Step 5: 체크포인트 커밋**

```bash
av commit -A -m "feat: Our Work 세부 패널을 React로 전환"
```

---

### Task 6: CSS 범위, 정적 자산, Cloudflare 배포 전환

**Files:**
- Create: `app/our-work/our-work.module.css`
- Create: `scripts/verify-build.mjs`
- Modify: `app/routes/our-work.tsx`와 panel className 매핑
- Modify: `wrangler.jsonc`
- Move: `static/favicon.ico` → `public/favicon.ico`
- Move: `static/robots.txt` → `public/robots.txt`
- Delete: `src/`, `static/.assetsignore`, `svelte.config.js`, `src/app.html`, `src/app.d.ts`, `worker-configuration.d.ts`

**Interfaces:**
- Produces: `pnpm run build`가 자체 검증을 포함하는 계약
- Produces: Cloudflare Static Assets directory `./build/client`

- [ ] **Step 1: 빌드 산출물 검증 스크립트를 먼저 작성한다**

```js
import { access, readFile } from 'node:fs/promises';

const required = [
  'build/client/index.html',
  'build/client/about-us/index.html',
  'build/client/our-work/index.html',
  'build/client/favicon.ico',
  'build/client/robots.txt',
];
await Promise.all(required.map((path) => access(path)));
for (const [path, title] of [
  ['build/client/index.html', '<title>Byulmaru</title>'],
  ['build/client/about-us/index.html', '<title>About us</title>'],
  ['build/client/our-work/index.html', '<title>Our Work — 별마루</title>'],
]) {
  const html = await readFile(path, 'utf8');
  if (!html.includes(title)) throw new Error(`${path} is missing ${title}`);
}
```

Run before build: `pnpm run verify:build`

Expected: FAIL because React build artifacts are not complete.

- [ ] **Step 2: scoped CSS를 CSS Module로 옮긴다**

원본 style `1180-2692`의 모든 selector와 declaration을 보존한다. `.our-work-page` 아래로 범위를 유지하고 `:global(.star)`는 StarField에만 적용되는 module global selector로 변환한다. JSX의 class mapping은 한 selector도 누락되지 않도록 수행한다.

- [ ] **Step 3: 정적 파일과 Wrangler 설정을 전환한다**

`wrangler.jsonc`의 assets 부분은 다음 계약을 가진다.

```json
"assets": {
  "directory": "./build/client",
  "html_handling": "drop-trailing-slash"
}
```

Svelte Worker `main`과 binding은 제거하되 나머지 프로젝트/도메인/관측성 설정은 유지한다.

- [ ] **Step 4: Svelte 전용 파일을 제거하고 전체 빌드를 통과시킨다**

Run: `pnpm run check && pnpm run lint && pnpm run build`

Expected: typegen, TypeScript, Vitest, Prettier, ESLint, React Router build, build artifact verification이 모두 PASS.

- [ ] **Step 5: 잔존 Svelte 결합을 검사한다**

Run: `rg -n "svelte|sveltekit|@sveltejs|lucide-svelte|\\.svelte-kit" --glob '!docs/superpowers/**' --glob '!pnpm-lock.yaml' .`

Expected: 추적 소스·설정·manifest에서 결과 없음. `pnpm-lock.yaml`에도 Svelte 패키지가 직접 또는 불필요한 전이 의존성으로 남지 않는다.

- [ ] **Step 6: 체크포인트 커밋**

```bash
av commit -A -m "build: Cloudflare 정적 React 배포로 전환"
```

---

### Task 7: 동등성 검증, 수정, 최종 전달

**Files:**
- Create: `artifacts/react/`의 라우트·뷰포트별 PNG
- Create: `docs/verification/2026-07-14-react-migration.md`
- Modify: 검증에서 회귀가 발견된 React/CSS/test 파일

**Interfaces:**
- Produces: URL·콘텐츠·시각·상호작용·Cloudflare 계약별 증거 기록

- [ ] **Step 1: React dev 서버에서 동일 화면을 캡처한다**

Run: `pnpm run dev -- --host 127.0.0.1`

Capture: 기준선과 동일한 라우트, 뷰포트, 탭 상태를 `artifacts/react/`에 저장한다.

- [ ] **Step 2: 시각·상호작용 동등성을 비교한다**

검사 항목: 375/640/768/900/1024/1280px, 모바일 메뉴, invisible home spacer, profile crop, sticky/scrolling tabs, 다섯 패널, keyboard wrapping/focus, 별 120개와 재진입 재생성, 표 가로 스크롤, schema 모바일 2열, 제목과 공개 자산.

Expected: 프레임워크 생성 marker 외 사용자 가시 차이 없음.

- [ ] **Step 3: Cloudflare 로컬 프리뷰를 검증한다**

Run: `pnpm run preview`

```bash
curl -I http://127.0.0.1:8787/
curl -I http://127.0.0.1:8787/about-us
curl -I http://127.0.0.1:8787/our-work
curl -I http://127.0.0.1:8787/favicon.ico
curl -I http://127.0.0.1:8787/robots.txt
curl -I http://127.0.0.1:8787/not-a-route
```

Expected: 세 라우트와 공개 자산은 200, 알 수 없는 경로는 404, 슬래시가 붙은 세 페이지는 무슬래시 canonical URL로 redirect된다.

- [ ] **Step 4: 검증 결과와 수정 내용을 문서화한다**

`docs/verification/2026-07-14-react-migration.md`에 명령, 결과, 뷰포트, 확인한 동작, 확인하지 못한 위험을 기록한다. 실패한 항목은 수정과 회귀 테스트 후 PASS 증거로 교체한다.

- [ ] **Step 5: 전체 최종 검증과 독립 리뷰를 수행한다**

Run: `pnpm run check && pnpm run lint && pnpm run build && git diff --check`

Expected: 모두 exit 0. 독립 리뷰에서 범위 확대, 콘텐츠 누락, Svelte 잔존, CSS 누출, Cloudflare 라우팅 회귀가 없음.

- [ ] **Step 6: 최종 체크포인트 커밋**

```bash
av commit -A -m "test: React 마이그레이션 동등성을 검증"
```

- [ ] **Step 7: 브랜치 push와 한국어 PR 생성**

PR 제목은 `사이트를 React 기반 정적 프리렌더로 전환`으로 한다. 본문은 변경 사항, 검증 결과, 중점 리뷰 포인트, 범위 밖 항목을 포함한다. Draft가 아닌 PR은 현재 HEAD의 모든 검증이 통과한 뒤에만 생성한다.
