import { Link } from 'react-router';

import logoWhiteKorean from '~/assets/logo-white-korean.svg';

import type { NavItem } from './Header';

export function Footer({ navItems }: { navItems: readonly NavItem[] }) {
  return (
    <footer className="w-full px-5 pt-0 pb-10 sm:px-8 sm:pb-12 lg:px-12">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 border-t border-white/10 px-3 py-8 text-white/55 sm:gap-8 sm:px-4 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:px-0 lg:py-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
          <Link className="w-fit shrink-0" to="/">
            <img className="h-auto w-[7.75rem] opacity-55" src={logoWhiteKorean} alt="별마루" />
          </Link>

          <nav aria-label="Footer" className="w-full lg:w-auto">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-base">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    className="block px-0 py-1 font-['DM_Mono',monospace] tracking-[-0.01em] transition-colors hover:text-white/80"
                    to={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
