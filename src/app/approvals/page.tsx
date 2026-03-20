import { APPROVALS, HY_DIRECT_TASKS } from '@/lib/static-data';
import ApprovalCard from '@/components/ApprovalCard';
import Header from '@/components/Header';

export default function ApprovalsPage() {
  const critical = APPROVALS.filter(a => a.urgency === 'critical');
  const warning = APPROVALS.filter(a => a.urgency === 'warning');

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <Header
        title="승인 관리"
        subtitle={`HY CEO 승인 필요 — 총 ${APPROVALS.length}건`}
        breadcrumbs={[{ label: '대시보드', href: '/' }, { label: '승인 관리' }]}
      />

      {/* 요약 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { value: critical.length, label: '긴급 (30일+)', color: 'text-red-500', border: 'border-red-500/20' },
          { value: warning.length, label: '주의 (7일+)', color: 'text-amber-500', border: 'border-amber-500/20' },
          { value: APPROVALS.length, label: '전체 대기', color: 'text-t1', border: 'border-themed' },
          { value: 2, label: '이번 주 해소', color: 'text-indigo-500', border: 'border-indigo-500/20' },
        ].map((c, i) => (
          <div key={i} className={`bg-surface border ${c.border} rounded-xl p-4`}>
            <p className={`text-2xl font-bold ${c.color} mb-1`}>{c.value}</p>
            <p className="text-xs text-t3">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {critical.length > 0 && (
            <>
              <h2 className="text-sm font-semibold text-red-500 mb-3">🚨 긴급 — 30일 이상 경과</h2>
              {critical.map(a => <ApprovalCard key={a.id} approval={a} />)}
            </>
          )}
          {warning.length > 0 && (
            <>
              <h2 className="text-sm font-semibold text-amber-500 mt-5 mb-3">⚠️ 주의 — 확인 필요</h2>
              {warning.map(a => <ApprovalCard key={a.id} approval={a} />)}
            </>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-surface border border-amber-500/20 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-amber-500 mb-4">🙋 HY 직접 처리</h2>
            <div className="space-y-3">
              {HY_DIRECT_TASKS.map((t, i) => (
                <div key={i} className="py-2.5 border-b border-themed-2 last:border-0">
                  <p className="text-xs text-t1 font-medium mb-0.5">{t.item}</p>
                  <p className="text-xs text-t3 mb-1">{t.project}</p>
                  <p className="text-xs text-t2 leading-relaxed">{t.memo}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-surface border border-emerald-500/20 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-emerald-500 mb-4">✅ 최근 해소</h2>
            <div className="space-y-2.5">
              {[
                { item: 'Shorts YouTube OAuth URI', date: '2026-03-21', project: 'Shorts Creator' },
                { item: 'Toolsajang AdSense 슬롯 배치', date: '2026-03-21', project: 'Toolsajang' },
              ].map((r, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 text-xs mt-0.5 shrink-0">✓</span>
                  <div>
                    <p className="text-xs text-t2">{r.item}</p>
                    <p className="text-xs text-t3">{r.project} · {r.date}</p>
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
