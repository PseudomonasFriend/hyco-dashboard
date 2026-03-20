import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';
import Sidebar from '@/components/Sidebar';
import BottomNav from '@/components/BottomNav';

export const metadata: Metadata = {
  title: { default: 'HYco 대시보드', template: '%s | HYco' },
  description: 'HY 컴퍼니 전체 시스템 운영 대시보드',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full" suppressHydrationWarning>
      <body className="h-full">
        <Providers>
          <div className="flex min-h-screen" style={{ background: 'var(--bg)' }}>
            <Sidebar />
            <main className="flex-1 min-h-screen overflow-y-auto pb-20 lg:pb-0">
              {children}
            </main>
          </div>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
