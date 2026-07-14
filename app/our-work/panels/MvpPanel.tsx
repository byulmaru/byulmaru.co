import type { ReactElement } from 'react';

import { launchMetrics, mvpKicks, outOfScope, scopeGroups } from '../content';

export function MvpPanel(): ReactElement {
  return (
    <section
      className="ow-section tab-panel"
      id="panel-mvp"
      role="tabpanel"
      aria-labelledby="tab-mvp"
    >
      <div className="container">
        <p className="sec-label">kosmo-docs · MVP Scope</p>
        <h2 className="sec-title">MVP 범위</h2>

        <p className="subsec-label">Must — 이것 때문에 사용자가 옵니다</p>
        <div className="feature-grid">
          {mvpKicks.map((item) => (
            <article className="feature-card" key={item.title}>
              <div className="feature-tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>

        <p className="subsec-label">기능 범위 (Must 기준)</p>
        <div className="scope-grid">
          {scopeGroups.map(([title, body]) => (
            <div className="scope-item" key={title}>
              <p className="scope-title">{title}</p>
              <p>{body}</p>
            </div>
          ))}
        </div>

        <p className="subsec-label">Out of Scope — 이번 사이클에서 명시적으로 제외</p>
        <div className="oos-grid">
          {outOfScope.map((item) => (
            <div className="oos-item" key={item}>
              <span className="oos-x">✕</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <p className="subsec-label">MVP 성공 지표</p>
        <div className="metrics-panel">
          <div className="metric-list">
            {launchMetrics.map(([label, value]) => (
              <div className="metric-row" key={label}>
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
