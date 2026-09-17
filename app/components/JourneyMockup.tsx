import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

// Keep the approved screenshot pixels and counts: only their presentation is animated.
export function JourneyMockup({
  image,
  alt,
  width,
  height,
}: {
  image: string;
  alt: string;
  width: number;
  height: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState('static');
  useEffect(() => {
    const element = ref.current!;
    const scene = element.closest<HTMLElement>('.feature-scene');
    const journey = element.closest<HTMLElement>('.journey-scenes');
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!reduced || typeof IntersectionObserver === 'undefined') {
      return;
    }
    let visible = false;
    let played = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const update = () => {
      clearTimeout(timer);
      if (reduced.matches) {
        played = true;
        setPhase('static');
        return;
      }
      if (played) {
        return;
      }
      setPhase('waiting');
      const pinned = journey?.dataset.animated === 'true';
      if (!visible || (pinned && scene?.dataset.position !== 'current')) {
        return;
      }
      timer = setTimeout(
        () => {
          played = true;
          setPhase('playing');
        },
        pinned ? (image === 'timeline' ? 850 : 1550) : 150,
      );
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        update();
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    const mutation = new MutationObserver(update);
    if (scene) {
      mutation.observe(scene, { attributes: true, attributeFilter: ['data-position'] });
    }
    if (journey) {
      mutation.observe(journey, { attributes: true, attributeFilter: ['data-animated'] });
    }
    reduced.addEventListener('change', update);
    update();
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      mutation.disconnect();
      reduced.removeEventListener('change', update);
    };
  }, [image]);
  const waiting = phase === 'waiting';
  const transition = (delay = 0, duration = 0.7) => ({
    duration: phase === 'playing' ? duration : 0,
    delay: phase === 'playing' ? delay : 0,
    ease: [0.22, 1, 0.36, 1] as const,
  });
  const reveal = (delay: number, y = 24) => ({
    initial: false as const,
    animate: { opacity: waiting ? 0 : 1, y: waiting ? y : 0 },
    transition: transition(delay),
  });
  const slice = (top: number, bottom: number) => (
    <svg y={top} width={width} height={bottom - top} viewBox={`0 ${top} ${width} ${bottom - top}`}>
      <image href={`/figma/${image}.png`} width={width} height={height} />
    </svg>
  );
  const canvasHeight = image === 'composer' ? 511 : height;
  return (
    <div
      ref={ref}
      className={`product-mockup journey-mockup ${image}`}
      data-phase={phase}
      style={{ aspectRatio: `${width} / ${canvasHeight}` }}
    >
      <img
        className="mockup-description"
        src={`/figma/${image}.png`}
        alt={alt}
        width={width}
        height={height}
        loading={image === 'timeline' ? 'eager' : 'lazy'}
      />
      <svg className="mockup-pieces" viewBox={`0 0 ${width} ${canvasHeight}`} aria-hidden="true">
        {image === 'timeline' && (
          <>
            <rect width={400} height={600} rx={8} fill="white" />
            {slice(0, 72)}
            {[
              [72, 160],
              [160, 460],
              [460, 600],
            ].map(([top, bottom], i) => (
              <motion.g key={top} {...reveal(i * 0.22, 20 + i * 12)}>
                {slice(top, bottom)}
              </motion.g>
            ))}
          </>
        )}
        {image === 'composer' && (
          <>
            <motion.rect
              width={520}
              rx={8}
              fill="white"
              initial={false}
              animate={{ height: waiting ? 401 : 511 }}
              transition={transition(0.15, 0.85)}
            />
            {slice(0, 321)}
            <motion.g {...reveal(0.3, 16)}>
              <rect x={24} y={224} width={288} height={164} rx={8} fill="#f5f4f8" />
              <svg
                x={28}
                y={228}
                width={280}
                height={156}
                viewBox="74 230 302 168"
                preserveAspectRatio="xMidYMid slice"
                aria-label="첨부된 파란 캐릭터와 토끼 낙서"
              >
                <image href="/figma/timeline.png" width={406} height={600} />
              </svg>
            </motion.g>
            <motion.g
              initial={false}
              animate={{ y: waiting ? 0 : 110 }}
              transition={transition(0.15, 0.85)}
            >
              {slice(321, 401)}
            </motion.g>
            <motion.path
              d="M14 321 V431 M506 321 V431"
              stroke="#e5e5ec"
              initial={false}
              animate={{ opacity: waiting ? 0 : 1 }}
              transition={transition(0.15)}
            />
          </>
        )}
        {image === 'thread' && (
          <>
            <rect width={400} height={600} rx={8} fill="white" />
            {slice(0, 296)}
            {slice(321, 350)}
            <rect x={19} y={97} width={4} height={253} fill="white" />
            <motion.path
              d="M21 97 V357"
              stroke="#dedce5"
              strokeWidth={1.5}
              initial={false}
              animate={{ pathLength: waiting ? 0 : 1 }}
              transition={transition(0.12, 0.8)}
            />
            <motion.g {...reveal(0.48)}>
              {slice(350, 433)}
              {slice(459, 490)}
            </motion.g>
            <motion.g {...reveal(0.85)}>{slice(490, 600)}</motion.g>
            <motion.g {...reveal(1.15, 6)}>{slice(296, 321)}</motion.g>
            <motion.g {...reveal(1.35, 6)}>{slice(433, 459)}</motion.g>
          </>
        )}
      </svg>
    </div>
  );
}
