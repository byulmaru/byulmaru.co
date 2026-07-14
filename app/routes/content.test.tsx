import { render, screen } from '@testing-library/react';

import AboutUs from './about-us';
import Home from './home';

it('preserves the home and team copy', () => {
  const { rerender } = render(<Home />);

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    '동인이 만드는,동인을 위한 플랫폼',
  );
  expect(screen.getByRole('link', { name: '메일 보내기 →' })).toHaveAttribute('target', '_blank');

  rerender(<AboutUs />);

  expect(screen.getAllByRole('article')).toHaveLength(3);
  expect(screen.getByText('유키')).toBeVisible();
  expect(screen.getByText('샤샤')).toBeVisible();
  expect(screen.getByText('헤헤즈')).toBeVisible();
});
