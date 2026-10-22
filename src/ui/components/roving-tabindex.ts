// "Roving tabindex": deixa só UM item do grupo no tab order (tabindex="0") e usa as
// setas do teclado pra mover o foco entre eles — é o padrão de toolbar e de tablist
// descrito no ARIA Authoring Practices.
//
// Sem isso, um grupo de 17 botões (a toolbar do editor de nota) virava 17 paradas de
// Tab: pra chegar no campo de conteúdo o usuário tinha que apertar Tab 17 vezes.
//
// A seta move o foco E a seleção (é o que o APG pede pra toolbar e tablist); a
// ativação (Enter/Espaço) continua sendo a do próprio botão.

export interface RovingOptions {
  /** Qual seta move pra frente/trás. 'both' aceita horizontal e vertical. */
  orientacao?: 'horizontal' | 'vertical' | 'both';
  /** Chamado quando a seleção muda (usado pra trocar o painel exibido). */
  aoMudar?: (item: HTMLElement, indice: number) => void;
  /** Índice de quem começa no tab order (default: o primeiro, ou o `aria-selected`). */
  inicial?: number;
}

/**
 * Ativa o roving tabindex no grupo. `itens` é a lista de elementos na ordem visual.
 * Devolve uma função para consultar o índice atualmente selecionado.
 */
export function ativarRovingTabindex(itens: HTMLElement[], opcoes: RovingOptions = {}): () => number {
  const orientacao = opcoes.orientacao ?? 'horizontal';
  let atual = opcoes.inicial ?? indiceInicial(itens);

  function indiceInicial(lista: HTMLElement[]): number {
    const marcado = lista.findIndex((el) => el.getAttribute('aria-selected') === 'true');
    return marcado >= 0 ? marcado : 0;
  }

  function aplicarTabindex(): void {
    itens.forEach((el, i) => {
      el.setAttribute('tabindex', i === atual ? '0' : '-1');
    });
  }

  function mover(delta: number): void {
    if (itens.length === 0) return;
    atual = (atual + delta + itens.length) % itens.length;
    aplicarTabindex();
    itens[atual].focus();
    opcoes.aoMudar?.(itens[atual], atual);
  }

  itens.forEach((el, i) => {
    el.addEventListener('keydown', (e) => {
      const teclado = e as KeyboardEvent;
      const proximo =
        (orientacao !== 'vertical' && teclado.key === 'ArrowRight') ||
        (orientacao !== 'horizontal' && teclado.key === 'ArrowDown');
      const anterior =
        (orientacao !== 'vertical' && teclado.key === 'ArrowLeft') ||
        (orientacao !== 'horizontal' && teclado.key === 'ArrowUp');

      if (proximo) {
        teclado.preventDefault();
        mover(1);
      } else if (anterior) {
        teclado.preventDefault();
        mover(-1);
      } else if (teclado.key === 'Home') {
        teclado.preventDefault();
        atual = 0;
        aplicarTabindex();
        itens[0].focus();
        opcoes.aoMudar?.(itens[0], 0);
      } else if (teclado.key === 'End') {
        teclado.preventDefault();
        atual = itens.length - 1;
        aplicarTabindex();
        itens[atual].focus();
        opcoes.aoMudar?.(itens[atual], atual);
      }
    });

    // Clicar (ou focar) um item torna ele o "atual" — assim o próximo Tab continua
    // dali, e não sempre do primeiro.
    el.addEventListener('focus', () => {
      atual = i;
      aplicarTabindex();
    });
  });

  aplicarTabindex();

  return () => atual;
}
