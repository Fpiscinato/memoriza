export interface Grupo<T> {
  categoria: string;
  itens: T[];
}

/**
 * Agrupa itens por `categoria` (texto livre). Categoria em branco vira o grupo "Sem
 * categoria", sempre listado por último; os demais grupos ficam em ordem alfabética.
 * Usado por Espaços e Temas na listagem, e pela exportação em PDF.
 */
export function agruparPorCategoria<T extends { categoria: string }>(itens: T[]): Grupo<T>[] {
  const mapa = new Map<string, T[]>();
  for (const item of itens) {
    const chave = item.categoria.trim();
    const lista = mapa.get(chave) ?? [];
    lista.push(item);
    mapa.set(chave, lista);
  }

  const grupos = Array.from(mapa.entries()).map(([categoria, itens]) => ({ categoria, itens }));
  grupos.sort((a, b) => {
    if (a.categoria === '' && b.categoria !== '') return 1;
    if (b.categoria === '' && a.categoria !== '') return -1;
    return a.categoria.localeCompare(b.categoria, 'pt-BR');
  });
  return grupos;
}
