'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { PROJECTS } from '@/lib/static-data';

function getColor(pct: number) {
  if (pct >= 95) return '#10b981';
  if (pct >= 85) return '#4f46e5';
  if (pct >= 70) return '#f59e0b';
  return '#ef4444';
}

export default function CompletionChart() {
  const data = PROJECTS.map(p => ({
    name: p.emoji + ' ' + (p.name.length > 10 ? p.name.slice(0, 10) + '…' : p.name),
    pct: p.completion,
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
        <XAxis type="number" domain={[0, 100]} tick={{ fill: 'var(--t3)', fontSize: 11 }} tickLine={false} axisLine={false} unit="%" />
        <YAxis type="category" dataKey="name" tick={{ fill: 'var(--t2)', fontSize: 11 }} width={100} tickLine={false} axisLine={false} />
        <Tooltip
          cursor={{ fill: 'var(--surface-2)' }}
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const pct = payload[0].value;
            return (
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--t1)', fontSize: '12px', padding: '6px 10px' }}>
                {pct}% 완성도
              </div>
            );
          }}
        />
        <Bar dataKey="pct" radius={[0, 6, 6, 0]} maxBarSize={22}>
          {data.map((entry, i) => (
            <Cell key={i} fill={getColor(entry.pct)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
