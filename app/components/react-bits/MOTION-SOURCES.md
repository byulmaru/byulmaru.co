# Home motion sources

Retrieved 2026-09-17 from React Bits (David Haz), under the adjacent LICENSE.md:

- https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/ts-default/Animations/AnimatedContent/AnimatedContent.tsx
- https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/ts-default/TextAnimations/ScrollReveal/ScrollReveal.tsx

Keep their GSAP / ScrollTrigger animation implementations, scoped to this site's needs.
AnimatedContent uses horizontal once-only entrances with independent distance/duration.
ScrollReveal targets two Korean phrases in a semantic blockquote, without rotation or blur.
Both default to visible server-rendered content, use matchMedia for reduced motion and
revert only their own GSAP context on unmount/preferences change, never global triggers.

AboutMotion AvatarTip adapts React Bits TiltedCard's Motion springs and normalized
pointer-to-rotation mapping (retrieved 2026-09-17), restricted to +/-3 degrees without
zoom or moving captions. Adds keyboard/touch-accessible tooltip dismissal; the
same introduction remains visible in the page. Source:
https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/ts-default/Components/TiltedCard/TiltedCard.tsx

Our Work (2026-09-17) uses the already-installed Motion layout/layoutId and
whileInView APIs: https://motion.dev/docs/react-layout-animations
The profile switcher advances every 2.8 seconds while visible, once through three profiles.
It stops on the last profile or on manual selection/focus; hidden/offscreen playback pauses.
Notes quote existing team introductions/interviews rather than invented operating logs.
The federation graphic is the original static illustration. The official profile link reuses
the AvatarTip pointer/spring mapping above, limited to +/-2.5 degrees for the entire card
and attached K mark. StickerPeel was removed. Touch and reduced motion stay static.
Composer types change only sample content inside the original fixed-size capture;
visibility remains non-interactive and no content is submitted.
