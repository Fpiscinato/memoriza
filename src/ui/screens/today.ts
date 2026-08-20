import { completeReview, getTodayQueue, type QueueEntry } from '../../db/reviews';
import { escapeHtml } from '../../lib/dom';
import { renderMarkdown } from '../../lib/markdown';
import { precisaAvisoDeValidade } from '../../domain/validade';
import type { Avaliacao } from '../../types';

export interface TodayContext {
  perfilId: string;
}

export async function renderToday(container: HTMLElement, ctx: TodayContext): Promise<void> {
  const fila = await getTodayQueue(ctx.perfilId);
  renderLista(container, ctx, fila);
}

function renderLista(container: HTMLElement, ctx: TodayContext, fila: QueueEntry[]): void {
  if (fila.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">🗓️</div>
        <div class="empty-state__title">Nenhuma revisão por enquanto</div>
        <p class="empty-state__hint">Volte amanhã, ou crie uma nota nova em Espaços — ela entra na fila a partir de amanhã.</p>
      </div>
    `;
    return;
  }

  const espacosDistintos = new Set(fila.map((e) => e.espaco.id));
  const mostrarEspaco = espacosDistintos.size > 1;

  const grupos = new Map<string, QueueEntry[]>();
  for (const entry of fila) {
    const lista = grupos.get(entry.tema.id) ?? [];
    lista.push(entry);
    grupos.set(entry.tema.id, lista);
  }

  container.innerHTML = Array.from(grupos.values())
    .map((entries) => {
      const tema = entries[0].tema;
      const espaco = entries[0].espaco;
      return `
        <div class="queue-group">
          <div class="queue-group__title">
            ${escapeHtml(tema.nome)}
            ${mostrarEspaco ? `<span class="queue-group__espaco"> · ${escapeHtml(espaco.nome)}</span>` : ''}
          </div>
          <div class="item-list">
            ${entries
              .map(
                (entry) => `
              <button class="item-row" data-id="${escapeHtml(entry.item.id)}" type="button" style="cursor:pointer; text-align:left;">
                <span class="item-row__main">
                  <span class="item-row__title">${escapeHtml(primeiraLinha(entry.nota.conteudo))}</span>
                  <span class="item-row__meta">${escapeHtml(entry.nota.fonte || 'Sem fonte')}</span>
                </span>
                ${precisaAvisoDeValidade(entry.nota) ? '<span class="badge badge--muted">⚠️ desatualizada?</span>' : ''}
              </button>
            `,
              )
              .join('')}
          </div>
        </div>
      `;
    })
    .join('');

  container.querySelectorAll<HTMLButtonElement>('[data-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const entry = fila.find((e) => e.item.id === btn.dataset.id);
      if (entry) renderRevisao(container, ctx, entry, fila);
    });
  });
}

function primeiraLinha(conteudo: string): string {
  const linha = conteudo.split('\n').find((l) => l.trim().length > 0) ?? '';
  return linha.length > 100 ? `${linha.slice(0, 100)}…` : linha;
}

function renderRevisao(
  container: HTMLElement,
  ctx: TodayContext,
  entry: QueueEntry,
  filaCompleta: QueueEntry[],
  revelado = false,
): void {
  const aviso = precisaAvisoDeValidade(entry.nota);

  container.innerHTML = `
    <div class="breadcrumb">
      <button class="link" data-voltar type="button">← Voltar à fila</button>
    </div>

    <div class="card review-card">
      <div class="review-card__meta">
        ${escapeHtml(entry.tema.nome)}${entry.nota.fonte ? ` · ${escapeHtml(entry.nota.fonte)}` : ''}
      </div>

      ${aviso ? `<div class="banner banner--warning" style="margin-bottom:0;"><span>Isso pode estar desatualizado — confirme antes de confiar.</span></div>` : ''}

      ${
        !revelado
          ? `
        <p class="text-muted">Tente lembrar o que você anotou sobre isto antes de revelar.</p>
        <button class="btn btn--primary" id="btn-revelar" type="button">Mostrar resposta</button>
      `
          : `
        <div class="review-card__content markdown-preview">${renderMarkdown(entry.nota.conteudo)}</div>
        <div class="review-actions">
          <button class="btn btn--secondary" data-avaliacao="dificil" type="button">😖<br>Difícil</button>
          <button class="btn btn--secondary" data-avaliacao="medio" type="button">🙂<br>Médio</button>
          <button class="btn btn--secondary" data-avaliacao="facil" type="button">😄<br>Fácil</button>
        </div>
      `
      }
    </div>
  `;

  container.querySelector('[data-voltar]')?.addEventListener('click', () => renderLista(container, ctx, filaCompleta));
  container.querySelector('#btn-revelar')?.addEventListener('click', () => {
    renderRevisao(container, ctx, entry, filaCompleta, true);
  });

  container.querySelectorAll<HTMLButtonElement>('[data-avaliacao]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const avaliacao = btn.dataset.avaliacao as Avaliacao;
      const resultado = await completeReview(entry.item.id, avaliacao);
      const novaFila = await getTodayQueue(ctx.perfilId);

      if (resultado.aposentado) {
        renderAposentado(container, ctx, novaFila);
      } else {
        renderLista(container, ctx, novaFila);
      }
    });
  });
}

function renderAposentado(container: HTMLElement, ctx: TodayContext, novaFila: QueueEntry[]): void {
  container.innerHTML = `
    <div class="card stack">
      <div class="banner banner--success" style="margin-bottom:0;">
        <span>🎉 Duas fáceis seguidas — essa nota foi aposentada da fila de revisão. Ela continua acessível normalmente pelo Tema.</span>
      </div>
      <button class="btn btn--primary" id="btn-continuar" type="button">Continuar</button>
    </div>
  `;
  container.querySelector('#btn-continuar')?.addEventListener('click', () => renderLista(container, ctx, novaFila));
}
