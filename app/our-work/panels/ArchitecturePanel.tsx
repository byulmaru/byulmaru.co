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

export function ArchitecturePanel(): ReactElement {
  return (
    <div role="tabpanel" id="panel-architecture" aria-labelledby="tab-architecture">
      <section className="ow-section tab-panel">
        <div className="container">
          <p className="sec-label">kosmo-docs · Inner Architecture</p>
          <h2 className="sec-title">Inner Architecture</h2>

          <div className="arch-diagram">
            <div className="arch-tier">
              <div className="arch-tier-label">Client</div>
              <div className="arch-tier-nodes">
                <div className="arch-node client">
                  <span className="an-title">Expo Router</span>
                  <span className="an-sub">iOS · Android · Web SSR</span>
                </div>
              </div>
            </div>

            <div className="arch-connector">
              <span>HTTPS</span>
            </div>

            <div className="arch-tier">
              <div className="arch-tier-label">Edge</div>
              <div className="arch-tier-nodes">
                <div className="arch-node edge">
                  <span className="an-title">Nginx Ingress</span>
                  <span className="an-sub">+ cert-manager</span>
                </div>
              </div>
            </div>

            <div className="arch-connector">
              <span></span>
            </div>

            <div className="arch-tier">
              <div className="arch-tier-label">Transport (L1) — Bun + Hono</div>
              <div className="arch-tier-nodes">
                <div className="arch-node transport">
                  <span className="an-title">Fedify middleware</span>
                  <span className="an-sub">/.well-known · /users/* · /inbox · /outbox</span>
                </div>
                <div className="arch-node transport">
                  <span className="an-title">GraphQL Yoga</span>
                  <span className="an-sub">Pothos · urql · /graphql</span>
                </div>
                <div className="arch-node transport">
                  <span className="an-title">Mastodon REST</span>
                  <span className="an-sub">/api/v1/* compat.</span>
                </div>
              </div>
            </div>

            <div className="arch-connector">
              <span></span>
            </div>

            <div className="arch-tier">
              <div className="arch-tier-label">Application (L2) — Domain Services</div>
              <div className="arch-tier-nodes wide">
                {architectureDomainServices.map((service) => (
                  <div className="arch-node domain" key={service}>
                    <span className="an-title">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="arch-connector">
              <span></span>
            </div>

            <div className="arch-tier">
              <div className="arch-tier-label">Infrastructure</div>
              <div className="arch-tier-nodes">
                <div className="arch-node infra">
                  <span className="an-title">PostgreSQL 16</span>
                  <span className="an-sub">Drizzle ORM</span>
                </div>
                <div className="arch-node infra">
                  <span className="an-title">Redis</span>
                  <span className="an-sub">timeline · cache · session · rate-limit</span>
                </div>
                <div className="arch-node infra queue">
                  <span className="an-title">BullMQ</span>
                  <span className="an-sub">outbound · inbound · media · notifications</span>
                </div>
              </div>
            </div>

            <div className="arch-connector">
              <span></span>
            </div>

            <div className="arch-tier">
              <div className="arch-tier-label">Workers — kosmo-worker (Bun)</div>
              <div className="arch-tier-nodes">
                {architectureWorkers.map(([name, detail]) => (
                  <div className="arch-node worker" key={name}>
                    <span className="an-title">{name}</span>
                    <span className="an-sub">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="arch-connector">
              <span></span>
            </div>

            <div className="arch-tier external-tier">
              <div className="arch-tier-label">External</div>
              <div className="arch-tier-nodes">
                {architectureExternals.map(([name, detail]) => (
                  <div className="arch-node external" key={name}>
                    <span className="an-title">{name}</span>
                    <span className="an-sub">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="subsec-label" style={{ marginTop: 32 }}>
            Request Pipelines
          </p>
          <div className="pipeline-grid">
            <div className="pipeline-card">
              <p className="pipeline-label">Outbound</p>
              <h3>게시물 작성 → 즉시 응답 → 비동기 발신</h3>
              <div className="pipeline-steps">
                {outboundPipeline.map((step, index) => (
                  <div className="pipeline-step" key={step}>
                    <span className="step-num">{index + 1}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pipeline-card">
              <p className="pipeline-label">Inbound</p>
              <h3>외부 Activity 수신 → 202 즉시 응답 → 비동기 반영</h3>
              <div className="pipeline-steps">
                {inboundPipeline.map((step, index) => (
                  <div className="pipeline-step" key={step}>
                    <span className="step-num">{index + 1}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ow-section">
        <div className="container">
          <p className="sec-label">kosmo-docs · Outer Architecture</p>
          <h2 className="sec-title">Outer Architecture</h2>

          <div className="outer-diagram">
            <div className="outer-tier">
              <div className="outer-tier-label">Internet</div>
              <div className="outer-tier-nodes">
                <div className="outer-node inet">
                  <span className="an-title">User Clients</span>
                  <span className="an-sub">iOS · Android · Web</span>
                </div>
                <div className="outer-node inet">
                  <span className="an-title">Fediverse Peers</span>
                  <span className="an-sub">mastodon.social · planet.moe …</span>
                </div>
                <div className="outer-node inet">
                  <span className="an-title">AT Protocol Network</span>
                  <span className="an-sub">Relay · AppView · PDS</span>
                </div>
              </div>
            </div>

            <div className="arch-connector">
              <span>HTTPS</span>
            </div>

            <div className="outer-tier">
              <div className="outer-tier-label">Cloudflare</div>
              <div className="outer-tier-nodes">
                <div className="outer-node cf">
                  <span className="an-title">DNS · CDN · WAF · Rate Limiting (L7)</span>
                  <span className="an-sub">kos.moe · api.kos.moe · media.kos.moe</span>
                </div>
              </div>
            </div>

            <div className="arch-connector">
              <span></span>
            </div>

            <div className="outer-tier oke-tier">
              <div className="outer-tier-label">OCI OKE — ap-seoul-1</div>
              <div className="oke-cluster">
                <div className="oke-ns">
                  <div className="oke-ns-label">ns: kosmo-prod</div>
                  <div className="oke-pods">
                    <div className="oke-pod">
                      api<span>Blue/Green Rollout</span>
                    </div>
                    <div className="oke-pod">
                      worker<span>BullMQ consumers</span>
                    </div>
                    <div className="oke-pod">
                      expo-web<span>RNW SSR</span>
                    </div>
                  </div>
                </div>
                <div className="oke-ns">
                  <div className="oke-ns-label">ns: ops</div>
                  <div className="oke-pods">
                    <div className="oke-pod">
                      Argo CD<span>GitOps</span>
                    </div>
                    <div className="oke-pod">
                      Infisical<span>secrets</span>
                    </div>
                    <div className="oke-pod">
                      Grafana<span>dashboards</span>
                    </div>
                    <div className="oke-pod">
                      Loki · Tempo<span>logs · traces</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="arch-connector">
              <span></span>
            </div>

            <div className="outer-tier">
              <div className="outer-tier-label">Data</div>
              <div className="outer-tier-nodes">
                <div className="outer-node data">
                  <span className="an-title">PostgreSQL 16</span>
                  <span className="an-sub">OCI Database · Primary + Read Replica</span>
                </div>
                <div className="outer-node data">
                  <span className="an-title">Redis</span>
                  <span className="an-sub">OCI Cache · BullMQ + timeline cache</span>
                </div>
                <div className="outer-node data">
                  <span className="an-title">Object Storage</span>
                  <span className="an-sub">OCI OSS + Cloudflare CDN</span>
                </div>
                <div className="outer-node oidc">
                  <span className="an-title">Byulmaru OIDC</span>
                  <span className="an-sub">인증 SSoT</span>
                </div>
              </div>
            </div>

            <div className="outer-dr">
              <span className="dr-label">DR (AWS backup)</span>
              <span>
                PostgreSQL logical replication → RDS · Object Storage async → S3 · DNS failover via
                Route 53
              </span>
            </div>
          </div>

          <p className="subsec-label" style={{ marginTop: 32 }}>
            CI / CD
          </p>
          <div className="cicd-flow">
            {cicdSteps.map(([step, description], index) => (
              <Fragment key={step}>
                <div className="cicd-step">
                  <span className="cicd-step-label">{step}</span>
                  <span className="cicd-step-desc">{description}</span>
                </div>
                {index < cicdSteps.length - 1 ? <div className="cicd-arrow">→</div> : null}
              </Fragment>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
