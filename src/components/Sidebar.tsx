'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV_ITEMS = [
  { href: '/', label: '대시보드', icon: '⊞' },
  { href: '/approvals', label: '승인 관리', icon: '✅', badge: 7 },
  { href: '/logs', label: '활동 로그', icon: '📋' },
  { href: '/system', label: '시스템 현황', icon: '⚙️' },
  { href: '/settings', label: '설정', icon: '🔧' },
];

const PROJECTS = [
  { slug: 'chehumzip', name: 'ChehumZip', emoji: '🗂️', completion: 95 },
  { slug: 'toolsajang', name: 'Toolsajang', emoji: '🔧', completion: 97 },
  { slug: 'hydrogen', name: 'hydrogen_tools', emoji: '⚡', completion: 90 },
  { slug: 'wheretogo', name: 'wheretogo', emoji: '📍', completion: 70 },
  { slug: 'shorts', name: 'Shorts Creator', emoji: '🎬', completion: 97 },
  { slug: 'pickntry', name: 'pickntry', emoji: '🛒', completion: 80 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* 로고 */}
      <div className="px-4 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            HY
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-100">HYco</p>
            <p className="text-xs text-slate-500">Company OS</p>
          </div>
        </div>
      </div>

      {/* 주요 네비게이션 */}
      <nav className="px-3 pt-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                isActive
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <span className="text-base leading-none">{item.icon}</span>
                <span>{item.label}</span>
              </span>
              {item.badge && (
                <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded-full font-medium">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* 프로젝트 목록 */}
      <div className="px-3 pt-6">
        <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold px-3 mb-2">
          프로젝트
        </p>
        <div className="space-y-0.5">
          {PROJECTS.map((p) => {
            const isActive = pathname === `/project/${p.slug}`;
            const completionColor =
              p.completion >= 95 ? '#10b981' : p.completion >= 80 ? '#4f46e5' : '#f59e0b';
            return (
              <Link
                key={p.slug}
                href={`/project/${p.slug}`}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all ${
                  isActive
                    ? 'bg-indigo-600/10 text-slate-100'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.03]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{p.emoji}</span>
                  <span className="truncate max-w-[100px]">{p.name}</span>
                </span>
                <span className="text-[10px] font-mono" style={{ color: completionColor }}>
                  {p.completion}%
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 하단 상태 */}
      <div className="mt-auto px-4 py-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 pulse-soft" />
          <span className="text-xs text-slate-500">봇 운영 중</span>
        </div>
        <p className="text-xs text-slate-600 mt-1">2026-03-22 기준</p>
      </div>
    </div>
  );

  return (
    <>
      {/* 데스크톱 사이드바 */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 h-screen sticky top-0 bg-[#0d0d1a] border-r border-white/[0.06]">
        {sidebarContent}
      </aside>

      {/* 모바일 햄버거 버튼 */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-9 h-9 bg-[#1a1a2e] border border-white/10 rounded-lg flex items-center justify-center text-slate-300 hover:text-white transition-colors"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="메뉴 열기"
      >
        <span className="text-sm">{mobileOpen ? '✕' : '☰'}</span>
      </button>

      {/* 모바일 오버레이 */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* 모바일 드로어 */}
      <aside
        className={`lg:hidden fixed top-0 left-0 z-50 w-64 h-full bg-[#0d0d1a] border-r border-white/[0.06] transform transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
