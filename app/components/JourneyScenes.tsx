import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';

export function JourneyScenes({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current!;
    const scenes = [...element.querySelectorAll<HTMLElement>('.feature-scene')];
    const content = [...element.querySelectorAll<HTMLElement>('.scene-copy, .product-mockup')];
    const query = window.matchMedia?.(
      '(min-width: 1280px) and (min-height: 48rem) and (prefers-reduced-motion: no-preference)',
    );
    let enabled = false;
    let current = -1;
    const update = () => {
      if (!enabled) {
        return;
      }
      const top = element.getBoundingClientRect().top;
      if (top <= window.innerHeight * 0.55 && top > -window.innerHeight) {
        element.dataset.firstEntered = 'true';
      }
      const index = Math.max(0, Math.min(scenes.length - 1, Math.floor(-top / window.innerHeight)));
      if (index === current) {
        return;
      }
      if (current !== -1) {
        element.dataset.transitioned = 'true';
      }
      current = index;
      scenes.forEach((scene, i) => {
        scene.dataset.position = i < index ? 'before' : i === index ? 'current' : 'after';
        scene.setAttribute('aria-hidden', String(i !== index));
        scene.inert = i !== index;
      });
    };
    const measure = () => {
      enabled =
        Boolean(query?.matches) &&
        content.every((item) => item.scrollHeight + 128 <= window.innerHeight);
      element.dataset.animated = String(enabled);
      current = -1;
      if (enabled) {
        update();
      }
      else {
        scenes.forEach((scene) => {
          delete scene.dataset.position;
          scene.removeAttribute('aria-hidden');
          scene.inert = false;
        });
      }
    };
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    content.forEach((item) => observer?.observe(item));
    measure();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', measure);
    query?.addEventListener('change', measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', measure);
      query?.removeEventListener('change', measure);
    };
  }, []);
  return (
    <div ref={root} className="journey-scenes">
      <div className="journey-pin">
        <div className="journey-track">{children}</div>
      </div>
    </div>
  );
}
