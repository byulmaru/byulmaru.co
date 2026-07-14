import type { KeyboardEvent } from 'react';

import type { OurWorkTabId } from '../content';
import { OUR_WORK_TABS } from '../content';

interface OurWorkTabsProps {
  activeTab: OurWorkTabId;
  onChange: (tab: OurWorkTabId) => void;
}

export function OurWorkTabs({ activeTab, onChange }: OurWorkTabsProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const activeIndex = OUR_WORK_TABS.findIndex((tab) => tab.id === activeTab);
    let nextIndex: number;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (activeIndex + 1) % OUR_WORK_TABS.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (activeIndex - 1 + OUR_WORK_TABS.length) % OUR_WORK_TABS.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = OUR_WORK_TABS.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextTab = OUR_WORK_TABS[nextIndex];
    onChange(nextTab.id);
    document.getElementById(`tab-${nextTab.id}`)?.focus();
  }

  return (
    <section className="tab-shell" aria-label="Our Work categories">
      <div className="container">
        <div
          className="tab-list"
          role="tablist"
          aria-label="Our Work categories"
          tabIndex={-1}
          onKeyDown={handleKeyDown}
        >
          {OUR_WORK_TABS.map((tab) => (
            <button
              id={`tab-${tab.id}`}
              className={activeTab === tab.id ? 'active' : undefined}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => onChange(tab.id)}
              key={tab.id}
            >
              <span className="tab-label">{tab.label}</span>
              <span className="tab-desc">{tab.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
