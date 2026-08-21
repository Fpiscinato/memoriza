import { escapeHtml } from '../../lib/dom';

/**
 * Ícone "ⓘ" ao lado do rótulo de um campo — abre um balão pequeno com a explicação, no lugar
 * de um parágrafo fixo ocupando espaço o tempo todo. Fecha sozinho ao clicar fora (ver
 * bindGlobalPopoverClose em src/ui/app.ts), não precisa de JS extra aqui.
 */
export function renderFieldHint(texto: string): string {
  return `
    <details class="field-hint">
      <summary aria-label="Mais informações sobre este campo">ⓘ</summary>
      <div class="field-hint__panel">${escapeHtml(texto)}</div>
    </details>
  `;
}
