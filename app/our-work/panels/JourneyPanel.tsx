import type { ReactElement } from 'react';

import { journeys } from '../content';
import styles from '../our-work.module.css';

export function JourneyPanel(): ReactElement {
  return (
    <section
      className={`${styles['ow-section']} ${styles['tab-panel']}`}
      id="panel-journey"
      role="tabpanel"
      aria-labelledby="tab-journey"
    >
      <div className={styles.container}>
        <p className={styles['sec-label']}>kosmo-docs · User Scenarios</p>
        <h2 className={styles['sec-title']}>가입부터 연합, 탐색, 통합 피드까지의 핵심 여정</h2>
        <p className={styles['sec-lead']}>
          사용자 시나리오는 트리거, 사용자 동작, 시스템 동작, 결과 상태를 기준으로 작성되어
          있습니다. 페이지에서는 개발자가 빠르게 맥락을 잡을 수 있도록 대표 흐름만 추렸습니다.
        </p>

        <div className={styles['journey-list']}>
          {journeys.map(([code, title, body]) => (
            <article className={styles['journey-item']} key={code}>
              <span className={styles['journey-code']}>{code}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className={styles['callout-blue']}>
          <strong>핵심 UX 결론:</strong> 첫 가입 직후 팔로우가 없어도 비어 보이면 안 됩니다. 프로필
          태그 기반 탐색과 AT Protocol 수신 활동이 초기 피드의 빈 공간을 채우는 설계 축입니다.
        </div>
      </div>
    </section>
  );
}
