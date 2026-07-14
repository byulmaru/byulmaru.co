import type { ComponentType } from 'react';
import { useState } from 'react';

import { OurWorkTabs } from '../our-work/components/OurWorkTabs';
import type { OurWorkTabId } from '../our-work/content';
import styles from '../our-work/our-work.module.css';
import { ArchitecturePanel } from '../our-work/panels/ArchitecturePanel';
import { DataOpsPanel } from '../our-work/panels/DataOpsPanel';
import { JourneyPanel } from '../our-work/panels/JourneyPanel';
import { MvpPanel } from '../our-work/panels/MvpPanel';
import { OverviewPanel } from '../our-work/panels/OverviewPanel';

const PANELS = {
  overview: OverviewPanel,
  mvp: MvpPanel,
  journey: JourneyPanel,
  architecture: ArchitecturePanel,
  data: DataOpsPanel,
} satisfies Record<OurWorkTabId, ComponentType>;

export function meta() {
  return [{ title: 'Our Work — 별마루' }];
}

export default function OurWork() {
  const [activeTab, setActiveTab] = useState<OurWorkTabId>('overview');
  const ActivePanel = PANELS[activeTab];

  return (
    <div className={styles['our-work-page']}>
      <OurWorkTabs activeTab={activeTab} onChange={setActiveTab} />
      {activeTab === 'overview' ? (
        <div role="tabpanel" id="panel-overview" aria-labelledby="tab-overview" key={activeTab}>
          <ActivePanel />
        </div>
      ) : (
        <ActivePanel key={activeTab} />
      )}
    </div>
  );
}
