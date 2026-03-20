import { LOGS } from '@/lib/static-data';
import Header from '@/components/Header';
import LogsClient from '@/components/LogsClient';

export default function LogsPage() {
  const doneCount = LOGS.reduce((acc, l) => acc + l.items.filter(i => i.status === 'done').length, 0);
  const pendingCount = LOGS.reduce((acc, l) => acc + l.items.filter(i => i.status === 'pending').length, 0);

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <Header
        title="활동 로그"
        subtitle="에이전트 세션별 작업 기록"
        breadcrumbs={[{ label: '대시보드', href: '/' }, { label: '활동 로그' }]}
      />
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-surface border border-themed rounded-xl p-4">
          <p className="text-2xl font-bold text-t1 mb-1">{LOGS.length}</p>
          <p className="text-xs text-t3">총 세션</p>
        </div>
        <div className="bg-surface border border-themed rounded-xl p-4">
          <p className="text-2xl font-bold text-emerald-500 mb-1">{doneCount}</p>
          <p className="text-xs text-t3">완료 작업</p>
        </div>
        <div className="bg-surface border border-themed rounded-xl p-4">
          <p className="text-2xl font-bold text-amber-500 mb-1">{pendingCount}</p>
          <p className="text-xs text-t3">진행 중</p>
        </div>
      </div>
      <LogsClient logs={LOGS} />
    </div>
  );
}
