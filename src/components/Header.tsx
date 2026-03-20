'use client';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import SearchModal from './SearchModal';

interface HeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function Header({ title, subtitle, breadcrumbs }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <div className="flex items-start justify-between mb-8 ml-10 lg:ml-0">
        <div>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-1.5 text-xs text-t3 mb-2">
              {breadcrumbs.map((b, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && <span>/</span>}
                  {b.href ? (
                    <a href={b.href} className="hover:text-t2 transition-colors">{b.label}</a>
                  ) : (
                    <span className="text-t2">{b.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          <h1 className="text-2xl font-bold text-t1">{title}</h1>
          {subtitle && <p className="text-sm text-t3 mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-t3 hover:text-t2 bg-surface border border-themed hover:bg-surface-2 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <span className="hidden sm:inline">검색</span>
          </button>
          <ThemeToggle />
        </div>
      </div>
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}
