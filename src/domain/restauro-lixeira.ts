// Regras de conflito ao restaurar um item da Lixeira. Puro (sem DOM, sem IndexedDB) pra ser
// fácil de testar: quem chama busca os "irmãos" ativos (mesmo perfil/espaço/categoria) e usa
// daqui pra decidir se precisa renomear antes de restaurar (evita duplicar).

/** Mesma normalização usada nos formulários pra detectar nome/categoria repetidos. */
export function normalizar(valor: string): string {
  return valor.trim().toLowerCase();
}

/**
 * Gera um nome livre a partir de uma base: se já existir, acrescenta "(restaurado)",
 * "(restaurado 2)", etc. até achar um que não colida.
 */
export function gerarNomeUnico(base: string, existentes: Iterable<string>): string {
  const usados = new Set([...existentes].map(normalizar));
  if (!usados.has(normalizar(base))) return base;
  let candidato = `${base} (restaurado)`;
  let n = 2;
  while (usados.has(normalizar(candidato))) {
    candidato = `${base} (restaurado ${n})`;
    n++;
  }
  return candidato;
}

export interface ConflitoRestauro {
  conflito: boolean;
  /** Nome já livre pra usar na restauração (igual ao original quando não há conflito). */
  nomeSugerido: string;
}

/**
 * Decide se restaurar vai colidir com algo ativo:
 * - Espaço: mesmo nome no perfil.
 * - Tema: mesma categoria + mesmo nome dentro do Espaço (nome vazio nunca colide).
 * - Nota: mesmo título dentro do Tema.
 */
export function resolverConflito(
  nomeOriginal: string,
  existentes: { nome: string; categoria?: string }[],
  categoriaAlvo?: string,
): ConflitoRestauro {
  const colegas =
    categoriaAlvo === undefined
      ? existentes
      : existentes.filter((e) => normalizar(e.categoria ?? '') === normalizar(categoriaAlvo));

  const nomesOcupados = colegas.map((e) => e.nome);
  const nomeSugerido = gerarNomeUnico(nomeOriginal, nomesOcupados);
  // Nome vazio (ex: Tema "Sem nome") nunca é tratado como conflito — o app permite vários.
  const conflito = nomeOriginal.trim().length > 0 && nomeSugerido !== nomeOriginal;
  return { conflito, nomeSugerido: conflito ? nomeSugerido : nomeOriginal };
}
