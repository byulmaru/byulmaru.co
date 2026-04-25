<script>
  import Divider from '$lib/components/Divider.svelte';

  let activeTab = $state('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', desc: '페디버스 소개' },
    { id: 'mvp', label: 'MVP Scope', desc: '제품 범위' },
    { id: 'journey', label: 'User Journey', desc: '사용 흐름' },
    { id: 'architecture', label: 'Architecture', desc: '기술 구조' },
    { id: 'data', label: 'Data & Ops', desc: '스키마·운영' },
  ];

  const fediverseCompare = [
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
  ];

  const mvpKicks = [
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
  ];

  const scopeGroups = [
    [
      '인증',
      'OIDC SSoT. 세션·애플리케이션·활성 프로필 관리만 담당. 비밀번호·이메일 복구는 별마루 OIDC 위임.',
    ],
    [
      '게시물',
      'Note 작성·조회·삭제, CW, 공개범위, 해시태그·멘션 파싱 → Must. 수정·이미지 첨부·리트윗 → Should.',
    ],
    [
      '소셜 그래프',
      '팔로우·언팔로우·승인제 팔로우, 차단, 뮤트, 프로필 태그 기반 추천/뮤트 → Must.',
    ],
    [
      '타임라인',
      "홈·프로필·프로필 태그 탐색·AT Protocol 통합 피드·스레드 → Must. 로컬 타임라인 → Won't.",
    ],
    [
      '연합',
      'WebFinger, NodeInfo, Actor/Inbox/Outbox, HTTP Signatures, Create/Delete/Follow/Accept/Reject/Undo/Like/Block/Flag → Must.',
    ],
    ['모더레이션', '신고 큐, Suspend/Warn, 인스턴스 정책 → Must. 관리자 대시보드 → Should.'],
  ];

  const outOfScope = [
    '자체 비밀번호·2FA·이메일 인증 → 별마루 OIDC 위임',
    '폴 / 예약 게시 / 동영상 / DM 암호화',
    '로컬 타임라인',
    'ActivityPub ↔ AT Protocol 완전 양방향 브리지',
    'Bluesky 계정 OAuth/App Password 연결',
    '개인 레벨 도메인 차단',
    '전문(본문) 검색 (ES/Meilisearch)',
    '고급 추천 알고리즘',
    '유료 구독 / 광고',
  ];

  const journeys = [
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
  ];

  const dataPrinciples = [
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
  ];

  const launchMetrics = [
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
  ];

  const dbTables = [
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
      cols: ['account_id', 'application_id', 'active_profile_id', 'oidc_session_key', 'token_hash', 'expires_at'],
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
  ];

  $effect(() => {
    if (activeTab !== 'overview') return;
    const container = document.getElementById('stars');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 120; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const size = Math.random() * 2.2 + 0.5;
      s.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        --d:${(Math.random() * 4 + 2).toFixed(1)}s;
        --delay:-${(Math.random() * 6).toFixed(1)}s;
        --op:${(Math.random() * 0.5 + 0.3).toFixed(2)};
      `;
      container.appendChild(s);
    }
  });
</script>

<svelte:head>
  <title>Our Work — 별마루</title>
</svelte:head>

<div class="our-work-page">
  <!-- ── TAB BAR (항상 상단) ──────────────────────────── -->
  <section class="tab-shell" aria-label="Our Work categories">
    <div class="container">
      <div class="tab-list" role="tablist" aria-label="Our Work categories">
        {#each tabs as tab (tab.id)}
          <button
            class:active={activeTab === tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={'panel-' + tab.id}
            onclick={() => (activeTab = tab.id)}
          >
            <span class="tab-label">{tab.label}</span>
            <span class="tab-desc">{tab.desc}</span>
          </button>
        {/each}
      </div>
    </div>
  </section>

  {#if activeTab === 'overview'}
    <!-- ── HERO (Overview에만 표시) ────────────────────── -->
    <div class="hero">
      <div class="stars" id="stars"></div>
      <div class="hero-inner">
        <span class="hero-tag">For Developers · Project Introduction</span>
        <h1 class="hero-title">
          트위터를 대체할<br />
          <em>우리만의 SNS</em>를 만듭니다
        </h1>
        <p class="hero-desc">
          마스토돈 인스턴스로 시작한 동인 커뮤니티 플랫폼을,<br />
          ActivityPub 기반의 자체 SNS 서비스로 재개발합니다.<br />
          이 페이지는 페디버스를 처음 접하는 개발자를 위해 작성했어요.
        </p>
        <div class="hero-chips">
          {#each ['ActivityPub', 'Fediverse', '단문형 SNS', '동인 커뮤니티', '협동조합 운영'] as chip (chip)}
            <span class="chip">{chip}</span>
          {/each}
        </div>
      </div>
    </div>

    <Divider />

    <!-- ── 01 · 페디버스가 뭔가요? ──────────────────────── -->
    <section class="ow-section tab-panel" id="panel-overview">
      <div class="container">
        <p class="sec-label">01 · Background</p>
        <h2 class="sec-title">페디버스가 뭔가요?</h2>
        <p class="sec-lead">
          개발을 시작하기 전에, 우리가 다루는 생태계를 이해하는 게 먼저예요. 생소한 개념이지만
          비유로 설명하면 금방 이해할 수 있어요.
        </p>

        <div class="analogy-box">
          <span class="analogy-tag">비유로 이해하기</span>
          <p class="analogy-p">
            <strong>이메일을 떠올려보세요.</strong> Gmail 사용자가 Naver 메일 사용자에게 이메일을 보낼
            수 있죠? 서로 다른 회사의 서비스인데도, SMTP라는 공통 프로토콜 덕분에 가능합니다.
          </p>
          <p class="analogy-p">
            페디버스(Fediverse)는 SNS 버전의 이메일 생태계입니다.
            <strong>ActivityPub</strong>이라는 공통 프로토콜로 연결된 분산 SNS 네트워크예요. 서로
            다른 서버에서 운영되지만, 마치 하나의 SNS처럼 팔로우·리포스트·댓글이 모두 가능합니다.
          </p>
          <p class="analogy-p" style="margin-bottom:0">
            트위터 계정으로 인스타그램 유저를 팔로우할 수 없지만,
            <strong>페디버스에서는 서버가 달라도 서로 팔로우할 수 있습니다.</strong>
          </p>
        </div>

        <div class="diagram">
          <div class="server-node highlight">
            <div class="node-name">우리 서버</div>
            <div class="node-desc">새로 만드는<br />SNS 서비스</div>
          </div>
          <div class="arrow-wrap">
            <div class="arrow-line"></div>
            <span class="arrow-sub">팔로우·리포스트·댓글 모두 가능</span>
          </div>
          <div class="server-node">
            <div class="node-name">마스토돈 서버</div>
            <div class="node-desc">다른 팀이<br />운영하는 서버</div>
          </div>
          <div class="arrow-wrap">
            <div class="arrow-line"></div>
            <span class="arrow-sub">같은 ActivityPub 프로토콜</span>
          </div>
          <div class="server-node">
            <div class="node-name">미스키 서버</div>
            <div class="node-desc">또 다른<br />독립 서버</div>
          </div>
        </div>
        <p class="diagram-caption">
          서버가 달라도 ActivityPub으로 연결되어 하나의 네트워크처럼 작동합니다
        </p>

        <div class="table-wrap">
          <table class="compare-table">
            <thead>
              <tr>
                <th>기능</th>
                <th>트위터(X)</th>
                <th>페디버스 (마스토돈 등)</th>
                <th>우리가 만드는 것</th>
              </tr>
            </thead>
            <tbody>
              {#each fediverseCompare as row (row[0])}
                <tr>
                  <td class="row-label">{row[0]}</td>
                  {#each [row[1], row[2], row[3]] as cell (cell)}
                    {#if typeof cell === 'object' && cell !== null && 'yes' in cell}
                      <td class="yes">{cell.yes}</td>
                    {:else if typeof cell === 'object' && cell !== null && 'no' in cell}
                      <td class="no">{cell.no}</td>
                    {:else}
                      <td>{cell}</td>
                    {/if}
                  {/each}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ── 02 · Why We Build ────────────────────────────── -->
    <section class="ow-section">
      <div class="container">
        <p class="sec-label">02 · Why We Build</p>
        <h2 class="sec-title">왜 기존 소프트웨어를 쓰지 않고 직접 만드나요?</h2>
        <p class="sec-lead">
          마스토돈, 미스키 같은 훌륭한 오픈소스 소프트웨어가 이미 있어요. 그럼에도 직접 만들기로 한 <strong
            >핵심 이유는 하나</strong
          >입니다 — 분산형 SNS는 일반 사용자가 쓰기에 너무 어렵습니다.
        </p>

        <div class="main-reason-box">
          <p class="main-reason-label">Main Reason</p>
          <p class="main-reason-headline">
            "어느 서버에 가입해야 하지?"<br />
            분산형 SNS의 첫 번째 질문부터 일반인을 막습니다.
          </p>
          <p class="main-reason-body">
            마스토돈·미스키는 개념 자체가 일반 사용자에게 낯설어요.
            <strong>서버 선택, 연합 개념 이해, 서버별 규칙 파악</strong> — 가입 전부터 설명이 필요한
            것들이 너무 많습니다. 트위터 이탈자들이 연합우주로 오지 않는 이유 중 하나도 이 진입
            장벽이에요. 우리는
            <strong
              >페디버스의 기술적 이점은 유지하면서, 일반인이 트위터처럼 바로 쓸 수 있는 서비스</strong
            >를 만들려 합니다. 그리고 그건 기성 소프트웨어를 그대로 설치하는 방식으로는 달성하기
            어렵습니다.
          </p>
        </div>

        <p class="etc-label">그 외 이유들</p>
        <div class="reason-grid">
          {#each [{ num: '02', title: '동인 커뮤니티에 특화된 기능이 필요해요', body: '장르·커플링 기반 검색, 창작물 공개 범위 세밀 제어, AI 학습 방지 정책 등 96명의 사용자 조사에서 나온 요구사항들이 기성 소프트웨어엔 없거나 수정하기 매우 어렵습니다.' }, { num: '03', title: '마스토돈의 UI/UX 한계를 넘어야 해요', body: '"마스토돈 모양이 너무 구려요", "미스키 같이 이쁜 거면 좋겠어요" — 접근성 문제는 디자인에서도 이어집니다. 익숙하고 세련된 UI는 일반 사용자 유입의 전제 조건이에요.' }, { num: '04', title: '협동조합 운영 원칙을 코드로 구현해야 해요', body: '수익 구조, 광고 정책, 모더레이션 기준을 투명하게 운영하는 협동조합의 원칙을 서비스 설계 단계부터 반영하려면 직접 제어할 수 있는 코드베이스가 필요합니다.' }, { num: '05', title: '페디버스 생태계와 연결은 유지해야 해요', body: 'ActivityPub을 구현해 마스토돈·미스키 사용자와 교류하면서, 동시에 우리만의 독자적인 기능을 쌓아가는 전략입니다. 기존 연합우주 커뮤니티와 단절 없이 시작합니다.' }] as r (r.num)}
            <div class="reason-card">
              <p class="reason-num">{r.num}</p>
              <p class="reason-title">{r.title}</p>
              <p class="reason-body">{r.body}</p>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- ── 03 · What We Build ───────────────────────────── -->
    <section class="ow-section">
      <div class="container">
        <p class="sec-label">03 · What We Build</p>
        <h2 class="sec-title">무엇을 만드나요?</h2>
        <p class="sec-lead">
          ActivityPub 프로토콜을 구현한 단문형 SNS 서버와 클라이언트를 처음부터 만듭니다. 현재 생각
          중인 피쳐들은 이렇습니다.
        </p>

        <div class="build-grid">
          {#each [{ icon: '🔗', title: 'ActivityPub 서버', body: '페디버스 표준 프로토콜 구현. 마스토돈·미스키 등 다른 서버와 팔로우·게시물 연동이 가능한 백엔드 서버를 구축합니다.' }, { icon: '🔍', title: '동인 특화 검색', body: '장르명, 캐릭터명, 커플링 태그 기반 검색. 현재 마스토돈에서 가장 많이 지적되는 약점을 핵심 기능으로 해결합니다.' }, { icon: '🔒', title: '세밀한 공개 범위', body: '게시물별 공개 대상 제어, 프로텍트 계정, CW(콘텐츠 경고) 등 사용자가 원하는 사람에게만 보여줄 수 있는 권한 시스템.' }, { icon: '✨', title: '커스텀 이모지 리액션 & 테마', body: '서버 고유의 커스텀 이모지로 반응하는 기능. 미스키에서 온 사용자들이 가장 많이 요청한 기능으로, 커뮤니티 문화를 만드는 핵심입니다. 커스텀 테마 기능도 함께 제공해 서버만의 개성을 표현할 수 있습니다.' }, { icon: '🛡️', title: 'AI 학습 방지 정책', body: '창작물에 대한 AI 무단 학습을 차단하는 기술적·정책적 장치. 창작자들이 안심하고 작품을 올릴 수 있는 환경을 만듭니다.' }, { icon: '💬', title: '커뮤니티 광고 시스템', body: '일반 광고 대신, 최애 캐릭터 생일·동인 행사 부스 홍보 등 커뮤니티 자체 광고를 운영자가 검토 후 노출하는 수익 모델.' }] as f (f.title)}
            <div class="build-card">
              <div class="build-icon">{f.icon}</div>
              <p class="build-title">{f.title}</p>
              <p class="build-body">{f.body}</p>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- ── 04 · Our Users ────────────────────────────────── -->
    <section class="ow-section">
      <div class="container">
        <p class="sec-label">04 · Our Users</p>
        <h2 class="sec-title">누구를 위해 만드나요?</h2>
        <p class="sec-lead">
          96명의 기존 플랫폼 사용자 설문 데이터를 기반으로 도출한 세 개의 핵심 페르소나입니다. 개발
          우선순위 결정의 기준이 됩니다.
        </p>

        <div class="user-row">
          <div class="user-card u1">
            <div class="user-head">
              <p class="user-name">🎨 동인 창작자</p>
              <p class="user-role">일러스트레이터 · 글 작가</p>
            </div>
            <div class="user-body">
              <p>
                <strong>핵심 불만:</strong> 창작물이 팔로워에게만 보임. 검색 안 됨. AI 학습 공포.
              </p>
              <p>
                <strong>원하는 것:</strong> 같은 취향의 사람에게 발견되고 싶음. 커모지 리액션으로 소통하고
                싶음.
              </p>
              <p><strong>전체의 50%</strong>가 창작 제작 경험 있음.</p>
            </div>
          </div>
          <div class="user-card u2">
            <div class="user-head">
              <p class="user-name">📖 동인 향유자</p>
              <p class="user-role">논바이너리 포함 · 소수자 비율 높음</p>
            </div>
            <div class="user-body">
              <p>
                <strong>핵심 불만:</strong> 좋아하는 장르 창작물 찾기 어려움. 혐오 발언 노출. 서버 선택
                장벽.
              </p>
              <p>
                <strong>원하는 것:</strong> 차별 없는 안전한 공간. 나답게 있을 수 있는 커뮤니티.
              </p>
              <p>응답자의 <strong>35%</strong>가 성소수자 정체성.</p>
            </div>
          </div>
          <div class="user-card u3">
            <div class="user-head">
              <p class="user-name">🌐 연합우주 경험자</p>
              <p class="user-role">서버 운영 경험 · 현실적 판단형</p>
            </div>
            <div class="user-body">
              <p>
                <strong>핵심 불만:</strong> 서버가 갑자기 닫힐 불안. 데이터 이관 불가. 운영 투명성 부재.
              </p>
              <p>
                <strong>원하는 것:</strong> 믿을 수 있는 운영. 지속성 보장. "오래가면 돈 낼 의향도 있음."
              </p>
              <p>트위터 지인 이주가 <strong>최대 관건</strong>.</p>
            </div>
          </div>
        </div>

        <div class="callout-blue">
          <strong>가장 중요한 발견:</strong> 사용자들이 새 서비스로 오지 않는 1순위 이유는 기능
          부족이 아닙니다.
          <strong>"지인이 없기 때문"</strong>이에요. 트위터 팔로우 목록 연동, 지인 초대 시스템을
          염두에 두어야 합니다.
        </div>
      </div>
    </section>

    <!-- ── 05 · Technical Context ───────────────────────── -->
    <section class="ow-section">
      <div class="container">
        <p class="sec-label">05 · Technical Context</p>
        <h2 class="sec-title">기술적으로 어떤 도전인가요?</h2>
        <p class="sec-lead">
          ActivityPub 구현은 일반 API 서버 개발과 다른 점이 있어요. 합류 전에 알아두면 좋은 기술
          맥락을 정리했습니다.
        </p>

        <div class="stack-note">
          <strong>ActivityPub이란?</strong> W3C 표준 프로토콜로, 분산 소셜 네트워크 간의 상호운용성을
          정의해요. Actor(사용자), Object(게시물), Activity(팔로우·좋아요·게시 등의 행동)로 이루어진 JSON-LD
          기반 메시지를 서버 간에 주고받는 방식입니다. 마스토돈·미스키가 이 프로토콜을 구현해 서로 통신하고
          있어요.
        </div>

        <div class="stack-list">
          {#each [{ label: '핵심 프로토콜', detail: '<strong>ActivityPub (W3C 표준)</strong> — Actor 모델 기반의 분산 메시징. WebFinger로 사용자 검색, HTTP Signatures로 요청 인증, Inbox/Outbox 구조로 서버 간 Activity 전달.' }, { label: '기존 레퍼런스', detail: '<strong>마스토돈</strong> (Ruby on Rails · 안정적, 클라이언트 생태계 풍부), <strong>미스키/체리픽</strong> (Node.js · 커모지 리액션, 풍부한 UI), <strong>Misskey, Hubzilla</strong> 등. 오픈소스라 코드 참고 가능.' }, { label: '주요 구현 과제', detail: '<strong>분산 팔로우 그래프</strong> 관리, <strong>원격 Activity 수신·발송</strong> 큐 처리, <strong>Webfinger / NodeInfo</strong> 엔드포인트 구현, 연합 미지원 기능(커스텀 이모지 리액션 등)의 하위 호환 처리.' }, { label: '우리만의 추가 개발', detail: '동인 특화 <strong>태그 기반 검색 인덱싱</strong>, AI 크롤러 차단 미들웨어, 커뮤니티 광고 심사 시스템, 데이터 이관(Export/Import) 표준 지원.' }] as item (item.label)}
            <div class="stack-item">
              <p class="stack-label">{item.label}</p>
              <!-- eslint-disable-next-line svelte/no-at-html-tags -->
              <p class="stack-detail">{@html item.detail}</p>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <Divider />

    <div class="survey-divider">
      <div class="container">
        <p class="survey-divider-label">Research Data</p>
        <p class="survey-divider-title">사용자 조사 데이터</p>
        <p class="survey-divider-sub">
          플래닛 연합우주 사용자 총조사 · 응답자 96명 · 디자인씽킹 1.1~2단계
        </p>
      </div>
    </div>

    <!-- ── Survey 01 · Design Challenge ────────────────── -->
    <section class="ow-section">
      <div class="container">
        <p class="sec-label">Step 1.1 · Design Challenge</p>
        <h2 class="sec-title">경험 공유 및 맥락 정리</h2>
        <p class="sec-intro">
          우리가 풀고자 하는 문제가 왜 발생했는지, 사용자들은 어떤 상황에 놓여 있는지 데이터
          기반으로 공유합니다.
        </p>

        <div class="stat-row">
          {#each [['총 응답자', '96명'], ['현 플래닛 주 계정 사용', '24명 (25%)'], ['한때 사용, 현재 이탈', '28명 (29%)'], ['미경험 / 모름', '28명 (29%)'], ['창작자 (오리지널/2차)', '48명 (50%)'], ['20대 후반 + 30대 초반', '77명 (80%)']] as [label, val] (label)}
            <span class="stat-chip"><strong>{val}</strong> {label}</span>
          {/each}
        </div>

        <div class="callout-yellow">
          <strong>핵심 맥락:</strong> 응답자의 다수는 이미 트위터(X)에서 이탈 경험이 있고, 현재
          미스키(57명), 마스토돈(40명), 블루스카이(19명) 등
          <strong>여러 연합우주 서비스를 동시 병용</strong>하고 있다. 단일 서비스로 완전히 정착하지
          못한 분산 상태다.
        </div>

        <div class="insight-grid">
          <div class="insight-card">
            <p class="card-head">이탈 계기 — 트위터(X)에서 연합우주로</p>
            <p class="card-body">
              일론 머스크 인수 이후 플랫폼 신뢰도 붕괴, AI 학습 정책, 트윗덱 유료화, 극우 정치 성향
              노출이 주요 이탈 트리거다. 응답자들은 "트친들이 아직 트위터에 있어서" 이중 계정을
              유지하는 상황이다.
            </p>
          </div>
          <div class="insight-card">
            <p class="card-head">현재 플래닛 이탈 이유</p>
            <p class="card-body">
              미스키의 커스텀 이모지 리액션 기능, 더 나은 UI가 주된 이탈 이유. 서버 불안정(트래픽
              과부하), "사람이 너무 많아 중소 서버로 분산"도 주요 원인이다. 기능 부족 vs. UI/UX
              열등감이 핵심 약점이다.
            </p>
          </div>
          <div class="insight-card">
            <p class="card-head">주 사용 SNS 분포 (복수응답)</p>
            <p class="card-body">
              <strong>미스키 57명 · 마스토돈 40명 · 트위터(X) 43명 · 블루스카이 19명</strong><br />
              대부분이 2~3개 플랫폼을 병용. "동인 창작"은 X에, "일상/교류"는 연합우주에 쪼개서 사용하는
              패턴이 뚜렷하다.
            </p>
          </div>
          <div class="insight-card">
            <p class="card-head">타겟 사용자 특성</p>
            <p class="card-body">
              논바이너리 포함 성소수자 비율이 높고(논바이너리 27명), 소수자 친화 운영 정책을
              명시적으로 기대한다. 창작물 노출 대상은 "<strong>같은 취향의 사람들</strong>"이 압도적
              다수 — 불특정 대중이 아닌 취향 기반 커뮤니티 지향.
            </p>
          </div>
        </div>

        <div class="callout-blue">
          <strong>Design Challenge 정의:</strong> 동인 창작자와 향유자들이 트위터 이탈 이후에도 취향 기반
          커뮤니티를 안전하고 지속가능하게 유지할 수 있는 단문형 SNS 경험을 어떻게 설계할 것인가?
        </div>
      </div>
    </section>

    <!-- ── Survey 02 · Pain Point & Needs ───────────────── -->
    <section class="ow-section" style="border-bottom:none">
      <div class="container">
        <p class="sec-label">Step 1.2 · Pain Point &amp; Needs</p>
        <h2 class="sec-title">핵심 불편함과 욕구</h2>
        <p class="sec-intro">조사 데이터에서 도출된 핵심 불편점과 그 이면의 욕구를 구조화합니다.</p>

        <div class="table-wrap">
          <table class="pain-table">
            <thead>
              <tr>
                <th style="width:90px">영역</th>
                <th>Pain Point (불편함)</th>
                <th>근본 Needs (욕구)</th>
                <th style="width:130px">응답 근거</th>
              </tr>
            </thead>
            <tbody>
              {#each [{ tag: '검색', cls: 'tag-p', pain: '마스토돈 계열의 검색 기능이 극도로 취약함. 해시태그 검색 외에는 사실상 불가. 창작물 노출과 새로운 사람 발견이 어렵다.', need: '자신의 창작물이 같은 취향의 사람에게 발견되길 원함. 동인 정보(트레틀, TRPG 세팅 등)도 쉽게 검색 가능해야 함.', ref: '복수 원문 언급, future_sns 클러스터 최다 언급' }, { tag: 'UI/UX', cls: 'tag-p', pain: '마스토돈 기본 UI가 시각적으로 구식이고 가시성이 낮다. 미스키 대비 레이아웃 품질이 떨어짐.', need: '쓰기 편하고 보기 좋은 디자인. 첫 인상에서 신뢰감과 감각을 동시에 전달받고 싶음.', ref: '"마스토돈 모양이 너무 구려요" 등 다수 원문' }, { tag: '안전성', cls: 'tag-p', pain: '사이버 불링, 조리돌림, 성인/AI 광고, 인용 기능을 통한 공론화 피해에 무방비 상태.', need: '보고 싶지 않은 것을 보지 않을 권리와 보이고 싶지 않은 것을 숨길 권리를 동시에 보장받고 싶음.', ref: '안전 클러스터 21명, "인용 기능 개발 안 하기(제발)" 등' }, { tag: '지속성', cls: 'tag-p', pain: '연합우주 서버가 언제 문을 닫을지 모른다는 불안. 데이터 이관 수단 부재. 서버 불안정으로 인한 접속 장애.', need: '플랫폼이 갑자기 사라지지 않을 것이라는 신뢰. 계정과 게시물이 영구 보존되길 원함.', ref: '플랫폼 지속성 클러스터 15명' }, { tag: '이모지/반응', cls: 'tag-p', pain: '마스토돈은 커스텀 이모지 리액션 기능이 없어 미스키 대비 교류의 풍부함이 떨어짐. 플래닛 이탈의 주 원인.', need: '글보다 가벼운 감정 표현 수단(리액션)으로 소통하고 싶음. 커스텀 커모지가 공동체 정체성을 만드는 수단.', ref: '이탈 이유 최다 언급 항목' }, { tag: '유입/인구', cls: 'tag-p', pain: '"아무리 좋아도 지인이 안 오면 의미 없다." 트위터에 남아 있는 지인을 데려올 방법이 없음.', need: '기존 관계망(트친)을 끊기지 않고 이동하고 싶음. 익숙한 관계에서 시작하는 새 SNS.', ref: '기타 자유 의견, 사용자 유입 클러스터' }, { tag: '프라이버시', cls: 'tag-n', pain: '공개·비공개 계정 설정의 세밀한 제어가 필요하지만 현재 불완전하게 구현됨.', need: '원하는 사람에게만 창작물을 공개하는 세밀한 공개 범위 제어권.', ref: '"프로텍트 기능이 정말 중요해요" 다수 언급' }, { tag: 'AI', cls: 'tag-n', pain: '창작물이 AI 학습에 무단 사용될지 모른다는 공포. 트위터X가 AI 기능을 강제 추가한 것에 대한 분노가 이탈의 트리거였음.', need: '내 창작물을 AI로부터 보호받고 싶음. 안심하고 창작물을 올릴 수 있는 공간.', ref: '"ai 학습을 방지하고 창작자에게 안심이 되는 공간" 등' }, { tag: '수익모델', cls: 'tag-o', pain: '일반 광고(구글 광고)는 성인광고 등 이상한 내용이 뜰 가능성 때문에 공공장소 이용이 불편. AI 생성물 광고에도 거부감.', need: '광고가 있더라도 콘텐츠의 신뢰성과 맥락에 맞는 광고만 수용 가능. 직접 신청·검토한 커뮤니티 자체 광고는 환영.', ref: 'SNS 자체 광고 납득 83명(86%) vs 일반 광고 64명(67%)' }] as row (row.tag)}
                <tr>
                  <td><span class="tag {row.cls}">{row.tag}</span></td>
                  <td>{row.pain}</td>
                  <td>{row.need}</td>
                  <td class="ref-cell">{row.ref}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>

        <div class="callout-green">
          <strong>숨겨진 Needs (Latent Needs):</strong> 응답자들은 "기능"보다
          <strong>"운영자를 믿을 수 있는가"</strong>를 더 깊이 묻고 있다. 기능 요구사항 아래에는 "이
          서비스가 나를 착취하지 않을 것"이라는 신뢰의 욕구가 깔려 있다. 협동조합 형태 자체가 이
          신뢰를 만드는 구조적 자산이다.
        </div>
      </div>
    </section>
  {:else if activeTab === 'mvp'}
    <!-- ── MVP SCOPE ─────────────────────────────────────── -->
    <section class="ow-section tab-panel" id="panel-mvp">
      <div class="container">
        <p class="sec-label">kosmo-docs · MVP Scope</p>
        <h2 class="sec-title">MVP 범위</h2>

        <!-- Must 4 -->
        <p class="subsec-label">Must — 이것 때문에 사용자가 옵니다</p>
        <div class="feature-grid">
          {#each mvpKicks as item (item.title)}
            <article class="feature-card">
              <div class="feature-tags">
                {#each item.tags as tag (tag)}
                  <span>{tag}</span>
                {/each}
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          {/each}
        </div>

        <!-- Scope by area -->
        <p class="subsec-label">기능 범위 (Must 기준)</p>
        <div class="scope-grid">
          {#each scopeGroups as [title, body] (title)}
            <div class="scope-item">
              <p class="scope-title">{title}</p>
              <p>{body}</p>
            </div>
          {/each}
        </div>

        <!-- Out of scope -->
        <p class="subsec-label">Out of Scope — 이번 사이클에서 명시적으로 제외</p>
        <div class="oos-grid">
          {#each outOfScope as item (item)}
            <div class="oos-item">
              <span class="oos-x">✕</span>
              <span>{item}</span>
            </div>
          {/each}
        </div>

        <!-- Success metrics -->
        <p class="subsec-label">MVP 성공 지표</p>
        <div class="metrics-panel">
          <div class="metric-list">
            {#each launchMetrics as [label, value] (label)}
              <div class="metric-row">
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </section>
  {:else if activeTab === 'journey'}
    <!-- ── USER JOURNEY ──────────────────────────────────── -->
    <section class="ow-section tab-panel" id="panel-journey">
      <div class="container">
        <p class="sec-label">kosmo-docs · User Scenarios</p>
        <h2 class="sec-title">가입부터 연합, 탐색, 통합 피드까지의 핵심 여정</h2>
        <p class="sec-lead">
          사용자 시나리오는 트리거, 사용자 동작, 시스템 동작, 결과 상태를 기준으로 작성되어
          있습니다. 페이지에서는 개발자가 빠르게 맥락을 잡을 수 있도록 대표 흐름만 추렸습니다.
        </p>

        <div class="journey-list">
          {#each journeys as [code, title, body] (code)}
            <article class="journey-item">
              <span class="journey-code">{code}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          {/each}
        </div>

        <div class="callout-blue">
          <strong>핵심 UX 결론:</strong> 첫 가입 직후 팔로우가 없어도 비어 보이면 안 됩니다. 프로필 태그
          기반 탐색과 AT Protocol 수신 활동이 초기 피드의 빈 공간을 채우는 설계 축입니다.
        </div>
      </div>
    </section>
  {:else if activeTab === 'architecture'}
    <!-- ── ARCHITECTURE ──────────────────────────────────── -->
    <section class="ow-section tab-panel" id="panel-architecture">
      <div class="container">
        <p class="sec-label">kosmo-docs · Inner Architecture</p>
        <h2 class="sec-title">Inner Architecture</h2>

        <!-- Inner Architecture Diagram -->
        <div class="arch-diagram">
          <!-- Client -->
          <div class="arch-tier">
            <div class="arch-tier-label">Client</div>
            <div class="arch-tier-nodes">
              <div class="arch-node client">
                <span class="an-title">Expo Router</span>
                <span class="an-sub">iOS · Android · Web SSR</span>
              </div>
            </div>
          </div>

          <div class="arch-connector"><span>HTTPS</span></div>

          <!-- Edge -->
          <div class="arch-tier">
            <div class="arch-tier-label">Edge</div>
            <div class="arch-tier-nodes">
              <div class="arch-node edge">
                <span class="an-title">Nginx Ingress</span>
                <span class="an-sub">+ cert-manager</span>
              </div>
            </div>
          </div>

          <div class="arch-connector"><span></span></div>

          <!-- Transport Layer -->
          <div class="arch-tier">
            <div class="arch-tier-label">Transport (L1) — Bun + Hono</div>
            <div class="arch-tier-nodes">
              <div class="arch-node transport">
                <span class="an-title">Fedify middleware</span>
                <span class="an-sub">/.well-known · /users/* · /inbox · /outbox</span>
              </div>
              <div class="arch-node transport">
                <span class="an-title">GraphQL Yoga</span>
                <span class="an-sub">Pothos · urql · /graphql</span>
              </div>
              <div class="arch-node transport">
                <span class="an-title">Mastodon REST</span>
                <span class="an-sub">/api/v1/* compat.</span>
              </div>
            </div>
          </div>

          <div class="arch-connector"><span></span></div>

          <!-- Application Layer -->
          <div class="arch-tier">
            <div class="arch-tier-label">Application (L2) — Domain Services</div>
            <div class="arch-tier-nodes wide">
              {#each ['Auth', 'Profile', 'ProfileTag', 'Theme', 'Post', 'Feed', 'Social', 'Moderation', 'AT Protocol'] as svc (svc)}
                <div class="arch-node domain">
                  <span class="an-title">{svc}</span>
                </div>
              {/each}
            </div>
          </div>

          <div class="arch-connector"><span></span></div>

          <!-- Infrastructure -->
          <div class="arch-tier">
            <div class="arch-tier-label">Infrastructure</div>
            <div class="arch-tier-nodes">
              <div class="arch-node infra">
                <span class="an-title">PostgreSQL 16</span>
                <span class="an-sub">Drizzle ORM</span>
              </div>
              <div class="arch-node infra">
                <span class="an-title">Redis</span>
                <span class="an-sub">timeline · cache · session · rate-limit</span>
              </div>
              <div class="arch-node infra queue">
                <span class="an-title">BullMQ</span>
                <span class="an-sub">outbound · inbound · media · notifications</span>
              </div>
            </div>
          </div>

          <div class="arch-connector"><span></span></div>

          <!-- Workers -->
          <div class="arch-tier">
            <div class="arch-tier-label">Workers — kosmo-worker (Bun)</div>
            <div class="arch-tier-nodes">
              {#each [['Delivery', 'outbound Activities'], ['Inbox', 'inbound ActivityPub'], ['AT Protocol Relay', 'relay/appview ingest'], ['Media', 'thumb · blurhash'], ['Notification', 'APNs · FCM']] as [name, sub] (name)}
                <div class="arch-node worker">
                  <span class="an-title">{name}</span>
                  <span class="an-sub">{sub}</span>
                </div>
              {/each}
            </div>
          </div>

          <div class="arch-connector"><span></span></div>

          <!-- External -->
          <div class="arch-tier external-tier">
            <div class="arch-tier-label">External</div>
            <div class="arch-tier-nodes">
              {#each [['Fediverse', 'ActivityPub S2S'], ['AT Protocol Network', 'Relay / AppView'], ['Byulmaru OIDC', 'token exchange'], ['OCI Object Storage', 'media']] as [name, sub] (name)}
                <div class="arch-node external">
                  <span class="an-title">{name}</span>
                  <span class="an-sub">{sub}</span>
                </div>
              {/each}
            </div>
          </div>
        </div>

        <!-- Pipelines -->
        <p class="subsec-label" style="margin-top:32px">Request Pipelines</p>
        <div class="pipeline-grid">
          <div class="pipeline-card">
            <p class="pipeline-label">Outbound</p>
            <h3>게시물 작성 → 즉시 응답 → 비동기 발신</h3>
            <div class="pipeline-steps">
              {#each ['Client → POST /graphql createPost()', 'PostService → INSERT post + post_content (트랜잭션)', 'DomainEventBus emit("post.created")', 'BullMQ add("delivery", {activity, audience})', 'Delivery Worker → Fedify build Create(Note) + RSA sign', 'POST to external shared inbox (같은 도메인 팔로워는 1회)', '실패 → exp-backoff 재시도 → 5회 후 DLQ'] as step, i (i)}
                <div class="pipeline-step">
                  <span class="step-num">{i + 1}</span>
                  <span>{step}</span>
                </div>
              {/each}
            </div>
          </div>
          <div class="pipeline-card">
            <p class="pipeline-label">Inbound</p>
            <h3>외부 Activity 수신 → 202 즉시 응답 → 비동기 반영</h3>
            <div class="pipeline-steps">
              {#each ['External instance → POST /inbox (signed)', 'Fedify: HTTP Signature 동기 검증', '검증 실패 → 401', '검증 성공 → BullMQ add("inbox", raw activity)', '202 Accepted 즉시 응답', 'Inbox Worker → upsert remote actor', 'Worker → 활동 유형별 처리 (Create/Follow/Like…)', 'Redis ZADD 타임라인 캐시 갱신'] as step, i (i)}
                <div class="pipeline-step">
                  <span class="step-num">{i + 1}</span>
                  <span>{step}</span>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── OUTER ARCHITECTURE ────────────────────────────── -->
    <section class="ow-section" id="panel-outer-architecture">
      <div class="container">
        <p class="sec-label">kosmo-docs · Outer Architecture</p>
        <h2 class="sec-title">Outer Architecture</h2>

        <div class="outer-diagram">
          <!-- Internet Tier -->
          <div class="outer-tier">
            <div class="outer-tier-label">Internet</div>
            <div class="outer-tier-nodes">
              <div class="outer-node inet">
                <span class="an-title">User Clients</span>
                <span class="an-sub">iOS · Android · Web</span>
              </div>
              <div class="outer-node inet">
                <span class="an-title">Fediverse Peers</span>
                <span class="an-sub">mastodon.social · planet.moe …</span>
              </div>
              <div class="outer-node inet">
                <span class="an-title">AT Protocol Network</span>
                <span class="an-sub">Relay · AppView · PDS</span>
              </div>
            </div>
          </div>

          <div class="arch-connector"><span>HTTPS</span></div>

          <!-- Cloudflare -->
          <div class="outer-tier">
            <div class="outer-tier-label">Cloudflare</div>
            <div class="outer-tier-nodes">
              <div class="outer-node cf">
                <span class="an-title">DNS · CDN · WAF · Rate Limiting (L7)</span>
                <span class="an-sub">kos.moe · api.kos.moe · media.kos.moe</span>
              </div>
            </div>
          </div>

          <div class="arch-connector"><span></span></div>

          <!-- OCI OKE -->
          <div class="outer-tier oke-tier">
            <div class="outer-tier-label">OCI OKE — ap-seoul-1</div>
            <div class="oke-cluster">
              <div class="oke-ns">
                <div class="oke-ns-label">ns: kosmo-prod</div>
                <div class="oke-pods">
                  <div class="oke-pod">api<span>Blue/Green Rollout</span></div>
                  <div class="oke-pod">worker<span>BullMQ consumers</span></div>
                  <div class="oke-pod">expo-web<span>RNW SSR</span></div>
                </div>
              </div>
              <div class="oke-ns">
                <div class="oke-ns-label">ns: ops</div>
                <div class="oke-pods">
                  <div class="oke-pod">Argo CD<span>GitOps</span></div>
                  <div class="oke-pod">Infisical<span>secrets</span></div>
                  <div class="oke-pod">Grafana<span>dashboards</span></div>
                  <div class="oke-pod">Loki · Tempo<span>logs · traces</span></div>
                </div>
              </div>
            </div>
          </div>

          <div class="arch-connector"><span></span></div>

          <!-- Data Layer -->
          <div class="outer-tier">
            <div class="outer-tier-label">Data</div>
            <div class="outer-tier-nodes">
              <div class="outer-node data">
                <span class="an-title">PostgreSQL 16</span>
                <span class="an-sub">OCI Database · Primary + Read Replica</span>
              </div>
              <div class="outer-node data">
                <span class="an-title">Redis</span>
                <span class="an-sub">OCI Cache · BullMQ + timeline cache</span>
              </div>
              <div class="outer-node data">
                <span class="an-title">Object Storage</span>
                <span class="an-sub">OCI OSS + Cloudflare CDN</span>
              </div>
              <div class="outer-node oidc">
                <span class="an-title">Byulmaru OIDC</span>
                <span class="an-sub">인증 SSoT</span>
              </div>
            </div>
          </div>

          <!-- DR note -->
          <div class="outer-dr">
            <span class="dr-label">DR (AWS backup)</span>
            <span
              >PostgreSQL logical replication → RDS · Object Storage async → S3 · DNS failover via
              Route 53</span
            >
          </div>
        </div>

        <!-- CI/CD -->
        <p class="subsec-label" style="margin-top:32px">CI / CD</p>
        <div class="cicd-flow">
          {#each [['PR', 'GitHub Actions'], ['Actions', 'lint → test → docker buildx → push to GHCR'], ['image.tag bump', 'values.yaml auto-bump PR'], ['main merge', 'Argo CD auto-sync → kosmo-dev'], ['release tag', 'Argo CD sync → kosmo-prod (Blue/Green)']] as [step, desc] (step)}
            <div class="cicd-step">
              <span class="cicd-step-label">{step}</span>
              <span class="cicd-step-desc">{desc}</span>
            </div>
            {#if step !== 'release tag'}
              <div class="cicd-arrow">→</div>
            {/if}
          {/each}
        </div>
      </div>
    </section>
  {:else if activeTab === 'data'}
    <!-- ── DATA & OPS ────────────────────────────────────── -->
    <section class="ow-section tab-panel" id="panel-data">
      <div class="container">
        <p class="sec-label">kosmo-docs · DB Schema</p>
        <h2 class="sec-title">DB Schema</h2>

        <!-- Schema relation hint -->
        <div class="schema-relation">
          <div class="sr-chain">
            {#each [['account', 'ACCT0…'], ['profile', 'PRFL0…'], ['post', 'POST0…'], ['post_content', 'PSTC0…']] as [t, pk], i (t)}
              <div class="sr-table">
                <span class="sr-name">{t}</span>
                <span class="sr-pk">{pk}</span>
              </div>
              {#if i < 3}
                <div class="sr-arrow">1 : N →</div>
              {/if}
            {/each}
          </div>
          <div class="sr-extra">
            <div class="sr-extra-item">account_profile <span>N:M</span> account ↔ profile</div>
            <div class="sr-extra-item">session <span>N:1</span> account</div>
            <div class="sr-extra-item">profile_follow <span>N:M</span> profile ↔ profile</div>
            <div class="sr-extra-item">application_secret <span>N:1</span> application</div>
          </div>
        </div>

        <!-- Table cards -->
        <div class="schema-grid">
          {#each dbTables as t (t.name)}
            <div class="schema-card">
              <div class="schema-card-head">
                <span class="sc-name">{t.name}</span>
                <span class="sc-pk">{t.pk}</span>
              </div>
              <div class="sc-cols">
                {#each t.cols as col (col)}
                  <code>{col}</code>
                {/each}
              </div>
              <p class="sc-note">{t.note}</p>
            </div>
          {/each}
        </div>

        <!-- Data principles -->
        <p class="subsec-label" style="margin-top:32px">설계 원칙</p>
        <div class="data-grid">
          {#each dataPrinciples as [title, body] (title)}
            <div class="data-card">
              <p class="data-title">{title}</p>
              <p>{body}</p>
            </div>
          {/each}
        </div>

        <!-- KPIs -->
        <p class="subsec-label" style="margin-top:32px">Launch KPI</p>
        <div class="metrics-panel">
          <div class="metric-list">
            {#each launchMetrics as [label, value] (label)}
              <div class="metric-row">
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </section>
  {/if}
</div>

<style>
  :root {
    --bg: #22223b;
    --bg-card: rgba(255, 255, 255, 0.06);
    --bg-card-strong: rgba(255, 255, 255, 0.1);
    --bg-deep: #1d1d31;
    --border: rgba(255, 255, 255, 0.16);
    --ink: #f8f6ff;
    --ink-strong: #ffffff;
    --ink-mid: rgba(248, 246, 255, 0.8);
    --ink-dim: rgba(248, 246, 255, 0.55);
    --point: #f7e8a3;
    --blue: #b8d5f1;
    --pink: #f3cfc8;
  }

  .our-work-page {
    color: var(--ink);
  }

  /* ── HERO ── */
  .hero {
    position: relative;
    overflow: hidden;
    padding: 0 20px 56px;
    background: linear-gradient(
      180deg,
      rgba(34, 34, 59, 0) 0%,
      rgba(41, 40, 70, 0.48) 18%,
      rgba(34, 34, 59, 0.92) 56%,
      var(--bg-deep) 100%
    );
  }
  .hero-inner {
    position: relative;
    z-index: 1;
    max-width: 1280px;
    margin: 0 auto;
    padding: 84px 24px 0;
    text-align: center;
  }
  .stars {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  :global(.star) {
    position: absolute;
    border-radius: 50%;
    background: #fff;
    opacity: 0;
    animation: twinkle var(--d, 3s) ease-in-out infinite var(--delay, 0s);
  }
  @keyframes twinkle {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: var(--op, 0.6);
    }
  }
  .hero-tag {
    display: inline-block;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--point);
    border: 1px solid rgba(247, 232, 163, 0.3);
    border-radius: 999px;
    padding: 7px 18px;
    margin-bottom: 24px;
    position: relative;
    background: rgba(255, 255, 255, 0.04);
  }
  .hero-title {
    font-family: 'Noto Serif KR', serif;
    font-size: clamp(2.4rem, 5.3vw, 4.4rem);
    font-weight: 700;
    line-height: 1.18;
    letter-spacing: -0.04em;
    color: var(--ink-strong);
    margin: 0 auto 22px;
    position: relative;
    max-width: 780px;
  }
  .hero-title em {
    font-style: normal;
    color: var(--point);
  }
  .hero-desc {
    font-size: 1.0625rem;
    color: var(--ink-mid);
    max-width: 700px;
    margin: 0 auto 36px;
    line-height: 1.85;
    letter-spacing: -0.01em;
    position: relative;
  }
  .hero-chips {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    position: relative;
  }
  .chip {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 8px 16px;
    font-size: 13px;
    color: var(--ink-mid);
  }

  /* ── LAYOUT ── */
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }
  .ow-section {
    padding: 68px 0;
    border-bottom: 1px solid var(--border);
    background: transparent;
  }

  /* ── TAB SHELL ── */
  .tab-shell {
    padding: 36px 0 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.18);
  }
  .tab-list {
    display: flex;
    gap: 0;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .tab-list::-webkit-scrollbar { display: none; }
  .tab-list button {
    border: none;
    border-bottom: 2px solid transparent;
    border-radius: 0;
    background: transparent;
    color: rgba(255, 255, 255, 0.55);
    padding: 10px 20px 12px;
    white-space: nowrap;
    cursor: pointer;
    transition:
      color 0.18s ease,
      border-color 0.18s ease;
    margin-bottom: -1px;
  }
  .tab-list button:hover {
    color: rgba(255, 255, 255, 0.85);
  }
  .tab-list button.active {
    color: #ffffff;
    border-bottom-color: #ffffff;
  }
  .tab-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
  }
  .tab-desc { display: none; }
  .tab-panel {
    min-height: 56vh;
  }

  /* ── TYPOGRAPHY ── */
  .sec-label {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--point);
    margin-bottom: 10px;
  }
  .sec-title {
    font-family: 'Noto Serif KR', serif;
    font-size: clamp(1.9rem, 3.2vw, 2.5rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.35;
    letter-spacing: -0.03em;
    margin-bottom: 14px;
  }
  .sec-lead {
    font-size: 1.0625rem;
    color: var(--ink-mid);
    margin-bottom: 36px;
    max-width: 760px;
    line-height: 1.8;
    letter-spacing: -0.01em;
  }
  .sec-intro {
    font-size: 0.95rem;
    color: var(--ink-dim);
    margin-bottom: 24px;
    font-style: italic;
    line-height: 1.75;
  }
  .subsec-label {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-dim);
    margin-bottom: 12px;
    margin-top: 28px;
    border-top: 1px solid var(--border);
    padding-top: 20px;
  }
  .subsec-label:first-of-type {
    border-top: none;
    padding-top: 0;
    margin-top: 0;
  }

  /* ── CARDS ── */
  .feature-grid,
  .scope-grid,
  .data-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }
  .feature-grid {
    margin-bottom: 0;
  }
  .feature-card,
  .scope-item,
  .data-card,
  .pipeline-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 22px;
    padding: 20px 22px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }
  .feature-card h3,
  .pipeline-card h3 {
    color: var(--ink);
    font-size: 1rem;
    line-height: 1.45;
    margin-bottom: 8px;
  }
  .feature-card p,
  .scope-item p,
  .data-card p,
  .pipeline-card p {
    color: var(--ink-mid);
    font-size: 0.93rem;
    line-height: 1.75;
  }
  .feature-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 12px;
  }
  .feature-tags span {
    border: 1px solid rgba(184, 213, 241, 0.35);
    border-radius: 999px;
    color: var(--blue);
    font-size: 10px;
    font-weight: 700;
    padding: 3px 8px;
  }
  .scope-title,
  .data-title {
    color: var(--point) !important;
    font-weight: 700;
    margin-bottom: 6px;
    font-size: 0.93rem;
  }

  /* ── OUT OF SCOPE ── */
  .oos-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  .oos-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 10px 14px;
    font-size: 0.88rem;
    color: var(--ink-dim);
    line-height: 1.5;
  }
  .oos-x {
    color: var(--pink);
    font-size: 11px;
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 2px;
  }

  /* ── METRICS ── */
  .metrics-panel {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 22px;
    padding: 20px 22px;
  }
  .metric-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .metric-row {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    border-bottom: 1px solid var(--border);
    padding-bottom: 8px;
    color: var(--ink-mid);
    font-size: 0.92rem;
    line-height: 1.55;
  }
  .metric-row:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  .metric-row strong {
    color: var(--point);
    white-space: nowrap;
  }

  /* ── JOURNEY ── */
  .journey-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
  }
  .journey-item {
    display: grid;
    grid-template-columns: 70px 1fr;
    gap: 16px;
    align-items: start;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 22px;
    padding: 18px 20px;
  }
  .journey-item h3 {
    color: var(--ink);
    font-size: 1rem;
    margin-bottom: 4px;
  }
  .journey-item p {
    color: var(--ink-mid);
    font-size: 0.93rem;
    line-height: 1.75;
  }
  .journey-code {
    font-family: 'DM Mono', monospace;
    color: var(--point);
    font-size: 0.88rem;
    font-weight: 700;
  }

  /* ── INNER ARCHITECTURE DIAGRAM ── */
  .arch-diagram {
    display: flex;
    flex-direction: column;
    gap: 0;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 24px;
    overflow: hidden;
  }
  .arch-tier {
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }
  .arch-tier-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-dim);
    min-width: 160px;
    padding-top: 10px;
    flex-shrink: 0;
  }
  .arch-tier-nodes {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    flex: 1;
  }
  .arch-tier-nodes.wide {
    gap: 6px;
  }
  .arch-node {
    display: flex;
    flex-direction: column;
    gap: 2px;
    border-radius: 12px;
    padding: 8px 12px;
    border: 1px solid;
  }
  .arch-node.client {
    background: rgba(247, 232, 163, 0.08);
    border-color: rgba(247, 232, 163, 0.3);
    flex: 1;
  }
  .arch-node.edge {
    background: rgba(255, 255, 255, 0.04);
    border-color: var(--border);
    flex: 1;
  }
  .arch-node.transport {
    background: rgba(184, 213, 241, 0.07);
    border-color: rgba(184, 213, 241, 0.25);
    flex: 1;
  }
  .arch-node.domain {
    background: rgba(255, 255, 255, 0.04);
    border-color: var(--border);
  }
  .arch-node.infra {
    background: rgba(247, 232, 163, 0.05);
    border-color: rgba(247, 232, 163, 0.2);
    flex: 1;
  }
  .arch-node.infra.queue {
    background: rgba(184, 213, 241, 0.07);
    border-color: rgba(184, 213, 241, 0.25);
  }
  .arch-node.worker {
    background: rgba(243, 207, 200, 0.07);
    border-color: rgba(243, 207, 200, 0.25);
    flex: 1;
  }
  .arch-node.external {
    background: rgba(255, 255, 255, 0.03);
    border-color: rgba(255, 255, 255, 0.1);
    flex: 1;
  }
  .external-tier .arch-tier-nodes {
    opacity: 0.7;
  }
  .an-title {
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--ink);
    line-height: 1.3;
  }
  .an-sub {
    font-size: 0.72rem;
    color: var(--ink-dim);
    line-height: 1.35;
  }
  .arch-connector {
    display: flex;
    align-items: center;
    padding: 4px 0 4px 160px;
  }
  .arch-connector span {
    font-size: 10px;
    color: var(--ink-dim);
    padding: 2px 8px;
    border-left: 1px dashed var(--border);
    margin-left: 8px;
  }

  /* ── PIPELINE ── */
  .pipeline-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  .pipeline-label {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--point);
    margin-bottom: 8px;
  }
  .pipeline-steps {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 12px;
  }
  .pipeline-step {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 0.82rem;
    color: var(--ink-mid);
    line-height: 1.5;
  }
  .step-num {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: var(--point);
    min-width: 16px;
    margin-top: 2px;
  }

  /* ── OUTER ARCHITECTURE DIAGRAM ── */
  .outer-diagram {
    display: flex;
    flex-direction: column;
    gap: 0;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 24px;
    overflow: hidden;
  }
  .outer-tier {
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }
  .outer-tier-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-dim);
    min-width: 160px;
    padding-top: 10px;
    flex-shrink: 0;
  }
  .outer-tier-nodes {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    flex: 1;
  }
  .outer-node {
    display: flex;
    flex-direction: column;
    gap: 2px;
    border-radius: 12px;
    padding: 8px 12px;
    border: 1px solid;
    flex: 1;
  }
  .outer-node.inet {
    background: rgba(255, 255, 255, 0.04);
    border-color: var(--border);
  }
  .outer-node.cf {
    background: rgba(247, 206, 64, 0.07);
    border-color: rgba(247, 206, 64, 0.25);
  }
  .outer-node.data {
    background: rgba(247, 232, 163, 0.05);
    border-color: rgba(247, 232, 163, 0.2);
  }
  .outer-node.oidc {
    background: rgba(184, 213, 241, 0.07);
    border-color: rgba(184, 213, 241, 0.25);
  }

  /* OKE cluster */
  .oke-tier {
    flex-direction: column;
    gap: 8px;
  }
  .oke-tier .outer-tier-label {
    min-width: auto;
    padding-top: 0;
    margin-bottom: 8px;
  }
  .oke-cluster {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    width: 100%;
  }
  .oke-ns {
    background: rgba(184, 213, 241, 0.05);
    border: 1px solid rgba(184, 213, 241, 0.2);
    border-radius: 14px;
    padding: 12px 14px;
  }
  .oke-ns-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    color: var(--blue);
    letter-spacing: 0.08em;
    margin-bottom: 8px;
  }
  .oke-pods {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .oke-pod {
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--ink);
    line-height: 1.3;
  }
  .oke-pod span {
    font-size: 0.68rem;
    font-weight: 400;
    color: var(--ink-dim);
  }

  .outer-dr {
    margin-top: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px dashed rgba(255, 255, 255, 0.12);
    border-radius: 12px;
    font-size: 0.82rem;
    color: var(--ink-dim);
  }
  .dr-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    color: var(--ink-dim);
    white-space: nowrap;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 6px;
    padding: 2px 6px;
  }

  /* ── CI/CD FLOW ── */
  .cicd-flow {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 16px 20px;
  }
  .cicd-step {
    display: flex;
    flex-direction: column;
    gap: 3px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 8px 12px;
  }
  .cicd-step-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    color: var(--point);
    letter-spacing: 0.06em;
  }
  .cicd-step-desc {
    font-size: 0.78rem;
    color: var(--ink-mid);
    line-height: 1.4;
  }
  .cicd-arrow {
    font-size: 14px;
    color: var(--ink-dim);
    flex-shrink: 0;
  }

  /* ── DB SCHEMA ── */
  .schema-relation {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 18px 22px;
    margin-bottom: 20px;
  }
  .sr-chain {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
  }
  .sr-table {
    display: flex;
    flex-direction: column;
    gap: 2px;
    background: var(--bg-card);
    border: 1px solid rgba(247, 232, 163, 0.25);
    border-radius: 10px;
    padding: 6px 12px;
  }
  .sr-name {
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--point);
  }
  .sr-pk {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: var(--ink-dim);
  }
  .sr-arrow {
    font-size: 11px;
    color: var(--ink-dim);
    white-space: nowrap;
  }
  .sr-extra {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .sr-extra-item {
    font-size: 0.82rem;
    color: var(--ink-dim);
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 4px 10px;
  }
  .sr-extra-item span {
    color: var(--blue);
    font-weight: 700;
  }

  .schema-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }
  .schema-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .schema-card-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 6px;
    border-bottom: 1px solid var(--border);
    padding-bottom: 8px;
  }
  .sc-name {
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--point);
  }
  .sc-pk {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: var(--ink-dim);
  }
  .sc-cols {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .sc-cols code {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--blue);
    background: rgba(184, 213, 241, 0.07);
    border-radius: 4px;
    padding: 1px 5px;
    width: fit-content;
  }
  .sc-note {
    font-size: 0.78rem;
    color: var(--ink-dim);
    line-height: 1.5;
    margin: 0;
  }

  /* ── OVERVIEW SHARED ── */
  .analogy-box {
    position: relative;
    background: var(--bg-card-strong);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 32px 36px 28px;
    margin-bottom: 24px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }
  .analogy-tag {
    position: absolute;
    top: -10px;
    left: 24px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--point);
    background: var(--bg);
    padding: 0 8px;
  }
  .analogy-p {
    font-size: 0.98rem;
    color: var(--ink-mid);
    line-height: 1.85;
    margin-bottom: 12px;
  }
  .diagram {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin: 32px 0 14px;
    flex-wrap: wrap;
  }
  .server-node {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 22px;
    padding: 20px 22px;
    text-align: center;
    min-width: 156px;
    backdrop-filter: blur(4px);
  }
  .server-node.highlight {
    border-color: rgba(247, 232, 163, 0.45);
    background: rgba(247, 232, 163, 0.09);
  }
  .node-name {
    font-size: 14px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 4px;
  }
  .server-node.highlight .node-name {
    color: var(--point);
  }
  .node-desc {
    font-size: 11px;
    color: var(--ink-dim);
    line-height: 1.5;
  }
  .arrow-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 0 12px;
  }
  .arrow-line {
    width: 76px;
    height: 1px;
    background: var(--border);
    position: relative;
  }
  .arrow-line::after {
    content: '연합';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 9px;
    color: var(--point);
    letter-spacing: 0.05em;
    white-space: nowrap;
  }
  .arrow-sub {
    font-size: 10px;
    color: var(--ink-dim);
    text-align: center;
    max-width: 80px;
    line-height: 1.4;
  }
  .diagram-caption {
    font-size: 0.9rem;
    color: var(--ink-dim);
    text-align: center;
    margin-bottom: 32px;
  }
  .table-wrap {
    overflow-x: auto;
    border-radius: 22px;
    border: 1px solid var(--border);
    margin-bottom: 20px;
    background: rgba(255, 255, 255, 0.03);
  }
  .compare-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }
  .compare-table th {
    background: rgba(255, 255, 255, 0.08);
    color: var(--point);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 10px 16px;
    border: 1px solid var(--border);
    text-align: left;
  }
  .compare-table td {
    padding: 12px 16px;
    border: 1px solid var(--border);
    color: var(--ink-mid);
    vertical-align: top;
    line-height: 1.7;
  }
  .compare-table tr:nth-child(even) td {
    background: rgba(255, 255, 255, 0.03);
  }
  .compare-table .yes {
    color: var(--blue);
    font-weight: 700;
  }
  .compare-table .no {
    color: var(--pink);
  }
  .compare-table .row-label {
    color: var(--ink);
    font-weight: 500;
  }
  .main-reason-box {
    background: rgba(252, 231, 154, 0.08);
    border: 1px solid rgba(252, 231, 154, 0.3);
    border-left: 4px solid var(--point);
    border-radius: 24px;
    padding: 24px 28px;
    margin-bottom: 32px;
  }
  .main-reason-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--point);
    margin-bottom: 10px;
  }
  .main-reason-headline {
    font-family: 'Noto Serif KR', serif;
    font-size: 1.3rem;
    color: var(--ink);
    line-height: 1.65;
    margin-bottom: 14px;
  }
  .main-reason-body {
    font-size: 0.98rem;
    color: var(--ink-mid);
    line-height: 1.8;
  }
  .etc-label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-dim);
    margin-bottom: 14px;
  }
  .reason-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .reason-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 22px 24px;
  }
  .reason-num {
    font-size: 11px;
    font-weight: 700;
    color: var(--point);
    letter-spacing: 0.1em;
    margin-bottom: 8px;
  }
  .reason-title {
    font-size: 1rem;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 8px;
    line-height: 1.4;
  }
  .reason-body {
    font-size: 0.93rem;
    color: var(--ink-mid);
    line-height: 1.75;
  }
  .build-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 14px;
    margin-bottom: 32px;
  }
  .build-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 22px;
  }
  .build-icon {
    font-size: 22px;
    margin-bottom: 10px;
  }
  .build-title {
    font-size: 1rem;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 6px;
  }
  .build-body {
    font-size: 0.92rem;
    color: var(--ink-mid);
    line-height: 1.75;
  }
  .user-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 14px;
    margin-bottom: 28px;
  }
  .user-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 24px;
    overflow: hidden;
  }
  .user-head {
    padding: 14px 18px 12px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  .u1 .user-head {
    background: var(--point);
  }
  .u2 .user-head {
    background: var(--blue);
  }
  .u3 .user-head {
    background: var(--pink);
  }
  .user-name {
    font-size: 15px;
    font-weight: 700;
    color: #22223b;
    margin-bottom: 2px;
  }
  .user-role {
    font-size: 11px;
    color: rgba(34, 34, 59, 0.6);
  }
  .user-body {
    padding: 16px 18px 18px;
    font-size: 0.92rem;
    color: var(--ink-mid);
    line-height: 1.75;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .stack-note {
    background: rgba(252, 231, 154, 0.08);
    border: 1px solid rgba(252, 231, 154, 0.25);
    border-radius: 24px;
    padding: 18px 22px;
    font-size: 0.96rem;
    color: var(--ink-mid);
    line-height: 1.8;
    margin-bottom: 28px;
  }
  .stack-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .stack-item {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 16px;
    align-items: start;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 22px;
    padding: 14px 18px;
  }
  .stack-label {
    font-size: 11px;
    font-weight: 700;
    color: var(--point);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding-top: 2px;
  }
  .stack-detail {
    font-size: 0.93rem;
    color: var(--ink-mid);
    line-height: 1.75;
  }
  .survey-divider {
    padding: 24px 0 36px;
    background: transparent;
    text-align: center;
  }
  .survey-divider-label {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink-dim);
    margin-bottom: 8px;
  }
  .survey-divider-title {
    font-family: 'Noto Serif KR', serif;
    font-size: clamp(1.7rem, 3vw, 2.2rem);
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 8px;
  }
  .survey-divider-sub {
    font-size: 12px;
    color: var(--ink-dim);
  }
  .stat-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
  }
  .stat-chip {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 7px 14px;
    font-size: 12px;
    color: var(--ink-mid);
  }
  .stat-chip strong {
    color: var(--point);
  }
  .insight-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 20px;
  }
  .insight-card {
    border: 1px solid var(--border);
    border-radius: 22px;
    padding: 18px 20px;
    background: var(--bg-card);
  }
  .card-head {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 8px;
    padding-bottom: 6px;
    border-bottom: 1px solid var(--border);
    color: var(--point);
  }
  .card-body {
    font-size: 0.93rem;
    color: var(--ink-mid);
    line-height: 1.8;
  }
  .pain-table {
    width: 100%;
    border-collapse: collapse;
  }
  .pain-table th {
    background: rgba(255, 255, 255, 0.08);
    color: var(--point);
    font-size: 11px;
    font-weight: 700;
    padding: 10px 12px;
    text-align: left;
    letter-spacing: 0.06em;
    border-bottom: 1px solid var(--border);
  }
  .pain-table td {
    padding: 12px 12px;
    border-bottom: 1px solid var(--border);
    font-size: 0.93rem;
    vertical-align: top;
    line-height: 1.75;
    color: var(--ink-mid);
  }
  .pain-table tr:nth-child(even) td {
    background: rgba(255, 255, 255, 0.03);
  }
  .ref-cell {
    font-size: 11px !important;
    color: var(--ink-dim) !important;
  }
  .tag {
    display: inline-block;
    font-size: 10px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 10px;
    margin-right: 4px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .tag-p {
    background: rgba(252, 213, 207, 0.2);
    color: var(--pink);
    border: 1px solid rgba(252, 213, 207, 0.4);
  }
  .tag-n {
    background: rgba(171, 205, 238, 0.2);
    color: var(--blue);
    border: 1px solid rgba(171, 205, 238, 0.4);
  }
  .tag-o {
    background: rgba(252, 231, 154, 0.2);
    color: var(--point);
    border: 1px solid rgba(252, 231, 154, 0.4);
  }
  .callout-yellow {
    background: rgba(252, 231, 154, 0.14);
    border-left: 4px solid var(--point);
    border-radius: 22px;
    padding: 14px 18px;
    margin: 16px 0;
    font-size: 0.95rem;
    line-height: 1.8;
    color: var(--ink-mid);
  }
  .callout-blue {
    background: rgba(171, 205, 238, 0.14);
    border-left: 4px solid var(--blue);
    border-radius: 22px;
    padding: 14px 18px;
    margin: 16px 0;
    font-size: 0.95rem;
    line-height: 1.8;
    color: var(--ink-mid);
  }
  .callout-green {
    background: rgba(187, 247, 208, 0.14);
    border-left: 4px solid #22c55e;
    border-radius: 22px;
    padding: 14px 18px;
    font-size: 0.95rem;
    line-height: 1.8;
    color: var(--ink-mid);
  }
  strong {
    color: var(--ink-strong);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 640px) {
    .hero {
      padding: 0 0 48px;
    }
    .hero-inner {
      padding: 44px 24px 0;
    }
    .container {
      padding: 0 24px;
    }
    .tab-shell {
      position: static;
      padding-top: 22px;
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }
    .tab-list,
    .feature-grid,
    .scope-grid,
    .data-grid,
    .reason-grid,
    .build-grid,
    .user-row,
    .insight-grid,
    .pipeline-grid,
    .oos-grid {
      grid-template-columns: 1fr;
    }
    .arch-tier {
      flex-direction: column;
    }
    .arch-tier-label {
      min-width: auto;
      padding-top: 0;
    }
    .arch-connector {
      padding-left: 0;
    }
    .outer-tier {
      flex-direction: column;
    }
    .outer-tier-label {
      min-width: auto;
      padding-top: 0;
    }
    .oke-cluster {
      grid-template-columns: 1fr;
    }
    .schema-grid {
      grid-template-columns: 1fr 1fr;
    }
    .cicd-flow {
      flex-direction: column;
    }
    .cicd-arrow {
      transform: rotate(90deg);
      align-self: flex-start;
      margin-left: 16px;
    }
    .diagram {
      gap: 8px;
      flex-direction: column;
    }
    .arrow-line {
      width: 2px;
      height: 32px;
    }
    .journey-item,
    .stack-item {
      grid-template-columns: 1fr;
      gap: 8px;
    }
    .hero-desc br,
    .hero-title br {
      display: none;
    }
    .sr-chain {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  @media (max-width: 900px) {
    .schema-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .ow-section > .container,
    .survey-divider > .container {
      padding-left: 64px;
      padding-right: 64px;
    }
  }
</style>
