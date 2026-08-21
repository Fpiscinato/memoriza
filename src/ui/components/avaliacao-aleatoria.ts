import { listNotasPorEspaco, type NotaComTema } from '../../db/notas';
import { escapeHtml } from '../../lib/dom';
import { renderMarkdown } from '../../lib/markdown';

const TIERS = [
  { key: 'basico', label: 'Básico', n: 5 },
  { key: 'medio', label: 'Médio', n: 15 },
  { key: 'longo', label: 'Longo', n: 30 },
] as const;

function shuffle<T>(itens: T[]): T[] {
  const copia = [...itens];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/**
 * Repasse avulso e aleatório pelas notas de um Espaço — não mexe na revisão espaçada
 * (itens_revisao), é só um teste opcional pra relembrar, disponível a qualquer momento
 * (arquivado ou não). Assume o container inteiro até `onSair` ser chamado.
 */
export async function iniciarAvaliacaoAleatoria(
  container: HTMLElement,
  espacoId: string,
  espacoNome: string,
  onSair: () => void,
): Promise<void> {
  const todas = await listNotasPorEspaco(espacoId);

  if (todas.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">🎲</div>
        <div class="empty-state__title">Nenhuma nota pra testar ainda</div>
        <p class="empty-state__hint">Crie notas nos Temas deste Espaço antes de fazer uma avaliação.</p>
      </div>
      <button class="btn btn--secondary" id="btn-sair-avaliacao" type="button">← Voltar</button>
    `;
    container.querySelector('#btn-sair-avaliacao')?.addEventListener('click', onSair);
    return;
  }

  renderEscolhaTamanho(container, todas, espacoNome, onSair);
}

function renderEscolhaTamanho(
  container: HTMLElement,
  todas: NotaComTema[],
  espacoNome: string,
  onSair: () => void,
): void {
  container.innerHTML = `
    <div class="breadcrumb">
      <button class="link" id="btn-sair-avaliacao" type="button">← Voltar</button>
    </div>
    <div class="content-narrow">
      <div class="card stack" style="text-align:center;">
        <div class="empty-state__icon" aria-hidden="true">🎲</div>
        <h2 style="margin:0;">Avaliação aleatória — ${escapeHtml(espacoNome)}</h2>
        <p class="text-muted" style="margin:0;">
          Repasse rápido com notas aleatórias, sem afetar sua fila de revisão. ${todas.length} nota(s) no total — escolha quantas:
        </p>
        <div class="stack">
          ${TIERS.map(
            (t) => `
            <button class="btn btn--secondary btn--block" data-tier="${t.key}" type="button">
              ${t.label} — ${Math.min(t.n, todas.length)} nota(s)
            </button>
          `,
          ).join('')}
        </div>
      </div>
    </div>
  `;

  container.querySelector('#btn-sair-avaliacao')?.addEventListener('click', onSair);
  container.querySelectorAll<HTMLButtonElement>('[data-tier]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tier = TIERS.find((t) => t.key === btn.dataset.tier)!;
      const selecionadas = shuffle(todas).slice(0, Math.min(tier.n, todas.length));
      renderQuiz(container, selecionadas, 0, espacoNome, onSair);
    });
  });
}

function renderQuiz(
  container: HTMLElement,
  itens: NotaComTema[],
  indice: number,
  espacoNome: string,
  onSair: () => void,
  revelado = false,
): void {
  if (indice >= itens.length) {
    renderFim(container, itens.length, espacoNome, onSair);
    return;
  }
  const atual = itens[indice];

  container.innerHTML = `
    <div class="breadcrumb">
      <button class="link" id="btn-sair-avaliacao" type="button">← Encerrar avaliação</button>
    </div>
    <div class="content-narrow">
    <div class="card review-card">
      <div class="review-card__meta">${escapeHtml(atual.tema.nome)} · ${indice + 1} de ${itens.length}</div>
      <div class="review-card__titulo">${atual.nota.favorito ? '⭐ ' : ''}${escapeHtml(atual.nota.titulo || '(sem título)')}</div>
      ${
        !revelado
          ? `
        <p class="text-muted">Tente lembrar o que você anotou sobre isto antes de revelar.</p>
        <button class="btn btn--primary" id="btn-revelar" type="button">Mostrar resposta</button>
      `
          : `
        <div class="review-card__content markdown-preview">${renderMarkdown(atual.nota.conteudo)}</div>
        <button class="btn btn--primary" id="btn-proxima" type="button">${
          indice + 1 < itens.length ? 'Próxima' : 'Terminar'
        }</button>
      `
      }
    </div>
    </div>
  `;

  container.querySelector('#btn-sair-avaliacao')?.addEventListener('click', onSair);
  container.querySelector('#btn-revelar')?.addEventListener('click', () => {
    renderQuiz(container, itens, indice, espacoNome, onSair, true);
  });
  container.querySelector('#btn-proxima')?.addEventListener('click', () => {
    renderQuiz(container, itens, indice + 1, espacoNome, onSair, false);
  });
}

function renderFim(container: HTMLElement, total: number, espacoNome: string, onSair: () => void): void {
  container.innerHTML = `
    <div class="content-narrow">
    <div class="card stack" style="text-align:center;">
      <div class="empty-state__icon" aria-hidden="true">🎉</div>
      <h2 style="margin:0;">Repasse concluído</h2>
      <p class="text-muted" style="margin:0;">
        Você passou por ${total} nota(s) de ${escapeHtml(espacoNome)}. Isso não mudou nada na sua fila de revisão.
      </p>
      <button class="btn btn--primary" id="btn-terminar" type="button">Voltar ao Espaço</button>
    </div>
    </div>
  `;
  container.querySelector('#btn-terminar')?.addEventListener('click', onSair);
}
