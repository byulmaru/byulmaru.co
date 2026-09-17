import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { vi } from 'vitest';

import OurWork from './our-work';

it('auto-plays Our Work with the same single icon pause/resume control as Home', () => {
  vi.useFakeTimers();
  try {
    render(<OurWork />);
    const gallery = screen.getByRole('region', { name: '코스모 게시물 미리보기' });
    expect(within(gallery).getAllByRole('button')).toHaveLength(1);
    expect(within(gallery).getByRole('button').textContent).toBe('');
    const initial = within(gallery).getByRole('img').getAttribute('src');
    fireEvent.mouseEnter(gallery);
    act(() => vi.advanceTimersByTime(4000));
    const next = within(gallery).getByRole('img').getAttribute('src');
    expect(next).not.toBe(initial);
    fireEvent.click(within(gallery).getByRole('button', { name: '자동 전환 일시정지' }));
    act(() => vi.advanceTimersByTime(4000));
    expect(within(gallery).getByRole('img')).toHaveAttribute('src', next);
    fireEvent.click(within(gallery).getByRole('button', { name: '자동 전환 재생' }));
    act(() => vi.advanceTimersByTime(4000));
    expect(within(gallery).getByRole('img').getAttribute('src')).not.toBe(next);
  }
  finally {
    vi.useRealTimers();
  }
});

it('links the official Kosmo profile instead of collecting reservation emails', () => {
  render(<OurWork />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    '좋아하는 이야기가 여럿이어도',
  );
  expect(screen.getByRole('heading', { name: /새로운 공간에서도/ })).toBeVisible();
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  for (const link of screen.getAllByRole('link', { name: '코스모 소식 보기' })) {
    expect(link).toHaveAttribute('href', 'https://kos.moe/@kosmo');
  }
  expect(screen.getByRole('link', { name: '코스모 공식 계정 방문하기' })).toHaveAttribute(
    'href',
    'https://kos.moe/@kosmo',
  );
  expect(screen.getByRole('img', { name: /코스모 공식 프로필 캡처/ })).toBeVisible();
});
