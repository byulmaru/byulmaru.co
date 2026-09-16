import { act, render, screen, within } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import { PostCarousel } from './PostCarousel';

it.each([false, true])(
  'starts the hero gallery after 2 seconds and keeps later reading holds (%s)',
  (product) => {
    vi.useFakeTimers();
    try {
      render(<PostCarousel product={product} />);
      const gallery = within(screen.getByRole('region', { name: '코스모 게시물 미리보기' }));
      const initial = gallery.getByRole('img').getAttribute('src');
      act(() => vi.advanceTimersByTime(1999));
      expect(gallery.getByRole('img')).toHaveAttribute('src', initial);
      act(() => vi.advanceTimersByTime(1));
      const next = gallery.getByRole('img').getAttribute('src');
      expect(next).not.toBe(initial);
      act(() => vi.advanceTimersByTime(3999));
      expect(gallery.getByRole('img')).toHaveAttribute('src', next);
      act(() => vi.advanceTimersByTime(1));
      expect(gallery.getByRole('img').getAttribute('src')).not.toBe(next);
    }
    finally {
      vi.useRealTimers();
    }
  },
);
