import Header from '@/components/Header';

export default function SettingsPage() {
  return (
    <div className="min-h-screen p-4 lg:p-8">
      <Header
        title="설정"
        subtitle="시스템 설정 현황 (읽기 전용)"
        breadcrumbs={[{ label: '대시보드', href: '/' }, { label: '설정' }]}
      />

      <div className="max-w-3xl space-y-5">
        {/* 시스템 정보 */}
        <div className="bg-surface border border-themed rounded-xl p-5">
          <h2 className="text-sm font-semibold text-t2 mb-4">🖥️ 시스템 정보</h2>
          <div className="space-y-3">
            {[
              { key: '운영 플랫폼', value: 'Windows 11 Pro 10.0.26200' },
              { key: 'AI 모델', value: 'Claude Sonnet 4.6 (claude-sonnet-4-6)' },
              { key: '기본 디렉토리', value: 'C:/Projects_local/' },
              { key: 'Claude 설정', value: 'C:/Users/Hayeon/.claude/settings.json' },
              { key: '대시보드 소스', value: 'C:/Projects_local/hyco-dashboard/' },
              { key: '데이터 소스', value: 'C:/Projects_local/_bot/ (빌드 시 파싱)' },
            ].map(item => (
              <div key={item.key} className="flex items-start gap-4 py-2 border-b border-themed-2 last:border-0">
                <span className="text-xs text-t3 w-36 shrink-0 pt-0.5">{item.key}</span>
                <span className="text-xs text-t1 font-mono">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 활성 플러그인 */}
        <div className="bg-surface border border-themed rounded-xl p-5">
          <h2 className="text-sm font-semibold text-t2 mb-4">🔌 활성 Claude 플러그인 (8개)</h2>
          <div className="flex flex-wrap gap-2">
            {[
              'commit-commands', 'typescript-lsp', 'pyright-lsp', 'context7',
              'oh-my-claudecode', 'stripe', 'skill-creator', 'playwright',
            ].map(plugin => (
              <span key={plugin} className="text-xs px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded-lg font-mono">
                {plugin}
              </span>
            ))}
          </div>
        </div>

        {/* 봇 설정 */}
        <div className="bg-surface border border-themed rounded-xl p-5">
          <h2 className="text-sm font-semibold text-t2 mb-4">🤖 봇 설정</h2>
          <div className="space-y-3">
            {[
              { key: '텔레그램 CHAT_ID', value: '8578975315' },
              { key: '데일리 브리핑', value: '매일 7:30 자동 실행 (Windows 작업 스케줄러)' },
              { key: '로그온 브리핑', value: '로그온 시 자동 실행' },
              { key: '봇 커맨드', value: '24개 (/p, /idea, /daily, /briefing, /status 등)' },
              { key: 'CEO 보고 알림', value: '마일스톤 완료, HY 수동작업 필요 시' },
            ].map(item => (
              <div key={item.key} className="flex items-start gap-4 py-2 border-b border-themed-2 last:border-0">
                <span className="text-xs text-t3 w-36 shrink-0 pt-0.5">{item.key}</span>
                <span className="text-xs text-t1">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 공통 기술 스택 */}
        <div className="bg-surface border border-themed rounded-xl p-5">
          <h2 className="text-sm font-semibold text-t2 mb-4">⚙️ 공통 기술 스택</h2>
          <div className="space-y-3">
            {[
              { key: '프론트엔드', value: 'Next.js 16 (App Router) + TypeScript strict' },
              { key: '스타일링', value: 'Tailwind CSS v4 (CSS 변수 기반)' },
              { key: '패키지 매니저', value: 'pnpm (대부분), npm (ChehumZip)' },
              { key: '배포', value: 'Vercel (모든 프론트엔드)' },
              { key: '폰트', value: 'Pretendard (한국 프로젝트), Geist (hydrogen_tools)' },
              { key: '백엔드', value: 'Python 3.10+ (크롤러/CLI)' },
              { key: '금지 패턴', value: 'any 타입, 하드코딩 키/비밀번호' },
            ].map(item => (
              <div key={item.key} className="flex items-start gap-4 py-2 border-b border-themed-2 last:border-0">
                <span className="text-xs text-t3 w-36 shrink-0 pt-0.5">{item.key}</span>
                <span className="text-xs text-t1">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 데이터 동기화 */}
        <div className="bg-surface border border-indigo-500/20 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-indigo-500 mb-3">🔄 데이터 동기화</h2>
          <p className="text-xs text-t2 mb-3 leading-relaxed">
            대시보드 데이터는 빌드 시 <code className="text-indigo-500 bg-indigo-500/10 px-1 rounded">src/lib/static-data.ts</code>에서 로드됩니다.
            최신 데이터 반영은 Vercel 재배포가 필요합니다.
          </p>
          <div className="bg-surface-2 rounded-lg p-3 font-mono text-xs text-t3">
            <p className="text-t3"># 로컬에서 데이터 업데이트 후 재배포</p>
            <p className="text-emerald-500">$ git add -A && git commit -m &quot;docs: 데이터 최신화&quot;</p>
            <p className="text-emerald-500">$ git push origin main</p>
          </div>
        </div>
      </div>
    </div>
  );
}
