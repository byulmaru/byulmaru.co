import type { ReactElement } from 'react';
import { Fragment } from 'react';

import { dataPrinciples, dbTables, launchMetrics, schemaRelations } from '../content';

export function DataOpsPanel(): ReactElement {
  return (
    <section
      className="ow-section tab-panel"
      id="panel-data"
      role="tabpanel"
      aria-labelledby="tab-data"
    >
      <div className="container">
        <p className="sec-label">kosmo-docs · DB Schema</p>
        <h2 className="sec-title">DB Schema</h2>

        <div className="schema-relation">
          <div className="sr-chain">
            {schemaRelations.map(([table, primaryKey], index) => (
              <Fragment key={table}>
                <div className="sr-table">
                  <span className="sr-name">{table}</span>
                  <span className="sr-pk">{primaryKey}</span>
                </div>
                {index < 3 ? <div className="sr-arrow">1 : N →</div> : null}
              </Fragment>
            ))}
          </div>
          <div className="sr-extra">
            <div className="sr-extra-item">
              account_profile <span>N:M</span> account ↔ profile
            </div>
            <div className="sr-extra-item">
              session <span>N:1</span> account
            </div>
            <div className="sr-extra-item">
              profile_follow <span>N:M</span> profile ↔ profile
            </div>
            <div className="sr-extra-item">
              application_secret <span>N:1</span> application
            </div>
          </div>
        </div>

        <div className="schema-grid">
          {dbTables.map((table) => (
            <div className="schema-card" key={table.name}>
              <div className="schema-card-head">
                <span className="sc-name">{table.name}</span>
                <span className="sc-pk">{table.pk}</span>
              </div>
              <div className="sc-cols">
                {table.cols.map((column) => (
                  <code key={column}>{column}</code>
                ))}
              </div>
              <p className="sc-note">{table.note}</p>
            </div>
          ))}
        </div>

        <p className="subsec-label" style={{ marginTop: 32 }}>
          설계 원칙
        </p>
        <div className="data-grid">
          {dataPrinciples.map(([title, body]) => (
            <div className="data-card" key={title}>
              <p className="data-title">{title}</p>
              <p>{body}</p>
            </div>
          ))}
        </div>

        <p className="subsec-label" style={{ marginTop: 32 }}>
          Launch KPI
        </p>
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
