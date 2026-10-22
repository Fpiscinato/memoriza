// Lápides de exclusão definitiva ("Excluir de vez" na Lixeira). Puro (sem DOM, sem
// IndexedDB) pra ser fácil de testar.
//
// Por que existe: a mesclagem do importar/sync nunca apaga o que existe local, então um
// registro apagado de vez voltava no próximo sync (o backup remoto ainda tinha a cópia
// antiga). A lápide marca "este id foi apagado de vez em <timestamp>" e viaja no
// export/sync: enquanto ela for mais nova que a cópia do registro, a cópia é ignorada
// (vem do backup) e removida (se estiver local). Regra geral: vence o mais recente.

import type { LojaPurgavel, Purga } from '../types';

/** Chave única da lápide: mesmo id em lojas diferentes são coisas diferentes. */
export function chavePurga(loja: string, alvoId: string): string {
  return `${loja}:${alvoId}`;
}

/** Id da lápide — determinístico, pra não duplicar a mesma lápide em importações diferentes. */
export function idPurga(loja: LojaPurgavel, alvoId: string): string {
  return `purga:${chavePurga(loja, alvoId)}`;
}

/** Cria (ou atualiza) a lápide de um registro apagado. */
export function criarPurga(
  loja: LojaPurgavel,
  alvoId: string,
  purgadoEm: string,
): Purga {
  return { id: idPurga(loja, alvoId), loja, alvo_id: alvoId, purgado_em: purgadoEm };
}

/**
 * A lápide cobre o registro? Só se a exclusão definitiva for mais recente que a última
 * alteração do registro — se o registro foi mexido depois (ex: restaurado e editado),
 * ele volta a valer.
 */
export function purgaCobre(
  purgas: Iterable<Purga>,
  loja: string,
  alvoId: string,
  atualizadoEm: string | undefined,
): boolean {
  if (!atualizadoEm) return false;
  for (const purga of purgas) {
    if (purga.loja !== loja || purga.alvo_id !== alvoId) continue;
    if (purga.purgado_em >= atualizadoEm) return true;
  }
  return false;
}

/** Versão booleana de `purgaCobre` para um registro qualquer (sem `atualizado_em` garantido). */
export function purgaCobreRegistro<T extends { id: string; atualizado_em?: string }>(
  purgas: Iterable<Purga>,
  loja: string,
  registro: T,
): boolean {
  return purgaCobre(purgas, loja, registro.id, registro.atualizado_em);
}

/**
 * Junta lápides locais e-importadas: quando as duas têm a mesma chave, vale a mais
 * recente (é o que a mesclagem "mais novo vence" faz com os outros registros).
 */
export function mergePurgas(local: Purga[], incoming: Purga[]): Purga[] {
  const byChave = new Map<string, Purga>();
  for (const purga of local) {
    byChave.set(chavePurga(purga.loja, purga.alvo_id), purga);
  }
  for (const purga of incoming) {
    if (!purga?.loja || !purga.alvo_id) continue;
    const chave = chavePurga(purga.loja, purga.alvo_id);
    const atual = byChave.get(chave);
    if (!atual || purga.purgado_em > atual.purgado_em) {
      byChave.set(chave, purga);
    }
  }
  return [...byChave.values()];
}

/** Só as lápides que precisam ser gravadas (novas ou mais recentes que a local). */
export function purgasParaGravar(local: Purga[], incoming: Purga[]): Purga[] {
  const byChave = new Map(local.map((p) => [chavePurga(p.loja, p.alvo_id), p]));
  const paraGravar: Purga[] = [];
  for (const purga of incoming) {
    if (!purga?.loja || !purga.alvo_id) continue;
    const atual = byChave.get(chavePurga(purga.loja, purga.alvo_id));
    if (!atual || purga.purgado_em > atual.purgado_em) paraGravar.push(purga);
  }
  return paraGravar;
}

/** Remove do conjunto os registros cobertos por uma lápide (viram "apagados de vez"). */
export function filtrarPurgados<T extends { id: string; atualizado_em?: string }>(
  registros: T[],
  purgas: Iterable<Purga>,
  loja: string,
): T[] {
  return registros.filter((registro) => !purgaCobreRegistro(purgas, loja, registro));
}

/** Ids de uma loja cobertos por lápide — usado pra apagar localmente o que foi purgado em outro aparelho. */
export function idsPurgados(
  purgas: Iterable<Purga>,
  loja: string,
  atualizadosEm: (id: string) => string | undefined,
): Set<string> {
  const ids = new Set<string>();
  for (const purga of purgas) {
    if (purga.loja !== loja) continue;
    if (purgaCobre(purgas, loja, purga.alvo_id, atualizadosEm(purga.alvo_id))) {
      ids.add(purga.alvo_id);
    }
  }
  return ids;
}
