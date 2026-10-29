// Seletor de aparência de um espaço/tema: ícone (conjunto curado de espaco-icons.ts) + cor
// da paleta de acento. Usado nos formulários de criar/editar. O componente guarda a escolha
// em inputs hidden; a tela lê com lerEspacoVisual().

import { ACCENT_COUNT } from '../../lib/color';
import { ESPACO_ICONES, sugerirEspacoIcone } from '../espaco-icons';

const COR_LABELS = ['Azul', 'Verde', 'Âmbar', 'Violeta', 'Vermelho', 'Ciano', 'Rosa', 'Índigo'];

export interface EspacoVisualOpcoes {
  prefix: string;
  icone?: string;
  cor?: number;
}

export interface EspacoVisual {
  icone?: string;
  cor?: number;
}

export function renderEspacoVisualPicker(opts: EspacoVisualOpcoes): string {
  const { prefix, icone, cor } = opts;
  return `
    <div class="field espaco-visual" data-espaco-visual="${escapeAttr(prefix)}">
      <span class="field__label">Ícone</span>
      <p class="espaco-visual__hint">Escolha um ícone — conforme você digita o nome, sugerimos os mais prováveis.</p>
      <div class="espaco-visual__icons" role="group" aria-label="Ícone">
        ${ESPACO_ICONES.map(
          (i) => `
          <button
            type="button"
            class="espaco-icon-btn${i.chave === icone ? ' is-selected' : ''}"
            data-icone="${escapeAttr(i.chave)}"
            title="${escapeAttr(i.label)}"
            aria-label="${escapeAttr(i.label)}"
            aria-pressed="${i.chave === icone}"
          >${i.svg}</button>
        `,
        ).join('')}
      </div>
      <input type="hidden" id="${escapeAttr(prefix)}-icone" value="${escapeAttr(icone ?? '')}" />

      <span class="field__label" style="margin-top: var(--space-4);">Cor</span>
      <div class="espaco-visual__cores" role="group" aria-label="Cor">
        <button
          type="button"
          class="color-swatch color-swatch--auto${typeof cor !== 'number' ? ' is-selected' : ''}"
          data-cor=""
          title="Automática"
          aria-label="Cor automática"
          aria-pressed="${typeof cor !== 'number'}"
        >A</button>
        ${Array.from({ length: ACCENT_COUNT }, (_, i) => `
          <button
            type="button"
            class="color-swatch${cor === i ? ' is-selected' : ''}"
            data-cor="${i}"
            style="--swatch: var(--accent-${i});"
            title="${COR_LABELS[i] ?? `Cor ${i}`}"
            aria-label="${COR_LABELS[i] ?? `Cor ${i}`}"
            aria-pressed="${cor === i}"
          ></button>
        `).join('')}
      </div>
      <input type="hidden" id="${escapeAttr(prefix)}-cor" value="${typeof cor === 'number' ? String(cor) : ''}" />
    </div>
  `;
}

/**
 * Liga os cliques do seletor e a sugestão automática. `getTexto` deve devolver o nome
 * atual, para sugerirmos o ícone enquanto o usuário digita. Enquanto ele não
 * clicar num ícone manualmente, a sugestão vai sendo aplicada sozinha.
 */
export function bindEspacoVisualPicker(
  container: HTMLElement,
  opts: { prefix: string; getTexto: () => string },
): void {
  const { prefix, getTexto } = opts;
  const raiz = container.querySelector<HTMLElement>(`[data-espaco-visual="${cssEscape(prefix)}"]`);
  if (!raiz) return;

  const iconeInput = raiz.querySelector<HTMLInputElement>(`#${cssEscape(prefix)}-icone`);
  const corInput = raiz.querySelector<HTMLInputElement>(`#${cssEscape(prefix)}-cor`);
  const botoesIcone = Array.from(raiz.querySelectorAll<HTMLButtonElement>('[data-icone]'));

  const selecionarIcone = (chave: string) => {
    if (iconeInput) iconeInput.value = chave;
    for (const btn of botoesIcone) {
      const ativo = btn.dataset.icone === chave;
      btn.classList.toggle('is-selected', ativo);
      btn.setAttribute('aria-pressed', String(ativo));
    }
  };

  let manual = false;
  for (const btn of botoesIcone) {
    btn.addEventListener('click', () => {
      manual = true;
      selecionarIcone(btn.dataset.icone ?? '');
    });
  }

  raiz.querySelectorAll<HTMLButtonElement>('[data-cor]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (corInput) corInput.value = btn.dataset.cor ?? '';
      raiz.querySelectorAll<HTMLButtonElement>('[data-cor]').forEach((b) => {
        const ativo = b === btn;
        b.classList.toggle('is-selected', ativo);
        b.setAttribute('aria-pressed', String(ativo));
      });
    });
  });

  const aplicarSugestao = () => {
    if (manual) return;
    const sugerida = sugerirEspacoIcone(getTexto());
    for (const btn of botoesIcone) {
      btn.classList.toggle('is-suggested', !!sugerida && btn.dataset.icone === sugerida);
    }
    if (sugerida) selecionarIcone(sugerida);
  };

  // Sugere já na abertura (ex: nome pré-preenchido) e enquanto digita. O escopo é o card
  // do formulário: numa mesma tela podem existir dois seletores (criar e editar), e digitar
  // num não deve trocar o ícone do outro.
  aplicarSugestao();
  const escopo = raiz.closest<HTMLElement>('.card') ?? container;
  escopo.querySelectorAll<HTMLInputElement>('input[type="text"]').forEach((input) => {
    input.addEventListener('input', aplicarSugestao);
  });
}

export function lerEspacoVisual(container: HTMLElement, prefix: string): EspacoVisual {
  const raiz = container.querySelector<HTMLElement>(`[data-espaco-visual="${cssEscape(prefix)}"]`);
  const icone = raiz?.querySelector<HTMLInputElement>(`#${cssEscape(prefix)}-icone`)?.value.trim();
  const corTexto = raiz?.querySelector<HTMLInputElement>(`#${cssEscape(prefix)}-cor`)?.value.trim();
  const visual: EspacoVisual = {};
  if (icone) visual.icone = icone;
  if (corTexto !== undefined && corTexto !== '') {
    const n = Number(corTexto);
    if (Number.isInteger(n) && n >= 0 && n < ACCENT_COUNT) visual.cor = n;
  }
  return visual;
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function cssEscape(value: string): string {
  return value.replace(/["\\]/g, '\\$&');
}
