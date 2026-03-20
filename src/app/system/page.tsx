import { SYSTEM_SCRIPTS, PROJECTS } from '@/lib/static-data';
import MermaidDiagram from '@/components/MermaidDiagram';
import Header from '@/components/Header';

const ARCHITECTURE_DIAGRAM = `graph TB
  subgraph HY["👤 HY CEO"]
    HY_TG[텔레그램]
  end

  subgraph BOT["🤖 _bot 인프라"]
    ARIA["ARIA v7<br/>(aria_router.py)"]
    BOT_PY["bot.py<br/>24개 커맨드"]
    BRIEFING["briefing.py<br/>7:30 자동"]
    NOTIFY["notify_ceo.py"]
    QUEUE["task_queue.py<br/>승인 큐"]
  end

  subgraph PROJECTS_GRP["📁 프로젝트"]
    CZ["🗂️ ChehumZip<br/>95%"]
    TS["🔧 Toolsajang<br/>97%"]
    HT["⚡ hydrogen<br/>90%"]
    WG["📍 wheretogo<br/>70%"]
    SC["🎬 Shorts<br/>97%"]
  end

  subgraph INFRA["☁️ 인프라"]
    VERCEL["Vercel<br/>5개 사이트"]
    SUPABASE["Supabase<br/>DB + Storage"]
    ADSENSE["Google<br/>AdSense"]
  end

  HY_TG <-->|명령/보고| BOT_PY
  BOT_PY --> ARIA
  ARIA --> QUEUE
  QUEUE -->|L0 승인| HY_TG
  BRIEFING -->|아침 브리핑| HY_TG
  NOTIFY -->|마일스톤 보고| HY_TG

  ARIA -.->|작업 라우팅| CZ
  ARIA -.->|작업 라우팅| TS
  ARIA -.->|작업 라우팅| HT
  ARIA -.->|작업 라우팅| WG

  CZ --> VERCEL
  TS --> VERCEL
  HT --> VERCEL
  SC --> VERCEL

  CZ --> SUPABASE
  SC --> SUPABASE
  TS --> ADSENSE
`;

export default function SystemPage() {
  return (
    <div className="min-h-screen p-4 lg:p-8">
      <Header
        title="시스템 현황"
        subtitle="HYco 멀티에이전트 아키텍처 및 인프라 상태"
        breadcrumbs={[{ label: '대시보드', href: '/' }, { label: '시스템 현황' }]}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 아키텍처 다이어그램 */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-surface border border-themed rounded-xl p-5">
            <h2 className="text-sm font-semibold text-t2 mb-4">🏗️ 멀티에이전트 아키텍처</h2>
            <MermaidDiagram chart={ARCHITECTURE_DIAGRAM} />
          </div>

          {/* 스크립트 상태 */}
          <div className="bg-surface border border-themed rounded-xl p-5">
            <h2 className="text-sm font-semibold text-t2 mb-4">⚙️ 스크립트 상태</h2>
            <div className="space-y-2">
              {SYSTEM_SCRIPTS.map(s => (
                <div key={s.name} className="flex items-center gap-4 py-2.5 border-b border-themed-2 last:border-0">
                  <div className="flex items-center gap-2 w-5">
                    {s.status === 'running' ? (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-soft" />
                    ) : s.status === 'ready' ? (
                      <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-surface-3" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-t1">{s.name}</span>
                      <span className="text-xs text-t3 font-mono">{s.file}</span>
                    </div>
                    <p className="text-xs text-t3">{s.description}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    s.status === 'running' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                    s.status === 'ready' ? 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20' :
                    'bg-surface-2 text-t3'
                  }`}>
                    {s.status === 'running' ? '운영 중' : s.status === 'ready' ? '준비' : '대기'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 오른쪽: 프로젝트 빌드 상태 + 파일 트리 */}
        <div className="space-y-4">
          {/* 프로젝트 빌드 상태 */}
          <div className="bg-surface border border-themed rounded-xl p-5">
            <h2 className="text-sm font-semibold text-t2 mb-4">🚀 배포 상태</h2>
            <div className="space-y-2.5">
              {PROJECTS.filter(p => p.status !== 'archived').map(p => (
                <div key={p.slug} className="flex items-center gap-3">
                  <span className="text-base">{p.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-t1 truncate">{p.name}</p>
                    <p className="text-xs text-t3 truncate">{p.domain}</p>
                  </div>
                  <span className="text-xs bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                    ✓ 배포
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* _bot 디렉토리 구조 */}
          <div className="bg-surface border border-themed rounded-xl p-5">
            <h2 className="text-sm font-semibold text-t2 mb-4">📁 _bot 구조</h2>
            <div className="font-mono text-xs text-t3 space-y-1 leading-relaxed">
              {[
                { indent: 0, name: '_bot/', color: 'text-t1' },
                { indent: 1, name: 'bot.py', color: 'text-indigo-500' },
                { indent: 1, name: 'briefing.py', color: 'text-indigo-500' },
                { indent: 1, name: 'aria_router.py', color: 'text-purple-500' },
                { indent: 1, name: 'notify_ceo.py', color: 'text-emerald-500' },
                { indent: 1, name: 'brains/', color: 'text-t2' },
                { indent: 2, name: '*.brain.md', color: 'text-t3' },
                { indent: 1, name: 'agent_log/', color: 'text-t2' },
                { indent: 2, name: '*.log.md', color: 'text-t3' },
                { indent: 1, name: 'inbox/', color: 'text-t2' },
                { indent: 1, name: 'approvals/', color: 'text-t2' },
                { indent: 1, name: 'hq_status.md', color: 'text-amber-500' },
              ].map((item, i) => (
                <div key={i} className="flex" style={{ paddingLeft: `${item.indent * 12}px` }}>
                  <span className="text-t3 mr-1">{item.indent > 0 ? '├─' : ''}</span>
                  <span className={item.color}>{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 신뢰 레벨 */}
          <div className="bg-surface border border-themed rounded-xl p-5">
            <h2 className="text-sm font-semibold text-t2 mb-4">🔐 Trust Level</h2>
            <div className="space-y-2.5">
              {[
                { level: 'L1', label: '자율', items: '로컬 커밋, 파일 수정, 빌드', color: 'text-emerald-500' },
                { level: 'L2', label: '보고 후', items: '의존성 추가, 스키마 변경', color: 'text-amber-500' },
                { level: 'L3', label: 'HY 승인', items: 'push, 배포, 외부 서비스', color: 'text-red-500' },
              ].map(tl => (
                <div key={tl.level} className="flex items-start gap-3">
                  <span className={`text-xs font-bold font-mono ${tl.color} w-6 shrink-0`}>{tl.level}</span>
                  <div>
                    <span className={`text-xs font-medium ${tl.color}`}>{tl.label}</span>
                    <p className="text-xs text-t3">{tl.items}</p>
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
