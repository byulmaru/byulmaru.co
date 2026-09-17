import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';

import { ProfileSwitcherDemo } from './WorkMotion';

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

it('plays profiles once, suspends offscreen/hidden, and stays stopped after manual selection', () => {
  vi.useFakeTimers();
  const observed: { callback: IntersectionObserverCallback; target: Element }[] = [];
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(private callback: IntersectionObserverCallback) {}
      observe(target: Element) {
        observed.push({ callback: this.callback, target });
      }
      unobserve() {}
      disconnect() {}
    },
  );
  render(<ProfileSwitcherDemo />);
  const region = screen.getByRole('region', { name: '멀티 프로필 시연' });
  const view = (isIntersecting: boolean) =>
    act(() => {
      for (const { callback, target } of observed.filter((o) => o.target === region)) {
        callback(
          [{ target, isIntersecting } as IntersectionObserverEntry],
          {} as IntersectionObserver,
        );
      }
    });
  const post = () => screen.getByRole('img', { name: /선택한 프로필/ }).getAttribute('src');
  const tick = () => act(() => vi.advanceTimersByTime(2800));
  view(true);
  tick();
  expect(post()).toBe('/figma/work-game-post.png');
  view(false);
  tick();
  expect(post()).toBe('/figma/work-game-post.png');
  view(true);
  const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
  act(() => document.dispatchEvent(new Event('visibilitychange')));
  tick();
  expect(post()).toBe('/figma/work-game-post.png');
  hidden.mockReturnValue(false);
  act(() => document.dispatchEvent(new Event('visibilitychange')));
  tick();
  expect(post()).toBe('/figma/work-daily-post.png');
  act(() => vi.advanceTimersByTime(28000));
  expect(post()).toBe('/figma/work-daily-post.png');
  view(false);
  view(true);
  tick();
  expect(post()).toBe('/figma/work-daily-post.png');
  expect(screen.queryByRole('button', { name: /프로필 자동 전환/ })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /^모래\s*@morae$/ }));
  tick();
  expect(post()).toBe('/figma/work-post.png');
});
