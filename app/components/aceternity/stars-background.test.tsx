import { render } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import { StarsBackground } from './stars-background';

it('renders tinted stars without glow or scheduled animation when paused', () => {
  const fills: string[] = [];
  const context = {
    clearRect() {},
    beginPath() {},
    arc() {},
    fillStyle: '',
    shadowBlur: 0,
    fill() {
      fills.push(this.fillStyle);
    },
  };
  const canvas = vi
    .spyOn(HTMLCanvasElement.prototype, 'getContext')
    .mockReturnValue(context as unknown as CanvasRenderingContext2D);
  const bounds = vi
    .spyOn(HTMLCanvasElement.prototype, 'getBoundingClientRect')
    .mockReturnValue({ width: 100, height: 100 } as DOMRect);
  const random = vi.spyOn(Math, 'random').mockReturnValue(0.9);
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      disconnect() {}
    },
  );
  vi.useFakeTimers();
  const view = render(<StarsBackground paused starDensity={0.001} />);
  try {
    expect(fills.some((color) => !color.startsWith('rgba(255, 255, 255,'))).toBe(true);
    expect(context.shadowBlur).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
  }
  finally {
    view.unmount();
    canvas.mockRestore();
    bounds.mockRestore();
    random.mockRestore();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  }
});
