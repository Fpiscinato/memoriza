// Rótulos de exibição. São puros (sem DOM, sem IndexedDB) pra valer igual na tela, no PDF,
// no texto copiado e na busca.

/** Nome do Tema é opcional — quem não tem nome aparece assim (nunca em branco). */
export const TEMA_SEM_NOME = 'Sem nome';

export function nomeTemaExibicao(nome: string | undefined | null): string {
  return (nome ?? '').trim() || TEMA_SEM_NOME;
}
