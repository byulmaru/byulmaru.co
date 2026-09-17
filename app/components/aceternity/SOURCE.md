# Aceternity UI star effects

Tracing Beam added 2026-09-17 from https://ui.aceternity.com/registry/tracing-beam.json.
Retains upstream Motion scroll-progress/spring/gradient implementation. Site adaptation:
straight coral hairline and three static nodes, local unique gradient ID, responsive
ResizeObserver measurement and reduced-motion fallback. No glow or wheel interception.

Retrieved 2026-09-16 from the official public component registry:

- https://ui.aceternity.com/registry/stars-background.json
- https://ui.aceternity.com/registry/shooting-stars.json
- Documentation: https://ui.aceternity.com/components/shooting-stars-and-stars-background
- License terms: https://ui.aceternity.com/licence

Registry author: Manu Arora. Documentation credits Vijay Verma / figmaplug.in.
These components are included for this website, not redistributed as a component library or template.

Local integration: remove the class-name utility dependency, use React 19 ref typing,
increase star radii to .65–1.2 CSS pixels for visibility over the Silk background,
clean up meteor timers and ResizeObserver, correct vertical-edge random positions,
and pause star rendering for hidden tabs / reduced motion without mutating React state.
Meteors start along the top edge and travel diagonally downward toward the center, never upward.
Stars use mostly white with pale cyan/pink accents and independent random phases for sparse, soft glow pulses. Pausing disables glow and animation scheduling.
The parent removes meteors while paused; density, colors and delays are configured via upstream props.
