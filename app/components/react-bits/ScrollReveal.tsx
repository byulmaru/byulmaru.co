// React Bits ScrollReveal opacity/stagger effect, adapted to semantic Korean phrases.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

export default function ScrollReveal({ phrases }: { phrases: string[] }) {
  const ref = useRef<HTMLQuoteElement>(null);
  useEffect(() => {
    if (!window.matchMedia) {
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const el = ref.current;
        if (!el) {
          return;
        }
        gsap.fromTo(
          el.querySelectorAll('.quote-phrase'),
          { opacity: 0.55 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.45,
            scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 55%', scrub: true },
          },
        );
      },
      ref,
    );
    // Never kill other sections' ScrollTriggers (upstream's global cleanup did).
    return () => media.revert();
  }, []);
  return (
    <blockquote ref={ref}>
      {phrases.map((phrase) => (
        <span className="quote-phrase" key={phrase}>
          {phrase}
        </span>
      ))}
    </blockquote>
  );
}
