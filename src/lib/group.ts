import { ordenarTextos, ordenarPorNome } from './ordem';

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
 * Os itens de cada grupo também saem ordenados pelo nome (meses em ordem de calendário,
 * números como números — ver lib/ordem.ts), valendo também quando o grupo é lido isolado.
 * Usado por Espaços e Temas na listagem, e pela exportação em PDF.
 */
export function agruparPorCategoria<T extends { categoria: string; nome: string }>(
  itens: T[],
): Grupo<T>[] {
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
  const nomes = grupos.map((g) => g.categoria);
  // "Sem categoria" sempre por último, independente da ordem do resto.
  const ordemNomes = new Map<string, number>();
  ordenarTextos(nomes.filter((n) => n !== '')).forEach((nome, i) => ordemNomes.set(nome, i));
  grupos.sort((a, b) => {
    if (a.categoria === '' && b.categoria !== '') return 1;
    if (b.categoria === '' && a.categoria !== '') return -1;
    return (ordemNomes.get(a.categoria) ?? 0) - (ordemNomes.get(b.categoria) ?? 0);
  });
  // Itens de cada grupo pelo nome — aqui o conjunto é o próprio grupo, então um grupo de meses
  // sozinho já sai em ordem de calendário mesmo que o Espaço tenha outras categorias fora dele.
  for (const grupo of grupos) {
    if (grupo.itens.length > 1) {
      grupo.itens = ordenarPorNome(grupo.itens, (i) => i.nome);
    }
  }
  return grupos;
}

/**
 * Lista de categorias distintas (pra sugestão/autocomplete), ignorando maiúsculas/minúsculas
 * e espaços nas pontas — mantém a primeira grafia encontrada, ordenada alfabeticamente
 * (meses em ordem de calendário, quando as categorias forem todas meses).
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
  return ordenarTextos(Array.from(vistos.values()));
}
