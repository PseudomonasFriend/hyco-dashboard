'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { href: '/', label: '대시보드', icon: '⊞' },
  { href: '/approvals', label: '승인 관리', icon: '✅', badge: 7 },
  { href: '/logs', label: '활동 로그', icon: '📋' },
  { href: '/system', label: '시스템 현황', icon: '⚙️' },
  { href: '/settings', label: '설정', icon: '🔧' },
];

const PROJECTS = [
  { slug: 'chehumzip', name: 'ChehumZip', emoji: '🗂️', completion: 95, health: 'green' as const },
  { slug: 'toolsajang', name: 'Toolsajang', emoji: '🔧', completion: 97, health: 'green' as const },
  { slug: 'hydrogen', name: 'hydrogen_tools', emoji: '⚡', completion: 90, health: 'green' as const },
  { slug: 'wheretogo', name: 'wheretogo', emoji: '📍', completion: 70, health: 'yellow' as const },
  { slug: 'shorts', name: 'Shorts Creator', emoji: '🎬', completion: 97, health: 'yellow' as const },
  { slug: 'pickntry', name: 'pickntry', emoji: '🛒', completion: 80, health: 'yellow' as const },
];

const HEALTH_COLORS = { green: '#10b981', yellow: '#f59e0b', red: '#ef4444' };

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const content = (
    <div className="flex flex-col h-full">
      {/* 로고 */}
      <div className="px-4 py-5" style={{ borderBottom: '1px solid var(--sb-border)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
              HY
            </div>
            <div>
              <p className="text-sm font-semibold text-t1">HYco</p>
              <p className="text-xs text-t3">Company OS</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* 메인 내비게이션 */}
      <nav className="px-3 pt-4 space-y-0.5">
        {NAV_ITEMS.map(item => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                active
                  ? 'bg-indigo-600/15 text-indigo-500 dark:text-indigo-400'
                  : 'text-t2 hover:text-t1 hover:bg-surface-2'
              }`}>
              <span className="flex items-center gap-2.5">
                <span className="text-base leading-none">{item.icon}</span>
                <span>{item.label}</span>
              </span>
              {item.badge && (
                <span className="text-[10px] bg-red-500/15 text-red-500 dark:text-red-400 border border-red-500/25 px-1.5 py-0.5 rounded-full font-semibold">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* 프로젝트 */}
      <div className="px-3 pt-5">
        <p className="text-[10px] text-t3 uppercase tracking-widest font-semibold px-3 mb-2">프로젝트</p>
        <div className="space-y-0.5">
          {PROJECTS.map(p => {
            const active = pathname === `/project/${p.slug}`;
            return (
              <Link key={p.slug} href={`/project/${p.slug}`} onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all ${
                  active ? 'bg-surface-2 text-t1' : 'text-t3 hover:text-t2 hover:bg-surface-2'
                }`}>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: HEALTH_COLORS[p.health] }} />
                  <span>{p.emoji}</span>
                  <span className="truncate max-w-[90px]">{p.name}</span>
                </span>
                <span className="text-[10px] font-mono" style={{ color: p.completion >= 90 ? '#10b981' : '#f59e0b' }}>
                  {p.completion}%
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 하단 상태 */}
      <div className="mt-auto px-4 py-4" style={{ borderTop: '1px solid var(--sb-border)' }}>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-emerald-500 pulse-soft" />
          <span className="text-xs text-t3">시스템 정상</span>
        </div>
        <p className="text-[10px] text-t3">2026-03-22 기준</p>
      </div>
    </div>
  );

  return (
    <>
      {/* 데스크톱 */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 h-screen sticky top-0" style={{ background: 'var(--sidebar)', borderRight: '1px solid var(--sb-border)' }}>
        {content}
      </aside>

      {/* 모바일 햄버거 */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-9 h-9 rounded-lg flex items-center justify-center text-t2 hover:text-t1 transition-colors"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="메뉴"
      >
        <span className="text-sm">{mobileOpen ? '✕' : '☰'}</span>
      </button>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`lg:hidden fixed top-0 left-0 z-50 w-64 h-full transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: 'var(--sidebar)', borderRight: '1px solid var(--sb-border)' }}>
        {content}
      </aside>
    </>
  );
}
