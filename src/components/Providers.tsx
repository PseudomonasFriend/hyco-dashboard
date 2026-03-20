'use client';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: { background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--t1)' },
          }}
        />
      </ThemeProvider>
    </SessionProvider>
  );
}
