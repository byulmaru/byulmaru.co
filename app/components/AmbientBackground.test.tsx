import { fireEvent, render } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import { AmbientBackground } from './AmbientBackground';

// WebGL is browser-verified; keep this test focused on visibility/motion policy.
vi.mock('./react-bits/Silk', () => ({ default: () => null }));
// Canvas pixels are browser-verified; SVG meteors remain real for motion checks.
vi.mock('./aceternity/stars-background', () => ({ StarsBackground: () => null }));

it('starts paused when reduced motion is requested', () => {
  vi.stubGlobal('matchMedia', () => ({
    matches: true,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  try {
    const view = render(<AmbientBackground />);
    expect(view.container.querySelector('.ambient-stars svg')).toBeNull();
    expect(view.container.querySelector('.ambient-background')).toHaveAttribute(
      'data-paused',
      'true',
    );
    view.unmount();
  }
  finally {
    vi.unstubAllGlobals();
  }
});

it('keeps the background decorative and suspends motion in hidden tabs', () => {
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  const view = render(<AmbientBackground />);
  const background = view.container.querySelector('.ambient-background');
  expect(background).toHaveAttribute('aria-hidden', 'true');
  expect(background).toHaveAttribute('data-paused', 'false');
  expect(view.container.querySelector('.ambient-stars svg')).not.toBeNull();
  const visibility = vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
  try {
    fireEvent(document, new Event('visibilitychange'));
    expect(background).toHaveAttribute('data-paused', 'true');
    expect(view.container.querySelector('.ambient-stars svg')).toBeNull();
    visibility.mockReturnValue(false);
    fireEvent(document, new Event('visibilitychange'));
    expect(background).toHaveAttribute('data-paused', 'false');
  }
  finally {
    view.unmount();
    visibility.mockRestore();
    vi.unstubAllGlobals();
  }
});
