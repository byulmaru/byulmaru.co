import { act, fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { afterEach, expect, it, vi } from 'vitest';

import AboutUs from '../routes/about-us';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

it('settles one profile over 1100ms, reverses, releases the last scene and cancels on keyboard input', () => {
  vi.useFakeTimers();
  vi.stubGlobal('innerHeight', 900);
  vi.stubGlobal('scrollY', 0);
  vi.stubGlobal('matchMedia', () => ({
    matches: true,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
    this: HTMLElement,
  ) {
    const nodes = [...document.querySelectorAll('.about-hero, .profile')];
    const top = Math.max(0, nodes.indexOf(this)) * 900 - window.scrollY;
    return {
      top,
      bottom: top + 900,
      height: 900,
      width: 1440,
      left: 0,
      right: 1440,
      x: 0,
      y: top,
      toJSON() {},
    };
  });
  const scroll = vi.spyOn(window, 'scrollTo').mockImplementation((options) => {
    vi.stubGlobal('scrollY', (options as ScrollToOptions).top);
  });
  const view = render(
    <MemoryRouter>
      <AboutUs />
    </MemoryRouter>,
  );
  const wheel = (deltaY: number) => {
    const event = new WheelEvent('wheel', { deltaY, cancelable: true });
    window.dispatchEvent(event);
    return event;
  };
  expect(wheel(80).defaultPrevented).toBe(true);
  act(() => vi.advanceTimersByTime(550));
  expect(window.scrollY).toBeGreaterThan(200);
  expect(window.scrollY).toBeLessThan(700);
  act(() => vi.advanceTimersByTime(650));
  expect(window.scrollY).toBe(900);
  expect(document.querySelector('.profile')).toHaveAttribute('data-arrival', 'down');
  expect(wheel(-80).defaultPrevented).toBe(true);
  act(() => vi.advanceTimersByTime(1200));
  expect(window.scrollY).toBe(0);
  vi.stubGlobal('scrollY', 2700);
  expect(wheel(80).defaultPrevented).toBe(false);
  wheel(-80);
  act(() => vi.advanceTimersByTime(200));
  fireEvent.keyDown(window, { key: 'Tab' });
  const calls = scroll.mock.calls.length;
  act(() => vi.advanceTimersByTime(1500));
  expect(scroll).toHaveBeenCalledTimes(calls);
  view.unmount();
  expect(wheel(-80).defaultPrevented).toBe(false);
});

it.each([false, true])(
  'keeps ordinary scrolling when motion is disabled or content overflows (%s)',
  (overflow) => {
    vi.stubGlobal('matchMedia', () => ({
      matches: overflow,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    if (overflow) {
      vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(1600);
    }
    render(
      <MemoryRouter>
        <AboutUs />
      </MemoryRouter>,
    );
    const event = new WheelEvent('wheel', { deltaY: 80, cancelable: true });
    window.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
    expect(document.querySelector('.about-page')).not.toHaveAttribute('data-snap', 'true');
  },
);
