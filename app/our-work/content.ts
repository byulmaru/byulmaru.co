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
