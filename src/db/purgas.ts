// Escrita das "lápides" de exclusão definitiva (store `purgas`). A regra em si é pura
// (src/domain/purga.ts); aqui só grava, dentro da mesma transação da exclusão.
//
// Por que existe: a mesclagem do importar/sync nunca apaga o que existe local, então um
// registro apagado de vez (na Lixeira, ou um Perfil inteiro) voltava no próximo sync — o
// backup remoto ainda tinha a cópia antiga. A lápide viaja no export/sync e vence qualquer
// cópia mais antiga do registro.

import { criarPurga } from '../domain/purga';
import type { LojaPurgavel, Purga } from '../types';

export interface AlvoPurga {
  /** Loja do registro apagado ("perfis", "espacos", "notas", ...). */
  loja: LojaPurgavel;
  /** Id do registro apagado. */
  alvo: string;
}

/** Grava as lápides dentro da transação da exclusão (o mesmo `tx` que apaga os registros). */
export async function gravarPurgas(
  tx: {
    objectStore: (nome: 'purgas') => { put: (valor: Purga) => Promise<unknown> };
  },
  alvos: AlvoPurga[],
  purgadoEm: string,
): Promise<void> {
  for (const { loja, alvo } of alvos) {
    await tx.objectStore('purgas').put(criarPurga(loja, alvo, purgadoEm));
  }
}
