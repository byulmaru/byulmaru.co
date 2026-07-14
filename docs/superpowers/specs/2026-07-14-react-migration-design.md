# React 마이그레이션 설계

## 목표

현재 SvelteKit 사이트를 React 기반 애플리케이션으로 전환한다. 다음 외부 계약은 유지한다.

- 공개 URL: `/`, `/about-us`, `/our-work`
- 각 URL의 경로별 정적 HTML과 문서 제목
- 현재 콘텐츠, DOM 의미, 시각 디자인, 반응형 분기점
- 헤더 모바일 메뉴와 `/our-work` 탭의 상호작용 및 키보드 동작
- `/favicon.ico`, `/robots.txt` 공개 경로와 소스 이미지 자산
- `byulmaru.co`를 대상으로 한 Cloudflare Workers Static Assets 배포

디자인, 문구, 콘텐츠, 접근성 정책, UX를 개선하는 작업은 이 마이그레이션에 포함하지 않는다. 기존 동작에 문제가 있더라도 React 변환에 필요하지 않으면 그대로 둔다.

전환의 장기 목적은 후속 작업에서 React 생태계의 애니메이션 컴포넌트를 사용할 수 있게 하는 것이다. 따라서 일부 상호작용만 React island로 만드는 구성이 아니라 페이지, 공통 셸, 탭 패널을 모두 React 컴포넌트 트리로 구성한다. 이번 마이그레이션 자체에는 애니메이션 라이브러리나 새 모션을 추가하지 않는다.

## 선택한 아키텍처

React Router v8 Framework Mode를 사용한다.

- React 19와 TypeScript로 모든 페이지와 공통 레이아웃을 구현한다.
- `ssr: false`로 런타임 서버 렌더링을 사용하지 않는다.
- `prerender`에 세 공개 경로를 명시하여 빌드 시 경로별 HTML과 라우터 데이터 파일을 만든다.
- React Router Vite 플러그인과 Tailwind CSS v4 Vite 플러그인을 함께 사용한다.
- Cloudflare 전용 Vite 플러그인은 사용하지 않는다. 현재 Cloudflare 통합은 React Router의 SPA 및 프리렌더 모드를 지원하지 않기 때문이다.
- Cloudflare는 `build/client`를 정적 자산으로 제공한다. `html_handling`은 기존 무슬래시 URL을 유지하도록 `drop-trailing-slash`로 설정한다.

이 구성은 현재 SvelteKit의 전체 프리렌더 동작을 가장 가깝게 보존한다. 단순 Vite SPA는 경로별 HTML을 잃고, Cloudflare 런타임 SSR은 현재 존재하지 않는 서버 실행 경로를 추가하므로 선택하지 않는다.

## 파일 구조

```text
app/
  assets/
  components/
    Divider.tsx
    Footer.tsx
    Header.tsx
  routes/
    about-us.tsx
    home.tsx
    our-work.tsx
  our-work/
    components/
      OurWorkTabs.tsx
      StarField.tsx
    panels/
      ArchitecturePanel.tsx
      DataOpsPanel.tsx
      JourneyPanel.tsx
      MvpPanel.tsx
      OverviewPanel.tsx
    content.ts
    our-work.module.css
  app.css
  root.tsx
  routes.ts
public/
  favicon.ico
  robots.txt
react-router.config.ts
```

공통 셸은 `root.tsx`가 소유하고 Header, 현재 라우트의 Outlet, Footer 순서를 유지한다. 홈과 About Us는 각 라우트가 한 페이지의 콘텐츠를 소유한다. `/our-work`는 현재 2,692줄 단일 파일을 탭 제어, 별 효과, 패널, 정적 콘텐츠 데이터, 범위가 제한된 CSS로만 분리한다.

## 라우팅과 메타데이터

`routes.ts`는 다음 세 경로만 선언한다.

| URL | 라우트 모듈 | 문서 제목 |
| --- | --- | --- |
| `/` | `routes/home.tsx` | `Byulmaru` |
| `/about-us` | `routes/about-us.tsx` | `About us` |
| `/our-work` | `routes/our-work.tsx` | `Our Work — 별마루` |

내부 이동은 React Router `Link`를 사용하되 최종 URL은 현재와 같다. `/our-work`의 다섯 탭은 URL, history, storage와 연결하지 않고 컴포넌트 로컬 상태로 유지한다. 새로고침하면 `overview`로 돌아가는 현재 동작도 보존한다.

## 상태와 상호작용

### 헤더

- `useState(false)`로 모바일 메뉴 열림 상태를 관리한다.
- 버튼 클릭 시 토글하고 모바일 링크를 누르면 닫는다.
- 현재 `aria-label`, `aria-expanded`, `aria-controls`, 숨김 텍스트를 동일하게 유지한다.
- Escape, 바깥 클릭, 포커스 트랩, 현재 경로 강조는 새로 추가하지 않는다.

### Our Work 탭

- 초기 활성 탭은 `overview`이다.
- 클릭, 방향키, Home, End 키 동작과 순환 이동을 보존한다.
- 활성 탭만 `tabIndex=0`, 나머지는 `-1`을 사용하며 키보드 전환 후 해당 버튼에 포커스한다.
- 탭 전환 시 이전 패널을 unmount하고 새 패널을 mount한다.
- 현재 패널별 ARIA 속성을 그대로 옮기며 이 마이그레이션에서 정책을 확장하지 않는다.

### 별 효과

- Overview가 브라우저에 mount된 뒤 `useEffect`로 별 120개의 무작위 크기, 위치, 지연, 지속시간, 불투명도를 만든다.
- 프리렌더 HTML에는 별 노드가 없고 hydration 후 추가되도록 하여 현재 Svelte 동작과 hydration 안정성을 함께 보존한다.
- Overview를 떠났다가 돌아오면 새 무작위 배치를 만든다.

## 스타일과 자산

- Tailwind 유틸리티 클래스는 JSX의 `className`으로 그대로 옮긴다.
- 전역 배경, 폰트, 기본 색상은 `app.css`에서 유지한다.
- `/our-work`의 기존 scoped style은 CSS Module로 옮겨 다른 페이지로 선택자가 새지 않게 한다.
- CSS 변수, nth-child 규칙, 640/900/1024px 반응형 분기, sticky 탭, 표 가로 스크롤, 애니메이션을 변경하지 않는다.
- 동적으로 만든 별에 필요한 custom property는 typed `CSSProperties`로 전달한다.
- 소스 로고와 프로필 이미지는 모듈 import로 유지한다.
- `static`의 favicon과 robots 파일은 Vite 공개 디렉터리인 `public`로 이동해 URL을 보존한다.

## Cloudflare 배포

- `wrangler.jsonc`의 프로젝트 이름, compatibility date/flags, observability, preview URL, custom domain, workers.dev 설정은 유지한다.
- SvelteKit Worker의 `main`과 `.svelte-kit/cloudflare` 경로를 제거한다.
- `assets.directory`를 `./build/client`로 바꾼다.
- `assets.html_handling`을 `drop-trailing-slash`로 설정한다.
- 배포 명령은 `pnpm run build && wrangler deploy` 구조를 유지한다.
- 이 세션에서는 프로덕션 배포를 실행하지 않는다. `wrangler dev`를 통한 로컬 프리뷰까지만 검증한다.

## 오류 처리

애플리케이션은 서버 loader, action, API, Cloudflare binding을 사용하지 않는다. 빌드 오류와 누락 라우트가 주된 실패 경계다.

- React Router의 루트 오류 경계를 두어 라우트 렌더 오류가 빈 문서가 되지 않게 한다.
- 세 공개 경로 외 요청은 정적 자산 라우팅의 404로 남긴다. SPA fallback으로 모든 미지 경로를 200 처리하지 않는다.
- 이미지와 공개 파일은 빌드 산출물 및 로컬 Cloudflare 프리뷰에서 직접 요청해 확인한다.

## 검증 전략

### 변환 전 기준선

- 현재 Svelte 사이트를 로컬에서 실행해 `/`, `/about-us`, `/our-work`를 캡처한다.
- 모바일과 데스크톱 대표 너비에서 헤더, 페이지, 탭 패널을 기록한다.
- 콘텐츠 수량과 주요 접근성 속성을 기준선으로 남긴다.

### 자동 검증

- TypeScript와 React Router route type 생성 검사
- ESLint와 Prettier 검사
- React Testing Library로 모바일 메뉴와 Our Work 탭 클릭·키보드·포커스 동작 검사
- 콘텐츠 회귀 검사를 위해 각 패널의 대표 제목과 반복 항목 수 검사
- production build 후 `build/client`에 세 경로의 HTML, `.data`, favicon, robots가 존재하는지 검사

### 수동·시각 검증

- 기존과 React 버전을 동일한 뷰포트에서 비교한다.
- 375, 640, 768, 900, 1024, 1280px 경계를 중점 확인한다.
- 모바일 메뉴, 탭 가로 스크롤, sticky 위치, 다섯 패널, 키보드 순환, 별 120개 생성과 재진입 재생성을 확인한다.
- `wrangler dev`에서 세 URL 직접 접근, 새로고침, 무슬래시 canonical 처리, 공개 자산 응답을 확인한다.

## 범위 밖

- 디자인, 콘텐츠, 문구, 메타데이터, 접근성 정책 개선
- 현재 미사용 데이터 제거
- 페이지 URL 또는 탭을 URL 상태로 바꾸는 작업
- CMS, API, loader/action, SSR, Cloudflare binding 추가
- 프로필 이미지 최적화와 임시 favicon 교체
- 프로덕션 배포 및 PR merge/Ready 전환
- React 애니메이션 라이브러리 도입과 새 모션 구현

## 완료 조건

1. 추적 소스와 의존성에 Svelte/SvelteKit 전용 코드가 남지 않는다.
2. 세 URL이 경로별 정적 HTML로 빌드되고 직접 접근할 수 있다.
3. 콘텐츠, 제목, 공통 레이아웃, 반응형 스타일, 메뉴, 탭, 별 효과가 기준선과 동등하다.
4. 정적 자산 공개 경로와 Cloudflare 로컬 배포 동작이 유지된다.
5. 자동 검사와 수동 시각·상호작용 검증 결과가 기록된다.
6. 변경을 한국어 커밋으로 보존하고 브랜치를 push한 뒤 한국어 PR을 생성한다.
