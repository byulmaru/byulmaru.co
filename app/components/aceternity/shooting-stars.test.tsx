import { act, render } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import { ShootingStars } from './shooting-stars';

it.each([0.1, 0.4, 0.6, 0.9])('starts above and moves down for random value %s', (random) => {
  vi.useFakeTimers();
  const rng = vi.spyOn(Math, 'random').mockReturnValue(random);
  const view = render(<ShootingStars />);
  try {
    const star = view.container.querySelector('rect')!;
    expect(Number(star.getAttribute('y'))).toBe(0);
    act(() => vi.advanceTimersByTime(20));
    expect(Number(view.container.querySelector('rect')!.getAttribute('y'))).toBeGreaterThan(0);
  }
  finally {
    view.unmount();
    rng.mockRestore();
    vi.useRealTimers();
  }
});

it('cleans up scheduled meteors and animation frames on unmount', () => {
  vi.useFakeTimers();
  try {
    const view = render(<ShootingStars />);
    expect(view.container.querySelector('rect')).not.toBeNull();
    expect(vi.getTimerCount()).toBeGreaterThan(0);
    view.unmount();
    expect(vi.getTimerCount()).toBe(0);
  }
  finally {
    vi.useRealTimers();
  }
});
