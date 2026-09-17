import './app.css';
import './editorial.css';
import './ambient.css';

import type { ReactNode } from 'react';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';
import { AmbientBackground } from './components/AmbientBackground';
import { Footer } from './components/Footer';
import type { NavItem } from './components/Header';
import { Header } from './components/Header';
import { RouteAccessibility } from './components/RouteAccessibility';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about-us', label: 'About Us' },
  { href: '/our-work', label: 'Our Work' },
] as const satisfies readonly NavItem[];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="text-scale" content="scale" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="/figma/SUIT-Variable.woff2"
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="site-shell flex min-h-screen w-full flex-col">
      <AmbientBackground />
      <RouteAccessibility />
      <Header navItems={navItems} />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer navItems={navItems} />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = '오류가 발생했습니다.';
  let details = '요청한 페이지를 표시하지 못했습니다.';

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '페이지를 찾을 수 없습니다.' : '요청을 처리하지 못했습니다.';
    details = error.statusText || details;
  }
  else if (error instanceof Error) {
    details = error.message;
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1>{message}</h1>
      <p>{details}</p>
    </main>
  );
}
