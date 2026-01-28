import { Suspense } from 'react';
import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import { Header } from '@/components/layout/Header';
import { NotFound } from '@/components/NotFound';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'description',
        content: 'becraft-sdk サンプルアプリケーション',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: '/src/index.css',
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <html lang="ja">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="flex min-h-screen flex-col bg-background">
          <Header />
          <main className="container flex-1 py-8">
            <Suspense fallback={<p className="text-muted-foreground">読み込み中...</p>}>
              <Outlet />
            </Suspense>
          </main>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
