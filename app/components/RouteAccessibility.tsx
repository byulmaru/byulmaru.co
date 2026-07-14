import type { CSSProperties, ReactElement } from 'react';
import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router';

const announcerStyle: CSSProperties = {
  position: 'absolute',
  left: 0,
  top: 0,
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  width: 1,
  height: 1,
};

export function RouteAccessibility(): ReactElement {
  const location = useLocation();
  const previousLocationKey = useRef(location.key);
  const activeBeforeNavigation = useRef<Element | null>(null);
  const announcer = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (previousLocationKey.current !== location.key) {
      previousLocationKey.current = location.key;

      const activeAfterRender = document.activeElement;
      const autofocus =
        document.querySelector<HTMLElement>('[autofocus]') ??
        (activeAfterRender instanceof HTMLElement &&
        activeAfterRender !== document.body &&
        activeAfterRender !== activeBeforeNavigation.current
          ? activeAfterRender
          : null);

      if (autofocus) {
        autofocus.focus();
      }
      else {
        const previousTabIndex = document.body.getAttribute('tabindex');
        document.body.tabIndex = -1;
        document.body.focus({ preventScroll: true });

        if (previousTabIndex === null) {
          document.body.removeAttribute('tabindex');
        }
        else {
          document.body.setAttribute('tabindex', previousTabIndex);
        }
      }

      if (announcer.current) {
        announcer.current.textContent = document.title || 'untitled page';
      }
    }

    return () => {
      activeBeforeNavigation.current = document.activeElement;
    };
  }, [location.key]);

  return (
    <div
      id="route-announcer"
      ref={announcer}
      aria-live="assertive"
      aria-atomic="true"
      style={announcerStyle}
    />
  );
}
