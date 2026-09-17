import { useRef, useState } from 'react';
import { Link, NavLink } from 'react-router';

import logoWhiteKorean from '~/assets/logo-white-korean.svg';

export type NavItem = { href: string; label: string };

export function Header({ navItems }: { navItems: readonly NavItem[] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);

  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && mobileMenuOpen) {
          setMobileMenuOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <div className="site-container header-row">
        <Link
          className="site-logo"
          to="/"
          prefetch="intent"
          onClick={() => setMobileMenuOpen(false)}
        >
          <img src={logoWhiteKorean} alt="별마루 Byulmaru" width="174" height="58" />
        </Link>
        <div className="header-actions">
          <nav className="desktop-nav" aria-label="Primary">
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavLink to={item.href} end={item.href === '/'} prefetch="intent">
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <a className="site-button header-news" href="https://kos.moe/@kosmo">
            소식 받기
          </a>
          <button
            ref={trigger}
            className="menu-toggle"
            type="button"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <nav id="mobile-nav" className="site-container mobile-nav" aria-label="Mobile navigation">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  end={item.href === '/'}
                  prefetch="intent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
