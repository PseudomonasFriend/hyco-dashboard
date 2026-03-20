'use client';

import { useEffect, useRef } from 'react';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

export default function MermaidDiagram({ chart, className = '' }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      if (!ref.current || cancelled) return;

      try {
        const mermaid = (await import('mermaid')).default;

        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          themeVariables: {
            primaryColor: '#1e1b4b',
            primaryTextColor: '#f1f5f9',
            primaryBorderColor: '#4f46e5',
            lineColor: '#4f46e5',
            secondaryColor: '#1e293b',
            tertiaryColor: '#0f172a',
            background: '#0d0d1a',
            mainBkg: '#1a1a2e',
            nodeBorder: '#4f46e5',
            clusterBkg: '#111827',
            titleColor: '#f1f5f9',
            edgeLabelBackground: '#1e293b',
            fontFamily: 'Pretendard, -apple-system, sans-serif',
          },
          securityLevel: 'loose',
        });

        const id = `mermaid-${Math.random().toString(36).slice(2)}`;
        const { svg } = await mermaid.render(id, chart);

        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
          // SVG를 반응형으로
          const svgEl = ref.current.querySelector('svg');
          if (svgEl) {
            svgEl.style.maxWidth = '100%';
            svgEl.style.height = 'auto';
          }
        }
      } catch (err) {
        if (!cancelled && ref.current) {
          ref.current.innerHTML = `<div class="text-red-400 text-sm p-4 bg-red-500/10 rounded-lg border border-red-500/20">다이어그램 렌더링 오류: ${err instanceof Error ? err.message : String(err)}</div>`;
        }
      }
    };

    render();

    return () => {
      cancelled = true;
    };
  }, [chart]);

  return (
    <div
      ref={ref}
      className={`mermaid-container overflow-x-auto ${className}`}
    >
      <div className="text-slate-500 text-sm animate-pulse">다이어그램 로딩 중…</div>
    </div>
  );
}
