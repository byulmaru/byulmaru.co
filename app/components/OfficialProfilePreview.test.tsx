import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import type * as Motion from 'motion/react';
import { afterEach, expect, it, vi } from 'vitest';

import { OfficialProfilePreview } from './WorkMotion';

const state = vi.hoisted(() => ({ reduced: false, setters: [] as ReturnType<typeof vi.fn>[] }));
vi.mock('motion/react', async (importOriginal) => {
  const actual = await importOriginal<typeof Motion>();
  return {
    ...actual,
    useReducedMotion: () => state.reduced,
    useSpring: () => {
      const value = actual.motionValue(0);
      state.setters.push(vi.spyOn(value, 'set'));
      return value;
    },
  };
});
afterEach(() => {
  cleanup();
  state.setters = [];
  state.reduced = false;
});

it('tilts the complete link at most 2.5 degrees and resets; touch and reduced motion stay still', () => {
  const { rerender } = render(
    <OfficialProfilePreview>
      <img alt="프로필 캡처" />
    </OfficialProfilePreview>,
  );
  const wrapper = screen.getByRole('link', { name: '코스모 공식 계정 방문하기' }).parentElement!;
  vi.spyOn(wrapper, 'getBoundingClientRect').mockReturnValue({
    left: 0,
    top: 0,
    width: 500,
    height: 400,
  } as DOMRect);
  const move = (pointerType: string) => {
    const event = new Event('pointermove', { bubbles: true });
    Object.defineProperties(event, {
      pointerType: { value: pointerType },
      clientX: { value: 500 },
      clientY: { value: 0 },
    });
    fireEvent(wrapper, event);
  };
  state.setters.forEach((set) => set.mockClear());
  move('touch');
  expect(state.setters[0]).not.toHaveBeenCalled();
  move('mouse');
  expect(state.setters[0]).toHaveBeenLastCalledWith(2.5);
  expect(state.setters[1]).toHaveBeenLastCalledWith(2.5);
  fireEvent.pointerLeave(wrapper);
  expect(state.setters[0]).toHaveBeenLastCalledWith(0);
  expect(state.setters[1]).toHaveBeenLastCalledWith(0);
  state.reduced = true;
  rerender(
    <OfficialProfilePreview>
      <img alt="프로필 캡처" />
    </OfficialProfilePreview>,
  );
  state.setters.forEach((set) => set.mockClear());
  move('mouse');
  expect(state.setters[2]).not.toHaveBeenCalled();
});
