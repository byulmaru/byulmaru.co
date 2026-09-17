# FINAL Figma implementation — 2026-09-16

## Local implementation

- Journey transition follow-up: native time-based CSS transitions inspired by the approved Codrops slideshow. Initial setup has no transitions; the first scene loads images eagerly with reserved mockup dimensions. Passive scroll selects scenes at viewport boundaries in a 400svh sticky section. Title settles in 800ms over 110px; body fades/upshifts 16px over 650ms; mockup travels 55vw over 1500ms; art drifts 24px over 1800ms. Each uses its own timing curve; only body has an 80ms delay. Reverse scrolling returns to previous scenes. No wheel cancellation or new dependency. Mobile/tablet, reduced motion and oversized content remain linear. Verified desktop initial 0s transitions and distinct element durations in the browser; 30 tests, TypeScript and focused lint pass.

- Carousel cadence remains 4 seconds on Home and Our Work. Journey's final scene stays visible until the pin releases; background art remains at 50% settled opacity.

- The external star decoration trial was removed at the user's request. Keep only the linked profile capture and K mark at bottom -36px with 6-degree clockwise rotation.

- Latest preview refinement: include the real profile UI's back/title header in the 599×508 screenshot. Enlarge the overlapping K mark to 32% (max 168px) and tilt it 12 degrees clockwise.

- Follow-up: the overlapping decoration uses the K-only `kosmo-mark.svg`, copied unchanged from KOSMO's `brand-mark-light.svg`, instead of the full wordmark. Keep the lower-right overlap, with a 24% width capped at 128px.

- Official account preview now uses `public/figma/kosmo-official-profile.png`, captured from the real profile on 2026-09-16 (header/avatar/name/bio/tags/counts only; no navigation or posts). The full image links to the profile. `kosmo-logo.svg` is copied unchanged from KOSMO's `apps/app/assets/brand/brand-logo-full-light.svg` and overlaps the bottom-right edge decoratively. This replaces the previous text/introduction-post card; no generated artwork or live backend was added.

- Follow-up: Our Work now uses the same single lower-right icon play/pause control as Home, including automatic playback and explicit play under reduced motion. Its former previous/next and hover/focus-pause controls are removed.

- Home → About Us → Our Work are implemented as real semantic React pages with shared 96/64/24px rails, dark header/footer, SUIT headings and Pretendard body text.
- Approved Figma artwork, mockup content, responsive profile switcher and mobile profile screenshots are stored locally. No AI-generated imagery or new background effect was added.
- Home/Our Work carousel moves vertically with dimmed adjacent posts and hidden-tab suspension. Home now has one icon-only play/pause control at the lower right; hover/focus does not interrupt playback, and reduced-motion starts stopped with an explicit play option. Our Work retains previous/next and hover/focus suspension.
- Home introductory scenes use proximity snapping. On sufficiently wide/tall screens, native CSS scroll timelines pin the three product scenes and move them horizontally. Unsupported browsers, smaller screens, reduced motion and content overflow use vertical flow. No wheel/touch interception.
- About Us retains three full original introductions/interviews. Mobile starts with avatar/identity and offers an accessible expand/collapse control. Tablet columns align at their bottom edge.
- Email pre-registration was removed. Hero and closing CTAs link to the official KOSMO account. The profile preview uses its introduction and 2026-07-31 introduction post, verified in the browser on 2026-09-16. This is a static linked preview, not a live embed; no email is collected or submitted.

## Verification

- Vitest: 27 tests passed, including approved page content, carousel controls, profile disclosure and non-successful unconnected reservation.
- TypeScript, scoped ESLint and production prerender build passed; build verification covers all three routes.
- In-app browser: all three routes inspected at 375, 768, 1024 and 1440px; no horizontal document overflow or completed broken images observed.
- Visually checked Home/mobile hero, vertical carousel, desktop pinned scene, closing CTA/footer; About mobile expanded interview and tablet bottom alignment; Our Work tablet hero and reservation form.
- Native scroll timeline behavior was verified in the available Chromium browser. Safari/Firefox and physical-device motion/performance have not been verified.
- Pixel-perfect matching remains a visual review process, not a claim that every intermediate viewport equals a fixed Figma artboard.

## Deliberately deferred

- Site-wide silk and sparse faint stars: implement only after reviewing the running Figma baseline.
- Live profile embedding requires a supported KOSMO embed endpoint; no endpoint was confirmed. Email reservation backend is no longer in scope.
- No commit, push or deployment performed.
