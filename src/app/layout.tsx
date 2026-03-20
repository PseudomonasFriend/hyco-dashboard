import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'HYco 대시보드',
  description: 'HY 컴퍼니 전체 시스템 운영 대시보드',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="h-full flex">
        <Sidebar />
        <main className="flex-1 min-h-screen overflow-y-auto lg:pl-0 pl-0">
          <div className="lg:pl-0 pt-0">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
