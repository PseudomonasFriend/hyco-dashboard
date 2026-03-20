'use client';
import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import type { Approval } from '@/lib/types';

export default function ApprovalCard({ approval }: { approval: Approval }) {
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [loading, setLoading] = useState(false);

  const handle = async (action: 'approve' | 'reject') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/approvals/${approval.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      const data = await res.json() as { message: string };
      setStatus(action === 'approve' ? 'approved' : 'rejected');
      toast.success(data.message);
    } catch {
      toast.error('처리 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  const borderColor = approval.urgency === 'critical' ? 'border-red-500/20' : 'border-amber-500/20';
  const bgColor = approval.urgency === 'critical' ? 'bg-red-500/5' : 'bg-amber-500/5';

  return (
    <div className={`bg-surface ${bgColor} border ${borderColor} rounded-xl p-4 transition-all ${status !== 'pending' ? 'opacity-60' : ''}`}>
      <div className="flex items-start gap-3 mb-3">
        <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${approval.urgency === 'critical' ? 'bg-red-500' : 'bg-amber-500'}`} />
        <div className="flex-1">
          <p className="text-sm text-t1 font-medium leading-relaxed">{approval.item}</p>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <Link href={`/project/${approval.projectSlug}`} className="text-xs text-indigo-500 hover:text-indigo-400">{approval.project}</Link>
            <span className="text-xs text-t3">{approval.registeredDate}</span>
            <span className={`text-xs font-medium ${approval.urgency === 'critical' ? 'text-red-500' : 'text-amber-500'}`}>{approval.daysPending}일 경과</span>
          </div>
        </div>
      </div>

      {status === 'pending' ? (
        <div className="flex gap-2 ml-5">
          <button
            onClick={() => handle('approve')}
            disabled={loading}
            className="flex-1 py-1.5 text-xs rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors disabled:opacity-50"
          >
            {loading ? '처리 중…' : '✅ 승인'}
          </button>
          <button
            onClick={() => handle('reject')}
            disabled={loading}
            className="flex-1 py-1.5 text-xs rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-colors disabled:opacity-50"
          >
            {loading ? '처리 중…' : '❌ 반려'}
          </button>
        </div>
      ) : (
        <div className={`ml-5 py-1.5 text-xs text-center rounded-lg ${status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
          {status === 'approved' ? '✅ 승인됨' : '❌ 반려됨'}
        </div>
      )}
    </div>
  );
}
