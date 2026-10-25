// Busca global (Ctrl+K / ⌘K / botão no cabeçalho): sobreposição no topo da tela com um campo
// e resultados ao vivo — digita e já navega. Sem dependências, mesmo padrão de DOM/escape.

import { searchAll, type ResultadoBusca } from '../db/search';
import { escapeHtml } from '../lib/dom';
import { navigate } from './router';
import { ICONS } from './icons';

const ROLE_LABEL: Record<ResultadoBusca['kind'], string> = {
  espaco: 'Pasta',
  tema: 'Pasta',
  nota: 'Nota',
};

function highlight(texto: string, query: string): string {
  const escaped = escapeHtml(texto);
  const q = query.trim();
  if (!q) return escaped;
  const idx = texto.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return escaped;
  const inicio = escapeHtml(texto.slice(0, idx));
  const alvo = escapeHtml(texto.slice(idx, idx + q.length));
  const fim = escapeHtml(texto.slice(idx + q.length));
  return `${inicio}<mark>${alvo}</mark>${fim}`;
}

export async function openGlobalSearch(perfilId: string): Promise<void> {
  document.querySelector('.search-overlay')?.remove();

  const overlay = document.createElement('div');
  overlay.className = 'search-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Busca global');

  overlay.innerHTML = `
    <div class="search-panel">
      <div class="search-field">
        <span class="search-field__icon" aria-hidden="true">${ICONS.search}</span>
        <input
          class="input search-input"
          type="text"
          autocomplete="off"
          spellcheck="false"
          placeholder="Buscar pastas e notas…"
          aria-label="Buscar"
          role="combobox"
          aria-expanded="true"
          aria-controls="search-results"
          aria-autocomplete="list"
        />
        <kbd class="search-kbd">esc</kbd>
      </div>
      <div class="search-results" id="search-results" role="listbox" aria-label="Resultados"></div>
    </div>
  `;

  document.body.appendChild(overlay);

  const input = overlay.querySelector<HTMLInputElement>('.search-input')!;
  const resultsEl = overlay.querySelector<HTMLElement>('.search-results')!;

  let itensAtuais: { el: HTMLElement; resultado: ResultadoBusca }[] = [];
  let indiceAtivo = -1;
  let debounce: ReturnType<typeof setTimeout> | undefined;
  let fechado = false;
  // De onde o foco veio — devolve pra lá quando a busca fecha.
  const focoAnterior = document.activeElement as HTMLElement | null;

  function fechar(): void {
    if (fechado) return;
    fechado = true;
    overlay.remove();
    document.removeEventListener('keydown', onGlobalKey);
    if (focoAnterior?.isConnected) focoAnterior.focus();
  }

  function mover(deslocamento: number): void {
    if (itensAtuais.length === 0) return;
    indiceAtivo = (indiceAtivo + deslocamento + itensAtuais.length) % itensAtuais.length;
    itensAtuais.forEach((item, i) => {
      const ativo = i === indiceAtivo;
      item.el.classList.toggle('is-active', ativo);
      item.el.setAttribute('aria-selected', String(ativo));
      if (ativo) item.el.scrollIntoView({ block: 'nearest' });
    });
    // O foco fica no campo (é o que o usuário está usando) — quem precisa saber qual
    // resultado está selecionado é o leitor de tela, que lê `aria-activedescendant`.
    const ativo = itensAtuais[indiceAtivo]?.el;
    if (ativo) input.setAttribute('aria-activedescendant', ativo.id);
  }

  function abrirResultado(el: HTMLElement): void {
    const item = itensAtuais.find((i) => i.el === el);
    if (!item) return;
    fechar();
    const resultado = item.resultado;
    if (resultado.kind === 'espaco') navigate(`espacos/${resultado.id}`);
    else if (resultado.kind === 'tema') navigate(`temas/${resultado.id}`);
    else navigate(`notas/${resultado.id}`);
  }

  function renderizar(consulta: string): void {
    void searchAll(perfilId, consulta).then((resultados) => {
      if (fechado) return;
      indiceAtivo = -1;
      itensAtuais = [];
      if (resultados.length === 0) {
        resultsEl.innerHTML = `<p class="search-empty">Nada encontrado para "${escapeHtml(consulta.trim())}".</p>`;
        return;
      }
      resultsEl.innerHTML = '';
      for (const r of resultados) {
        // O item da lista é um <div role="option"> (num <button>, o papel seria inválido).
        // O foco continua no campo — quem navega com as setas é o `aria-activedescendant`.
        const item = document.createElement('div');
        item.className = `search-result search-result--${r.kind}`;
        item.id = `search-result-${r.kind}-${r.id}`;
        item.setAttribute('role', 'option');
        item.setAttribute('aria-selected', 'false');
        item.tabIndex = -1;
        item.innerHTML = `
          <span class="search-result__icon" aria-hidden="true">${
            r.kind === 'espaco' ? ICONS.folder : r.kind === 'tema' ? ICONS.bookOpen : ICONS.pen
          }</span>
          <span class="search-result__body">
            <span class="search-result__title">${highlight(r.titulo, consulta)}</span>
            <span class="search-result__meta">${escapeHtml(ROLE_LABEL[r.kind])} · ${escapeHtml(r.meta)}</span>
            ${
              r.snippet
                ? `<span class="search-result__snippet">${highlight(r.snippet, consulta)}</span>`
                : ''
            }
          </span>
        `;
        item.addEventListener('click', () => abrirResultado(item));
        resultsEl.appendChild(item);
        itensAtuais.push({ el: item, resultado: r });
      }
      input.removeAttribute('aria-activedescendant');
    });
  }

  function onGlobalKey(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      e.preventDefault();
      fechar();
    }
  }

  input.addEventListener('input', () => {
    if (debounce) clearTimeout(debounce);
    debounce = setTimeout(() => renderizar(input.value), 120);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      mover(1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      mover(-1);
    } else if (e.key === 'Enter' && indiceAtivo >= 0) {
      e.preventDefault();
      abrirResultado(itensAtuais[indiceAtivo].el);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      fechar();
    }
  });

  overlay.addEventListener('mousedown', (e) => {
    if (e.target === overlay) fechar();
  });

  document.addEventListener('keydown', onGlobalKey);

  input.focus();
  renderizar('');
}