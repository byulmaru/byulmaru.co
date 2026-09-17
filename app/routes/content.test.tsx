import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { vi } from 'vitest';

import AboutUs from './about-us';
import Home from './home';

it('enables intro snapping at 720px desktop height and releases it after Origin', () => {
  vi.useFakeTimers();
  const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  let top = 720;
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: !query.includes('48rem'),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => ({
    top,
    bottom: top + 720,
    height: 720,
    width: 1280,
    left: 0,
    right: 1280,
    x: 0,
    y: top,
    toJSON() {},
  }));
  try {
    const view = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(document.documentElement).toHaveClass('home-intro-snap');
    const wheel = new WheelEvent('wheel', { deltaY: 80, cancelable: true });
    window.dispatchEvent(wheel);
    expect(wheel.defaultPrevented).toBe(true);
    act(() => vi.advanceTimersByTime(550));
    const midway = scrollTo.mock.lastCall?.[0] as ScrollToOptions;
    expect(midway.top).toBeGreaterThan(200);
    expect(midway.top).toBeLessThan(500);
    act(() => vi.advanceTimersByTime(600));
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 720, behavior: 'instant' });
    top = 0;
    fireEvent.scroll(window);
    expect(document.documentElement).toHaveClass('home-intro-snap');
    const momentum = new WheelEvent('wheel', { deltaY: 10, cancelable: true });
    window.dispatchEvent(momentum);
    expect(momentum.defaultPrevented).toBe(false);
    act(() => vi.advanceTimersByTime(2000));
    const exit = new WheelEvent('wheel', { deltaY: 80, cancelable: true });
    window.dispatchEvent(exit);
    expect(exit.defaultPrevented).toBe(false);
    top = -20;
    fireEvent.scroll(window);
    expect(document.documentElement).not.toHaveClass('home-intro-snap');
    view.unmount();
  }
  finally {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  }
});

it('automatically rotates Home posts with only one icon pause/resume button', () => {
  vi.useFakeTimers();
  try {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '좋아하는 마음이새로운 만남으로',
    );
    expect(screen.getByRole('heading', { name: '무슨 이야기가 올라왔을까?' })).toBeVisible();
    expect(
      screen.getByRole('img', { name: '모래와 감자의 낙서와 일상 게시물이 있는 코스모 타임라인' }),
    ).toHaveAttribute('loading', 'eager');
    const gallery = screen.getByRole('region', { name: '코스모 게시물 미리보기' });
    expect(within(gallery).getAllByRole('button')).toHaveLength(1);
    expect(screen.queryByLabelText('게시물 순서')).not.toBeInTheDocument();
    expect(within(gallery).getByRole('button')).toHaveTextContent('');
    const initial = within(gallery).getByRole('img').getAttribute('src');
    fireEvent.mouseEnter(gallery);
    act(() => vi.advanceTimersByTime(4000));
    const next = within(gallery).getByRole('img').getAttribute('src');
    expect(next).not.toBe(initial);
    fireEvent.click(screen.getByRole('button', { name: '자동 전환 일시정지' }));
    act(() => vi.advanceTimersByTime(12000));
    expect(within(gallery).getByRole('img')).toHaveAttribute('src', next);
    const play = screen.getByRole('button', { name: '자동 전환 재생' });
    fireEvent.focus(play);
    fireEvent.click(play);
    act(() => vi.advanceTimersByTime(4000));
    expect(within(gallery).getByRole('img').getAttribute('src')).not.toBe(next);
  }
  finally {
    vi.useRealTimers();
  }
});

it('preserves all three profiles and provides full interview disclosure', () => {
  render(
    <MemoryRouter>
      <AboutUs />
    </MemoryRouter>,
  );
  expect(screen.getAllByRole('article')).toHaveLength(3);
  for (const profile of screen.getAllByRole('article')) {
    const tags = profile.querySelector('.profile-tags.mobile-copy')!;
    const heading = profile.querySelector('.profile-copy h3')!;
    expect(tags.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  }
  const buttons = screen.getAllByRole('button', { name: '인터뷰 더 읽기' });
  fireEvent.click(buttons[1]);
  expect(screen.getByRole('button', { name: '인터뷰 접기' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  expect(screen.getByText(/서비스가 그 방식에 더 잘 맞았으면/)).toBeInTheDocument();
});
