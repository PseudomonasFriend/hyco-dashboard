'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PROJECTS, APPROVALS } from '@/lib/static-data';

export default function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const results = query.length > 1 ? [
    ...PROJECTS.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    ).map(p => ({ type: '프로젝트', label: `${p.emoji} ${p.name}`, sub: p.description, href: `/project/${p.slug}` })),
    ...APPROVALS.filter(a =>
      a.item.toLowerCase().includes(query.toLowerCase()) ||
      a.project.toLowerCase().includes(query.toLowerCase())
    ).map(a => ({ type: '승인', label: `⏳ ${a.item}`, sub: `${a.project} · ${a.daysPending}일 경과`, href: '/approvals' })),
  ] : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-surface border border-themed rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-themed">
          <svg className="text-t3 shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="프로젝트, 승인 항목 검색…"
            className="flex-1 bg-transparent text-t1 placeholder-[var(--t3)] text-sm focus:outline-none"
          />
          <kbd className="text-xs text-t3 bg-surface-2 px-1.5 py-0.5 rounded">ESC</kbd>
        </div>
        {results.length > 0 ? (
          <div className="max-h-72 overflow-y-auto">
            {results.map((r, i) => (
              <Link key={i} href={r.href} onClick={onClose}
                className="flex items-start gap-3 px-4 py-3 hover:bg-surface-2 transition-colors border-b border-themed-2 last:border-0">
                <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded shrink-0 mt-0.5">{r.type}</span>
                <div>
                  <p className="text-sm text-t1">{r.label}</p>
                  <p className="text-xs text-t3 mt-0.5 line-clamp-1">{r.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : query.length > 1 ? (
          <div className="px-4 py-8 text-center text-t3 text-sm">검색 결과 없음</div>
        ) : (
          <div className="px-4 py-6">
            <p className="text-xs text-t3 mb-3">빠른 이동</p>
            <div className="flex flex-wrap gap-2">
              {PROJECTS.slice(0, 4).map(p => (
                <Link key={p.slug} href={`/project/${p.slug}`} onClick={onClose}
                  className="text-xs px-2.5 py-1.5 bg-surface-2 border border-themed rounded-lg text-t2 hover:text-t1 transition-colors">
                  {p.emoji} {p.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
