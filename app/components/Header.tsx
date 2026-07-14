import { MenuIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import logoBlackFull from '~/assets/logo-black-full.svg';

export type NavItem = {
  href: string;
  label: string;
};

export function Header({ navItems }: { navItems: readonly NavItem[] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full px-5 py-6 sm:px-8 sm:py-7 lg:px-12 lg:py-6">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[1fr_auto] items-center gap-6 lg:grid-cols-[320px_1fr]">
        <div className="flex items-center justify-between gap-4">
          <Link className="w-fit shrink-0" to="/" prefetch="intent">
            <img
              className="h-auto w-40 sm:w-52 lg:w-[20rem]"
              src={logoBlackFull}
              alt="별마루 Byulmaru"
            />
          </Link>

          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full text-black/80 lg:hidden"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
            {mobileMenuOpen ? (
              <XIcon className="h-5 w-5" strokeWidth={2.25} />
            ) : (
              <MenuIcon className="h-5 w-5" strokeWidth={2.25} />
            )}
          </button>
        </div>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center justify-center gap-10 px-10 py-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="block px-1 py-1 font-['DM_Mono',monospace] text-base tracking-[-0.01em] text-black/85 underline underline-offset-4 transition-colors hover:text-black"
                  to={item.href}
                  prefetch="intent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {mobileMenuOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="mx-auto mt-4 w-full max-w-[1280px] rounded-3xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm lg:hidden"
        >
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="block rounded-2xl px-4 py-3 font-['DM_Mono',monospace] text-base text-black/85 transition-colors hover:bg-white/10"
                  to={item.href}
                  prefetch="intent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
