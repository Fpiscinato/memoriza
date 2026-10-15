// Regras de rotação dos snapshots locais, isoladas em funções puras pra serem testáveis sem
// IndexedDB. Cria-se no máximo um snapshot automático por dia (db/snapshots.ts); aqui só se
// decide o que descartar: mantém todos dos últimos SNAPSHOT_DIARIO_DIAS dias, depois um por
// semana por SNAPSHOT_SEMANAL_SEMANAS semanas, com um teto geral. Manuais têm teto próprio.

export const SNAPSHOT_DIARIO_DIAS = 7;
export const SNAPSHOT_SEMANAL_SEMANAS = 8;
export const SNAPSHOT_AUTO_MAX = 20;
export const SNAPSHOT_MANUAL_MAX = 10;

export interface SnapshotMeta {
  id: string;
  criado_em: string;
  automatico: boolean;
}

function apenasData(iso: string): string {
  return iso.slice(0, 10);
}

function somarDias(dateISO: string, dias: number): string {
  const [ano, mes, dia] = dateISO.split('-').map(Number);
  const dt = new Date(Date.UTC(ano, mes - 1, dia));
  dt.setUTCDate(dt.getUTCDate() + dias);
  return dt.toISOString().slice(0, 10);
}

/** Data da segunda-feira da semana de `dateISO` — chave pra agrupar snapshots por semana. */
function segundaFeira(dateISO: string): string {
  const [ano, mes, dia] = dateISO.split('-').map(Number);
  const dt = new Date(Date.UTC(ano, mes - 1, dia));
  const diaSemana = dt.getUTCDay(); // 0 = domingo … 6 = sábado
  dt.setUTCDate(dt.getUTCDate() - ((diaSemana + 6) % 7));
  return dt.toISOString().slice(0, 10);
}

/** Ids de snapshot que devem ser removidos, dado o conjunto atual e a data de hoje (yyyy-mm-dd). */
export function idsParaRemover(snapshots: SnapshotMeta[], hojeISO: string): string[] {
  const remover = new Set<string>();
  const maisNovosPrimeiro = (a: SnapshotMeta, b: SnapshotMeta) =>
    b.criado_em.localeCompare(a.criado_em);

  const automaticos = snapshots.filter((s) => s.automatico).sort(maisNovosPrimeiro);
  const manuais = snapshots.filter((s) => !s.automatico).sort(maisNovosPrimeiro);

  const limiteDiario = somarDias(hojeISO, -(SNAPSHOT_DIARIO_DIAS - 1));
  const semanasVistas = new Set<string>();
  let autoMantidos = 0;

  for (const snap of automaticos) {
    const dia = apenasData(snap.criado_em);
    let manter: boolean;
    if (dia >= limiteDiario) {
      manter = true;
    } else {
      const semana = segundaFeira(dia);
      manter = !semanasVistas.has(semana) && semanasVistas.size < SNAPSHOT_SEMANAL_SEMANAS;
      if (manter) semanasVistas.add(semana);
    }
    if (manter && autoMantidos < SNAPSHOT_AUTO_MAX) {
      autoMantidos++;
      continue;
    }
    remover.add(snap.id);
  }

  for (const snap of manuais.slice(SNAPSHOT_MANUAL_MAX)) {
    remover.add(snap.id);
  }

  return [...remover];
}
