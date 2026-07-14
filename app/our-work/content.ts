export type OurWorkTabId = 'overview' | 'mvp' | 'journey' | 'architecture' | 'data';

export const OUR_WORK_TABS = [
  { id: 'overview', label: 'Overview', desc: '페디버스 소개' },
  { id: 'mvp', label: 'MVP Scope', desc: '제품 범위' },
  { id: 'journey', label: 'User Journey', desc: '사용 흐름' },
  { id: 'architecture', label: 'Architecture', desc: '기술 구조' },
  { id: 'data', label: 'Data & Ops', desc: '스키마·운영' },
] as const satisfies readonly {
  id: OurWorkTabId;
  label: string;
  desc: string;
}[];

type CompareResult = { yes: string } | { no: string };

type CompareCell = string | CompareResult;

type FediverseCompareRow = readonly [
  label: string,
  twitter: CompareCell,
  fediverse: CompareCell,
  ours: CompareCell,
];

export const OVERVIEW_HERO_CHIPS = [
  'ActivityPub',
  'Fediverse',
  '단문형 SNS',
  '동인 커뮤니티',
  '협동조합 운영',
] as const;

export const FEDIVERSE_COMPARE = [
  [
    '신규 사용자 진입',
    '앱 설치 후 바로 가입',
    { no: '서버 선택부터 설명 필요' },
    { yes: '트위터처럼 바로 가입' },
  ],
  [
    '서버 운영 주체',
    'X Corp. 단독',
    '누구나 (개인·단체·기업)',
    { yes: '별마루동인협동조합(가칭)' },
  ],
  [
    '타 서버 팔로우',
    { no: '불가' },
    { yes: '가능 (ActivityPub)' },
    { yes: '가능 (ActivityPub + AT Protocol(예정))' },
  ],
  ['광고 정책', '무제한 광고', '서버마다 다름', { yes: '커뮤니티 자체 광고 중심' }],
  ['소프트웨어', '비공개', '대부분 오픈소스', { yes: '자체 개발 (신규)' }],
  ['데이터 이동권', { no: '제한적' }, { yes: '표준 지원' }, { yes: '지원 예정' }],
] as const satisfies readonly FediverseCompareRow[];

export const OVERVIEW_REASONS = [
  {
    num: '02',
    title: '동인 커뮤니티에 특화된 기능이 필요해요',
    body: '장르·커플링 기반 검색, 창작물 공개 범위 세밀 제어, AI 학습 방지 정책 등 96명의 사용자 조사에서 나온 요구사항들이 기성 소프트웨어엔 없거나 수정하기 매우 어렵습니다.',
  },
  {
    num: '03',
    title: '마스토돈의 UI/UX 한계를 넘어야 해요',
    body: '"마스토돈 모양이 너무 구려요", "미스키 같이 이쁜 거면 좋겠어요" — 접근성 문제는 디자인에서도 이어집니다. 익숙하고 세련된 UI는 일반 사용자 유입의 전제 조건이에요.',
  },
  {
    num: '04',
    title: '협동조합 운영 원칙을 코드로 구현해야 해요',
    body: '수익 구조, 광고 정책, 모더레이션 기준을 투명하게 운영하는 협동조합의 원칙을 서비스 설계 단계부터 반영하려면 직접 제어할 수 있는 코드베이스가 필요합니다.',
  },
  {
    num: '05',
    title: '페디버스 생태계와 연결은 유지해야 해요',
    body: 'ActivityPub을 구현해 마스토돈·미스키 사용자와 교류하면서, 동시에 우리만의 독자적인 기능을 쌓아가는 전략입니다. 기존 연합우주 커뮤니티와 단절 없이 시작합니다.',
  },
] as const satisfies readonly { num: string; title: string; body: string }[];

export const OVERVIEW_BUILD_FEATURES = [
  {
    icon: '🔗',
    title: 'ActivityPub 서버',
    body: '페디버스 표준 프로토콜 구현. 마스토돈·미스키 등 다른 서버와 팔로우·게시물 연동이 가능한 백엔드 서버를 구축합니다.',
  },
  {
    icon: '🔍',
    title: '동인 특화 검색',
    body: '장르명, 캐릭터명, 커플링 태그 기반 검색. 현재 마스토돈에서 가장 많이 지적되는 약점을 핵심 기능으로 해결합니다.',
  },
  {
    icon: '🔒',
    title: '세밀한 공개 범위',
    body: '게시물별 공개 대상 제어, 프로텍트 계정, CW(콘텐츠 경고) 등 사용자가 원하는 사람에게만 보여줄 수 있는 권한 시스템.',
  },
  {
    icon: '✨',
    title: '커스텀 이모지 리액션 & 테마',
    body: '서버 고유의 커스텀 이모지로 반응하는 기능. 미스키에서 온 사용자들이 가장 많이 요청한 기능으로, 커뮤니티 문화를 만드는 핵심입니다. 커스텀 테마 기능도 함께 제공해 서버만의 개성을 표현할 수 있습니다.',
  },
  {
    icon: '🛡️',
    title: 'AI 학습 방지 정책',
    body: '창작물에 대한 AI 무단 학습을 차단하는 기술적·정책적 장치. 창작자들이 안심하고 작품을 올릴 수 있는 환경을 만듭니다.',
  },
  {
    icon: '💬',
    title: '커뮤니티 광고 시스템',
    body: '일반 광고 대신, 최애 캐릭터 생일·동인 행사 부스 홍보 등 커뮤니티 자체 광고를 운영자가 검토 후 노출하는 수익 모델.',
  },
] as const satisfies readonly { icon: string; title: string; body: string }[];

export const OVERVIEW_STACK_ITEMS = [
  {
    label: '핵심 프로토콜',
    detail: [
      { text: 'ActivityPub (W3C 표준)', bold: true },
      {
        text: ' — Actor 모델 기반의 분산 메시징. WebFinger로 사용자 검색, HTTP Signatures로 요청 인증, Inbox/Outbox 구조로 서버 간 Activity 전달.',
      },
    ],
  },
  {
    label: '기존 레퍼런스',
    detail: [
      { text: '마스토돈', bold: true },
      { text: ' (Ruby on Rails · 안정적, 클라이언트 생태계 풍부), ' },
      { text: '미스키/체리픽', bold: true },
      { text: ' (Node.js · 커모지 리액션, 풍부한 UI), ' },
      { text: 'Misskey, Hubzilla', bold: true },
      { text: ' 등. 오픈소스라 코드 참고 가능.' },
    ],
  },
  {
    label: '주요 구현 과제',
    detail: [
      { text: '분산 팔로우 그래프', bold: true },
      { text: ' 관리, ' },
      { text: '원격 Activity 수신·발송', bold: true },
      { text: ' 큐 처리, ' },
      { text: 'Webfinger / NodeInfo', bold: true },
      { text: ' 엔드포인트 구현, 연합 미지원 기능(커스텀 이모지 리액션 등)의 하위 호환 처리.' },
    ],
  },
  {
    label: '우리만의 추가 개발',
    detail: [
      { text: '동인 특화 ' },
      { text: '태그 기반 검색 인덱싱', bold: true },
      {
        text: ', AI 크롤러 차단 미들웨어, 커뮤니티 광고 심사 시스템, 데이터 이관(Export/Import) 표준 지원.',
      },
    ],
  },
] as const satisfies readonly {
  label: string;
  detail: readonly { text: string; bold?: boolean }[];
}[];

export const OVERVIEW_SURVEY_STATS = [
  ['총 응답자', '96명'],
  ['현 플래닛 주 계정 사용', '24명 (25%)'],
  ['한때 사용, 현재 이탈', '28명 (29%)'],
  ['미경험 / 모름', '28명 (29%)'],
  ['창작자 (오리지널/2차)', '48명 (50%)'],
  ['20대 후반 + 30대 초반', '77명 (80%)'],
] as const satisfies readonly (readonly [label: string, value: string])[];

export const OVERVIEW_PAIN_POINTS = [
  {
    tag: '검색',
    cls: 'tag-p',
    pain: '마스토돈 계열의 검색 기능이 극도로 취약함. 해시태그 검색 외에는 사실상 불가. 창작물 노출과 새로운 사람 발견이 어렵다.',
    need: '자신의 창작물이 같은 취향의 사람에게 발견되길 원함. 동인 정보(트레틀, TRPG 세팅 등)도 쉽게 검색 가능해야 함.',
    ref: '복수 원문 언급, future_sns 클러스터 최다 언급',
  },
  {
    tag: 'UI/UX',
    cls: 'tag-p',
    pain: '마스토돈 기본 UI가 시각적으로 구식이고 가시성이 낮다. 미스키 대비 레이아웃 품질이 떨어짐.',
    need: '쓰기 편하고 보기 좋은 디자인. 첫 인상에서 신뢰감과 감각을 동시에 전달받고 싶음.',
    ref: '"마스토돈 모양이 너무 구려요" 등 다수 원문',
  },
  {
    tag: '안전성',
    cls: 'tag-p',
    pain: '사이버 불링, 조리돌림, 성인/AI 광고, 인용 기능을 통한 공론화 피해에 무방비 상태.',
    need: '보고 싶지 않은 것을 보지 않을 권리와 보이고 싶지 않은 것을 숨길 권리를 동시에 보장받고 싶음.',
    ref: '안전 클러스터 21명, "인용 기능 개발 안 하기(제발)" 등',
  },
  {
    tag: '지속성',
    cls: 'tag-p',
    pain: '연합우주 서버가 언제 문을 닫을지 모른다는 불안. 데이터 이관 수단 부재. 서버 불안정으로 인한 접속 장애.',
    need: '플랫폼이 갑자기 사라지지 않을 것이라는 신뢰. 계정과 게시물이 영구 보존되길 원함.',
    ref: '플랫폼 지속성 클러스터 15명',
  },
  {
    tag: '이모지/반응',
    cls: 'tag-p',
    pain: '마스토돈은 커스텀 이모지 리액션 기능이 없어 미스키 대비 교류의 풍부함이 떨어짐. 플래닛 이탈의 주 원인.',
    need: '글보다 가벼운 감정 표현 수단(리액션)으로 소통하고 싶음. 커스텀 커모지가 공동체 정체성을 만드는 수단.',
    ref: '이탈 이유 최다 언급 항목',
  },
  {
    tag: '유입/인구',
    cls: 'tag-p',
    pain: '"아무리 좋아도 지인이 안 오면 의미 없다." 트위터에 남아 있는 지인을 데려올 방법이 없음.',
    need: '기존 관계망(트친)을 끊기지 않고 이동하고 싶음. 익숙한 관계에서 시작하는 새 SNS.',
    ref: '기타 자유 의견, 사용자 유입 클러스터',
  },
  {
    tag: '프라이버시',
    cls: 'tag-n',
    pain: '공개·비공개 계정 설정의 세밀한 제어가 필요하지만 현재 불완전하게 구현됨.',
    need: '원하는 사람에게만 창작물을 공개하는 세밀한 공개 범위 제어권.',
    ref: '"프로텍트 기능이 정말 중요해요" 다수 언급',
  },
  {
    tag: 'AI',
    cls: 'tag-n',
    pain: '창작물이 AI 학습에 무단 사용될지 모른다는 공포. 트위터X가 AI 기능을 강제 추가한 것에 대한 분노가 이탈의 트리거였음.',
    need: '내 창작물을 AI로부터 보호받고 싶음. 안심하고 창작물을 올릴 수 있는 공간.',
    ref: '"ai 학습을 방지하고 창작자에게 안심이 되는 공간" 등',
  },
  {
    tag: '수익모델',
    cls: 'tag-o',
    pain: '일반 광고(구글 광고)는 성인광고 등 이상한 내용이 뜰 가능성 때문에 공공장소 이용이 불편. AI 생성물 광고에도 거부감.',
    need: '광고가 있더라도 콘텐츠의 신뢰성과 맥락에 맞는 광고만 수용 가능. 직접 신청·검토한 커뮤니티 자체 광고는 환영.',
    ref: 'SNS 자체 광고 납득 83명(86%) vs 일반 광고 64명(67%)',
  },
] as const satisfies readonly {
  tag: string;
  cls: string;
  pain: string;
  need: string;
  ref: string;
}[];

type LabelBody = readonly [label: string, body: string];

type NameDetail = readonly [name: string, detail: string];

type Journey = readonly [code: string, title: string, body: string];

export const mvpKicks = [
  {
    title: '1계정 다프로필',
    body: '한 로그인으로 장르·커플링·비계 등 프로필을 여러 개 운영. 게시·팔로우·테마·공개 범위가 활성 프로필 기준으로 동작.',
    tags: ['Must', 'Profile'],
  },
  {
    title: '프로필 태그 라벨링/탐색',
    body: '#그림계 #티알계 #장르명 등 태그를 프로필 자체에 부여. 태그+검색어로 사용자 검색, 보고 싶지 않은 태그는 뮤트.',
    tags: ['Must', 'Discovery'],
  },
  {
    title: 'AT Protocol Relay 수신',
    body: 'Bluesky 계정 연결 없이 Relay/AppView에서 활동을 수신·캐시. ActivityPub 피드와 통합 표시.',
    tags: ['Must', 'AT Protocol'],
  },
  {
    title: '프로필별 테마 꾸미기',
    body: '프로필마다 프리셋·포인트 컬러·배너를 다르게 설정. 공개 프로필 화면에 테마가 반영.',
    tags: ['Must', 'Theme'],
  },
] as const satisfies readonly {
  title: string;
  body: string;
  tags: readonly string[];
}[];

export const scopeGroups = [
  [
    '인증',
    'OIDC SSoT. 세션·애플리케이션·활성 프로필 관리만 담당. 비밀번호·이메일 복구는 별마루 OIDC 위임.',
  ],
  [
    '게시물',
    'Note 작성·조회·삭제, CW, 공개범위, 해시태그·멘션 파싱 → Must. 수정·이미지 첨부·리트윗 → Should.',
  ],
  ['소셜 그래프', '팔로우·언팔로우·승인제 팔로우, 차단, 뮤트, 프로필 태그 기반 추천/뮤트 → Must.'],
  [
    '타임라인',
    "홈·프로필·프로필 태그 탐색·AT Protocol 통합 피드·스레드 → Must. 로컬 타임라인 → Won't.",
  ],
  [
    '연합',
    'WebFinger, NodeInfo, Actor/Inbox/Outbox, HTTP Signatures, Create/Delete/Follow/Accept/Reject/Undo/Like/Block/Flag → Must.',
  ],
  ['모더레이션', '신고 큐, Suspend/Warn, 인스턴스 정책 → Must. 관리자 대시보드 → Should.'],
] as const satisfies readonly LabelBody[];

export const outOfScope = [
  '자체 비밀번호·2FA·이메일 인증 → 별마루 OIDC 위임',
  '폴 / 예약 게시 / 동영상 / DM 암호화',
  '로컬 타임라인',
  'ActivityPub ↔ AT Protocol 완전 양방향 브리지',
  'Bluesky 계정 OAuth/App Password 연결',
  '개인 레벨 도메인 차단',
  '전문(본문) 검색 (ES/Meilisearch)',
  '고급 추천 알고리즘',
  '유료 구독 / 광고',
] as const satisfies readonly string[];

export const journeys = [
  [
    'S1',
    '첫 가입',
    'OIDC 로그인 후 첫 프로필을 만들고, 태그·태그 뮤트·테마·선택적 AT handle을 설정한 뒤 태그 기반 탐색 피드로 진입합니다.',
  ],
  [
    'S2',
    '첫 게시물',
    '본문·이미지·CW·공개범위를 입력하면 DB commit과 큐 enqueue 후 즉시 응답하고, Delivery Worker가 Fediverse로 비동기 발신합니다.',
  ],
  [
    'S3',
    '외부 팔로우 수신',
    'Mastodon 사용자가 @nana@kos.moe를 팔로우하면 WebFinger와 Actor 조회 후 팔로우 승인 정책에 따라 Accept 또는 Pending 알림으로 처리합니다.',
  ],
  [
    'S4',
    '멀티 프로필 전환',
    '한 계정 안에서 새 프로필을 추가하고 active_profile_id를 바꾸면 작성·팔로우·좋아요·타임라인 기준이 선택 프로필로 전환됩니다.',
  ],
  [
    'S5-1',
    '프로필 태그 탐색/뮤트',
    '포함 태그와 제외 태그를 조합해 사람을 찾고, 뮤트한 태그가 붙은 계정과 글은 홈과 탐색에서 기본적으로 숨깁니다.',
  ],
  [
    'S5-2',
    'AT Protocol 통합 피드',
    'Bluesky handle/DID를 resolve하고 actor/record를 캐시한 뒤 ActivityPub 원격 글과 같은 피드 모델로 merge-sort합니다.',
  ],
] as const satisfies readonly Journey[];

export const architectureDomainServices = [
  'Auth',
  'Profile',
  'ProfileTag',
  'Theme',
  'Post',
  'Feed',
  'Social',
  'Moderation',
  'AT Protocol',
] as const satisfies readonly string[];

export const architectureWorkers = [
  ['Delivery', 'outbound Activities'],
  ['Inbox', 'inbound ActivityPub'],
  ['AT Protocol Relay', 'relay/appview ingest'],
  ['Media', 'thumb · blurhash'],
  ['Notification', 'APNs · FCM'],
] as const satisfies readonly NameDetail[];

export const architectureExternals = [
  ['Fediverse', 'ActivityPub S2S'],
  ['AT Protocol Network', 'Relay / AppView'],
  ['Byulmaru OIDC', 'token exchange'],
  ['OCI Object Storage', 'media'],
] as const satisfies readonly NameDetail[];

export const outboundPipeline = [
  'Client → POST /graphql createPost()',
  'PostService → INSERT post + post_content (트랜잭션)',
  'DomainEventBus emit("post.created")',
  'BullMQ add("delivery", {activity, audience})',
  'Delivery Worker → Fedify build Create(Note) + RSA sign',
  'POST to external shared inbox (같은 도메인 팔로워는 1회)',
  '실패 → exp-backoff 재시도 → 5회 후 DLQ',
] as const satisfies readonly string[];

export const inboundPipeline = [
  'External instance → POST /inbox (signed)',
  'Fedify: HTTP Signature 동기 검증',
  '검증 실패 → 401',
  '검증 성공 → BullMQ add("inbox", raw activity)',
  '202 Accepted 즉시 응답',
  'Inbox Worker → upsert remote actor',
  'Worker → 활동 유형별 처리 (Create/Follow/Like…)',
  'Redis ZADD 타임라인 캐시 갱신',
] as const satisfies readonly string[];

export const cicdSteps = [
  ['PR', 'GitHub Actions'],
  ['Actions', 'lint → test → docker buildx → push to GHCR'],
  ['image.tag bump', 'values.yaml auto-bump PR'],
  ['main merge', 'Argo CD auto-sync → kosmo-dev'],
  ['release tag', 'Argo CD sync → kosmo-prod (Blue/Green)'],
] as const satisfies readonly NameDetail[];

export const schemaRelations = [
  ['account', 'ACCT0…'],
  ['profile', 'PRFL0…'],
  ['post', 'POST0…'],
  ['post_content', 'POCT0…'],
] as const satisfies readonly NameDetail[];

export const dataPrinciples = [
  [
    'PK 포맷',
    'ACCT0, PRFL0, POST0처럼 prefix + 0 + ULID. 로그·운영에서 테이블 종류를 ID만으로 식별 가능.',
  ],
  [
    '별도 PK',
    'OIDC subject, handle, email 같은 비즈니스 식별자를 PK로 쓰지 않음. 모든 테이블에 내부 id 별도 보유.',
  ],
  [
    'Enum 우선',
    'boolean 대신 account_state, session_state, post_visibility, follow_state 같은 enum으로 상태 확장성 확보.',
  ],
  [
    '기본값 최소화',
    'DEFAULT now() 같은 DB 기본값 최소화. 초기값은 ORM/애플리케이션 레이어에서 명시.',
  ],
  ['초기 스키마 범위', '계정 → 프로필 → 게시물 → 팔로우의 가장 작은 뼈대만 먼저 확정.'],
  [
    '후속 마이그레이션',
    '프로필 태그·테마·AT Protocol 캐시·미디어·알림·신고·차단/뮤트는 UX·정책 확정 후 추가.',
  ],
] as const satisfies readonly LabelBody[];

export const launchMetrics = [
  ['홈/프로필 태그 탐색 API p95', '< 300ms'],
  ['게시물 작성 → 외부 인스턴스 도달 p95', '< 30초'],
  ['AT Protocol ingest job 성공률', '≥ 95%'],
  ['/inbox 5xx rate', '< 0.5%'],
  ['내부 테스터 2개 이상 프로필 생성', '≥ 60%'],
  ['프로필 태그 3개 이상 추가', '≥ 70%'],
  ['프로필 태그 검색 → 팔로우/프로필 방문', '≥ 40%'],
  ['프로필 테마 기본값 변경', '≥ 50%'],
  ['AT Protocol 통합 피드 1회 이상 조회', '≥ 30%'],
  ['외부 인스턴스 연합 E2E', '2곳 이상'],
  ['첫 달 DAU', '≥ 30'],
] as const satisfies readonly LabelBody[];

export const dbTables = [
  {
    name: 'account',
    pk: 'ACCT0…',
    cols: ['oidc_subject', 'display_name', 'state'],
    note: '로그인 단위. OIDC subject만 보유. 비밀번호 저장 ✗',
  },
  {
    name: 'application',
    pk: 'APPL0…',
    cols: ['name'],
    note: '공식 Expo 앱 1개. 서드파티는 v1.x',
  },
  {
    name: 'application_secret',
    pk: 'APSC0…',
    cols: ['application_id', 'secret_hash', 'revoked_at'],
    note: '원문 미저장, hash만. 교체·폐기 지원',
  },
  {
    name: 'session',
    pk: 'SESS0…',
    cols: [
      'account_id',
      'application_id',
      'active_profile_id',
      'oidc_session_key',
      'token_hash',
      'expires_at',
    ],
    note: '프로필 전환 = active_profile_id 변경',
  },
  {
    name: 'profile',
    pk: 'PRFL0…',
    cols: ['handle', 'display_name', 'bio', 'avatar_url', 'banner_url', 'follow_policy'],
    note: '사회적 자아 단위. account_profile N:N으로 계정과 연결',
  },
  {
    name: 'account_profile',
    pk: 'ACPR0…',
    cols: ['account_id', 'profile_id', 'role'],
    note: '계정-프로필 N:N 연결. MVP에서는 role=OWNER만 사용',
  },
  {
    name: 'post',
    pk: 'POST0…',
    cols: ['profile_id', 'visibility', 'state', 'current_content_id'],
    note: '메타데이터. 본문은 post_content로 분리',
  },
  {
    name: 'post_content',
    pk: 'POCT0…',
    cols: ['post_id', 'body_text', 'body_html', 'spoiler_text', 'revision_number'],
    note: '수정 시 덮어쓰기 대신 새 버전 추가',
  },
  {
    name: 'profile_follow',
    pk: 'PFLW0…',
    cols: ['follower_profile_id', 'followee_profile_id', 'state'],
    note: 'PENDING / ACCEPTED / REJECTED. 홈 타임라인 기반',
  },
] as const satisfies readonly {
  name: string;
  pk: string;
  cols: readonly string[];
  note: string;
}[];
