'use client';
import { useState } from 'react';
import type { LogEntry } from '@/lib/types';
import { relativeTime } from '@/lib/utils';

const STATUS_ICON = { done: '✅', pending: '⏳', skipped: '⏸' } as const;
const STATUS_COLOR = { done: 'text-emerald-500', pending: 'text-amber-500', skipped: 'text-t3' } as const;

const ALL_PROJECTS = ['전체', 'chehumzip', 'toolsajang', 'hydrogen', 'wheretogo', 'shorts'];

export default function LogsClient({ logs }: { logs: LogEntry[] }) {
  const [projectFilter, setProjectFilter] = useState('전체');
  const [expanded, setExpanded] = useState<Set<number>>(new Set([0]));

  const filtered = projectFilter === '전체'
    ? logs
    : logs.filter(l => !l.projectSlug || l.projectSlug === projectFilter);

  const toggle = (i: number) => {
    const next = new Set(expanded);
    next.has(i) ? next.delete(i) : next.add(i);
    setExpanded(next);
  };

  return (
    <>
      {/* 필터 */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <span className="text-xs text-t3">프로젝트 필터:</span>
        {ALL_PROJECTS.map(p => (
          <button
            key={p}
            onClick={() => setProjectFilter(p)}
            className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
              projectFilter === p
                ? 'bg-indigo-600/15 text-indigo-500 border-indigo-500/30'
                : 'bg-surface text-t3 border-themed hover:text-t2'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* 로그 타임라인 */}
      <div className="max-w-3xl space-y-3">
        {filtered.map((log, i) => (
          <div key={i} className="bg-surface border border-themed rounded-xl overflow-hidden">
            <button
              className="w-full px-5 py-4 flex items-start justify-between gap-4 hover:bg-surface-2 transition-colors text-left"
              onClick={() => toggle(i)}
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-mono text-t3 bg-surface-2 px-2 py-0.5 rounded">{log.date}</span>
                  <span className="text-xs text-t3">{relativeTime(log.date)}</span>
                  <span className="text-sm font-medium text-t1">{log.sessionType}</span>
                </div>
                <p className="text-xs text-t2 leading-relaxed">{log.summary}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-t3">{log.items.filter(x => x.status === 'done').length}/{log.items.length}</span>
                <span className="text-t3 text-xs">{expanded.has(i) ? '▲' : '▼'}</span>
              </div>
            </button>

            {expanded.has(i) && (
              <div className="px-5 py-3 space-y-2 border-t border-themed-2">
                {log.items.map((item, j) => (
                  <div key={j} className="flex items-start gap-3 py-1.5">
                    <span className={`text-xs mt-0.5 shrink-0 ${STATUS_COLOR[item.status]}`}>{STATUS_ICON[item.status]}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 flex-wrap">
                        <span className="text-[10px] text-t3 bg-surface-2 px-1.5 py-0.5 rounded shrink-0">{item.category}</span>
                        <span className="text-xs text-t1">{item.title}</span>
                      </div>
                      <p className="text-xs text-t3 mt-0.5 leading-relaxed">{item.result}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-t3 text-sm">해당 프로젝트의 로그가 없습니다</p>
          </div>
        )}
      </div>
    </>
  );
}
