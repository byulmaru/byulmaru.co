# React 마이그레이션 동등성 검증

검증 대상은 `codex/react-migration` 브랜치의 React 구현이며, 변환 전 Svelte 기준선은
`artifacts/baseline/`에 저장된 2026-07-14 캡처다. 프로덕션 배포는 하지 않았고 React 개발 서버와
Cloudflare Wrangler 로컬 프리뷰만 사용했다.

## 검증 환경과 명령

- Node.js: Codex bundled Node
- 브라우저: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
- Playwright: Codex bundled `playwright@1.61.1`
- 캡처 설정: `deviceScaleFactor: 1`, `fullPage: false`, 폰트와 이미지 로드 후 2회의
  `requestAnimationFrame` 대기
- 개발 서버: `CI=true pnpm run dev --host 127.0.0.1`
- 화면 캡처 및 브라우저 assertion:
  `/Users/sasha_/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node /private/tmp/task7-browser.mjs`
- raw pixel 비교:
  `/Users/sasha_/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node /private/tmp/task7-pixel-diff.mjs`
- Cloudflare 프리뷰: `CI=true pnpm run preview`

계획에 적힌 `pnpm run dev -- --host 127.0.0.1`은 현재 pnpm과 React Router CLI 조합에서 literal
`--`를 project directory로 해석하여 `React Router Vite plugin not found in Vite config`로
실패했다. 같은 옵션을 올바르게 전달하는 위 명령에는 중간 `--`가 없다.

## 캡처 목록

`artifacts/react/`에 기준선과 동일한 이름의 PNG 22개를 만들었다.

| 대상            | mobile                  | tablet      | desktop     | 수량 |
| --------------- | ----------------------- | ----------- | ----------- | ---- |
| Home            | 375×812, 메뉴 닫힘/열림 | 768×1024    | 1280×900    | 4    |
| About Us        | 375×812                 | 768×1024    | 1280×900    | 3    |
| Our Work 5개 탭 | 각 375×812              | 각 768×1024 | 각 1280×900 | 15   |
| 합계            | 8                       | 7           | 7           | 22   |

모든 React PNG의 가로·세로 크기는 대응하는 Svelte PNG와 일치한다. Our Work 파일명은
`overview`, `mvp-scope`, `user-journey`, `architecture`, `data-and-ops`를 사용한다.

## 실제 브라우저 검증

375, 640, 768, 900, 1024, 1280px에서 총 421개 assertion을 실행했고 실패는 0개였다.

- 세 경로의 title, 원본과 같은 `html[lang="en"]`, favicon 링크와 모든 이미지 로드를 확인했다.
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

## 픽셀 및 육안 비교

Sharp로 각 PNG를 RGBA raw buffer로 변환해 같은 좌표의 RGB 절대 오차를 계산했다.

- Home/About Us 7장은 대응 기준선과 모든 픽셀이 동일했다(MAE/RMSE 0).
- Our Work 15장의 MAE 범위는 `0.0215~0.6605`, RMSE 최대는 `3.9285`였다.
- 채널 차이가 30을 넘는 pixel 비율은 `0~0.1274%`였다.
- Overview는 무작위 별 위치/opacity 때문에 완전 일치를 기대하지 않는다.
- 나머지 저강도 차이는 0.18초 탭 색 전환을 캡처한 프레임 차이에 집중됐다. 축소한 좌우 비교에서
  텍스트, 요소 위치, 크기, 배경, 패널 콘텐츠의 의미 있는 차이는 확인되지 않았다.
- 이미지 뷰어가 일부 큰 PNG/JPEG에 검은 사각 타일을 일시적으로 표시했지만, 같은 파일의 raw
  pixel 계산과 축소 렌더에는 해당 타일이 없어 캡처 내용의 회귀로 판정하지 않았다.

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
복구했다. 수정 전 `our-work-overview-mobile.png`의 MAE는 `12.3155`, 30 초과 pixel은
`10.1094%`였고, 수정 후 각각 `0.0951`, `0.1274%`가 됐다.

### 세부 패널 ARIA 동등성

최종 diff 리뷰에서 MVP·Journey·Data 패널에 원본에 없던 `role="tabpanel"`과 `aria-labelledby`가
추가된 사실을 확인했다. 원본은 Overview와 Architecture에만 두 속성을 사용하고 나머지 세 패널은
`id`만 사용한다. 원본 속성 계약을 먼저 테스트로 고정해 4개 실패를 확인한 뒤 추가 속성만 제거했고,
여섯 반응형 폭의 421개 브라우저 assertion과 패널 테스트를 다시 통과시켰다.

## Cloudflare 로컬 프리뷰

`CI=true pnpm run preview`는 React Router build, prerender, `verify:build`를 통과한 뒤 Wrangler
4.83.0을 `http://localhost:8787`에 시작했다.

| 요청           | 상태 | 본문/Location                                         |
| -------------- | ---- | ----------------------------------------------------- |
| `/`            | 200  | HTML 8,333 bytes, `<title>Byulmaru</title>`           |
| `/about-us`    | 200  | HTML 11,552 bytes, `<title>About us</title>`          |
| `/our-work`    | 200  | HTML 32,324 bytes, `<title>Our Work — 별마루</title>` |
| `/favicon.ico` | 200  | 13,969 bytes, public 원본과 SHA-256 동일              |
| `/robots.txt`  | 200  | 63 bytes, public 원본과 SHA-256 동일                  |
| `/not-a-route` | 404  | 빈 본문                                               |
| `/about-us/`   | 307  | `Location: /about-us`                                 |
| `/our-work/`   | 307  | `Location: /our-work`                                 |

`/` 자체는 canonical URL이 이미 slash인 루트이므로 redirect하지 않고 200을 유지한다. 즉
“슬래시가 붙은 세 페이지가 모두 redirect”가 아니라, 하위 두 페이지의 trailing slash만 제거한다.

## 최종 자동 검증

- `CI=true pnpm run check`: PASS, 8 test files / 20 tests
- `CI=true pnpm run lint`: PASS
- `CI=true pnpm run build`: PASS, 세 HTML prerender와 SPA fallback 생성, `verify:build` PASS
- `git diff --check`: PASS
- Svelte residue 검색: 추적 소스·설정·manifest에서 결과 없음

## 남은 위험과 범위 밖

- 프로덕션 Cloudflare 배포와 custom domain 실요청은 수행하지 않았다.
- Chrome/Playwright 단일 엔진에서 검증했다. Safari/Firefox의 렌더링 차이는 확인하지 않았다.
- Google Fonts는 이번 검증에서 모두 200이었지만 외부 폰트 서비스 장애 시 fallback font가 사용될
  수 있는 기존 운영 특성은 그대로다.
- React Router/Vite 실행 시 Node 26의 `DEP0205 module.register()` deprecation warning이 남는다.
  빌드와 테스트 실패는 아니며 upstream tooling 영역이다.
- 애니메이션 라이브러리 도입, 새 모션, 디자인·콘텐츠·UX 개선, 프로덕션 배포는 이 마이그레이션의
  범위 밖이다.
