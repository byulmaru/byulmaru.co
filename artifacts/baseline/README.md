# Svelte migration baseline

Captured from commit `666444a` on 2026-07-14 with the local SvelteKit dev server.

## Viewports

- mobile: 375 x 812
- tablet: 768 x 1024
- desktop: 1280 x 900

Each viewport includes `/`, `/about-us`, and all five `/our-work` tabs. The mobile
home capture also includes the open navigation menu.

## Interaction contract

- The mobile header button toggles the menu and exposes `aria-expanded`.
- Our Work exposes five tabs with roving focus and Arrow Left/Right, Home, and End
  keyboard navigation.
- The Overview panel creates 120 decorative stars after mount and recreates them
  when the panel is entered again.

## Automated baseline

- `CI=true pnpm run check`: passed with 0 Svelte errors and 0 warnings.
- `CI=true pnpm run lint`: failed on existing formatting differences and six
  existing ESLint errors; these are migration baseline debt, not new React scope.
