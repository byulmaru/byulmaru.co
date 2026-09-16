import { Link } from 'react-router';

import logoWhiteKorean from '~/assets/logo-white-korean.svg';

import type { NavItem } from './Header';

export function Footer({ navItems }: { navItems: readonly NavItem[] }) {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-columns">
          <div className="footer-brand">
            <Link className="site-logo" to="/" prefetch="intent">
              <img src={logoWhiteKorean} alt="별마루" width="174" height="58" />
            </Link>
            <p className="footer-tagline">
              좋아하는 마음이
              <br />
              새로운 만남으로
            </p>
          </div>
          <nav aria-label="Footer">
            <h2 className="footer-label">EXPLORE</h2>
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} prefetch="intent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="footer-label contact-label">CONTACT</h2>
            <ul>
              <li>
                <a href="mailto:hello@byulmaru.co">hello@byulmaru.co</a>
              </li>
              <li>
                <a href="https://github.com/byulmaru">GitHub</a>
              </li>
              <li>
                <a href="https://kos.moe/@kosmo">코스모 공식 계정 ↗</a>
              </li>
              <li>
                <a href="https://x.com/kos__moe">X 공식 계정 ↗</a>
              </li>
            </ul>
          </div>
        </div>
        <p className="footer-bottom">BYULMARU</p>
      </div>
    </footer>
  );
}
