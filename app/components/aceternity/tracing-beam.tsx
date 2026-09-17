// Adapted from Aceternity UI's official tracing-beam registry. See SOURCE.md.
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import type { ReactNode } from 'react';
import { useEffect, useId, useRef, useState } from 'react';

export function TracingBeam({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(1);
  const id = useId();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 90%', 'end 85%'] });
  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [0, height]), {
    stiffness: 500,
    damping: 90,
  });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, Math.max(0, height - 100)]), {
    stiffness: 500,
    damping: 90,
  });
  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const measure = () => setHeight(el.offsetHeight);
    measure();
    if (typeof ResizeObserver === 'undefined') {
      return;
    }
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="origin-reasons tracing-reasons">
      <svg
        className="reason-beam"
        width="20"
        height={height}
        viewBox={`0 0 20 ${height}`}
        aria-hidden="true"
      >
        <path d={`M 10 0 V ${height}`} fill="none" stroke="var(--site-border)" strokeWidth="1" />
        {!reduced && (
          <motion.path
            className="reason-beam-active"
            d={`M 10 0 V ${height}`}
            fill="none"
            stroke={`url(#${id})`}
            strokeWidth="1.5"
          />
        )}
        <defs>
          <motion.linearGradient
            id={id}
            gradientUnits="userSpaceOnUse"
            x1="0"
            x2="0"
            y1={y1}
            y2={y2}
          >
            <stop stopColor="#ff6f61" stopOpacity="0" />
            <stop offset="0.35" stopColor="#ff6f61" stopOpacity="0.75" />
            <stop offset="1" stopColor="#ff6f61" stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </svg>
      {children}
    </div>
  );
}
