import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';

import { JourneyMockup } from './JourneyMockup';

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

it('waits for the visible active scene to settle, cancels a skipped scene and plays only once', async () => {
  vi.useFakeTimers();
  let intersect: IntersectionObserverCallback;
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(callback: IntersectionObserverCallback) {
        intersect = callback;
      }
      observe() {}
      disconnect() {}
    },
  );
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {},
  }));
  const { container } = render(
    <div className="journey-scenes" data-animated="true">
      <section className="feature-scene" data-position="after">
        <JourneyMockup image="thread" alt="답글 목업" width={400} height={600} />
      </section>
    </div>,
  );
  const scene = container.querySelector('section')!;
  const image = screen.getByAltText('답글 목업');
  const mockup = image.closest('.product-mockup');
  expect(mockup).toHaveAttribute('data-phase', 'waiting');
  act(() =>
    intersect!([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver),
  );
  act(() => vi.advanceTimersByTime(3000));
  expect(mockup).toHaveAttribute('data-phase', 'waiting');
  await act(async () => {
    scene.dataset.position = 'current';
  });
  act(() => vi.advanceTimersByTime(800));
  await act(async () => {
    scene.dataset.position = 'before';
  });
  act(() => vi.advanceTimersByTime(2000));
  expect(mockup).toHaveAttribute('data-phase', 'waiting');
  await act(async () => {
    scene.dataset.position = 'current';
  });
  act(() => vi.advanceTimersByTime(1600));
  expect(mockup).toHaveAttribute('data-phase', 'playing');
  await act(async () => {
    scene.dataset.position = 'before';
  });
  expect(mockup).toHaveAttribute('data-phase', 'playing');
});

it('keeps the completed attachment visible without animation in reduced motion', () => {
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe() {}
      disconnect() {}
    },
  );
  vi.stubGlobal('matchMedia', () => ({
    matches: true,
    addEventListener() {},
    removeEventListener() {},
  }));
  render(<JourneyMockup image="composer" alt="글쓰기 목업" width={520} height={401} />);
  expect(screen.getByAltText('글쓰기 목업').closest('.product-mockup')).toHaveAttribute(
    'data-phase',
    'static',
  );
  expect(screen.getByLabelText('첨부된 파란 캐릭터와 토끼 낙서')).toBeInTheDocument();
});
