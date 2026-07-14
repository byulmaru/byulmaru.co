import type { ReactElement } from 'react';

import { Divider } from '../../components/Divider';
import { StarField } from '../components/StarField';
import {
  FEDIVERSE_COMPARE,
  OVERVIEW_BUILD_FEATURES,
  OVERVIEW_HERO_CHIPS,
  OVERVIEW_PAIN_POINTS,
  OVERVIEW_REASONS,
  OVERVIEW_STACK_ITEMS,
  OVERVIEW_SURVEY_STATS,
} from '../content';
import styles from '../our-work.module.css';

const compareResultClasses = {
  yes: styles.yes,
  no: styles.no,
} as const;

const painTagClasses = {
  'tag-p': styles['tag-p'],
  'tag-n': styles['tag-n'],
  'tag-o': styles['tag-o'],
} as const;

export function OverviewPanel(): ReactElement {
  return (
    <>
      <div className={styles.hero}>
        <StarField />
        <div className={styles['hero-inner']}>
          <span className={styles['hero-tag']}>For Developers · Project Introduction</span>
          <h1 className={styles['hero-title']}>
            트위터를 대체할
            <br />
            <em>우리만의 SNS</em>를 만듭니다
          </h1>
          <p className={styles['hero-desc']}>
            마스토돈 인스턴스로 시작한 동인 커뮤니티 플랫폼을,
            <br />
            ActivityPub 기반의 자체 SNS 서비스로 재개발합니다.
            <br />이 페이지는 페디버스를 처음 접하는 개발자를 위해 작성했어요.
          </p>
          <div className={styles['hero-chips']}>
            {OVERVIEW_HERO_CHIPS.map((chip) => (
              <span className={styles.chip} key={chip}>
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Divider />

      <section className={`${styles['ow-section']} ${styles['tab-panel']}`}>
        <div className={styles.container}>
          <p className={styles['sec-label']}>01 · Background</p>
          <h2 className={styles['sec-title']}>페디버스가 뭔가요?</h2>
          <p className={styles['sec-lead']}>
            개발을 시작하기 전에, 우리가 다루는 생태계를 이해하는 게 먼저예요. 생소한 개념이지만
            비유로 설명하면 금방 이해할 수 있어요.
          </p>

          <div className={styles['analogy-box']}>
            <span className={styles['analogy-tag']}>비유로 이해하기</span>
            <p className={styles['analogy-p']}>
              <strong>이메일을 떠올려보세요.</strong> Gmail 사용자가 Naver 메일 사용자에게 이메일을
              보낼 수 있죠? 서로 다른 회사의 서비스인데도, SMTP라는 공통 프로토콜 덕분에 가능합니다.
            </p>
            <p className={styles['analogy-p']}>
              페디버스(Fediverse)는 SNS 버전의 이메일 생태계입니다. <strong>ActivityPub</strong>
              이라는 공통 프로토콜로 연결된 분산 SNS 네트워크예요. 서로 다른 서버에서 운영되지만,
              마치 하나의 SNS처럼 팔로우·리포스트·댓글이 모두 가능합니다.
            </p>
            <p className={styles['analogy-p']} style={{ marginBottom: 0 }}>
              트위터 계정으로 인스타그램 유저를 팔로우할 수 없지만,{' '}
              <strong>페디버스에서는 서버가 달라도 서로 팔로우할 수 있습니다.</strong>
            </p>
          </div>

          <div className={styles.diagram}>
            <div className={`${styles['server-node']} ${styles.highlight}`}>
              <div className={styles['node-name']}>우리 서버</div>
              <div className={styles['node-desc']}>
                새로 만드는
                <br />
                SNS 서비스
              </div>
            </div>
            <div className={styles['arrow-wrap']}>
              <div className={styles['arrow-line']}></div>
              <span className={styles['arrow-sub']}>팔로우·리포스트·댓글 모두 가능</span>
            </div>
            <div className={styles['server-node']}>
              <div className={styles['node-name']}>마스토돈 서버</div>
              <div className={styles['node-desc']}>
                다른 팀이
                <br />
                운영하는 서버
              </div>
            </div>
            <div className={styles['arrow-wrap']}>
              <div className={styles['arrow-line']}></div>
              <span className={styles['arrow-sub']}>같은 ActivityPub 프로토콜</span>
            </div>
            <div className={styles['server-node']}>
              <div className={styles['node-name']}>미스키 서버</div>
              <div className={styles['node-desc']}>
                또 다른
                <br />
                독립 서버
              </div>
            </div>
          </div>
          <p className={styles['diagram-caption']}>
            서버가 달라도 ActivityPub으로 연결되어 하나의 네트워크처럼 작동합니다
          </p>

          <div className={styles['table-wrap']}>
            <table className={styles['compare-table']}>
              <thead>
                <tr>
                  <th>기능</th>
                  <th>트위터(X)</th>
                  <th>페디버스 (마스토돈 등)</th>
                  <th>우리가 만드는 것</th>
                </tr>
              </thead>
              <tbody>
                {FEDIVERSE_COMPARE.map((row) => (
                  <tr key={row[0]}>
                    <td className={styles['row-label']}>{row[0]}</td>
                    {row.slice(1).map((cell, index) => {
                      const className =
                        typeof cell === 'string'
                          ? undefined
                          : 'yes' in cell
                            ? compareResultClasses.yes
                            : compareResultClasses.no;
                      const content =
                        typeof cell === 'string' ? cell : 'yes' in cell ? cell.yes : cell.no;

                      return (
                        <td className={className} key={`${row[0]}-${index}`}>
                          {content}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={styles['ow-section']}>
        <div className={styles.container}>
          <p className={styles['sec-label']}>02 · Why We Build</p>
          <h2 className={styles['sec-title']}>왜 기존 소프트웨어를 쓰지 않고 직접 만드나요?</h2>
          <p className={styles['sec-lead']}>
            마스토돈, 미스키 같은 훌륭한 오픈소스 소프트웨어가 이미 있어요. 그럼에도 직접 만들기로
            한 <strong>핵심 이유는 하나</strong>입니다 — 분산형 SNS는 일반 사용자가 쓰기에 너무
            어렵습니다.
          </p>

          <div className={styles['main-reason-box']}>
            <p className={styles['main-reason-label']}>Main Reason</p>
            <p className={styles['main-reason-headline']}>
              &quot;어느 서버에 가입해야 하지?&quot;
              <br />
              분산형 SNS의 첫 번째 질문부터 일반인을 막습니다.
            </p>
            <p className={styles['main-reason-body']}>
              마스토돈·미스키는 개념 자체가 일반 사용자에게 낯설어요.{' '}
              <strong>서버 선택, 연합 개념 이해, 서버별 규칙 파악</strong> — 가입 전부터 설명이
              필요한 것들이 너무 많습니다. 트위터 이탈자들이 연합우주로 오지 않는 이유 중 하나도 이
              진입 장벽이에요. 우리는{' '}
              <strong>
                페디버스의 기술적 이점은 유지하면서, 일반인이 트위터처럼 바로 쓸 수 있는 서비스
              </strong>
              를 만들려 합니다. 그리고 그건 기성 소프트웨어를 그대로 설치하는 방식으로는 달성하기
              어렵습니다.
            </p>
          </div>

          <p className={styles['etc-label']}>그 외 이유들</p>
          <div className={styles['reason-grid']}>
            {OVERVIEW_REASONS.map((reason) => (
              <div className={styles['reason-card']} key={reason.num}>
                <p className={styles['reason-num']}>{reason.num}</p>
                <p className={styles['reason-title']}>{reason.title}</p>
                <p className={styles['reason-body']}>{reason.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles['ow-section']}>
        <div className={styles.container}>
          <p className={styles['sec-label']}>03 · What We Build</p>
          <h2 className={styles['sec-title']}>무엇을 만드나요?</h2>
          <p className={styles['sec-lead']}>
            ActivityPub 프로토콜을 구현한 단문형 SNS 서버와 클라이언트를 처음부터 만듭니다. 현재
            생각 중인 피쳐들은 이렇습니다.
          </p>

          <div className={styles['build-grid']}>
            {OVERVIEW_BUILD_FEATURES.map((feature) => (
              <div className={styles['build-card']} key={feature.title}>
                <div className={styles['build-icon']}>{feature.icon}</div>
                <p className={styles['build-title']}>{feature.title}</p>
                <p className={styles['build-body']}>{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles['ow-section']}>
        <div className={styles.container}>
          <p className={styles['sec-label']}>04 · Our Users</p>
          <h2 className={styles['sec-title']}>누구를 위해 만드나요?</h2>
          <p className={styles['sec-lead']}>
            96명의 기존 플랫폼 사용자 설문 데이터를 기반으로 도출한 세 개의 핵심 페르소나입니다.
            개발 우선순위 결정의 기준이 됩니다.
          </p>

          <div className={styles['user-row']}>
            <div className={`${styles['user-card']} ${styles.u1}`}>
              <div className={styles['user-head']}>
                <p className={styles['user-name']}>🎨 동인 창작자</p>
                <p className={styles['user-role']}>일러스트레이터 · 글 작가</p>
              </div>
              <div className={styles['user-body']}>
                <p>
                  <strong>핵심 불만:</strong> 창작물이 팔로워에게만 보임. 검색 안 됨. AI 학습 공포.
                </p>
                <p>
                  <strong>원하는 것:</strong> 같은 취향의 사람에게 발견되고 싶음. 커모지 리액션으로
                  소통하고 싶음.
                </p>
                <p>
                  <strong>전체의 50%</strong>가 창작 제작 경험 있음.
                </p>
              </div>
            </div>
            <div className={`${styles['user-card']} ${styles.u2}`}>
              <div className={styles['user-head']}>
                <p className={styles['user-name']}>📖 동인 향유자</p>
                <p className={styles['user-role']}>논바이너리 포함 · 소수자 비율 높음</p>
              </div>
              <div className={styles['user-body']}>
                <p>
                  <strong>핵심 불만:</strong> 좋아하는 장르 창작물 찾기 어려움. 혐오 발언 노출. 서버
                  선택 장벽.
                </p>
                <p>
                  <strong>원하는 것:</strong> 차별 없는 안전한 공간. 나답게 있을 수 있는 커뮤니티.
                </p>
                <p>
                  응답자의 <strong>35%</strong>가 성소수자 정체성.
                </p>
              </div>
            </div>
            <div className={`${styles['user-card']} ${styles.u3}`}>
              <div className={styles['user-head']}>
                <p className={styles['user-name']}>🌐 연합우주 경험자</p>
                <p className={styles['user-role']}>서버 운영 경험 · 현실적 판단형</p>
              </div>
              <div className={styles['user-body']}>
                <p>
                  <strong>핵심 불만:</strong> 서버가 갑자기 닫힐 불안. 데이터 이관 불가. 운영 투명성
                  부재.
                </p>
                <p>
                  <strong>원하는 것:</strong> 믿을 수 있는 운영. 지속성 보장. &quot;오래가면 돈 낼
                  의향도 있음.&quot;
                </p>
                <p>
                  트위터 지인 이주가 <strong>최대 관건</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className={styles['callout-blue']}>
            <strong>가장 중요한 발견:</strong> 사용자들이 새 서비스로 오지 않는 1순위 이유는 기능
            부족이 아닙니다. <strong>&quot;지인이 없기 때문&quot;</strong>이에요. 트위터 팔로우 목록
            연동, 지인 초대 시스템을 염두에 두어야 합니다.
          </div>
        </div>
      </section>

      <section className={styles['ow-section']}>
        <div className={styles.container}>
          <p className={styles['sec-label']}>05 · Technical Context</p>
          <h2 className={styles['sec-title']}>기술적으로 어떤 도전인가요?</h2>
          <p className={styles['sec-lead']}>
            ActivityPub 구현은 일반 API 서버 개발과 다른 점이 있어요. 합류 전에 알아두면 좋은 기술
            맥락을 정리했습니다.
          </p>

          <div className={styles['stack-note']}>
            <strong>ActivityPub이란?</strong> W3C 표준 프로토콜로, 분산 소셜 네트워크 간의
            상호운용성을 정의해요. Actor(사용자), Object(게시물), Activity(팔로우·좋아요·게시 등의
            행동)로 이루어진 JSON-LD 기반 메시지를 서버 간에 주고받는 방식입니다. 마스토돈·미스키가
            이 프로토콜을 구현해 서로 통신하고 있어요.
          </div>

          <div className={styles['stack-list']}>
            {OVERVIEW_STACK_ITEMS.map((item) => (
              <div className={styles['stack-item']} key={item.label}>
                <p className={styles['stack-label']}>{item.label}</p>
                <p className={styles['stack-detail']}>
                  {item.detail.map((part) =>
                    'bold' in part && part.bold ? (
                      <strong key={part.text}>{part.text}</strong>
                    ) : (
                      part.text
                    ),
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      <div className={styles['survey-divider']}>
        <div className={styles.container}>
          <p className={styles['survey-divider-label']}>Research Data</p>
          <p className={styles['survey-divider-title']}>사용자 조사 데이터</p>
          <p className={styles['survey-divider-sub']}>
            플래닛 연합우주 사용자 총조사 · 응답자 96명 · 디자인씽킹 1.1~2단계
          </p>
        </div>
      </div>

      <section className={styles['ow-section']}>
        <div className={styles.container}>
          <p className={styles['sec-label']}>Step 1.1 · Design Challenge</p>
          <h2 className={styles['sec-title']}>경험 공유 및 맥락 정리</h2>
          <p className={styles['sec-intro']}>
            우리가 풀고자 하는 문제가 왜 발생했는지, 사용자들은 어떤 상황에 놓여 있는지 데이터
            기반으로 공유합니다.
          </p>

          <div className={styles['stat-row']}>
            {OVERVIEW_SURVEY_STATS.map(([label, value]) => (
              <span className={styles['stat-chip']} key={label}>
                <strong>{value}</strong> {label}
              </span>
            ))}
          </div>

          <div className={styles['callout-yellow']}>
            <strong>핵심 맥락:</strong> 응답자의 다수는 이미 트위터(X)에서 이탈 경험이 있고, 현재
            미스키(57명), 마스토돈(40명), 블루스카이(19명) 등{' '}
            <strong>여러 연합우주 서비스를 동시 병용</strong>하고 있다. 단일 서비스로 완전히
            정착하지 못한 분산 상태다.
          </div>

          <div className={styles['insight-grid']}>
            <div className={styles['insight-card']}>
              <p className={styles['card-head']}>이탈 계기 — 트위터(X)에서 연합우주로</p>
              <p className={styles['card-body']}>
                일론 머스크 인수 이후 플랫폼 신뢰도 붕괴, AI 학습 정책, 트윗덱 유료화, 극우 정치
                성향 노출이 주요 이탈 트리거다. 응답자들은 &quot;트친들이 아직 트위터에 있어서&quot;
                이중 계정을 유지하는 상황이다.
              </p>
            </div>
            <div className={styles['insight-card']}>
              <p className={styles['card-head']}>현재 플래닛 이탈 이유</p>
              <p className={styles['card-body']}>
                미스키의 커스텀 이모지 리액션 기능, 더 나은 UI가 주된 이탈 이유. 서버 불안정(트래픽
                과부하), &quot;사람이 너무 많아 중소 서버로 분산&quot;도 주요 원인이다. 기능 부족
                vs. UI/UX 열등감이 핵심 약점이다.
              </p>
            </div>
            <div className={styles['insight-card']}>
              <p className={styles['card-head']}>주 사용 SNS 분포 (복수응답)</p>
              <p className={styles['card-body']}>
                <strong>미스키 57명 · 마스토돈 40명 · 트위터(X) 43명 · 블루스카이 19명</strong>
                <br />
                대부분이 2~3개 플랫폼을 병용. &quot;동인 창작&quot;은 X에, &quot;일상/교류&quot;는
                연합우주에 쪼개서 사용하는 패턴이 뚜렷하다.
              </p>
            </div>
            <div className={styles['insight-card']}>
              <p className={styles['card-head']}>타겟 사용자 특성</p>
              <p className={styles['card-body']}>
                논바이너리 포함 성소수자 비율이 높고(논바이너리 27명), 소수자 친화 운영 정책을
                명시적으로 기대한다. 창작물 노출 대상은 &quot;<strong>같은 취향의 사람들</strong>
                &quot;이 압도적 다수 — 불특정 대중이 아닌 취향 기반 커뮤니티 지향.
              </p>
            </div>
          </div>

          <div className={styles['callout-blue']}>
            <strong>Design Challenge 정의:</strong> 동인 창작자와 향유자들이 트위터 이탈 이후에도
            취향 기반 커뮤니티를 안전하고 지속가능하게 유지할 수 있는 단문형 SNS 경험을 어떻게
            설계할 것인가?
          </div>
        </div>
      </section>

      <section className={styles['ow-section']} style={{ borderBottom: 'none' }}>
        <div className={styles.container}>
          <p className={styles['sec-label']}>Step 1.2 · Pain Point &amp; Needs</p>
          <h2 className={styles['sec-title']}>핵심 불편함과 욕구</h2>
          <p className={styles['sec-intro']}>
            조사 데이터에서 도출된 핵심 불편점과 그 이면의 욕구를 구조화합니다.
          </p>

          <div className={styles['table-wrap']}>
            <table className={styles['pain-table']}>
              <thead>
                <tr>
                  <th style={{ width: 90 }}>영역</th>
                  <th>Pain Point (불편함)</th>
                  <th>근본 Needs (욕구)</th>
                  <th style={{ width: 130 }}>응답 근거</th>
                </tr>
              </thead>
              <tbody>
                {OVERVIEW_PAIN_POINTS.map((row) => (
                  <tr key={row.tag}>
                    <td>
                      <span className={`${styles.tag} ${painTagClasses[row.cls]}`}>{row.tag}</span>
                    </td>
                    <td>{row.pain}</td>
                    <td>{row.need}</td>
                    <td className={styles['ref-cell']}>{row.ref}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles['callout-green']}>
            <strong>숨겨진 Needs (Latent Needs):</strong> 응답자들은 &quot;기능&quot;보다{' '}
            <strong>&quot;운영자를 믿을 수 있는가&quot;</strong>를 더 깊이 묻고 있다. 기능 요구사항
            아래에는 &quot;이 서비스가 나를 착취하지 않을 것&quot;이라는 신뢰의 욕구가 깔려 있다.
            협동조합 형태 자체가 이 신뢰를 만드는 구조적 자산이다.
          </div>
        </div>
      </section>
    </>
  );
}
