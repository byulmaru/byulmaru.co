# React 마이그레이션 동등성 검증

검증 대상은 `codex/react-migration` 브랜치의 React 구현이다. 변환 중 Svelte와 React 화면을
임시 캡처해 육안으로 대조했지만, 후속 디자인 변경에 잘못된 기준으로 남지 않도록 PNG와 픽셀
임계값은 PR에 포함하지 않는다. 프로덕션 배포는 하지 않았고 React 개발 서버와 Cloudflare
Wrangler 로컬 프리뷰를 사용했다.

## 검증 환경과 명령

- Node.js: 로컬 검증은 Codex bundled Node, Cloudflare Workers Builds는 `.node-version`의 `22.22.0`
- 브라우저: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
- Playwright: 프로젝트 dev dependency `playwright-core@1.61.1`
- 캡처 설정: `deviceScaleFactor: 1`, `fullPage: false`, 폰트와 이미지 로드 후 2회의
  `requestAnimationFrame` 대기
- 개발 서버: `CI=true pnpm run dev --host 127.0.0.1`
- 화면 캡처 및 브라우저 assertion: `CI=true pnpm run verify:browser`
- Cloudflare 프리뷰: `CI=true pnpm run preview`

브라우저 검증은 `scripts/verification/react-browser.mjs`를 실행하므로 checkout에서 다시 실행할 수
있다. PNG는 기본적으로 OS 임시 디렉터리에 생성되며 저장소에는 기록하지 않는다. Chrome 실행
파일이 기본 macOS 경로에 없으면 `CHROME_PATH`로 지정한다.

계획에 적힌 `pnpm run dev -- --host 127.0.0.1`은 현재 pnpm과 React Router CLI 조합에서 literal
`--`를 project directory로 해석하여 `React Router Vite plugin not found in Vite config`로
실패했다. 같은 옵션을 올바르게 전달하는 위 명령에는 중간 `--`가 없다.

## 임시 캡처 범위

브라우저 검증은 OS 임시 디렉터리에 다음 PNG 22개를 만들고 수량을 확인한다.

| 대상            | mobile                  | tablet      | desktop     | 수량 |
| --------------- | ----------------------- | ----------- | ----------- | ---- |
| Home            | 375×812, 메뉴 닫힘/열림 | 768×1024    | 1280×900    | 4    |
| About Us        | 375×812                 | 768×1024    | 1280×900    | 3    |
| Our Work 5개 탭 | 각 375×812              | 각 768×1024 | 각 1280×900 | 15   |
| 합계            | 8                       | 7           | 7           | 22   |

Our Work 파일명은 `overview`, `mvp-scope`, `user-journey`, `architecture`, `data-and-ops`를
사용한다. 이 캡처는 브라우저 동작 검증의 임시 출력이며 Git 추적 대상이 아니다.

## 실제 브라우저 검증

375, 640, 768, 900, 1024, 1280px에서 총 431개 assertion을 실행했고 실패는 0개였다.

- 세 경로의 title, 원본과 같은 `html[lang="en"]`, favicon 링크와 모든 이미지 로드를 확인했다.
- 내부 링크 hover 시 route module preload가 생성되고, 클라이언트 이동 뒤 `<body>`로 포커스가
  복구되며 새 title이 assertive/atomic live region에 안내되는지 확인했다.
- 모바일 메뉴의 닫힘/열림, 버튼 닫기, `/about-us` 이동 후 자동 닫힘을 확인했다.
- Home의 invisible spacer가 레이아웃 면적을 유지하면서 `visibility: hidden`인지 확인했다.
- 팀 이미지 3개가 정사각형 컨테이너, `overflow: hidden`, `object-fit: cover`를 유지하는지 확인했다.
- Our Work가 탭 5개, 선택 탭 1개, 활성 패널 1개와 roving `tabIndex`를 유지하는지 확인했다.
  원본대로 Overview와 Architecture만 `tabpanel` role을 가지며, MVP·Journey·Data는 ID로만 패널을
  연결한다.
- ArrowLeft/ArrowRight가 양 끝에서 순환하고 선택과 DOM focus를 함께 이동하는지 확인했다.
- 375px 탭 목록은 `327px / 676px` client/scroll width, 640px는 `592px / 676px`,
  768px는 `720px / 776px`로 내부 가로 스크롤을 제공하며 document 자체는 넘치지 않았다.
- 탭 설명과 최소 너비는 640px 이하에서 `none`/`132px`, 768px 이상에서
  `block`/`152px`였다.
- tab shell은 모든 폭에서 `position: sticky; top: 0`이고 실제 스크롤 뒤 viewport 상단에
  남았다.
- Overview 진입 시 별 120개, 다른 탭에서 0개, 재진입 시 새 descriptor의 별 120개를 확인했다.
- 두 table wrapper 모두 `overflow-x: auto`이고 viewport 안에 포함됐다. 375px comparison table은
  wrapper 내부에서 실제로 스크롤됐다.
- schema card는 9개이며 900px 이하에서 2열, 1024px 이상에서 4열이었다.
- 640px 이하의 reason/build/user grid는 1열이고, 이후에는 각각 2/3/3열이었다.
- section 좌우 padding은 1024px 미만 `24px`, 이상 `64px`; hero 상단 padding은 640px 이하
  `44px`, 이후 `84px`였다.
- 모바일 hero의 `<br>`는 숨겨지고 375px 제목은 기준선과 같은 2줄을 유지했다. 제목과 설명의
  숨김 `<br>` 경계 공백도 DOM text와 접근 가능한 이름에서 보존했다.
- 1024px부터 desktop nav/logo가 나타나고 모바일 메뉴가 숨겨지며, logo 폭은
  375px `160px`, 640~900px `208px`, 1024px 이상 `320px`였다.

## 시각 비교 범위

마이그레이션 중에는 임시 Svelte/React 캡처를 나란히 확인해 콘텐츠, 요소 위치, 크기, 배경과 패널
구성이 보존됐는지 검토했다. 다만 디자인은 별도 작업에서 변경할 예정이므로 해당 PNG와 픽셀
임계값을 장기 회귀 기준으로 유지하지 않는다. 지속 검증은 아래의 브라우저 assertion과 정적 빌드
계약을 사용한다.

## 검증 중 발견하고 수정한 회귀

### Vite 개발 서버 alias

첫 개발 서버 요청은 `~/assets/logo-white-korean.svg`를 dev module runner가 해석하지 못해 500을
반환했다. `vite.config.test.ts`를 먼저 추가했을 때 alias replacement가 `undefined`여서 RED였고,
Vite에 `~` → `app` absolute alias를 추가한 뒤 테스트와 실제 `/our-work` 요청이 PASS/200이 됐다.

### 문서 언어와 모바일 hero 공백

원본 `src/app.html`은 `<html lang="en">`이지만 React root가 `ko`로 바뀌어 있었다. Google Fonts
CSS/woff2는 모두 200이고 Noto Sans KR도 loaded 상태였으므로 폰트 실패는 아니었다. 375px에서
다른 조건을 고정하고 언어만 비교하면 제목 높이가 `129px`(약 3줄, `ko`)에서 `86px`(약 2줄,
`en`)로 돌아왔다.

또한 JSX가 숨겨진 `<br>` 뒤의 Svelte newline 공백을 제거해 hero text가 붙어 있었다. heading/desc
공백 테스트와 빌드 HTML의 `lang="en"` 검사를 먼저 RED로 확인한 뒤, 원본 언어와 명시적 공백을
복구했다. 375px 브라우저 assertion으로 제목이 다시 2줄을 유지하는지 확인했다.

### 세부 패널 ARIA 동등성

최종 diff 리뷰에서 MVP·Journey·Data 패널에 원본에 없던 `role="tabpanel"`과 `aria-labelledby`가
추가된 사실을 확인했다. 원본은 Overview와 Architecture에만 두 속성을 사용하고 나머지 세 패널은
`id`만 사용한다. 원본 속성 계약을 먼저 테스트로 고정해 4개 실패를 확인한 뒤 추가 속성만 제거했고,
여섯 반응형 폭의 421개 브라우저 assertion과 패널 테스트를 다시 통과시켰다.

### 클라이언트 경로 접근성과 프리패치

SvelteKit은 클라이언트 이동 뒤 새 페이지 제목을 assertive/atomic live region으로 안내하고,
`autofocus` 대상이 없으면 `<body>`로 포커스를 옮긴 뒤 임시 `tabindex`를 복구한다. React Router의
클라이언트 스크립트는 이 동작을 애플리케이션이 맡도록 하므로, 초기 hydration은 건드리지 않고
location key가 바뀔 때만 같은 계약을 적용하는 `RouteAccessibility`를 루트에 추가했다. 단위 테스트를
먼저 RED로 확인한 뒤 body 포커스, `autofocus` 우선, title 안내를 구현했고 실제 Chrome 클라이언트
이동에서도 확인했다.

또한 원본의 `data-sveltekit-preload-data="hover"`에 대응하도록 Header/Footer의 내부 링크에
`prefetch="intent"`를 적용했다. React Router가 대상 route asset을 `modulepreload`하는 동작까지
브라우저 검증에 포함했다.

### React Router 필수 `isbot` 의존성

앱 코드가 `isbot`을 직접 import하지는 않지만, 제거 상태에서 `react-router typegen`을 실행하면
React Router 8.2가 `isbot@5`를 manifest에 자동 추가한다. CI frozen lockfile에서는 그 즉시 manifest와
lockfile 불일치로 실패하므로 React Router가 요구하는 직접 런타임 의존성으로 유지했다.

### Cloudflare assets-only 배포 설정

삭제한 `worker-configuration.d.ts`는 `wrangler types`가 기존
`.svelte-kit/cloudflare/_worker` 모듈과 `ASSETS` binding을 대상으로 생성한 TypeScript 타입
선언이었다. 자동 배포를 설정하거나 실행하는 파일이 아니며, React 전환 뒤에는 존재하지 않는
SvelteKit 산출물을 가리킨다.

저장소의 실제 배포 계약은 `wrangler.jsonc`와 `pnpm run deploy`에 남아 있다. Worker 엔트리와
binding이 없는 assets-only 구성으로 `build/client`를 제공하며 프로젝트명, custom domain,
observability와 Workers Builds 연결은 유지한다. `wrangler deploy --dry-run`에서도 25개 정적
자산과 binding 없는 구성을 확인했다.

### Cloudflare 원격 빌드 Node 버전

첫 PR push에서 Cloudflare Workers Builds가 실패했다. 로컬 설치된 `@react-router/dev@8.2.0`과
`react-router@8.2.0`은 Node `>=22.22.0`을 요구하지만, Cloudflare build image의 기본 Node는
`22.16.0`이다. 로그 인증은 없었으나 로컬 build/deploy dry-run은 통과하고 런타임 요구사항만 원격
기본값을 넘으므로 이 버전 차이를 원인으로 판단했다.

Cloudflare가 공식 지원하는 version file override를 사용해 `.node-version`을 `22.22.0`으로 고정하고,
파일이 사라지거나 값이 바뀌면 실패하는 회귀 테스트를 추가했다. 근거는
[Cloudflare Workers Builds build image](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/)에
기록된 기본값과 `.node-version` override 계약이다.

## Cloudflare 로컬 프리뷰

`CI=true pnpm run preview`는 React Router build, prerender, `verify:build`를 통과한 뒤 Wrangler
4.83.0을 `http://localhost:8787`에 시작했다.

| 요청           | 상태 | 본문/Location                                         |
| -------------- | ---- | ----------------------------------------------------- |
| `/`            | 200  | HTML 8,541 bytes, `<title>Byulmaru</title>`           |
| `/about-us`    | 200  | HTML 11,760 bytes, `<title>About us</title>`          |
| `/our-work`    | 200  | HTML 32,524 bytes, `<title>Our Work — 별마루</title>` |
| `/favicon.ico` | 200  | 13,969 bytes, public 원본과 SHA-256 동일              |
| `/robots.txt`  | 200  | 63 bytes, public 원본과 SHA-256 동일                  |
| `/not-a-route` | 404  | 빈 본문                                               |
| `/about-us/`   | 307  | `Location: /about-us`                                 |
| `/our-work/`   | 307  | `Location: /our-work`                                 |

`/` 자체는 canonical URL이 이미 slash인 루트이므로 redirect하지 않고 200을 유지한다. 즉
“슬래시가 붙은 세 페이지가 모두 redirect”가 아니라, 하위 두 페이지의 trailing slash만 제거한다.

## 최종 자동 검증

- `CI=true pnpm run check`: PASS, 10 test files / 23 tests
- `CI=true pnpm run lint`: PASS
- `CI=true pnpm run build`: PASS, 세 HTML prerender와 SPA fallback 생성, `verify:build` PASS
- `CI=true pnpm exec wrangler deploy --dry-run`: PASS, 25개 static asset과 assets-only Worker 구성 확인
- `git diff --check`: PASS
- Svelte 런타임·직접 의존성·편집기 설정 residue 검색: 결과 없음. lockfile에 나타나는
  `prettier-plugin-svelte` 문자열은 설치 항목이 아니라 범용 Prettier 플러그인의 optional peer
  metadata다.

## 남은 위험과 범위 밖

- 프로덕션 Cloudflare 배포와 custom domain 실요청은 수행하지 않았다.
- 의도적으로 커밋된 시각 기준선이 없으므로 향후 디자인 회귀는 브라우저 assertion과 수동 리뷰로
  확인해야 한다.
- Chrome/Playwright 단일 엔진에서 검증했다. Safari/Firefox의 렌더링 차이는 확인하지 않았다.
- Google Fonts는 이번 검증에서 모두 200이었지만 외부 폰트 서비스 장애 시 fallback font가 사용될
  수 있는 기존 운영 특성은 그대로다.
- React Router/Vite 실행 시 Node 26의 `DEP0205 module.register()` deprecation warning이 남는다.
  빌드와 테스트 실패는 아니며 upstream tooling 영역이다.
- 애니메이션 라이브러리 도입, 새 모션, 디자인·콘텐츠·UX 개선, 프로덕션 배포는 이 마이그레이션의
  범위 밖이다.
