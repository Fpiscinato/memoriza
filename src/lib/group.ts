export interface Grupo<T> {
  categoria: string;
  itens: T[];
}

/** Chave de comparação: ignora maiúsculas/minúsculas e espaços nas pontas. */
function chaveCategoria(valor: string): string {
  return valor.trim().toLowerCase();
}

/**
 * Agrupa itens por `categoria` (texto livre), comparando ignorando maiúsculas/minúsculas e
 * espaços nas pontas — "Livros", "livros" e " Livros " caem no mesmo grupo. Categoria em
 * branco vira o grupo "Sem categoria", sempre listado por último; os demais grupos ficam em
 * ordem alfabética. O rótulo exibido do grupo é a primeira grafia encontrada.
 * Usado por Espaços e Temas na listagem, e pela exportação em PDF.
 */
export function agruparPorCategoria<T extends { categoria: string }>(itens: T[]): Grupo<T>[] {
  const mapa = new Map<string, { display: string; itens: T[] }>();
  for (const item of itens) {
    const bruto = item.categoria.trim();
    const chave = chaveCategoria(bruto);
    const grupo = mapa.get(chave);
    if (grupo) {
      grupo.itens.push(item);
    } else {
      mapa.set(chave, { display: bruto, itens: [item] });
    }
  }

  const grupos = Array.from(mapa.values()).map((g) => ({ categoria: g.display, itens: g.itens }));
  grupos.sort((a, b) => {
    if (a.categoria === '' && b.categoria !== '') return 1;
    if (b.categoria === '' && a.categoria !== '') return -1;
    return a.categoria.localeCompare(b.categoria, 'pt-BR');
  });
  return grupos;
}

/**
 * Lista de categorias distintas (pra sugestão/autocomplete), ignorando maiúsculas/minúsculas
 * e espaços nas pontas — mantém a primeira grafia encontrada, ordenada alfabeticamente.
 * Categorias em branco não entram (não fazem sentido como sugestão).
 */
export function distinctCategorias(valores: string[]): string[] {
  const vistos = new Map<string, string>();
  for (const valor of valores) {
    const bruto = valor.trim();
    if (!bruto) continue;
    const chave = chaveCategoria(bruto);
    if (!vistos.has(chave)) vistos.set(chave, bruto);
  }
  return Array.from(vistos.values()).sort((a, b) => a.localeCompare(b, 'pt-BR'));
}
