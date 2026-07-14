import { useState } from 'react';

import { OurWorkTabs } from '../our-work/components/OurWorkTabs';
import { StarField } from '../our-work/components/StarField';
import type { OurWorkTabId } from '../our-work/content';

export function meta() {
  return [{ title: 'Our Work — 별마루' }];
}

export default function OurWork() {
  const [activeTab, setActiveTab] = useState<OurWorkTabId>('overview');

  return (
    <div className="our-work-page">
      <OurWorkTabs activeTab={activeTab} onChange={setActiveTab} />
      <div
        className={activeTab === 'overview' ? undefined : 'ow-section tab-panel'}
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        key={activeTab}
      >
        {activeTab === 'overview' ? (
          <div className="hero">
            <StarField />
          </div>
        ) : null}
      </div>
    </div>
  );
}
