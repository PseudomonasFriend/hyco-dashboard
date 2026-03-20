import Link from 'next/link';
import { APPROVALS, HY_DIRECT_TASKS } from '@/lib/static-data';

export default function ApprovalsPage() {
  const critical = APPROVALS.filter((a) => a.urgency === 'critical');
  const warning = APPROVALS.filter((a) => a.urgency === 'warning');

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="mb-8 ml-10 lg:ml-0">
        <h1 className="text-2xl font-bold text-slate-100">승인 관리</h1>
        <p className="text-sm text-slate-500 mt-0.5">HY CEO 승인이 필요한 항목 — 총 {APPROVALS.length}건</p>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <div className="bg-[#111827] border border-red-500/20 rounded-xl p-4">
          <p className="text-2xl font-bold text-red-400 mb-1">{critical.length}</p>
          <p className="text-xs text-slate-500">긴급 (30일+)</p>
        </div>
        <div className="bg-[#111827] border border-amber-500/20 rounded-xl p-4">
          <p className="text-2xl font-bold text-amber-400 mb-1">{warning.length}</p>
          <p className="text-xs text-slate-500">주의 (7일+)</p>
        </div>
        <div className="bg-[#111827] border border-white/[0.06] rounded-xl p-4">
          <p className="text-2xl font-bold text-slate-200 mb-1">{APPROVALS.length}</p>
          <p className="text-xs text-slate-500">전체 대기</p>
        </div>
        <div className="bg-[#111827] border border-white/[0.06] rounded-xl p-4">
          <p className="text-2xl font-bold text-indigo-400 mb-1">2</p>
          <p className="text-xs text-slate-500">이번 주 해소</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {/* 긴급 항목 */}
          {critical.length > 0 && (
            <div className="bg-[#111827] border border-red-500/20 rounded-xl p-5 mb-4">
              <h2 className="text-sm font-semibold text-red-400 mb-4">🚨 긴급 — 30일 이상 경과</h2>
              <div className="space-y-3">
                {critical.map((a) => (
                  <div key={a.id} className="flex items-start gap-4 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-slate-200 font-medium mb-0.5">{a.item}</p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <Link href={`/project/${a.projectSlug}`} className="text-xs text-indigo-400 hover:text-indigo-300">
                          {a.project}
                        </Link>
                        <span className="text-xs text-slate-600">{a.registeredDate} 등록</span>
                        <span className="text-xs text-red-400 font-medium">{a.daysPending}일 경과</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 주의 항목 */}
          {warning.length > 0 && (
            <div className="bg-[#111827] border border-amber-500/20 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-amber-400 mb-4">⚠️ 주의 — 확인 필요</h2>
              <div className="space-y-3">
                {warning.map((a) => (
                  <div key={a.id} className="flex items-start gap-4 p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-slate-200 font-medium mb-0.5">{a.item}</p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <Link href={`/project/${a.projectSlug}`} className="text-xs text-indigo-400 hover:text-indigo-300">
                          {a.project}
                        </Link>
                        <span className="text-xs text-slate-600">{a.registeredDate} 등록</span>
                        <span className="text-xs text-amber-400 font-medium">{a.daysPending}일 경과</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* HY 직접 처리 */}
        <div>
          <div className="bg-[#111827] border border-amber-500/20 rounded-xl p-5 mb-4">
            <h2 className="text-sm font-semibold text-amber-400 mb-4">🙋 HY 직접 처리 ({HY_DIRECT_TASKS.length}건)</h2>
            <div className="space-y-3">
              {HY_DIRECT_TASKS.map((t, i) => (
                <div key={i} className="py-2.5 border-b border-white/[0.04] last:border-0">
                  <p className="text-xs text-slate-300 font-medium mb-0.5">{t.item}</p>
                  <p className="text-xs text-slate-600 mb-1">{t.project}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{t.memo}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 최근 해소 */}
          <div className="bg-[#111827] border border-emerald-500/20 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-emerald-400 mb-4">✅ 최근 해소</h2>
            <div className="space-y-2.5">
              {[
                { item: 'Shorts_creator YouTube OAuth URI', date: '2026-03-21', project: 'Shorts Creator' },
                { item: 'Toolsajang AdSense 슬롯 배치 전략', date: '2026-03-21', project: 'Toolsajang' },
              ].map((r, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 text-xs mt-0.5 shrink-0">✓</span>
                  <div>
                    <p className="text-xs text-slate-400">{r.item}</p>
                    <p className="text-xs text-slate-600">{r.project} · {r.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
