import { escapeHtml } from '../../lib/dom';

export interface ConfirmOptions {
  title: string;
  /** Texto simples; quebras de linha (\n) viram <br>. */
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

/** Modal de confirmação genérico, usado antes de qualquer exclusão. Resolve `true`/`false`. */
export function confirmAction(opts: ConfirmOptions): Promise<boolean> {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal" role="alertdialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal__title" id="modal-title">${escapeHtml(opts.title)}</div>
        <p class="modal__message">${escapeHtml(opts.message).replace(/\n/g, '<br>')}</p>
        <div class="form-actions">
          <button class="btn btn--danger" id="modal-confirm" type="button">${escapeHtml(opts.confirmLabel ?? 'Excluir')}</button>
          <button class="btn btn--secondary" id="modal-cancel" type="button">${escapeHtml(opts.cancelLabel ?? 'Cancelar')}</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cleanup(false);
    };
    document.addEventListener('keydown', onKeydown);

    function cleanup(result: boolean) {
      document.removeEventListener('keydown', onKeydown);
      overlay.remove();
      resolve(result);
    }

    overlay.querySelector('#modal-confirm')?.addEventListener('click', () => cleanup(true));
    overlay.querySelector('#modal-cancel')?.addEventListener('click', () => cleanup(false));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) cleanup(false);
    });
  });
}
