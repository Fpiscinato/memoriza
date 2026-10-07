import { escapeHtml } from '../../lib/dom';
import type { HeatmapDay } from '../../domain/activity';

function level(count: number): number {
  if (count <= 0) return 0;
  if (count === 1) return 1;
  if (count <= 2) return 2;
  if (count <= 4) return 3;
  return 4;
}

// const WEEK_DAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];



export function renderHeatmap(days: HeatmapDay[], totalDiasRevisao: number, totalDiasCriacao: number): string {
  if (days.length === 0) return '<p class="text-muted">Sem dados para o heatmap.</p>';
  const weeks: HeatmapDay[][] = [];
  let w: HeatmapDay[] = [];
  const startDow = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  for (let i = 0; i < startDow; i++) w.push({ date: '', count: 0, hasRevisao: false, hasCriacao: false });
  for (const d of days) {
    w.push(d);
    if (w.length === 7) {
      weeks.push(w);
      w = [];
    }
  }
  if (w.length > 0) weeks.push(w);
  while (weeks.length < 53 && weeks.at(-1)?.length === 7) {
    const last = weeks.at(-1)!;
    if (last.length < 7) break;
  }

  const cols = weeks.length;
  return `
    <div class="heatmap">
      <div class="heatmap__grid" style="grid-template-columns: repeat(${cols}, 1fr);">
        ${weeks
          .map(
            (row) => `
          <div class="heatmap__col">
            ${row
              .map(
                (d) => `
              <div class="heatmap__cell heatmap__cell--${level(d.count)}${d.date ? '' : ' heatmap__cell--empty'}" title="${d.date ? `${d.date}${d.count ? ` · ${d.count} atividade(s)` : ''}${d.hasRevisao && d.hasCriacao ? ' (revisão + criação)' : d.hasRevisao ? ' (revisão)' : d.hasCriacao ? ' (criação)' : ''}` : ''}"></div>
            `,
              )
              .join('')}
          </div>
        `,
          )
          .join('')}
      </div>
      <div class="heatmap__legend">
        <span class="text-muted">Menor</span>
        <span class="heatmap__cell heatmap__cell--0"></span>
        <span class="heatmap__cell heatmap__cell--1"></span>
        <span class="heatmap__cell heatmap__cell--2"></span>
        <span class="heatmap__cell heatmap__cell--3"></span>
        <span class="heatmap__cell heatmap__cell--4"></span>
        <span class="text-muted">Maior</span>
      </div>
      <p class="screen-hint" style="margin: var(--space-2) 0 0;">
        ${escapeHtml(String(totalDiasRevisao))} dias estudados · ${escapeHtml(String(totalDiasCriacao))} dias com criação de notas · ${escapeHtml(String(days.filter((d) => d.count > 0).length))} dias com atividade nos últimos ${escapeHtml(String(days.length))} dias
      </p>
    </div>
  `;
}
