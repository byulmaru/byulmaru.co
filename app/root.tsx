import './app.css';

import type { ReactNode } from 'react';
import { isRouteErrorResponse, Links, Scripts, ScrollRestoration } from 'react-router';

import type { Route } from './+types/root';
import { TemporaryHome } from './components/TemporaryHome';

const description = '더 정확한 팀과 프로젝트 이야기를 담아 곧 돌아오겠습니다.';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <meta name="text-scale" content="scale" />
        <title>새 단장 중 — 별마루</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.css"
        />
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
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
  return <TemporaryHome />;
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
    <main className="min-h-screen bg-[var(--color-canvas)] px-5 py-16 text-[var(--color-text-primary)] sm:px-8 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-['SUIT_Variable','SUIT',sans-serif] text-4xl leading-tight font-bold">
          {message}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">{details}</p>
      </div>
    </main>
  );
}
