// Adapted from React Bits AnimatedContent. See MOTION-SOURCES.md and LICENSE.md.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';

export default function AnimatedContent({
  children,
  distance = 80,
  reverse = false,
  duration = 1,
  delay = 0,
}: {
  children: ReactNode;
  distance?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
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
          el,
          { x: reverse ? -distance : distance, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el.parentElement?.parentElement,
              start: 'top 85%',
              once: true,
            },
          },
        );
      },
      ref,
    );
    return () => media.revert();
  }, [distance, reverse, duration, delay]);
  return <div ref={ref}>{children}</div>;
}
