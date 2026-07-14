import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';

import { Header } from './Header';

const navItems = [
  { href: '/', label: 'About Team' },
  { href: '/about-us', label: 'About us' },
  { href: '/our-work', label: 'Our Work' },
] as const;

it('toggles and closes the mobile menu', async () => {
  const user = userEvent.setup();
  render(<Header navItems={navItems} />, { wrapper: BrowserRouter });
  const button = screen.getByRole('button', { name: 'Open menu' });

  await user.click(button);

  expect(button).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();

  await user.click(screen.getAllByRole('link', { name: 'About us' }).at(-1)!);

  expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument();
});
