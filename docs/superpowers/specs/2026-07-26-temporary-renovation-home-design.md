# DSN-23 팀 사이트 임시 리뉴얼 안내 화면 설계

## 배경

현재 공개 중인 팀 사이트의 콘텐츠가 현행 팀과 프로젝트 상태를 충분히 반영하지 못한다. 전체 리뉴얼은 일주일 이내 완료할 예정이므로, 그전까지 기존 콘텐츠 대신 정확한 최소 안내 화면을 제공한다.

이 변경은 최종 Home, About Us, Our Work 리뉴얼을 대체하지 않는다. 공개된 오래된 콘텐츠를 잠시 가리고, 방문자가 리뉴얼 진행 사실과 문의 방법을 확인할 수 있게 하는 독립적인 임시 조치다.

## 목표

- 공개된 모든 팀 사이트 진입 경로에서 오래된 콘텐츠를 노출하지 않는다.
- 별마루의 리뉴얼 진행 사실과 `hello@byulmaru.co` 문의 방법만 명확하게 안내한다.
- 검색 노출을 유지하고, 최종 리뉴얼 배포 시 쉽게 제거할 수 있게 한다.
- Midnight Signal의 기본 토큰과 접근성 계약을 따르되, 일주일짜리 화면을 위해 새 디자인 시스템이나 운영 인프라를 만들지 않는다.

## 접근 방식 검토

### 선택: 앱 셸 전환과 정적 302 리다이렉트

- 루트 앱 셸에서 기존 Header, navigation, Footer, route `Outlet` 대신 하나의 임시 홈 컴포넌트만 렌더링한다.
- Cloudflare Workers가 공식 지원하는 `public/_redirects`를 사용해 `/about-us`와 `/our-work`를 `/`로 `302` 임시 이동한다.
- `/`는 검색 가능한 정상 `200` 페이지로 유지한다.
- 기존 페이지 구현 파일은 삭제하거나 수정하지 않는다. 최종 리뉴얼 작업과 이번 임시 조치의 diff를 분리하고 되돌리기 쉽게 하기 위해서다.

이 방식은 공개 환경의 URL 동작을 명확하게 유지하면서 Worker 스크립트나 별도 상태 시스템을 추가하지 않는다.

### 대안: 모든 페이지 파일을 임시 화면으로 교체

각 route 모듈이 같은 임시 컴포넌트를 렌더링하도록 만들 수 있다. 로컬 동작은 단순하지만, 동일한 `200` 콘텐츠가 여러 URL에 중복되고 최종 리뉴얼 파일과 변경 충돌이 커지므로 선택하지 않는다.

### 대안: Worker 미들웨어 추가

모든 HTML 요청을 Worker 코드에서 가로채 임시 화면이나 리다이렉트를 반환할 수 있다. 동작 제어는 가장 강하지만, 일주일짜리 정적 팀 사이트 조치에 런타임 코드와 설정을 추가하는 것은 과도하므로 선택하지 않는다.

## 화면 구성

화면은 전체 viewport를 채우는 하나의 dark-only editorial composition이다.

1. 상단에 변형하지 않은 공식 흰색 별마루 로고를 둔다.
2. 본문에는 승인된 제목과 설명을 왼쪽 정렬한다.
3. 본문 아래에 Acid 색상의 단일 `mailto:` CTA를 둔다.
4. 장식은 낮은 대비의 hairline 하나로 제한한다.
5. 기존 Header, navigation, Footer, 우주 장면, 카드, 일러스트, 카운트다운, 진행률, 반복 애니메이션은 표시하지 않는다.

### 승인된 문구

- 문서 제목: `새 단장 중 — 별마루`
- 제목: `별마루는 지금 새 단장을 준비하고 있어요.`
- 설명: `더 정확한 팀과 프로젝트 이야기를 담아 곧 돌아오겠습니다.`
- 행동: `문의하기 →`
- 행동 대상: `mailto:hello@byulmaru.co`

## 디자인 시스템 적용

- Canvas: `#15111F`
- Surface가 필요한 별도 카드: 사용하지 않음
- Heading: Cream `#F7F3ED`, `SUIT Variable`
- Body: Mauve 200 `#C9C0CF`, `Pretendard Variable`
- Primary CTA: Acid `#DDF95B` 배경과 Ink `#15111F` 텍스트
- Focus: Cyan `#63D8FF` 2px outline과 2px 이상 offset
- Decorative hairline: Plum 700 `#40344A`
- 최대 콘텐츠 폭: `1152px`
- gutter: mobile `20px`, tablet `32px`, desktop `64px`
- CTA 최소 높이: `44px`

SUIT Variable과 Pretendard Variable은 각 글꼴 프로젝트가 안내하는 버전 고정 CDN stylesheet로 불러오고, 로드 실패 시 system sans-serif로 폴백한다.

## 접근성과 반응형

- 문서 언어는 `ko`로 설정한다.
- 페이지에는 하나의 의미 있는 `h1`만 둔다.
- 로고 alt는 `별마루`로 제공한다.
- 문의 링크는 키보드로 접근 가능하고, hover와 별개인 focus indicator를 제공한다.
- essential content는 색, motion, texture에 의존하지 않는다.
- 애니메이션을 추가하지 않아 reduced-motion 분기가 필요 없게 한다.
- `375px`, `768px`, `1024px`, `1440px`에서 화면 높이, 줄바꿈, overflow, CTA target을 확인한다.

## 검색과 라우팅

- `/`는 `200`으로 제공하고 `noindex`를 추가하지 않는다.
- `/about-us`와 `/our-work`는 `/`로 `302` 이동한다.
- `301`, `308`, `503`, `Retry-After`, `Disallow: /`는 사용하지 않는다.
- 임시 화면 문구를 모든 route 모듈에 복제하지 않는다.

## 테스트와 검증

- 컴포넌트 테스트에서 승인된 제목, 설명, 로고 alt, `mailto:` CTA와 navigation 부재를 검증한다.
- 앱 셸 테스트에서 기존 Header, Footer, route content가 렌더링되지 않는지 검증한다.
- 빌드 검증에서 `_redirects`가 정적 산출물에 포함되는지 검증한다.
- 전체 `pnpm check`, `pnpm lint`, `pnpm build`를 실행한다.
- 브라우저 검증에서 네 기준 viewport와 `/`, `/about-us`, `/our-work` 응답을 확인한다.
- 프로덕션 배포는 구현 결과를 사용자에게 보여주고 별도 승인을 받은 뒤 실행한다.

## 제외 범위

- Home, About Us, Our Work의 최종 리뉴얼 디자인과 구현
- 새로운 일러스트, 카운트다운, 상태 페이지 또는 CMS
- Figma 최종안 변경
- 검색 인덱스 제거
- Preview URL 또는 Cloudflare Access 설정 변경
- Linear DSN-15, DSN-16의 상태나 관계 변경

## 완료 조건

- 공개 경로에서 기존 팀과 프로젝트 콘텐츠가 보이지 않는다.
- 안내 문구와 문의 링크가 모바일과 데스크톱에서 정상적으로 제공된다.
- 프로젝트 검사, lint, 프로덕션 빌드와 브라우저 검증이 통과한다.
- 변경이 최종 리뉴얼 코드와 섞이지 않고 독립적으로 제거 가능하다.
- 배포 후 `byulmaru.co`에서 임시 화면과 리다이렉트를 직접 확인한다.
