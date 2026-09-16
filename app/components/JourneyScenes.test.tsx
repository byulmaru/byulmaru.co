import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';

import { JourneyScenes } from './JourneyScenes';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

it('shows the first scene immediately, changes at scroll boundaries, and reverses without cancelling scroll', () => {
  let top = window.innerHeight * 2;
  let enabled = true;
  vi.stubGlobal('matchMedia', () => ({
    get matches() {
      return enabled;
    },
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => ({
    top,
    bottom: top + window.innerHeight * 4,
    height: window.innerHeight * 4,
    left: 0,
    right: 1440,
    width: 1440,
    x: 0,
    y: top,
    toJSON() {},
  }));
  render(
    <JourneyScenes>
      {['발견', '표현', '연결'].map((name) => (
        <section className="feature-scene" key={name}>
          <h2>{name}</h2>
        </section>
      ))}
    </JourneyScenes>,
  );
  expect(screen.getByRole('heading', { name: '발견' })).toBeVisible();
  const journey = screen.getByRole('heading', { name: '발견' }).closest('.journey-scenes');
  expect(journey).not.toHaveAttribute('data-first-entered');
  top = window.innerHeight * 0.5;
  fireEvent.scroll(window);
  expect(journey).toHaveAttribute('data-first-entered', 'true');
  expect(screen.getByRole('heading', { name: '발견' })).toBeVisible();
  expect(screen.queryByRole('heading', { name: '표현' })).not.toBeInTheDocument();
  top = -window.innerHeight * 1.1;
  fireEvent.scroll(window);
  expect(screen.getByRole('heading', { name: '표현' })).toBeVisible();
  top = -window.innerHeight * 1.5;
  fireEvent.scroll(window);
  expect(screen.getByRole('heading', { name: '표현' })).toBeVisible();
  top = -window.innerHeight * 2.1;
  fireEvent.scroll(window);
  expect(screen.getByRole('heading', { name: '연결' })).toBeVisible();
  top = -window.innerHeight * 0.5;
  fireEvent.scroll(window);
  expect(screen.getByRole('heading', { name: '발견' })).toBeVisible();
  const wheel = new WheelEvent('wheel', { deltaY: 100, cancelable: true });
  window.dispatchEvent(wheel);
  expect(wheel.defaultPrevented).toBe(false);
  enabled = false;
  fireEvent.resize(window);
  expect(screen.getAllByRole('heading')).toHaveLength(3);
});

it('keeps overflowing content in the readable vertical fallback', () => {
  vi.stubGlobal('matchMedia', () => ({
    matches: true,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(1200);
  render(
    <JourneyScenes>
      {['발견', '표현', '연결'].map((name) => (
        <section className="feature-scene" key={name}>
          <div className="scene-copy">
            <h2>{name}</h2>
          </div>
        </section>
      ))}
    </JourneyScenes>,
  );
  expect(screen.getAllByRole('heading')).toHaveLength(3);
  expect(screen.getByRole('heading', { name: '표현' }).closest('section')).not.toHaveAttribute(
    'inert',
  );
});
