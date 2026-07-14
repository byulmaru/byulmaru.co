import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import OurWork from './our-work';

it('mounts one active panel and recreates the overview stars after returning', async () => {
  const { container } = render(<OurWork />);

  await waitFor(() => expect(container.querySelectorAll('[data-star]')).toHaveLength(120));
  expect(screen.getAllByRole('tabpanel')).toHaveLength(1);
  expect(screen.getByRole('tabpanel')).toHaveAttribute('id', 'panel-overview');
  expect(
    screen.getByRole('heading', { name: '트위터를 대체할 우리만의 SNS를 만듭니다' }),
  ).toBeVisible();
  const firstStar = container.querySelector('[data-star]');

  fireEvent.click(screen.getByRole('tab', { name: /MVP Scope/ }));

  expect(screen.getAllByRole('tabpanel')).toHaveLength(1);
  expect(screen.getByRole('tabpanel')).toHaveAttribute('id', 'panel-mvp');
  expect(screen.getByRole('heading', { name: 'MVP 범위' })).toBeVisible();
  expect(container.querySelectorAll('[data-star]')).toHaveLength(0);

  fireEvent.click(screen.getByRole('tab', { name: /User Journey/ }));

  expect(screen.getAllByRole('tabpanel')).toHaveLength(1);
  expect(screen.getByRole('tabpanel')).toHaveAttribute('id', 'panel-journey');
  expect(
    screen.getByRole('heading', {
      name: '가입부터 연합, 탐색, 통합 피드까지의 핵심 여정',
    }),
  ).toBeVisible();

  fireEvent.click(screen.getByRole('tab', { name: /Architecture/ }));

  expect(screen.getAllByRole('tabpanel')).toHaveLength(1);
  expect(screen.getByRole('tabpanel')).toHaveAttribute('id', 'panel-architecture');
  expect(screen.getByRole('heading', { name: 'Inner Architecture' })).toBeVisible();

  fireEvent.click(screen.getByRole('tab', { name: /Data & Ops/ }));

  expect(screen.getAllByRole('tabpanel')).toHaveLength(1);
  expect(screen.getByRole('tabpanel')).toHaveAttribute('id', 'panel-data');
  expect(screen.getByRole('heading', { name: 'DB Schema' })).toBeVisible();

  fireEvent.click(screen.getByRole('tab', { name: /Overview/ }));

  await waitFor(() => expect(container.querySelectorAll('[data-star]')).toHaveLength(120));
  expect(screen.getAllByRole('tabpanel')).toHaveLength(1);
  expect(screen.getByRole('tabpanel')).toHaveAttribute('id', 'panel-overview');
  expect(container.querySelector('[data-star]')).not.toBe(firstStar);
});
