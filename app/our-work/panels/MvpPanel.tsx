import type { ReactElement } from 'react';

import { launchMetrics, mvpKicks, outOfScope, scopeGroups } from '../content';
import styles from '../our-work.module.css';

export function MvpPanel(): ReactElement {
  return (
    <section
      className={`${styles['ow-section']} ${styles['tab-panel']}`}
      id="panel-mvp"
      role="tabpanel"
      aria-labelledby="tab-mvp"
    >
      <div className={styles.container}>
        <p className={styles['sec-label']}>kosmo-docs · MVP Scope</p>
        <h2 className={styles['sec-title']}>MVP 범위</h2>

        <p className={styles['subsec-label']}>Must — 이것 때문에 사용자가 옵니다</p>
        <div className={styles['feature-grid']}>
          {mvpKicks.map((item) => (
            <article className={styles['feature-card']} key={item.title}>
              <div className={styles['feature-tags']}>
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>

        <p className={styles['subsec-label']}>기능 범위 (Must 기준)</p>
        <div className={styles['scope-grid']}>
          {scopeGroups.map(([title, body]) => (
            <div className={styles['scope-item']} key={title}>
              <p className={styles['scope-title']}>{title}</p>
              <p>{body}</p>
            </div>
          ))}
        </div>

        <p className={styles['subsec-label']}>Out of Scope — 이번 사이클에서 명시적으로 제외</p>
        <div className={styles['oos-grid']}>
          {outOfScope.map((item) => (
            <div className={styles['oos-item']} key={item}>
              <span className={styles['oos-x']}>✕</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <p className={styles['subsec-label']}>MVP 성공 지표</p>
        <div className={styles['metrics-panel']}>
          <div className={styles['metric-list']}>
            {launchMetrics.map(([label, value]) => (
              <div className={styles['metric-row']} key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
