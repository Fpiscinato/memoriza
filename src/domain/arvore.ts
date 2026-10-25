// Árvore de pastas: cada Tema pode ter uma pasta pai (`pai_id`) dentro do mesmo Espaço.
// Ausente = subpasta direta do Espaço. Funções puras (sem DOM/IndexedDB) pra serem usadas
// pela interface, pela Lixeira, pela busca e pelo PDF sem duplicar a mesma lógica.

import type { Tema } from '../types';

/** Filhos diretos de uma pasta (ou da raiz do Espaço, quando `paiId` é null). */
export function filhosDe(temas: Tema[], paiId: string | null): Tema[] {
  return temas.filter((tema) => (tema.pai_id ?? null) === paiId);
}

/**
 * Todas as pastas abaixo de `raizId` (sem incluir a própria raiz), em pré-ordem.
 * Protege contra ciclos (dados importados corrompidos) com um conjunto de visitados.
 */
export function descendentesDe(temas: Tema[], raizId: string): Tema[] {
  const filhosPorPai = new Map<string, Tema[]>();
  for (const tema of temas) {
    if (!tema.pai_id) continue;
    const lista = filhosPorPai.get(tema.pai_id);
    if (lista) lista.push(tema);
    else filhosPorPai.set(tema.pai_id, [tema]);
  }

  const resultado: Tema[] = [];
  const visitados = new Set<string>([raizId]);
  const fila = [...(filhosPorPai.get(raizId) ?? [])];
  while (fila.length > 0) {
    const atual = fila.shift()!;
    if (visitados.has(atual.id)) continue;
    visitados.add(atual.id);
    resultado.push(atual);
    fila.push(...(filhosPorPai.get(atual.id) ?? []));
  }
  return resultado;
}

/**
 * Caminho de pastas acima de `alvo`, da raiz do Espaço até o pai imediato (sem incluir o
 * próprio alvo). Devolve [] quando o alvo já é uma subpasta direta do Espaço.
 */
export function caminhoDe(temas: Tema[], alvo: Tema): Tema[] {
  const porId = new Map(temas.map((tema) => [tema.id, tema]));
  const caminho: Tema[] = [];
  const visitados = new Set<string>([alvo.id]);
  let paiId = alvo.pai_id;
  while (paiId && !visitados.has(paiId)) {
    const pai = porId.get(paiId);
    if (!pai) break;
    caminho.unshift(pai);
    visitados.add(pai.id);
    paiId = pai.pai_id;
  }
  return caminho;
}

/** Ids da própria pasta + tudo que está abaixo dela (útil pra cascata e contagens). */
export function idsDaSubarvore(temas: Tema[], raizId: string): string[] {
  return [raizId, ...descendentesDe(temas, raizId).map((tema) => tema.id)];
}
