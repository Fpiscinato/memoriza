import { escapeHtml } from '../../lib/dom';

export interface InfoOptions {
  title: string;
  /** HTML já pronto (o chamador é responsável por escapar texto dinâmico). */
  bodyHtml: string;
  closeLabel?: string;
}

/** Modal só-leitura (sem confirmar/cancelar) — "mais informações" sobre algo. */
export function showInfo(opts: InfoOptions): void {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="info-modal-title">
      <div class="modal__title" id="info-modal-title">${escapeHtml(opts.title)}</div>
      <div class="modal__message">${opts.bodyHtml}</div>
      <div class="form-actions">
        <button class="btn btn--secondary" id="info-modal-close" type="button">${escapeHtml(opts.closeLabel ?? 'Fechar')}</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') cleanup();
  };
  document.addEventListener('keydown', onKeydown);

  function cleanup() {
    document.removeEventListener('keydown', onKeydown);
    overlay.remove();
  }

  overlay.querySelector('#info-modal-close')?.addEventListener('click', cleanup);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) cleanup();
  });
}
