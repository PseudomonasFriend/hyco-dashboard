import { LOGS } from '@/lib/static-data';

export default function LogsPage() {
  const statusIcon = { done: '✅', pending: '⏳', skipped: '⏸' };
  const statusColor = { done: 'text-emerald-400', pending: 'text-amber-400', skipped: 'text-slate-500' };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="mb-8 ml-10 lg:ml-0">
        <h1 className="text-2xl font-bold text-slate-100">활동 로그</h1>
        <p className="text-sm text-slate-500 mt-0.5">에이전트 세션별 작업 기록</p>
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-[#111827] border border-white/[0.06] rounded-xl p-4">
          <p className="text-2xl font-bold text-slate-200 mb-1">{LOGS.length}</p>
          <p className="text-xs text-slate-500">총 세션</p>
        </div>
        <div className="bg-[#111827] border border-white/[0.06] rounded-xl p-4">
          <p className="text-2xl font-bold text-emerald-400 mb-1">
            {LOGS.reduce((acc, l) => acc + l.items.filter((i) => i.status === 'done').length, 0)}
          </p>
          <p className="text-xs text-slate-500">완료 작업</p>
        </div>
        <div className="bg-[#111827] border border-white/[0.06] rounded-xl p-4">
          <p className="text-2xl font-bold text-amber-400 mb-1">
            {LOGS.reduce((acc, l) => acc + l.items.filter((i) => i.status === 'pending').length, 0)}
          </p>
          <p className="text-xs text-slate-500">진행 중</p>
        </div>
      </div>

      {/* 로그 타임라인 */}
      <div className="max-w-3xl space-y-4">
        {LOGS.map((log, i) => (
          <div key={i} className="bg-[#111827] border border-white/[0.06] rounded-xl overflow-hidden card-glow">
            {/* 세션 헤더 */}
            <div className="px-5 py-4 border-b border-white/[0.06] flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-mono text-slate-600 bg-white/[0.04] px-2 py-0.5 rounded">
                    {log.date}
                  </span>
                  <span className="text-sm font-medium text-slate-200">{log.sessionType}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{log.summary}</p>
              </div>
              <span className="text-xs text-slate-600 shrink-0">
                {log.items.filter((i) => i.status === 'done').length}/{log.items.length}건
              </span>
            </div>

            {/* 작업 목록 */}
            <div className="px-5 py-3 space-y-2">
              {log.items.map((item, j) => (
                <div key={j} className="flex items-start gap-3 py-1.5">
                  <span className={`text-xs mt-0.5 shrink-0 ${statusColor[item.status]}`}>
                    {statusIcon[item.status]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 flex-wrap">
                      <span className="text-xs text-slate-500 bg-white/[0.04] px-1.5 py-0.5 rounded text-[10px] shrink-0">
                        {item.category}
                      </span>
                      <span className="text-xs text-slate-300">{item.title}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
