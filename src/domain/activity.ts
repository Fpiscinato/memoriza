// Cálculos puros para métricas de atividade (dias estudados, ritmo de criação, heatmap).
// Sem IndexedDB — testável.

import { addDaysToISODate, toLondonISODate } from '../lib/time';

export type PeriodBucket = 'dia' | 'semana' | 'mes' | 'ano';

export interface DiaAtividade {
  date: string; // YYYY-MM-DD (fuso London)
  revisoes: number;
  cricoes: number; // criações de notas
  atividade: number; // revisoes + cricoes
}

export interface HeatmapDay {
  date: string;
  count: number; // total de atividade (revisoes + notas criadas)
  hasRevisao: boolean;
  hasCriacao: boolean;
}

export interface HeatmapData {
  days: HeatmapDay[];
  totalDiasRevisao: number;
  totalDiasCriacao: number;
  totalDiasAtividade: number;
}

export interface PeriodCount {
  key: string; // label do período
  revisoes: number;
  cricoes: number;
  atividade: number;
}

function normalizeLondonDate(iso: string): string {
  // Aceita ISO completo ou YYYY-MM-DD. Converte pra London ISO date.
  if (iso.length === 10) return iso;
  return toLondonISODate(new Date(iso));
}

export function extrairDatasRevisoes(dataConcluidas: string[]): Set<string> {
  const set = new Set<string>();
  for (const d of dataConcluidas) {
    if (!d) continue;
    set.add(d.slice(0, 10));
  }
  return set;
}

export function extrairDatasCriacoes(criadosEm: string[]): Set<string> {
  const set = new Set<string>();
  for (const d of criadosEm) {
    if (!d) continue;
    set.add(normalizeLondonDate(d));
  }
  return set;
}

export function unionDatas(a: Set<string>, b: Set<string>): Set<string> {
  const u = new Set(a);
  for (const x of b) u.add(x);
  return u;
}

export function contarDiasDistintos(set: ReadonlySet<string>): number {
  return set.size;
}

export function bucketPorMes(anoMes: string): string {
  // anoMes YYYY-MM
  return `${anoMes}-01`;
}

export function formatMesLabel(anoMes: string): string {
  const [y, m] = anoMes.split('-');
  const d = new Date(Number(y), Number(m) - 1, 1);
  return d.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
}

export function gerarRangeDatas(inicio: string, fim: string): string[] {
  const res: string[] = [];
  let cur = inicio;
  while (cur <= fim) {
    res.push(cur);
    cur = addDaysToISODate(cur, 1);
  }
  return res;
}

export function gerarHeatmap(
  datasRevisao: Set<string>,
  datasCriacao: Set<string>,
  diasAtras: number = 365,
  hoje: string = toLondonISODate(),
): HeatmapData {
  const inicio = addDaysToISODate(hoje, -diasAtras + 1);
  const days: HeatmapDay[] = [];
  let cur = inicio;
  while (cur <= hoje) {
    days.push({
      date: cur,
      count: (datasRevisao.has(cur) ? 1 : 0) + (datasCriacao.has(cur) ? 1 : 0),
      hasRevisao: datasRevisao.has(cur),
      hasCriacao: datasCriacao.has(cur),
    });
    cur = addDaysToISODate(cur, 1);
  }
  const totalDiasRevisao = contarDiasDistintos(datasRevisao);
  const totalDiasCriacao = contarDiasDistintos(datasCriacao);
  const totalDiasAtividade = contarDiasDistintos(unionDatas(datasRevisao, datasCriacao));
  return { days, totalDiasRevisao, totalDiasCriacao, totalDiasAtividade };
}

export function agregarPorMes(
  datasRevisao: Set<string>,
  datasCriacao: Set<string>,
  meses: number = 12,
  hoje: string = toLondonISODate(),
): PeriodCount[] {
  const inicio = new Date(`${addDaysToISODate(hoje, -meses * 30)}T00:00:00Z`);
  const buckets = new Map<string, { revisoes: number; cricoes: number }>();
  for (let i = 0; i < meses; i++) {
    const d = new Date(`${hoje}T00:00:00Z`);
    d.setUTCMonth(d.getUTCMonth() - (meses - 1 - i));
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
    buckets.set(key, { revisoes: 0, cricoes: 0 });
  }
  for (const dr of datasRevisao) {
    if (dr < toLondonISODate(inicio)) continue;
    const [y, m, _] = dr.split('-');
    const key = `${y}-${m}`;
    const b = buckets.get(key);
    if (b) b.revisoes++;
  }
  for (const dc of datasCriacao) {
    if (dc < toLondonISODate(inicio)) continue;
    const [y, m, _] = dc.split('-');
    const key = `${y}-${m}`;
    const b = buckets.get(key);
    if (b) b.cricoes++;
  }
  return Array.from(buckets.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, v]) => ({
      key,
      revisoes: v.revisoes,
      cricoes: v.cricoes,
      atividade: v.revisoes + v.cricoes,
    }));
}
