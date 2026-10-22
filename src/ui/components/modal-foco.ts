// Foco dos modais. Sem isto, o modal aparece mas o foco continua no botão que o abriu
// (fora do diálogo): o leitor de tela anuncia o conteúdo do modal fora de contexto, o
// Tab escorre pra página de trás e, ao fechar, o foco cai no <body> (o próximo Tab
// recomeça do topo do documento).
//
// Aqui: entra no diálogo ao abrir, fica preso dentro dele (Tab/Shift+Tab não saem) e
// devolve o foco pro elemento que estava focado quando fecha.

/** Elementos que recebem foco dentro do diálogo, na ordem do DOM. */
function focaveis(dialog: HTMLElement): HTMLElement[] {
  return Array.from(
    dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.hasAttribute('disabled') && el.getClientRects().length > 0);
}

/**
 * Ativa o gerenciamento de foco no modal. Devolve a função de limpeza — chame ela
 * (antes de remover o overlay do DOM) pra devolver o foco ao ponto de origem.
 */
export function gerenciarFocoModal(dialog: HTMLElement): () => void {
  const anterior = document.activeElement as HTMLElement | null;

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const itens = focaveis(dialog);
    if (itens.length === 0) {
      e.preventDefault();
      return;
    }
    const primeiro = itens[0];
    const ultimo = itens[itens.length - 1];
    const ativo = document.activeElement;
    if (e.shiftKey && (ativo === primeiro || !dialog.contains(ativo))) {
      e.preventDefault();
      ultimo.focus();
    } else if (!e.shiftKey && ativo === ultimo) {
      e.preventDefault();
      primeiro.focus();
    }
  };

  document.addEventListener('keydown', onKeydown);

  const inicial = focaveis(dialog)[0] ?? dialog;
  inicial.focus();

  return () => {
    document.removeEventListener('keydown', onKeydown);
    if (anterior && anterior.isConnected) anterior.focus();
  };
}
