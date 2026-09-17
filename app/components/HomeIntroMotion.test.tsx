import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';

import { JourneyPreview, OriginQuote } from './HomeIntroMotion';

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
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
