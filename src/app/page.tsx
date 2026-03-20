import Link from 'next/link';
import { KPI, PROJECTS, APPROVALS, HY_DIRECT_TASKS } from '@/lib/static-data';
import type { Project } from '@/lib/types';

function KpiCard({
  label, value, sub, icon, color = 'default',
}: {
  label: string; value: string | number; sub?: string; icon: string;
  color?: 'green' | 'yellow' | 'red' | 'blue' | 'default';
}) {
  const valueColor = { green: 'text-emerald-400', yellow: 'text-amber-400', red: 'text-red-400', blue: 'text-indigo-400', default: 'text-slate-200' }[color];
  return (
    <div className="bg-[#111827] border border-white/[0.06] rounded-xl p-4 card-glow transition-all">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xl">{icon}</span>
        {sub && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/[0.05] text-slate-500">{sub}</span>}
      </div>
      <p className={`text-2xl font-bold mb-1 ${valueColor}`}>{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const statusLabel = { active: '활성', monitoring: '모니터링', archived: '보관' }[project.status];
  const completionColor = project.completion >= 95 ? '#10b981' : project.completion >= 85 ? '#4f46e5' : project.completion >= 70 ? '#f59e0b' : '#ef4444';
  return (
    <Link href={`/project/${project.slug}`}>
      <div className="bg-[#111827] border border-white/[0.06] rounded-xl p-5 card-glow transition-all cursor-pointer fade-in h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{project.emoji}</span>
            <div>
              <p className="text-sm font-semibold text-slate-100">{project.name}</p>
              <p className="text-xs text-slate-500 truncate max-w-[130px]">{project.domain}</p>
            </div>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full status-${project.status}`}>{statusLabel}</span>
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-slate-500">완성도</span>
            <span className="text-sm font-bold" style={{ color: completionColor }}>{project.completion}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${project.completion}%`, backgroundColor: completionColor }} />
          </div>
        </div>
        <p className="text-xs text-slate-500 mb-1">수익</p>
        <p className="text-xs text-slate-400 mb-3 leading-relaxed">{project.revenueStatus}</p>
        {project.nextTasks[0] && (
          <div className="pt-3 border-t border-white/[0.04]">
            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">→ {project.nextTasks[0]}</p>
          </div>
        )}
        {project.pendingDecisions.length > 0 && (
          <div className="mt-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="text-xs text-amber-500/80">의사결정 {project.pendingDecisions.length}건</span>
          </div>
        )}
      </div>
    </Link>
  );
}

export default function DashboardPage() {
  const criticalCount = APPROVALS.filter((a) => a.urgency === 'critical').length;
  return (
    <div className="min-h-screen p-4 lg:p-8">
      {/* 헤더 */}
      <div className="mb-8 ml-10 lg:ml-0">
        <h1 className="text-2xl font-bold text-slate-100">HYco 대시보드</h1>
        <p className="text-sm text-slate-500 mt-0.5">2026년 3월 22일 기준 · HY 컴퍼니 운영 현황</p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
        <KpiCard icon="💰" label="월 수익" value={KPI.monthlyRevenue} sub="집계 대기" color="yellow" />
        <KpiCard icon="📡" label="AdSense 사이트" value={`${KPI.adSenseSites}개`} sub="Toolsajang 수익 중" color="green" />
        <KpiCard icon="🔀" label="주간 커밋" value={`${KPI.weeklyCommits}건+`} sub="활성 4개" color="blue" />
        <KpiCard icon="⏳" label="승인 대기" value={`${KPI.pendingDecisions}건`} sub={criticalCount > 0 ? `${criticalCount}건 긴급` : '정상'} color={criticalCount > 0 ? 'red' : 'default'} />
        <KpiCard icon="📬" label="Inbox" value={`${KPI.inboxCount}건`} sub="모두 처리" color="green" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 프로젝트 */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">📁 프로젝트</h2>
            <span className="text-xs text-slate-600">클릭 → 상세</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {PROJECTS.map((p) => <ProjectCard key={p.slug} project={p} />)}
          </div>
        </div>

        {/* 우측 패널 */}
        <div className="space-y-4">
          {/* 승인 대기 */}
          <div className="bg-[#111827] border border-white/[0.06] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-slate-300">⏳ 승인 대기</h2>
              <Link href="/approvals" className="text-xs text-indigo-400 hover:text-indigo-300">전체 →</Link>
            </div>
            <div className="space-y-2">
              {APPROVALS.slice(0, 5).map((a) => (
                <div key={a.id} className="flex items-start gap-2.5 py-2 border-b border-white/[0.04] last:border-0">
                  <span className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${a.urgency === 'critical' ? 'bg-red-500' : 'bg-amber-500'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-300 leading-relaxed">{a.item}</p>
                    <p className="text-xs text-slate-600">{a.project} · {a.daysPending}일</p>
                  </div>
                </div>
              ))}
            </div>
            {APPROVALS.length > 5 && <p className="text-xs text-slate-600 mt-3 text-center">+{APPROVALS.length - 5}건 더</p>}
          </div>

          {/* HY 직접 처리 */}
          <div className="bg-[#111827] border border-amber-500/20 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-amber-400 mb-4">🙋 HY 직접 처리</h2>
            <div className="space-y-2.5">
              {HY_DIRECT_TASKS.map((t, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-amber-600 text-xs mt-0.5 shrink-0">●</span>
                  <div>
                    <p className="text-xs text-slate-300">{t.item}</p>
                    <p className="text-xs text-slate-600">{t.project}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 추천 액션 */}
          <div className="bg-[#111827] border border-indigo-500/20 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-indigo-400 mb-4">🎯 오늘 추천 액션</h2>
            <ol className="space-y-2.5">
              {[
                { label: 'Toolsajang AI 툴 활성화', sub: 'isActive: true → 즉시 수익화', c: 'text-emerald-400' },
                { label: 'hydrogen_tools 의사결정', sub: 'Excel 6파일 준비 완료', c: 'text-amber-400' },
                { label: 'wheretogo 첫 10편 발행', sub: '테스트 3편 검증 완료', c: 'text-blue-400' },
                { label: 'Search Console 등록', sub: 'ChehumZip + Toolsajang', c: 'text-slate-400' },
              ].map((a, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-slate-600 text-xs font-mono mt-0.5 w-4 shrink-0">{i + 1}.</span>
                  <div>
                    <p className={`text-xs font-medium ${a.c}`}>{a.label}</p>
                    <p className="text-xs text-slate-600">{a.sub}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
