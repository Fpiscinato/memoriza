import { escapeHtml } from '../../lib/dom';

/** Chips clicáveis com as categorias já existentes, pra preencher `inputId` num clique — no
 * lugar de depender do <input list>/<datalist> nativo, confuso de usar no celular. */
export function renderCategoriaChips(categorias: string[], inputId: string): string {
  if (categorias.length === 0) return '';
  return `
    <div class="chip-row" data-chips-for="${escapeHtml(inputId)}">
      ${categorias.map((c) => `<button type="button" class="chip" data-chip-value="${escapeHtml(c)}">${escapeHtml(c)}</button>`).join('')}
    </div>
  `;
}

export function bindCategoriaChips(container: HTMLElement): void {
  container.querySelectorAll<HTMLElement>('[data-chips-for]').forEach((row) => {
    const inputId = row.dataset.chipsFor!;
    const input = container.querySelector<HTMLInputElement>(`#${inputId}`);
    if (!input) return;
    row.querySelectorAll<HTMLButtonElement>('[data-chip-value]').forEach((chip) => {
      chip.addEventListener('click', () => {
        input.value = chip.dataset.chipValue!;
        input.focus();
      });
    });
  });
}
