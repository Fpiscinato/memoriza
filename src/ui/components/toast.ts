// Aviso flutuante (toast) — usado pra "nova versão disponível" e pelo aviso de
// "pronto pra usar offline". Fica no topo da tela, acima do conteúdo, e some sozinho
// (a não ser o da atualização, que espera o usuário).

import { escapeHtml } from '../../lib/dom';

export interface ToastOpcoes {
  /** Texto principal (já vem pronto pra tela — o chamador escapa). */
  texto: string;
  /** Ícone à esquerda. */
  icone?: string;
  /** Rótulo do botão de ação. */
  acao?: { rotulo: string; aoClicar: () => void };
  /** Rótulo do botão de dispensar. Sem ele, o toast some sozinho. */
  dispensar?: { rotulo: string };
  /** Tempo até sumir sozinho (ms). Ignorado quando há botão de dispensar. */
  ms?: number;
  /** Tipo visual. */
  tom?: 'info' | 'sucesso';
}

let toastAtual: HTMLElement | null = null;

/** Mostra o aviso. Substitui o aviso anterior, se houver. */
export function mostrarToast(opts: ToastOpcoes): void {
  toastAtual?.remove();
  toastAtual = null;

  const el = document.createElement('div');
  el.className = `toast toast--${opts.tom ?? 'info'}`;
  el.setAttribute('role', 'status');
  el.innerHTML = `
    ${opts.icone ? `<span class="toast__icon" aria-hidden="true">${opts.icone}</span>` : ''}
    <span class="toast__texto">${escapeHtml(opts.texto)}</span>
    <span class="toast__acoes">
      ${
        opts.acao
          ? `<button class="btn btn--primary btn--sm" data-toast-acao type="button">${escapeHtml(opts.acao.rotulo)}</button>`
          : ''
      }
      ${
        opts.dispensar
          ? `<button class="btn btn--secondary btn--sm" data-toast-fechar type="button">${escapeHtml(opts.dispensar.rotulo)}</button>`
          : ''
      }
    </span>
  `;

  el.querySelector('[data-toast-acao]')?.addEventListener('click', () => {
    fechar();
    opts.acao?.aoClicar();
  });
  el.querySelector('[data-toast-fechar]')?.addEventListener('click', () => fechar());

  function fechar(): void {
    el.remove();
    if (toastAtual === el) toastAtual = null;
  }

  document.body.appendChild(el);
  toastAtual = el;

  if (!opts.dispensar) {
    setTimeout(fechar, opts.ms ?? 5000);
  }
}
