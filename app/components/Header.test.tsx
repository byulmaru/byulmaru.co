import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';

import { Footer } from './Footer';
import { Header } from './Header';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about-us', label: 'About Us' },
  { href: '/our-work', label: 'Our Work' },
] as const;

it('toggles and closes the mobile menu', async () => {
  const user = userEvent.setup();
  render(<Header navItems={navItems} />, { wrapper: BrowserRouter });
  const button = screen.getByRole('button', { name: 'Open menu' });

  await user.click(button);

  expect(button).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();

  await user.click(screen.getAllByRole('link', { name: 'About Us' }).at(-1)!);

  expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument();
});

it('links news to the official account and exposes the current page', () => {
  window.history.replaceState(null, '', '/');
  render(<Header navItems={navItems} />, { wrapper: BrowserRouter });
  expect(screen.getByRole('link', { name: '소식 받기' })).toHaveAttribute(
    'href',
    'https://kos.moe/@kosmo',
  );
  expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
});

it('closes the mobile menu with Escape and returns focus to its trigger', async () => {
  const user = userEvent.setup();
  render(<Header navItems={navItems} />, { wrapper: BrowserRouter });
  const trigger = screen.getByRole('button', { name: 'Open menu' });
  await user.click(trigger);
  screen.getAllByRole('link', { name: 'About Us' }).at(-1)!.focus();
  await user.keyboard('{Escape}');
  expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
});

it('shares approved footer copy and official contact destinations', () => {
  render(<Footer navItems={navItems} />, { wrapper: BrowserRouter });
  expect(screen.getByText(/좋아하는 마음이/)).toHaveTextContent('좋아하는 마음이새로운 만남으로');
  expect(screen.getByRole('link', { name: '코스모 공식 계정 ↗' })).toHaveAttribute(
    'href',
    'https://kos.moe/@kosmo',
  );
  expect(screen.getByRole('link', { name: 'X 공식 계정 ↗' })).toHaveAttribute(
    'href',
    'https://x.com/kos__moe',
  );
});
