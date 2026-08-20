// Lógica de mesclagem usada pelo Importar. Pura (sem IndexedDB) para ser fácil de testar.
//
// Regra por registro (comparando por `id`):
// - só existe no arquivo importado -> cria
// - existe nos dois e o do arquivo é mais recente (atualizado_em) -> substitui
// - existe nos dois e o local é mais recente ou igual -> mantém o local
// - só existe localmente -> nunca é apagado (nem é tocado)

export interface ComMetadados {
  id: string;
  atualizado_em: string;
}

export interface MergeResult<T extends ComMetadados> {
  /** Lista completa resultante (locais preservados + criados/atualizados do arquivo). */
  merged: T[];
  /** Apenas os registros que precisam ser gravados (novos ou atualizados). */
  toWrite: T[];
  criados: number;
  atualizados: number;
  mantidos: number;
}

export function mergeRecords<T extends ComMetadados>(local: T[], incoming: T[]): MergeResult<T> {
  const byId = new Map<string, T>(local.map((r) => [r.id, r]));
  const toWrite: T[] = [];
  let criados = 0;
  let atualizados = 0;
  let mantidos = 0;

  for (const inc of incoming) {
    const loc = byId.get(inc.id);
    if (!loc) {
      byId.set(inc.id, inc);
      toWrite.push(inc);
      criados++;
    } else if (inc.atualizado_em > loc.atualizado_em) {
      byId.set(inc.id, inc);
      toWrite.push(inc);
      atualizados++;
    } else {
      mantidos++;
    }
  }

  return { merged: Array.from(byId.values()), toWrite, criados, atualizados, mantidos };
}

export interface MergeSummary {
  criados: number;
  atualizados: number;
  mantidos: number;
}

export function combineSummaries(summaries: MergeSummary[]): MergeSummary {
  return summaries.reduce(
    (acc, s) => ({
      criados: acc.criados + s.criados,
      atualizados: acc.atualizados + s.atualizados,
      mantidos: acc.mantidos + s.mantidos,
    }),
    { criados: 0, atualizados: 0, mantidos: 0 },
  );
}
