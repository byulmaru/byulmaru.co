import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { afterEach, expect, it, vi } from 'vitest';

import Home from '../routes/home';
import { JourneyPreview, OriginQuote } from './HomeIntroMotion';

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it('keeps the three member introductions without decorative interest cards', () => {
  const { container } = render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
  const rows = container.querySelectorAll('.team-row');
  expect(rows).toHaveLength(3);
  expect(screen.queryAllByRole('group', { name: /의 관심사$/ })).toHaveLength(0);
  rows.forEach((row) => {
    expect(row.querySelector('img')).toBeVisible();
    expect(row.querySelector('h3')).toBeVisible();
  });
});

it('keeps the quote and all preview images visible with reduced motion', () => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches: query.includes('reduce') && !query.includes('no-preference'),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
    })),
  );
  render(
    <>
      <OriginQuote />
      <JourneyPreview />
    </>,
  );
  expect(screen.getByText('“있었으면 했던 공간을,')).toBeVisible();
  expect(screen.getByText('함께 쓸 수 있는 공간으로.”')).toBeVisible();
  const images = screen.getAllByRole('img');
  expect(images).toHaveLength(3);
  images.forEach((image) => expect(image).toBeVisible());
});
