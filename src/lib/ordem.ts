// Ordenação de nomes em todas as listagens (Espaços, Temas, grupos/categorias, chips de
// sugestão, favoritos e exportação em PDF). Antes cada tela chamava `localeCompare` do seu
// jeito, o que quebrava em dois casos comuns:
//
//  - Números: "Aula 10" ficava antes de "Aula 2", porque comparação alfabética vê "1" < "2".
//    Resolvido com `numeric: true` no Intl.Collator.
//
//  - Meses do ano: em português a ordem alfabética dos nomes não é a do calendário
//    ("Abril" < "Agosto" < "Dezembro" < "Fevereiro"...). `numeric` não resolve, então os meses
//    são reconhecidos pelo nome e ordenados pelo número do mês.
//
// Reconhecer mês por nome tem um risco: "Mar", em português, é o mar, não março. Por isso a
// ordem por mês só entra quando **todos** os nomes da lista são meses — uma lista com
// "Janeiro", "Mar" e "Aula 1" continua alfabética, e "Mar" sozinho nunca é reordenado.

/** Collation do app: números como número, ignorando maiúsculas/minúsculas e acentos. */
const collator = new Intl.Collator('pt-BR', { numeric: true, sensitivity: 'base' });

/** Nome do mês (normalizado) → número do mês. Inclui pt-BR por extenso e abreviado, e o
 *  inglês, já que o fuso do app é Europe/London e é fácil um Tema estar em inglês. */
const MESES = new Map<string, number>([
  ['janeiro', 1], ['fevereiro', 2], ['marco', 3], ['abril', 4], ['maio', 5],
  ['junho', 6], ['julho', 7], ['agosto', 8], ['setembro', 9], ['outubro', 10],
  ['novembro', 11], ['dezembro', 12],
  ['jan', 1], ['fev', 2], ['mar', 3], ['abr', 4], ['mai', 5], ['jun', 6],
  ['jul', 7], ['ago', 8], ['set', 9], ['out', 10], ['nov', 11], ['dez', 12],
  ['january', 1], ['february', 2], ['march', 3], ['april', 4], ['may', 5],
  ['june', 6], ['july', 7], ['august', 8], ['september', 9], ['october', 10],
  ['november', 11], ['december', 12],
  ['feb', 2], ['sep', 9], ['sept', 9], ['aug', 8], ['dec', 12],
]);

/** Minúsculas, sem acento e sem ponto final — "Março." e "março" caem no mesmo mês. */
function normalizar(valor: string): string {
  return valor
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\.+$/, '');
}

/** Número do mês (1–12) se o texto for um mês conhecido; null caso contrário. */
export function detectarMes(valor: string): number | null {
  return MESES.get(normalizar(valor)) ?? null;
}

/** true só quando a lista inteira é composta de meses — a condição para ordenar por mês. */
function saoTodosMeses(nomes: string[]): boolean {
  return nomes.length > 0 && nomes.every((nome) => detectarMes(nome) !== null);
}

/**
 * Compara dois nomes. `porMes` diz que os dois são meses reconhecidos: nesse caso a ordem do
 * calendário vence, e o collation só serve como desempate (meses repetidos, ex. "Março" e
 * "Mar."). Fora dos meses, é alfanumérica e sem acento.
 */
function compararNomes(a: string, b: string, porMes: boolean): number {
  if (porMes) {
    const mesA = detectarMes(a) as number;
    const mesB = detectarMes(b) as number;
    if (mesA !== mesB) return mesA - mesB;
  }
  return collator.compare(a, b);
}

/**
 * Ordena uma lista de nomes: ordem do calendário quando todos são meses, caso contrário
 * alfanumérica (com os números como números). Devolve uma cópia — a lista original não muda.
 */
export function ordenarTextos(valores: string[]): string[] {
  const porMes = saoTodosMeses(valores);
  return [...valores].sort((a, b) => compararNomes(a, b, porMes));
}

/** Compara dois nomes sem olhar o conjunto — para desempates pontuais (ex.: busca global). */
export function compararTextos(a: string, b: string): number {
  return collator.compare(a, b);
}

/**
 * Ordena uma lista de itens pelo nome (via `getNome`), com a mesma regra de `ordenarTextos`:
 * meses em ordem de calendário, números como números, resto alfabético. É o ponto de entrada
 * usado pelas listagens de Espaços e Temas.
 */
export function ordenarPorNome<T>(itens: T[], getNome: (item: T) => string): T[] {
  const porMes = saoTodosMeses(itens.map(getNome));
  return [...itens].sort((a, b) => compararNomes(getNome(a), getNome(b), porMes));
}