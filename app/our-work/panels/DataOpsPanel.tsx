import type { ReactElement } from 'react';
import { Fragment } from 'react';

import { dataPrinciples, dbTables, launchMetrics, schemaRelations } from '../content';
import styles from '../our-work.module.css';

export function DataOpsPanel(): ReactElement {
  return (
    <section
      className={`${styles['ow-section']} ${styles['tab-panel']}`}
      id="panel-data"
      role="tabpanel"
      aria-labelledby="tab-data"
    >
      <div className={styles.container}>
        <p className={styles['sec-label']}>kosmo-docs · DB Schema</p>
        <h2 className={styles['sec-title']}>DB Schema</h2>

        <div className={styles['schema-relation']}>
          <div className={styles['sr-chain']}>
            {schemaRelations.map(([table, primaryKey], index) => (
              <Fragment key={table}>
                <div className={styles['sr-table']}>
                  <span className={styles['sr-name']}>{table}</span>
                  <span className={styles['sr-pk']}>{primaryKey}</span>
                </div>
                {index < 3 ? <div className={styles['sr-arrow']}>1 : N →</div> : null}
              </Fragment>
            ))}
          </div>
          <div className={styles['sr-extra']}>
            <div className={styles['sr-extra-item']}>
              account_profile <span>N:M</span> account ↔ profile
            </div>
            <div className={styles['sr-extra-item']}>
              session <span>N:1</span> account
            </div>
            <div className={styles['sr-extra-item']}>
              profile_follow <span>N:M</span> profile ↔ profile
            </div>
            <div className={styles['sr-extra-item']}>
              application_secret <span>N:1</span> application
            </div>
          </div>
        </div>

        <div className={styles['schema-grid']}>
          {dbTables.map((table) => (
            <div className={styles['schema-card']} key={table.name}>
              <div className={styles['schema-card-head']}>
                <span className={styles['sc-name']}>{table.name}</span>
                <span className={styles['sc-pk']}>{table.pk}</span>
              </div>
              <div className={styles['sc-cols']}>
                {table.cols.map((column) => (
                  <code key={column}>{column}</code>
                ))}
              </div>
              <p className={styles['sc-note']}>{table.note}</p>
            </div>
          ))}
        </div>

        <p className={styles['subsec-label']} style={{ marginTop: 32 }}>
          설계 원칙
        </p>
        <div className={styles['data-grid']}>
          {dataPrinciples.map(([title, body]) => (
            <div className={styles['data-card']} key={title}>
              <p className={styles['data-title']}>{title}</p>
              <p>{body}</p>
            </div>
          ))}
        </div>

        <p className={styles['subsec-label']} style={{ marginTop: 32 }}>
          Launch KPI
        </p>
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
