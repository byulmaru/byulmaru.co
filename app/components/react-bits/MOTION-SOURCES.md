# Home motion sources

Retrieved 2026-09-17 from React Bits (David Haz), under the adjacent LICENSE.md:

- https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/ts-default/Animations/AnimatedContent/AnimatedContent.tsx
- https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/ts-default/TextAnimations/ScrollReveal/ScrollReveal.tsx

Keep their GSAP / ScrollTrigger animation implementations, scoped to this site's needs.
AnimatedContent uses horizontal once-only entrances with independent distance/duration.
ScrollReveal targets two Korean phrases in a semantic blockquote, without rotation or blur.
Both default to visible server-rendered content, use matchMedia for reduced motion and
revert only their own GSAP context on unmount/preferences change, never global triggers.
