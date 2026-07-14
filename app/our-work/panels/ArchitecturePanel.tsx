import type { ReactElement } from 'react';
import { Fragment } from 'react';

import {
  architectureDomainServices,
  architectureExternals,
  architectureWorkers,
  cicdSteps,
  inboundPipeline,
  outboundPipeline,
} from '../content';
import styles from '../our-work.module.css';

export function ArchitecturePanel(): ReactElement {
  return (
    <div role="tabpanel" id="panel-architecture" aria-labelledby="tab-architecture">
      <section className={`${styles['ow-section']} ${styles['tab-panel']}`}>
        <div className={styles.container}>
          <p className={styles['sec-label']}>kosmo-docs · Inner Architecture</p>
          <h2 className={styles['sec-title']}>Inner Architecture</h2>

          <div className={styles['arch-diagram']}>
            <div className={styles['arch-tier']}>
              <div className={styles['arch-tier-label']}>Client</div>
              <div className={styles['arch-tier-nodes']}>
                <div className={`${styles['arch-node']} ${styles.client}`}>
                  <span className={styles['an-title']}>Expo Router</span>
                  <span className={styles['an-sub']}>iOS · Android · Web SSR</span>
                </div>
              </div>
            </div>

            <div className={styles['arch-connector']}>
              <span>HTTPS</span>
            </div>

            <div className={styles['arch-tier']}>
              <div className={styles['arch-tier-label']}>Edge</div>
              <div className={styles['arch-tier-nodes']}>
                <div className={`${styles['arch-node']} ${styles.edge}`}>
                  <span className={styles['an-title']}>Nginx Ingress</span>
                  <span className={styles['an-sub']}>+ cert-manager</span>
                </div>
              </div>
            </div>

            <div className={styles['arch-connector']}>
              <span></span>
            </div>

            <div className={styles['arch-tier']}>
              <div className={styles['arch-tier-label']}>Transport (L1) — Bun + Hono</div>
              <div className={styles['arch-tier-nodes']}>
                <div className={`${styles['arch-node']} ${styles.transport}`}>
                  <span className={styles['an-title']}>Fedify middleware</span>
                  <span className={styles['an-sub']}>
                    /.well-known · /users/* · /inbox · /outbox
                  </span>
                </div>
                <div className={`${styles['arch-node']} ${styles.transport}`}>
                  <span className={styles['an-title']}>GraphQL Yoga</span>
                  <span className={styles['an-sub']}>Pothos · urql · /graphql</span>
                </div>
                <div className={`${styles['arch-node']} ${styles.transport}`}>
                  <span className={styles['an-title']}>Mastodon REST</span>
                  <span className={styles['an-sub']}>/api/v1/* compat.</span>
                </div>
              </div>
            </div>

            <div className={styles['arch-connector']}>
              <span></span>
            </div>

            <div className={styles['arch-tier']}>
              <div className={styles['arch-tier-label']}>Application (L2) — Domain Services</div>
              <div className={`${styles['arch-tier-nodes']} ${styles.wide}`}>
                {architectureDomainServices.map((service) => (
                  <div className={`${styles['arch-node']} ${styles.domain}`} key={service}>
                    <span className={styles['an-title']}>{service}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles['arch-connector']}>
              <span></span>
            </div>

            <div className={styles['arch-tier']}>
              <div className={styles['arch-tier-label']}>Infrastructure</div>
              <div className={styles['arch-tier-nodes']}>
                <div className={`${styles['arch-node']} ${styles.infra}`}>
                  <span className={styles['an-title']}>PostgreSQL 16</span>
                  <span className={styles['an-sub']}>Drizzle ORM</span>
                </div>
                <div className={`${styles['arch-node']} ${styles.infra}`}>
                  <span className={styles['an-title']}>Redis</span>
                  <span className={styles['an-sub']}>timeline · cache · session · rate-limit</span>
                </div>
                <div className={`${styles['arch-node']} ${styles.infra} ${styles.queue}`}>
                  <span className={styles['an-title']}>BullMQ</span>
                  <span className={styles['an-sub']}>
                    outbound · inbound · media · notifications
                  </span>
                </div>
              </div>
            </div>

            <div className={styles['arch-connector']}>
              <span></span>
            </div>

            <div className={styles['arch-tier']}>
              <div className={styles['arch-tier-label']}>Workers — kosmo-worker (Bun)</div>
              <div className={styles['arch-tier-nodes']}>
                {architectureWorkers.map(([name, detail]) => (
                  <div className={`${styles['arch-node']} ${styles.worker}`} key={name}>
                    <span className={styles['an-title']}>{name}</span>
                    <span className={styles['an-sub']}>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles['arch-connector']}>
              <span></span>
            </div>

            <div className={`${styles['arch-tier']} ${styles['external-tier']}`}>
              <div className={styles['arch-tier-label']}>External</div>
              <div className={styles['arch-tier-nodes']}>
                {architectureExternals.map(([name, detail]) => (
                  <div className={`${styles['arch-node']} ${styles.external}`} key={name}>
                    <span className={styles['an-title']}>{name}</span>
                    <span className={styles['an-sub']}>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className={styles['subsec-label']} style={{ marginTop: 32 }}>
            Request Pipelines
          </p>
          <div className={styles['pipeline-grid']}>
            <div className={styles['pipeline-card']}>
              <p className={styles['pipeline-label']}>Outbound</p>
              <h3>게시물 작성 → 즉시 응답 → 비동기 발신</h3>
              <div className={styles['pipeline-steps']}>
                {outboundPipeline.map((step, index) => (
                  <div className={styles['pipeline-step']} key={step}>
                    <span className={styles['step-num']}>{index + 1}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles['pipeline-card']}>
              <p className={styles['pipeline-label']}>Inbound</p>
              <h3>외부 Activity 수신 → 202 즉시 응답 → 비동기 반영</h3>
              <div className={styles['pipeline-steps']}>
                {inboundPipeline.map((step, index) => (
                  <div className={styles['pipeline-step']} key={step}>
                    <span className={styles['step-num']}>{index + 1}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles['ow-section']}>
        <div className={styles.container}>
          <p className={styles['sec-label']}>kosmo-docs · Outer Architecture</p>
          <h2 className={styles['sec-title']}>Outer Architecture</h2>

          <div className={styles['outer-diagram']}>
            <div className={styles['outer-tier']}>
              <div className={styles['outer-tier-label']}>Internet</div>
              <div className={styles['outer-tier-nodes']}>
                <div className={`${styles['outer-node']} ${styles.inet}`}>
                  <span className={styles['an-title']}>User Clients</span>
                  <span className={styles['an-sub']}>iOS · Android · Web</span>
                </div>
                <div className={`${styles['outer-node']} ${styles.inet}`}>
                  <span className={styles['an-title']}>Fediverse Peers</span>
                  <span className={styles['an-sub']}>mastodon.social · planet.moe …</span>
                </div>
                <div className={`${styles['outer-node']} ${styles.inet}`}>
                  <span className={styles['an-title']}>AT Protocol Network</span>
                  <span className={styles['an-sub']}>Relay · AppView · PDS</span>
                </div>
              </div>
            </div>

            <div className={styles['arch-connector']}>
              <span>HTTPS</span>
            </div>

            <div className={styles['outer-tier']}>
              <div className={styles['outer-tier-label']}>Cloudflare</div>
              <div className={styles['outer-tier-nodes']}>
                <div className={`${styles['outer-node']} ${styles.cf}`}>
                  <span className={styles['an-title']}>DNS · CDN · WAF · Rate Limiting (L7)</span>
                  <span className={styles['an-sub']}>kos.moe · api.kos.moe · media.kos.moe</span>
                </div>
              </div>
            </div>

            <div className={styles['arch-connector']}>
              <span></span>
            </div>

            <div className={`${styles['outer-tier']} ${styles['oke-tier']}`}>
              <div className={styles['outer-tier-label']}>OCI OKE — ap-seoul-1</div>
              <div className={styles['oke-cluster']}>
                <div className={styles['oke-ns']}>
                  <div className={styles['oke-ns-label']}>ns: kosmo-prod</div>
                  <div className={styles['oke-pods']}>
                    <div className={styles['oke-pod']}>
                      api<span>Blue/Green Rollout</span>
                    </div>
                    <div className={styles['oke-pod']}>
                      worker<span>BullMQ consumers</span>
                    </div>
                    <div className={styles['oke-pod']}>
                      expo-web<span>RNW SSR</span>
                    </div>
                  </div>
                </div>
                <div className={styles['oke-ns']}>
                  <div className={styles['oke-ns-label']}>ns: ops</div>
                  <div className={styles['oke-pods']}>
                    <div className={styles['oke-pod']}>
                      Argo CD<span>GitOps</span>
                    </div>
                    <div className={styles['oke-pod']}>
                      Infisical<span>secrets</span>
                    </div>
                    <div className={styles['oke-pod']}>
                      Grafana<span>dashboards</span>
                    </div>
                    <div className={styles['oke-pod']}>
                      Loki · Tempo<span>logs · traces</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles['arch-connector']}>
              <span></span>
            </div>

            <div className={styles['outer-tier']}>
              <div className={styles['outer-tier-label']}>Data</div>
              <div className={styles['outer-tier-nodes']}>
                <div className={`${styles['outer-node']} ${styles.data}`}>
                  <span className={styles['an-title']}>PostgreSQL 16</span>
                  <span className={styles['an-sub']}>OCI Database · Primary + Read Replica</span>
                </div>
                <div className={`${styles['outer-node']} ${styles.data}`}>
                  <span className={styles['an-title']}>Redis</span>
                  <span className={styles['an-sub']}>OCI Cache · BullMQ + timeline cache</span>
                </div>
                <div className={`${styles['outer-node']} ${styles.data}`}>
                  <span className={styles['an-title']}>Object Storage</span>
                  <span className={styles['an-sub']}>OCI OSS + Cloudflare CDN</span>
                </div>
                <div className={`${styles['outer-node']} ${styles.oidc}`}>
                  <span className={styles['an-title']}>Byulmaru OIDC</span>
                  <span className={styles['an-sub']}>인증 SSoT</span>
                </div>
              </div>
            </div>

            <div className={styles['outer-dr']}>
              <span className={styles['dr-label']}>DR (AWS backup)</span>
              <span>
                PostgreSQL logical replication → RDS · Object Storage async → S3 · DNS failover via
                Route 53
              </span>
            </div>
          </div>

          <p className={styles['subsec-label']} style={{ marginTop: 32 }}>
            CI / CD
          </p>
          <div className={styles['cicd-flow']}>
            {cicdSteps.map(([step, description], index) => (
              <Fragment key={step}>
                <div className={styles['cicd-step']}>
                  <span className={styles['cicd-step-label']}>{step}</span>
                  <span className={styles['cicd-step-desc']}>{description}</span>
                </div>
                {index < cicdSteps.length - 1 ? (
                  <div className={styles['cicd-arrow']}>→</div>
                ) : null}
              </Fragment>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
