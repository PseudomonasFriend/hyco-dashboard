'use client';

function generateData() {
  const active: Record<string, number> = {
    '2026-03-19': 2, '2026-03-20': 4, '2026-03-21': 4, '2026-03-22': 3,
    '2026-03-17': 3, '2026-03-15': 1, '2026-03-10': 1, '2026-03-05': 2,
    '2026-03-02': 1, '2026-02-28': 1, '2026-02-25': 2,
  };
  const days: { date: string; count: number }[] = [];
  for (let i = 41; i >= 0; i--) {
    const d = new Date(2026, 2, 22 - i);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    days.push({ date: key, count: active[key] ?? 0 });
  }
  return days;
}

function cellColor(count: number) {
  if (count === 0) return 'var(--surface-2)';
  if (count === 1) return '#312e81';
  if (count === 2) return '#4338ca';
  if (count === 3) return '#4f46e5';
  return '#818cf8';
}

export default function ActivityHeatmap() {
  const data = generateData();
  return (
    <div>
      <div className="flex flex-wrap gap-1">
        {data.map((d, i) => (
          <div
            key={i}
            title={`${d.date}: ${d.count}건`}
            className="w-4 h-4 rounded-sm cursor-default transition-opacity hover:opacity-80"
            style={{ background: cellColor(d.count) }}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3">
        <span className="text-xs text-t3">적음</span>
        {[0, 1, 2, 3, 4].map(c => (
          <div key={c} className="w-3 h-3 rounded-sm" style={{ background: cellColor(c) }} />
        ))}
        <span className="text-xs text-t3">많음</span>
      </div>
    </div>
  );
}
