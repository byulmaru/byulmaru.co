import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import OurWork from './our-work';

it('mounts one active panel and recreates the overview stars after returning', async () => {
  const { container } = render(<OurWork />);

  await waitFor(() => expect(container.querySelectorAll('[data-star]')).toHaveLength(120));
  expect(screen.getAllByRole('tabpanel')).toHaveLength(1);
  expect(screen.getByRole('tabpanel')).toHaveAttribute('id', 'panel-overview');
  const firstStar = container.querySelector('[data-star]');

  fireEvent.click(screen.getByRole('tab', { name: /MVP Scope/ }));

  expect(screen.getAllByRole('tabpanel')).toHaveLength(1);
  expect(screen.getByRole('tabpanel')).toHaveAttribute('id', 'panel-mvp');
  expect(container.querySelectorAll('[data-star]')).toHaveLength(0);

  fireEvent.click(screen.getByRole('tab', { name: /Overview/ }));

  await waitFor(() => expect(container.querySelectorAll('[data-star]')).toHaveLength(120));
  expect(screen.getAllByRole('tabpanel')).toHaveLength(1);
  expect(screen.getByRole('tabpanel')).toHaveAttribute('id', 'panel-overview');
  expect(container.querySelector('[data-star]')).not.toBe(firstStar);
});
