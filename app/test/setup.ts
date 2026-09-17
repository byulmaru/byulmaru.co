import '@testing-library/jest-dom/vitest';

import { afterEach, beforeEach, vi } from 'vitest';

// jsdom has no viewport observer. Motion's viewport lifecycle needs the browser API;
// viewport timing itself is checked in the real browser, not simulated here.
beforeEach(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      readonly root = null;
      readonly rootMargin = '0px';
      readonly thresholds = [0];
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    },
  );
});
afterEach(() => vi.unstubAllGlobals());
