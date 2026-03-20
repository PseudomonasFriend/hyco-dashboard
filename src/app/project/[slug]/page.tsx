import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PROJECTS, LOGS } from '@/lib/static-data';
import Header from '@/components/Header';
import CompletionChart from '@/components/charts/CompletionChart';

export function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find(p => p.slug === slug);
  if (!project) notFound();

  const projectLogs = LOGS.filter(l => !l.projectSlug || l.projectSlug === slug).slice(0, 3);
  const completionColor = project.completion >= 95 ? '#10b981' : project.completion >= 85 ? '#4f46e5' : project.completion >= 70 ? '#f59e0b' : '#ef4444';
  const statusLabel = { active: '활성', monitoring: '모니터링', archived: '보관' }[project.status];

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <Header
        title={`${project.emoji} ${project.name}`}
        subtitle={project.description}
        breadcrumbs={[{ label: '대시보드', href: '/' }, { label: '프로젝트' }, { label: project.name }]}
      />

      {/* 프로젝트 히어로 */}
      <div className="bg-surface border border-themed rounded-xl p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{project.emoji}</span>
            <div>
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <h1 className="text-2xl font-bold text-t1">{project.name}</h1>
                <span className={`text-xs px-2 py-1 rounded-full status-${project.status}`}>{statusLabel}</span>
              </div>
              <p className="text-sm text-t2 mb-2">{project.description}</p>
              <a href={project.domain.startsWith('http') ? project.domain : `https://${project.domain}`}
                target="_blank" rel="noopener noreferrer"
                className="text-xs text-indigo-500 hover:text-indigo-400 transition-colors">
                {project.domain} ↗
              </a>
            </div>
          </div>
          <div className="text-center lg:text-right">
            <p className="text-5xl font-bold mb-1" style={{ color: completionColor }}>{project.completion}%</p>
            <p className="text-xs text-t3">완성도</p>
            <div className="w-32 h-2 rounded-full overflow-hidden mt-2 ml-auto bg-surface-2">
              <div className="h-full rounded-full" style={{ width: `${project.completion}%`, backgroundColor: completionColor }} />
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-themed-2 flex flex-wrap gap-2">
          {project.techStack.map(t => (
            <span key={t} className="text-xs px-2.5 py-1 bg-surface-2 border border-themed rounded-lg text-t2">{t}</span>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-surface border border-themed rounded-xl p-5">
            <h2 className="text-sm font-semibold text-t2 mb-4">✅ 주요 달성</h2>
            <ul className="space-y-2">
              {project.brainHighlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-t2">
                  <span className="text-emerald-500 text-xs mt-0.5 shrink-0">✓</span>
                  <span>{h.replace('✅ ', '')}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-surface border border-themed rounded-xl p-5">
            <h2 className="text-sm font-semibold text-t2 mb-4">📋 다음 태스크</h2>
            <ol className="space-y-3">
              {project.nextTasks.map((task, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-xs text-t3 font-mono mt-0.5 w-4 shrink-0">{i + 1}.</span>
                  <p className="text-sm text-t1 leading-relaxed">{task}</p>
                </li>
              ))}
            </ol>
          </div>
          {/* 전체 프로젝트 완성도 비교 */}
          <div className="bg-surface border border-themed rounded-xl p-5">
            <h2 className="text-sm font-semibold text-t2 mb-4">📊 전체 프로젝트 완성도 비교</h2>
            <CompletionChart />
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-surface border border-emerald-500/20 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-emerald-500 mb-3">💰 수익 모델</h2>
            <p className="text-sm text-t1 mb-2">{project.revenueModel}</p>
            <p className="text-xs text-t2 leading-relaxed">{project.revenueStatus}</p>
          </div>
          {project.pendingDecisions.length > 0 ? (
            <div className="bg-surface border border-amber-500/20 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-amber-500 mb-4">⚠️ 의사결정 대기 ({project.pendingDecisions.length}건)</h2>
              <div className="space-y-3">
                {project.pendingDecisions.map((d, i) => (
                  <div key={i} className="py-2.5 border-b border-themed-2 last:border-0">
                    <p className="text-xs text-t1 mb-1 leading-relaxed">{d.item}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-t3">{d.date} 등록</span>
                      <span className="text-xs text-amber-500">{d.daysPending}일 경과</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-surface border border-themed rounded-xl p-5">
              <p className="text-xs text-t3">✅ 대기 중인 의사결정 없음</p>
            </div>
          )}
          {projectLogs.length > 0 && (
            <div className="bg-surface border border-themed rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-t2">📅 최근 활동</h2>
                <Link href="/logs" className="text-xs text-indigo-500 hover:text-indigo-400">전체 →</Link>
              </div>
              {projectLogs.map((log, i) => (
                <div key={i} className="py-2.5 border-b border-themed-2 last:border-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-t3">{log.date}</span>
                  </div>
                  <p className="text-xs text-t2 leading-relaxed">{log.summary}</p>
                </div>
              ))}
            </div>
          )}
          <div className="bg-surface border border-themed rounded-xl p-4">
            <p className="text-xs text-t3 mb-1">최종 업데이트</p>
            <p className="text-sm text-t2">{project.lastUpdated}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
