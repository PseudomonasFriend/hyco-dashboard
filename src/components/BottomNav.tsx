'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ITEMS = [
  { href: '/', label: '홈', icon: '⊞' },
  { href: '/approvals', label: '승인', icon: '✅', badge: 7 },
  { href: '/logs', label: '로그', icon: '📋' },
  { href: '/system', label: '시스템', icon: '⚙️' },
  { href: '/settings', label: '설정', icon: '🔧' },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-themed pb-safe"
      style={{ background: 'var(--sidebar)' }}>
      <div className="flex items-center justify-around px-2 py-1">
        {ITEMS.map(item => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-colors ${active ? 'text-indigo-400' : 'text-t3'}`}>
              <span className="text-lg leading-none">{item.icon}</span>
              <span className="text-[10px]">{item.label}</span>
              {item.badge && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
