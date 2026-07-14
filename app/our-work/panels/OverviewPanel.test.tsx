import { render, screen } from '@testing-library/react';

import styles from '../our-work.module.css';
import { expectOnlyOurWorkModuleClasses } from '../test/assert-css-module-classes';
import { OverviewPanel } from './OverviewPanel';

it('preserves the overview sections and item counts', () => {
  const { container } = render(<OverviewPanel />);

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    '트위터를 대체할우리만의 SNS를 만듭니다',
  );
  expect(container.querySelectorAll(`.${styles['compare-table']} tbody tr`)).toHaveLength(6);
  expect(container.querySelectorAll(`.${styles['reason-card']}`)).toHaveLength(4);
  expect(container.querySelectorAll(`.${styles['build-card']}`)).toHaveLength(6);
  expect(container.querySelectorAll(`.${styles['user-card']}`)).toHaveLength(3);
  expect(container.querySelectorAll(`.${styles['stat-chip']}`)).toHaveLength(6);
  expect(container.querySelectorAll(`.${styles['insight-card']}`)).toHaveLength(4);
  expect(container.querySelectorAll(`.${styles['pain-table']} tbody tr`)).toHaveLength(9);
  expectOnlyOurWorkModuleClasses(container);
});
