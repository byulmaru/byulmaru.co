import { fireEvent, render, screen, within } from '@testing-library/react';
import { vi } from 'vitest';

import { OUR_WORK_TABS } from '../content';
import { OurWorkTabs } from './OurWorkTabs';

it('renders the original tabs with their ARIA relationships and roving tab stops', () => {
  render(<OurWorkTabs activeTab="overview" onChange={vi.fn()} />);

  const tabList = screen.getByRole('tablist', { name: 'Our Work categories' });
  const tabs = within(tabList).getAllByRole('tab');

  expect(tabs).toHaveLength(OUR_WORK_TABS.length);
  OUR_WORK_TABS.forEach((tab, index) => {
    expect(tabs[index]).toHaveTextContent(tab.label);
    expect(tabs[index]).toHaveTextContent(tab.desc);
    expect(tabs[index]).toHaveAttribute('id', `tab-${tab.id}`);
    expect(tabs[index]).toHaveAttribute('aria-controls', `panel-${tab.id}`);
    expect(tabs[index]).toHaveAttribute('aria-selected', String(tab.id === 'overview'));
    expect(tabs[index]).toHaveAttribute('tabindex', tab.id === 'overview' ? '0' : '-1');
  });
});

it('changes the active tab when a tab is clicked', () => {
  const onChange = vi.fn();
  render(<OurWorkTabs activeTab="overview" onChange={onChange} />);

  fireEvent.click(screen.getByRole('tab', { name: /MVP Scope/ }));

  expect(onChange).toHaveBeenCalledWith('mvp');
});

it.each([
  ['ArrowRight', 'mvp'],
  ['ArrowDown', 'mvp'],
  ['ArrowLeft', 'data'],
  ['ArrowUp', 'data'],
  ['End', 'data'],
  ['Home', 'overview'],
] as const)('moves focus with %s', (key, expected) => {
  const onChange = vi.fn();
  render(<OurWorkTabs activeTab="overview" onChange={onChange} />);
  const overview = screen.getByRole('tab', { name: /Overview/ });
  overview.focus();

  fireEvent.keyDown(overview.parentElement!, { key });

  expect(onChange).toHaveBeenCalledWith(expected);
  expect(document.activeElement).toBe(document.getElementById(`tab-${expected}`));
});

it('ignores unrelated keys', () => {
  const onChange = vi.fn();
  render(<OurWorkTabs activeTab="overview" onChange={onChange} />);

  fireEvent.keyDown(screen.getByRole('tablist'), { key: 'Escape' });

  expect(onChange).not.toHaveBeenCalled();
});
