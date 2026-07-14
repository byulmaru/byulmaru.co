import { render, screen } from '@testing-library/react';

import { OverviewPanel } from './OverviewPanel';

it('preserves the overview sections and item counts', () => {
  const { container } = render(<OverviewPanel />);

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    '트위터를 대체할우리만의 SNS를 만듭니다',
  );
  expect(container.querySelectorAll('.compare-table tbody tr')).toHaveLength(6);
  expect(container.querySelectorAll('.reason-card')).toHaveLength(4);
  expect(container.querySelectorAll('.build-card')).toHaveLength(6);
  expect(container.querySelectorAll('.user-card')).toHaveLength(3);
  expect(container.querySelectorAll('.stat-chip')).toHaveLength(6);
  expect(container.querySelectorAll('.insight-card')).toHaveLength(4);
  expect(container.querySelectorAll('.pain-table tbody tr')).toHaveLength(9);
});
