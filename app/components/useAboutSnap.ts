import { useEffect, useRef } from 'react';

export function useAboutSnap() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current!;
    const scenes = [...element.querySelectorAll<HTMLElement>('.about-hero, .profile')];
    const content = [
      ...element.querySelectorAll<HTMLElement>(
        '.about-hero .copy, .profile-introduction, .interview',
      ),
    ];
    const query = window.matchMedia?.(
      '(min-width: 1280px) and (min-height: 40rem) and (prefers-reduced-motion: no-preference)',
    );
    let enabled = false;
    let settling = false;
    let distance = 0;
    let lastWheel = 0;
    let started = 0;
    let frame = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const cancel = () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      settling = false;
      distance = 0;
      scenes.forEach((scene) => delete scene.dataset.arrival);
    };
    const measure = () => {
      enabled =
        Boolean(query?.matches) &&
        content.every(
          (item) =>
            item.scrollHeight + (item.closest('.about-hero') ? 242 : 128) <= window.innerHeight,
        );
      element.dataset.snap = String(enabled);
      cancel();
    };
    const finish = () => {
      if (Date.now() - lastWheel < 180 && Date.now() - started < 1800) {
        timer = setTimeout(finish, 180);
      }
      else {
        settling = false;
        distance = 0;
      }
    };
    const wheel = (event: WheelEvent) => {
      if (
        !enabled ||
        event.ctrlKey ||
        event.metaKey ||
        Math.abs(event.deltaX) >= Math.abs(event.deltaY) ||
        (event.target instanceof Element &&
          event.target.closest('input, textarea, select, [contenteditable="true"]'))
      ) {
        return;
      }
      const now = Date.now();
      if (now - lastWheel > 180) {
        distance = 0;
      }
      lastWheel = now;
      if (settling) {
        event.preventDefault();
        return;
      }
      const positions = scenes.map((scene, index) =>
        index === 0 ? 0 : window.scrollY + scene.getBoundingClientRect().top,
      );
      const down = event.deltaY > 0;
      if (window.scrollY > positions[positions.length - 1] + 2) {
        return;
      }
      const index = down
        ? positions.findIndex((position) => position > window.scrollY + 2)
        : positions.reduce((last, position, i) => (position < window.scrollY - 2 ? i : last), -1);
      if (index < 0) {
        return;
      }
      event.preventDefault();
      const delta =
        event.deltaY *
        (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
      if (Math.sign(distance) !== Math.sign(delta)) {
        distance = 0;
      }
      distance += delta;
      if (Math.abs(distance) < 32) {
        return;
      }
      settling = true;
      started = now;
      const start = window.scrollY;
      scenes.forEach((scene) => delete scene.dataset.arrival);
      // No visibility gate: text remains readable during entry and interrupted scrolling.
      scenes[index].dataset.arrival = down ? 'down' : 'up';
      const animate = () => {
        const progress = Math.min(1, (Date.now() - started) / 1100);
        const eased = progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
        window.scrollTo({ top: start + (positions[index] - start) * eased, behavior: 'instant' });
        if (progress < 1) {
          frame = requestAnimationFrame(animate);
        }
        else {
          finish();
        }
      };
      frame = requestAnimationFrame(animate);
    };
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    content.forEach((item) => observer?.observe(item));
    measure();
    window.addEventListener('wheel', wheel, { passive: false });
    window.addEventListener('resize', measure);
    window.addEventListener('keydown', cancel);
    window.addEventListener('pointerdown', cancel);
    window.addEventListener('touchstart', cancel, { passive: true });
    query?.addEventListener('change', measure);
    return () => {
      cancel();
      observer?.disconnect();
      window.removeEventListener('wheel', wheel);
      window.removeEventListener('resize', measure);
      window.removeEventListener('keydown', cancel);
      window.removeEventListener('pointerdown', cancel);
      window.removeEventListener('touchstart', cancel);
      query?.removeEventListener('change', measure);
    };
  }, []);
  return root;
}
