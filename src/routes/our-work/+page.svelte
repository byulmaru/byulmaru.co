<script>
  import { onMount } from 'svelte';

  onMount(() => {
    const container = document.getElementById('stars');
    if (!container) return;
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
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<!-- ── HERO ────────────────────────────────────────── -->
<div class="hero">
  <div class="stars" id="stars"></div>
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

<!-- ── 01 · 페디버스가 뭔가요? ──────────────────────── -->
<section class="ow-section">
  <div class="container">
    <p class="sec-label">01 · Background</p>
    <h2 class="sec-title">페디버스가 뭔가요?</h2>
    <p class="sec-lead">
      개발을 시작하기 전에, 우리가 다루는 생태계를 이해하는 게 먼저예요.
      생소한 개념이지만 비유로 설명하면 금방 이해할 수 있어요.
    </p>

    <div class="analogy-box">
      <span class="analogy-tag">비유로 이해하기</span>
      <p class="analogy-p">
        <strong>이메일을 떠올려보세요.</strong> Gmail 사용자가 Naver 메일 사용자에게 이메일을 보낼 수
        있죠? 서로 다른 회사의 서비스인데도, SMTP라는 공통 프로토콜 덕분에 가능합니다.
      </p>
      <p class="analogy-p">
        페디버스(Fediverse)는 SNS 버전의 이메일 생태계입니다.
        <strong>ActivityPub</strong>이라는 공통 프로토콜로 연결된 분산 SNS 네트워크예요.
        서로 다른 서버에서 운영되지만, 마치 하나의 SNS처럼 팔로우·리포스트·댓글이 모두 가능합니다.
      </p>
      <p class="analogy-p" style="margin-bottom:0">
        트위터 계정으로 인스타그램 유저를 팔로우할 수 없지만,
        <strong>페디버스에서는 서버가 달라도 서로 팔로우할 수 있습니다.</strong>
      </p>
    </div>

    <!-- 다이어그램 -->
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

    <!-- 비교표 -->
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
          {#each [
            ['신규 사용자 진입', '앱 설치 후 바로 가입', { no: '서버 선택부터 설명 필요' }, { yes: '트위터처럼 바로 가입' }],
            ['서버 운영 주체', 'X Corp. 단독', '누구나 (개인·단체·기업)', { yes: '별마루동인협동조합' }],
            ['타 서버 팔로우', { no: '불가' }, { yes: '가능 (연합)' }, { yes: '가능 (ActivityPub)' }],
            ['알고리즘 피드', '강제 적용', '시간순 기본 / 선택적', { yes: '사용자 선택' }],
            ['광고 정책', '무제한 광고', '서버마다 다름', { yes: '커뮤니티 자체 광고 중심' }],
            ['소프트웨어', '비공개', '대부분 오픈소스', { yes: '자체 개발 (신규)' }],
            ['데이터 이동권', { no: '제한적' }, { yes: '표준 지원' }, { yes: '지원 예정' }],
          ] as row (row[0])}
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
      마스토돈, 미스키 같은 훌륭한 오픈소스 소프트웨어가 이미 있어요.
      그럼에도 직접 만들기로 한 <strong>핵심 이유는 하나</strong>입니다 —
      분산형 SNS는 일반 사용자가 쓰기에 너무 어렵습니다.
    </p>

    <!-- 핵심 이유 강조 박스 -->
    <div class="main-reason-box">
      <p class="main-reason-label">Main Reason</p>
      <p class="main-reason-headline">
        "어느 서버에 가입해야 하지?"<br />
        분산형 SNS의 첫 번째 질문부터 일반인을 막습니다.
      </p>
      <p class="main-reason-body">
        마스토돈·미스키는 개념 자체가 일반 사용자에게 낯설어요.
        <strong>서버 선택, 연합 개념 이해, 서버별 규칙 파악</strong> — 가입 전부터 설명이 필요한 것들이
        너무 많습니다. 트위터 이탈자들이 연합우주로 오지 않는 이유 중 하나도 이 진입 장벽이에요.
        우리는 <strong>페디버스의 기술적 이점은 유지하면서, 일반인이 트위터처럼 바로 쓸 수 있는 서비스</strong>를
        만들려 합니다. 그리고 그건 기성 소프트웨어를 그대로 설치하는 방식으로는 달성하기 어렵습니다.
      </p>
    </div>

    <p class="etc-label">그 외 이유들</p>
    <div class="reason-grid">
      {#each [
        { num: '02', title: '동인 커뮤니티에 특화된 기능이 필요해요', body: '장르·커플링 기반 검색, 창작물 공개 범위 세밀 제어, AI 학습 방지 정책 등 96명의 사용자 조사에서 나온 요구사항들이 기성 소프트웨어엔 없거나 수정하기 매우 어렵습니다.' },
        { num: '03', title: '마스토돈의 UI/UX 한계를 넘어야 해요', body: '"마스토돈 모양이 너무 구려요", "미스키 같이 이쁜 거면 좋겠어요" — 접근성 문제는 디자인에서도 이어집니다. 익숙하고 세련된 UI는 일반 사용자 유입의 전제 조건이에요.' },
        { num: '04', title: '협동조합 운영 원칙을 코드로 구현해야 해요', body: '수익 구조, 광고 정책, 모더레이션 기준을 투명하게 운영하는 협동조합의 원칙을 서비스 설계 단계부터 반영하려면 직접 제어할 수 있는 코드베이스가 필요합니다.' },
        { num: '05', title: '페디버스 생태계와 연결은 유지해야 해요', body: 'ActivityPub을 구현해 마스토돈·미스키 사용자와 교류하면서, 동시에 우리만의 독자적인 기능을 쌓아가는 전략입니다. 기존 연합우주 커뮤니티와 단절 없이 시작합니다.' },
      ] as r (r.num)}
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
      ActivityPub 프로토콜을 구현한 단문형 SNS 서버와 클라이언트를 처음부터 만듭니다.
      현재 생각 중인 피쳐들은 이렇습니다.
    </p>

    <div class="build-grid">
      {#each [
        { icon: '🔗', title: 'ActivityPub 서버', body: '페디버스 표준 프로토콜 구현. 마스토돈·미스키 등 다른 서버와 팔로우·게시물 연동이 가능한 백엔드 서버를 구축합니다.' },
        { icon: '🔍', title: '동인 특화 검색', body: '장르명, 캐릭터명, 커플링 태그 기반 검색. 현재 마스토돈에서 가장 많이 지적되는 약점을 핵심 기능으로 해결합니다.' },
        { icon: '🔒', title: '세밀한 공개 범위', body: '게시물별 공개 대상 제어, 프로텍트 계정, CW(콘텐츠 경고) 등 사용자가 원하는 사람에게만 보여줄 수 있는 권한 시스템.' },
        { icon: '✨', title: '커스텀 이모지 리액션 & 테마', body: '서버 고유의 커스텀 이모지로 반응하는 기능. 미스키에서 온 사용자들이 가장 많이 요청한 기능으로, 커뮤니티 문화를 만드는 핵심입니다. 커스텀 테마 기능도 함께 제공해 서버만의 개성을 표현할 수 있습니다.' },
        { icon: '🛡️', title: 'AI 학습 방지 정책', body: '창작물에 대한 AI 무단 학습을 차단하는 기술적·정책적 장치. 창작자들이 안심하고 작품을 올릴 수 있는 환경을 만듭니다.' },
        { icon: '💬', title: '커뮤니티 광고 시스템', body: '일반 광고 대신, 최애 캐릭터 생일·동인 행사 부스 홍보 등 커뮤니티 자체 광고를 운영자가 검토 후 노출하는 수익 모델.' },
      ] as f (f.title)}
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
      96명의 기존 플랫폼 사용자 설문 데이터를 기반으로 도출한 세 개의 핵심 페르소나입니다.
      개발 우선순위 결정의 기준이 됩니다.
    </p>

    <div class="user-row">
      <div class="user-card u1">
        <div class="user-head">
          <p class="user-name">🎨 동인 창작자</p>
          <p class="user-role">일러스트레이터 · 글 작가</p>
        </div>
        <div class="user-body">
          <p><strong>핵심 불만:</strong> 창작물이 팔로워에게만 보임. 검색 안 됨. AI 학습 공포.</p>
          <p><strong>원하는 것:</strong> 같은 취향의 사람에게 발견되고 싶음. 커모지 리액션으로 소통하고 싶음.</p>
          <p><strong>전체의 50%</strong>가 창작 제작 경험 있음.</p>
        </div>
      </div>
      <div class="user-card u2">
        <div class="user-head">
          <p class="user-name">📖 동인 향유자</p>
          <p class="user-role">논바이너리 포함 · 소수자 비율 높음</p>
        </div>
        <div class="user-body">
          <p><strong>핵심 불만:</strong> 좋아하는 장르 창작물 찾기 어려움. 혐오 발언 노출. 서버 선택 장벽.</p>
          <p><strong>원하는 것:</strong> 차별 없는 안전한 공간. 나답게 있을 수 있는 커뮤니티.</p>
          <p>응답자의 <strong>35%</strong>가 성소수자 정체성.</p>
        </div>
      </div>
      <div class="user-card u3">
        <div class="user-head">
          <p class="user-name">🌐 연합우주 경험자</p>
          <p class="user-role">서버 운영 경험 · 현실적 판단형</p>
        </div>
        <div class="user-body">
          <p><strong>핵심 불만:</strong> 서버가 갑자기 닫힐 불안. 데이터 이관 불가. 운영 투명성 부재.</p>
          <p><strong>원하는 것:</strong> 믿을 수 있는 운영. 지속성 보장. "오래가면 돈 낼 의향도 있음."</p>
          <p>트위터 지인 이주가 <strong>최대 관건</strong>.</p>
        </div>
      </div>
    </div>

    <div class="callout-blue">
      <strong>가장 중요한 발견:</strong> 사용자들이 새 서비스로 오지 않는 1순위 이유는 기능 부족이 아닙니다.
      <strong>"지인이 없기 때문"</strong>이에요. 트위터 팔로우 목록 연동, 지인 초대 시스템을 염두에 두어야 합니다.
    </div>
  </div>
</section>

<!-- ── 05 · Technical Context ───────────────────────── -->
<section class="ow-section">
  <div class="container">
    <p class="sec-label">05 · Technical Context</p>
    <h2 class="sec-title">기술적으로 어떤 도전인가요?</h2>
    <p class="sec-lead">
      ActivityPub 구현은 일반 API 서버 개발과 다른 점이 있어요.
      합류 전에 알아두면 좋은 기술 맥락을 정리했습니다.
    </p>

    <div class="stack-note">
      <strong>ActivityPub이란?</strong> W3C 표준 프로토콜로, 분산 소셜 네트워크 간의 상호운용성을
      정의해요. Actor(사용자), Object(게시물), Activity(팔로우·좋아요·게시 등의 행동)로 이루어진
      JSON-LD 기반 메시지를 서버 간에 주고받는 방식입니다. 마스토돈·미스키가 이 프로토콜을 구현해
      서로 통신하고 있어요.
    </div>

    <div class="stack-list">
      {#each [
        { label: '핵심 프로토콜', detail: '<strong>ActivityPub (W3C 표준)</strong> — Actor 모델 기반의 분산 메시징. WebFinger로 사용자 검색, HTTP Signatures로 요청 인증, Inbox/Outbox 구조로 서버 간 Activity 전달.' },
        { label: '기존 레퍼런스', detail: '<strong>마스토돈</strong> (Ruby on Rails · 안정적, 클라이언트 생태계 풍부), <strong>미스키/체리픽</strong> (Node.js · 커모지 리액션, 풍부한 UI), <strong>Misskey, Hubzilla</strong> 등. 오픈소스라 코드 참고 가능.' },
        { label: '주요 구현 과제', detail: '<strong>분산 팔로우 그래프</strong> 관리, <strong>원격 Activity 수신·발송</strong> 큐 처리, <strong>Webfinger / NodeInfo</strong> 엔드포인트 구현, 연합 미지원 기능(커스텀 이모지 리액션 등)의 하위 호환 처리.' },
        { label: '우리만의 추가 개발', detail: '동인 특화 <strong>태그 기반 검색 인덱싱</strong>, AI 크롤러 차단 미들웨어, 커뮤니티 광고 심사 시스템, 데이터 이관(Export/Import) 표준 지원.' },
      ] as item (item.label)}
        <div class="stack-item">
          <p class="stack-label">{item.label}</p>
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          <p class="stack-detail">{@html item.detail}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ── 구분선 · 사용자 조사 데이터 ──────────────────── -->
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
      우리가 풀고자 하는 문제가 왜 발생했는지, 사용자들은 어떤 상황에 놓여 있는지 데이터 기반으로 공유합니다.
    </p>

    <div class="stat-row">
      {#each [
        ['총 응답자', '96명'],
        ['현 플래닛 주 계정 사용', '24명 (25%)'],
        ['한때 사용, 현재 이탈', '28명 (29%)'],
        ['미경험 / 모름', '28명 (29%)'],
        ['창작자 (오리지널/2차)', '48명 (50%)'],
        ['20대 후반 + 30대 초반', '77명 (80%)'],
      ] as [label, val] (label)}
        <span class="stat-chip"><strong>{val}</strong> {label}</span>
      {/each}
    </div>

    <div class="callout-yellow">
      <strong>핵심 맥락:</strong> 응답자의 다수는 이미 트위터(X)에서 이탈 경험이 있고, 현재 미스키(57명),
      마스토돈(40명), 블루스카이(19명) 등 <strong>여러 연합우주 서비스를 동시 병용</strong>하고 있다.
      단일 서비스로 완전히 정착하지 못한 분산 상태다.
    </div>

    <div class="insight-grid">
      <div class="insight-card">
        <p class="card-head">이탈 계기 — 트위터(X)에서 연합우주로</p>
        <p class="card-body">
          일론 머스크 인수 이후 플랫폼 신뢰도 붕괴, AI 학습 정책, 트윗덱 유료화, 극우 정치 성향
          노출이 주요 이탈 트리거다. 응답자들은 "트친들이 아직 트위터에 있어서" 이중 계정을 유지하는
          상황이다.
        </p>
      </div>
      <div class="insight-card">
        <p class="card-head">현재 플래닛 이탈 이유</p>
        <p class="card-body">
          미스키의 커스텀 이모지 리액션 기능, 더 나은 UI가 주된 이탈 이유. 서버 불안정(트래픽
          과부하), "사람이 너무 많아 중소 서버로 분산"도 주요 원인이다. 기능 부족 vs. UI/UX 열등감이
          핵심 약점이다.
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
          논바이너리 포함 성소수자 비율이 높고(논바이너리 27명), 소수자 친화 운영 정책을 명시적으로
          기대한다. 창작물 노출 대상은 "<strong>같은 취향의 사람들</strong>"이 압도적 다수 —
          불특정 대중이 아닌 취향 기반 커뮤니티 지향.
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
    <p class="sec-intro">
      조사 데이터에서 도출된 핵심 불편점과 그 이면의 욕구를 구조화합니다.
    </p>

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
          {#each [
            { tag: '검색', cls: 'tag-p', pain: '마스토돈 계열의 검색 기능이 극도로 취약함. 해시태그 검색 외에는 사실상 불가. 창작물 노출과 새로운 사람 발견이 어렵다.', need: '자신의 창작물이 같은 취향의 사람에게 발견되길 원함. 동인 정보(트레틀, TRPG 세팅 등)도 쉽게 검색 가능해야 함.', ref: '복수 원문 언급, future_sns 클러스터 최다 언급' },
            { tag: 'UI/UX', cls: 'tag-p', pain: '마스토돈 기본 UI가 시각적으로 구식이고 가시성이 낮다. 미스키 대비 레이아웃 품질이 떨어짐.', need: '쓰기 편하고 보기 좋은 디자인. 첫 인상에서 신뢰감과 감각을 동시에 전달받고 싶음.', ref: '"마스토돈 모양이 너무 구려요" 등 다수 원문' },
            { tag: '안전성', cls: 'tag-p', pain: '사이버 불링, 조리돌림, 성인/AI 광고, 인용 기능을 통한 공론화 피해에 무방비 상태.', need: '보고 싶지 않은 것을 보지 않을 권리와 보이고 싶지 않은 것을 숨길 권리를 동시에 보장받고 싶음.', ref: '안전 클러스터 21명, "인용 기능 개발 안 하기(제발)" 등' },
            { tag: '지속성', cls: 'tag-p', pain: '연합우주 서버가 언제 문을 닫을지 모른다는 불안. 데이터 이관 수단 부재. 서버 불안정으로 인한 접속 장애.', need: '플랫폼이 갑자기 사라지지 않을 것이라는 신뢰. 계정과 게시물이 영구 보존되길 원함.', ref: '플랫폼 지속성 클러스터 15명' },
            { tag: '이모지/반응', cls: 'tag-p', pain: '마스토돈은 커스텀 이모지 리액션 기능이 없어 미스키 대비 교류의 풍부함이 떨어짐. 플래닛 이탈의 주 원인.', need: '글보다 가벼운 감정 표현 수단(리액션)으로 소통하고 싶음. 커스텀 커모지가 공동체 정체성을 만드는 수단.', ref: '이탈 이유 최다 언급 항목' },
            { tag: '유입/인구', cls: 'tag-p', pain: '"아무리 좋아도 지인이 안 오면 의미 없다." 트위터에 남아 있는 지인을 데려올 방법이 없음.', need: '기존 관계망(트친)을 끊기지 않고 이동하고 싶음. 익숙한 관계에서 시작하는 새 SNS.', ref: '기타 자유 의견, 사용자 유입 클러스터' },
            { tag: '프라이버시', cls: 'tag-n', pain: '공개·비공개 계정 설정의 세밀한 제어가 필요하지만 현재 불완전하게 구현됨.', need: '원하는 사람에게만 창작물을 공개하는 세밀한 공개 범위 제어권.', ref: '"프로텍트 기능이 정말 중요해요" 다수 언급' },
            { tag: 'AI', cls: 'tag-n', pain: '창작물이 AI 학습에 무단 사용될지 모른다는 공포. 트위터X가 AI 기능을 강제 추가한 것에 대한 분노가 이탈의 트리거였음.', need: '내 창작물을 AI로부터 보호받고 싶음. 안심하고 창작물을 올릴 수 있는 공간.', ref: '"ai 학습을 방지하고 창작자에게 안심이 되는 공간" 등' },
            { tag: '수익모델', cls: 'tag-o', pain: '일반 광고(구글 광고)는 성인광고 등 이상한 내용이 뜰 가능성 때문에 공공장소 이용이 불편. AI 생성물 광고에도 거부감.', need: '광고가 있더라도 콘텐츠의 신뢰성과 맥락에 맞는 광고만 수용 가능. 직접 신청·검토한 커뮤니티 자체 광고는 환영.', ref: 'SNS 자체 광고 납득 83명(86%) vs 일반 광고 64명(67%)' },
          ] as row (row.tag)}
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
      <strong>"운영자를 믿을 수 있는가"</strong>를 더 깊이 묻고 있다. 기능 요구사항 아래에는
      "이 서비스가 나를 착취하지 않을 것"이라는 신뢰의 욕구가 깔려 있다.
      협동조합 형태 자체가 이 신뢰를 만드는 구조적 자산이다.
    </div>
  </div>
</section>

<style>
  /* ── 색상 변수 (team_intro.html 팔레트) ─── */
  :root {
    --bg:       #22223B;
    --bg-card:  #2a2946;
    --bg-deep:  #1c1b30;
    --border:   #42405e;
    --ink:      #F0EAD6;
    --ink-mid:  #c8bfa0;
    --ink-dim:  #9a8f78;
    --point:    #FCE79A;
    --blue:     #ABCDEE;
    --pink:     #FCD5CF;
  }

  /* ── HERO ─── */
  /* 상단: 투명(body 그라데이션 그대로 노출 → 헤더 연결) → 하단: --bg-deep */
  .hero {
    position: relative;
    overflow: hidden;
    padding: 100px 48px 80px;
    text-align: center;
    background: linear-gradient(
      180deg,
      rgba(34, 34, 59, 0)    0%,
      rgba(25, 23, 44, 0.72) 32%,
      var(--bg)              62%,
      var(--bg-deep)        100%
    );
    border-bottom: 1px solid var(--border);
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
    0%, 100% { opacity: 0; }
    50%       { opacity: var(--op, 0.6); }
  }
  .hero-tag {
    display: inline-block;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--point);
    border: 1px solid rgba(252, 231, 154, 0.35);
    border-radius: 20px;
    padding: 4px 16px;
    margin-bottom: 28px;
    position: relative;
  }
  .hero-title {
    font-family: 'Noto Serif KR', serif;
    font-size: clamp(28px, 5vw, 46px);
    font-weight: 700;
    line-height: 1.25;
    color: var(--ink);
    margin-bottom: 20px;
    position: relative;
  }
  .hero-title em { font-style: normal; color: var(--point); }
  .hero-desc {
    font-size: 16px;
    color: var(--ink-mid);
    max-width: 560px;
    margin: 0 auto 40px;
    line-height: 1.8;
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
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 5px 16px;
    font-size: 13px;
    color: var(--ink-mid);
  }

  /* ── LAYOUT ─── */
  .container {
    max-width: 860px;
    margin: 0 auto;
    padding: 0 40px;
  }
  .ow-section {
    padding: 72px 0;
    border-bottom: 1px solid var(--border);
    background: var(--bg);
  }

  /* ── 공통 텍스트 ─── */
  .sec-label {
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--point);
    margin-bottom: 6px;
  }
  .sec-title {
    font-family: 'Noto Serif KR', serif;
    font-size: 26px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 12px;
  }
  .sec-lead {
    font-size: 15px;
    color: var(--ink-mid);
    margin-bottom: 40px;
    max-width: 640px;
    line-height: 1.85;
  }
  .sec-intro {
    font-size: 13px;
    color: var(--ink-dim);
    margin-bottom: 24px;
    font-style: italic;
    line-height: 1.75;
  }

  /* ── 비유 박스 ─── */
  .analogy-box {
    position: relative;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 32px 36px 28px;
    margin-bottom: 24px;
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
    background: var(--bg);   /* 섹션 배경색과 일치 */
    padding: 0 8px;
  }
  .analogy-p {
    font-size: 14px;
    color: var(--ink-mid);
    line-height: 1.8;
    margin-bottom: 12px;
  }

  /* ── 다이어그램 ─── */
  .diagram {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    margin: 28px 0 12px;
    flex-wrap: wrap;
  }
  .server-node {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 16px 20px;
    text-align: center;
    min-width: 130px;
  }
  .server-node.highlight {
    border-color: rgba(252, 231, 154, 0.5);
    background: rgba(252, 231, 154, 0.07);
  }
  .node-name {
    font-size: 13px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 4px;
  }
  .server-node.highlight .node-name { color: var(--point); }
  .node-desc {
    font-size: 11px;
    color: var(--ink-dim);
    line-height: 1.5;
  }
  .arrow-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 0 12px;
  }
  .arrow-line {
    width: 60px;
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
    font-size: 13px;
    color: var(--ink-dim);
    text-align: center;
    margin-bottom: 32px;
  }

  /* ── 테이블 공통 ─── */
  .table-wrap {
    overflow-x: auto;
    border-radius: 8px;
    border: 1px solid var(--border);
    margin-bottom: 20px;
  }

  /* ── 비교표 ─── */
  .compare-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  .compare-table th {
    background: var(--bg-card);
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
    padding: 10px 16px;
    border: 1px solid var(--border);
    color: var(--ink-mid);
    vertical-align: top;
    line-height: 1.6;
  }
  .compare-table tr:nth-child(even) td { background: rgba(255, 255, 255, 0.03); }
  .compare-table .yes { color: var(--blue); font-weight: 700; }
  .compare-table .no  { color: var(--pink); }
  .compare-table .row-label { color: var(--ink); font-weight: 500; }

  /* ── 핵심 이유 박스 ─── */
  .main-reason-box {
    background: rgba(252, 231, 154, 0.08);
    border: 1px solid rgba(252, 231, 154, 0.3);
    border-left: 4px solid var(--point);
    border-radius: 8px;
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
    font-size: 18px;
    color: var(--ink);
    line-height: 1.7;
    margin-bottom: 14px;
  }
  .main-reason-body {
    font-size: 13px;
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

  /* ── 이유 카드 ─── */
  .reason-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .reason-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 10px;
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
    font-size: 15px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 8px;
    line-height: 1.4;
  }
  .reason-body {
    font-size: 13px;
    color: var(--ink-mid);
    line-height: 1.75;
  }

  /* ── 기능 카드 ─── */
  .build-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 14px;
    margin-bottom: 32px;
  }
  .build-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 20px;
  }
  .build-icon { font-size: 22px; margin-bottom: 10px; }
  .build-title {
    font-size: 14px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 6px;
  }
  .build-body {
    font-size: 12px;
    color: var(--ink-mid);
    line-height: 1.7;
  }

  /* ── 유저 카드 ─── */
  .user-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 14px;
    margin-bottom: 28px;
  }
  .user-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
  }
  .user-head {
    padding: 12px 16px 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  .u1 .user-head { background: var(--point); }
  .u2 .user-head { background: var(--blue); }
  .u3 .user-head { background: var(--pink); }
  .user-name {
    font-size: 14px;
    font-weight: 700;
    color: #22223b;
    margin-bottom: 2px;
  }
  .user-role { font-size: 11px; color: rgba(34, 34, 59, 0.6); }
  .user-body {
    padding: 14px 16px;
    font-size: 12px;
    color: var(--ink-mid);
    line-height: 1.7;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  /* ── 기술 맥락 ─── */
  .stack-note {
    background: rgba(252, 231, 154, 0.08);
    border: 1px solid rgba(252, 231, 154, 0.25);
    border-radius: 8px;
    padding: 18px 22px;
    font-size: 13px;
    color: var(--ink-mid);
    line-height: 1.75;
    margin-bottom: 28px;
  }
  .stack-list { display: flex; flex-direction: column; gap: 12px; }
  .stack-item {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 16px;
    align-items: start;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 8px;
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
    font-size: 13px;
    color: var(--ink-mid);
    line-height: 1.65;
  }

  /* ── 구분선 ─── */
  .survey-divider {
    padding: 48px 0 36px;
    border-top: 1px solid var(--border);
    background: var(--bg);
    text-align: center;
  }
  .survey-divider-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ink-dim);
    margin-bottom: 8px;
  }
  .survey-divider-title {
    font-family: 'Noto Serif KR', serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 8px;
  }
  .survey-divider-sub {
    font-size: 12px;
    color: var(--ink-dim);
  }

  /* ── 통계 칩 ─── */
  .stat-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
  }
  .stat-chip {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 4px 14px;
    font-size: 12px;
    color: var(--ink-mid);
  }
  .stat-chip strong { color: var(--point); }

  /* ── 인사이트 그리드 ─── */
  .insight-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 20px;
  }
  .insight-card {
    border: 1px solid var(--border);
    border-radius: 8px;
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
    font-size: 13px;
    color: var(--ink-mid);
    line-height: 1.75;
  }

  /* ── Pain 테이블 ─── */
  .pain-table {
    width: 100%;
    border-collapse: collapse;
  }
  .pain-table th {
    background: var(--bg-card);
    color: var(--point);
    font-size: 11px;
    font-weight: 700;
    padding: 10px 12px;
    text-align: left;
    letter-spacing: 0.06em;
    border-bottom: 1px solid var(--border);
  }
  .pain-table td {
    padding: 10px 12px;
    border-bottom: 1px solid var(--border);
    font-size: 13px;
    vertical-align: top;
    line-height: 1.65;
    color: var(--ink-mid);
  }
  .pain-table tr:nth-child(even) td { background: rgba(255, 255, 255, 0.03); }
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
  .tag-p { background: rgba(252, 213, 207, 0.2); color: var(--pink); border: 1px solid rgba(252, 213, 207, 0.4); }
  .tag-n { background: rgba(171, 205, 238, 0.2); color: var(--blue); border: 1px solid rgba(171, 205, 238, 0.4); }
  .tag-o { background: rgba(252, 231, 154, 0.2); color: var(--point); border: 1px solid rgba(252, 231, 154, 0.4); }

  /* ── 콜아웃 ─── */
  .callout-yellow {
    background: rgba(252, 231, 154, 0.14);
    border-left: 4px solid var(--point);
    border-radius: 6px;
    padding: 14px 18px;
    margin: 16px 0;
    font-size: 13px;
    line-height: 1.75;
    color: var(--ink-mid);
  }
  .callout-blue {
    background: rgba(171, 205, 238, 0.14);
    border-left: 4px solid var(--blue);
    border-radius: 6px;
    padding: 14px 18px;
    margin: 16px 0;
    font-size: 13px;
    line-height: 1.75;
    color: var(--ink-mid);
  }
  .callout-green {
    background: rgba(187, 247, 208, 0.14);
    border-left: 4px solid #22c55e;
    border-radius: 6px;
    padding: 14px 18px;
    font-size: 13px;
    line-height: 1.75;
    color: var(--ink-mid);
  }

  /* ── 반응형 ─── */
  @media (max-width: 640px) {
    .hero { padding: 60px 24px 56px; }
    .container { padding: 0 24px; }
    .reason-grid, .build-grid, .user-row, .insight-grid { grid-template-columns: 1fr; }
    .diagram { gap: 8px; flex-direction: column; }
    .arrow-line { width: 2px; height: 32px; }
    .stack-item { grid-template-columns: 1fr; gap: 6px; }
  }
</style>
