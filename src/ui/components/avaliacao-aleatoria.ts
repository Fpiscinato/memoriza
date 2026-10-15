import type { NotaComTema } from '../../db/notas';
import { registrarAvaliacao } from '../../db/avaliacoes';
import { montarEscopos, type EscopoAvaliacao } from '../../domain/avaliacao-escopo';
import { nomeTemaExibicao } from '../../domain/rotulos';
import { uuid } from '../../lib/uuid';
import { escapeHtml } from '../../lib/dom';
import { renderMarkdown } from '../../lib/markdown';
import { ICONS } from '../icons';
import type { Avaliacao } from '../../types';

const TIERS = [
  { key: 'basico', label: 'Básico', n: 5 },
  { key: 'medio', label: 'Médio', n: 15 },
  { key: 'longo', label: 'Longo', n: 30 },
] as const;

const RATINGS: { valor: Avaliacao; label: string; classe: string; icone: string }[] = [
  { valor: 'dificil', label: 'Difícil', classe: 'btn--review-dificil', icone: ICONS.caraTriste },
  { valor: 'medio', label: 'Médio', classe: 'btn--review-medio', icone: ICONS.caraNeutra },
  { valor: 'facil', label: 'Fácil', classe: 'btn--review-facil', icone: ICONS.caraFeliz },
];

export interface AvaliacaoContexto {
  perfilId: string;
  espacoId: string;
  nomeContexto: string;
  /** 'espaco' = começa no Espaço e deixa escolher um Tema; 'tema' = já travado num Tema. */
  tipo: 'espaco' | 'tema';
}

function shuffle<T>(itens: T[]): T[] {
  const copia = [...itens];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/**
 * Autoteste pelas notas de um Espaço OU de um Tema (quem chama já busca a lista certa —
 * `listNotasPorEspaco` ou as notas de um Tema só). Cada resposta Fácil/Médio/Difícil é
 * registrada em db/avaliacoes.ts (independente da revisão espaçada, que não é tocada).
 * Assume o container inteiro até `onSair` ser chamado.
 */
export function iniciarAvaliacao(
  container: HTMLElement,
  todas: NotaComTema[],
  ctx: AvaliacaoContexto,
  onSair: () => void,
): void {
  if (todas.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${ICONS.dice}</div>
        <div class="empty-state__title">Nenhuma nota pra avaliar ainda</div>
        <p class="empty-state__hint">Crie notas aqui antes de fazer uma avaliação.</p>
      </div>
      <button class="btn btn--secondary" id="btn-sair-avaliacao" type="button">← Voltar</button>
    `;
    container.querySelector('#btn-sair-avaliacao')?.addEventListener('click', onSair);
    return;
  }

  const escopos = montarEscopos(todas, ctx);
  if (escopos.length > 1) {
    renderEscolhaEscopo(container, escopos, ctx, onSair);
  } else {
    renderEscolhaTamanho(container, escopos[0], escopos, ctx, onSair);
  }
}

function cabecalho(titulo: string): string {
  return `
    <div class="breadcrumb">
      <button class="link" id="btn-sair-avaliacao" type="button">← ${escapeHtml(titulo)}</button>
    </div>
  `;
}

function renderEscolhaEscopo(
  container: HTMLElement,
  escopos: EscopoAvaliacao[],
  ctx: AvaliacaoContexto,
  onSair: () => void,
): void {
  container.innerHTML = `
    ${cabecalho('Encerrar avaliação')}
    <div class="content-narrow">
      <div class="card stack" style="text-align:center;">
        <div class="empty-state__icon" aria-hidden="true">${ICONS.dice}</div>
        <h2 style="margin:0;">Avaliação — ${escapeHtml(ctx.nomeContexto)}</h2>
        <p class="text-muted" style="margin:0;">O que você quer avaliar?</p>
        <div class="stack">
          ${escopos
            .map(
              (e, i) => `
            <button class="btn btn--secondary btn--block" data-escopo="${i}" type="button">
              ${escapeHtml(e.rotulo)} — ${e.itens.length} nota(s)
            </button>
          `,
            )
            .join('')}
        </div>
      </div>
    </div>
  `;

  container.querySelector('#btn-sair-avaliacao')?.addEventListener('click', onSair);
  container.querySelectorAll<HTMLButtonElement>('[data-escopo]').forEach((btn) => {
    btn.addEventListener('click', () => {
      renderEscolhaTamanho(
        container,
        escopos[Number(btn.dataset.escopo)],
        escopos,
        ctx,
        onSair,
      );
    });
  });
}

function renderEscolhaTamanho(
  container: HTMLElement,
  escopo: EscopoAvaliacao,
  escopos: EscopoAvaliacao[],
  ctx: AvaliacaoContexto,
  onSair: () => void,
): void {
  container.innerHTML = `
    ${cabecalho('Voltar')}
    <div class="content-narrow">
      <div class="card stack" style="text-align:center;">
        <div class="empty-state__icon" aria-hidden="true">${ICONS.dice}</div>
        <h2 style="margin:0;">Avaliação — ${escapeHtml(escopo.rotulo)}</h2>
        <p class="text-muted" style="margin:0;">
          Repasse com notas aleatórias e marque Fácil, Médio ou Difícil em cada uma. Isso não
          afeta sua fila de revisão. ${escopo.itens.length} nota(s) — escolha quantas:
        </p>
        <div class="stack">
          ${TIERS.map(
            (t) => `
            <button class="btn btn--secondary btn--block" data-tier="${t.key}" type="button">
              ${t.label} — ${Math.min(t.n, escopo.itens.length)} nota(s)
            </button>
          `,
          ).join('')}
        </div>
      </div>
    </div>
  `;

  container.querySelector('#btn-sair-avaliacao')?.addEventListener('click', () => {
    if (ctx.tipo === 'espaco' && escopos.length > 1) {
      renderEscolhaEscopo(container, escopos, ctx, onSair);
    } else {
      onSair();
    }
  });
  container.querySelectorAll<HTMLButtonElement>('[data-tier]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tier = TIERS.find((t) => t.key === btn.dataset.tier)!;
      const selecionadas = shuffle(escopo.itens).slice(0, Math.min(tier.n, escopo.itens.length));
      const sessao = {
        id: uuid(),
        escopo: escopo.escopo,
        itens: selecionadas,
        contagem: { facil: 0, medio: 0, dificil: 0 } as Record<Avaliacao, number>,
      };
      renderQuiz(container, sessao, 0, ctx, onSair);
    });
  });
}

interface Sessao {
  id: string;
  escopo: 'espaco' | 'tema';
  itens: NotaComTema[];
  contagem: Record<Avaliacao, number>;
}

function renderQuiz(
  container: HTMLElement,
  sessao: Sessao,
  indice: number,
  ctx: AvaliacaoContexto,
  onSair: () => void,
  revelado = false,
): void {
  if (indice >= sessao.itens.length) {
    renderFim(container, sessao, ctx, onSair);
    return;
  }
  const atual = sessao.itens[indice];

  container.innerHTML = `
    ${cabecalho('Encerrar avaliação')}
    <div class="content-narrow">
    <div class="card review-card">
      <div class="review-card__meta">${escapeHtml(nomeTemaExibicao(atual.tema.nome))} · ${indice + 1} de ${sessao.itens.length}</div>
      <div class="review-card__titulo">${atual.nota.favorito ? `${ICONS.star} ` : ''}${escapeHtml(atual.nota.titulo || '(sem título)')}</div>
      ${
        !revelado
          ? `
        <p class="text-muted">Tente lembrar o que você anotou sobre isto antes de revelar.</p>
        <button class="btn btn--primary" id="btn-revelar" type="button">Mostrar resposta</button>
      `
          : `
        <div class="review-card__content markdown-preview">${renderMarkdown(atual.nota.conteudo)}</div>
        <div class="review-actions">
          ${RATINGS.map(
            (r) => `
            <button class="btn ${r.classe}" data-avaliacao="${r.valor}" type="button">${r.icone}<span>${r.label}</span></button>
          `,
          ).join('')}
        </div>
        <p class="review-legend">Fácil = lembrei na hora · Médio = com esforço · Difícil = não lembrei</p>
      `
      }
    </div>
    </div>
  `;

  container.querySelector('#btn-sair-avaliacao')?.addEventListener('click', onSair);
  container.querySelector('#btn-revelar')?.addEventListener('click', () => {
    renderQuiz(container, sessao, indice, ctx, onSair, true);
  });

  container.querySelectorAll<HTMLButtonElement>('[data-avaliacao]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const avaliacao = btn.dataset.avaliacao as Avaliacao;
      sessao.contagem[avaliacao]++;
      await registrarAvaliacao({
        perfilId: ctx.perfilId,
        espacoId: ctx.espacoId,
        temaId: atual.tema.id,
        notaId: atual.nota.id,
        avaliacao,
        escopo: sessao.escopo,
        sessaoId: sessao.id,
      });
      renderQuiz(container, sessao, indice + 1, ctx, onSair);
    });
  });
}

function renderFim(
  container: HTMLElement,
  sessao: Sessao,
  ctx: AvaliacaoContexto,
  onSair: () => void,
): void {
  const { facil, medio, dificil } = sessao.contagem;
  container.innerHTML = `
    <div class="content-narrow">
    <div class="card stack" style="text-align:center;">
      <div class="empty-state__icon" aria-hidden="true">${ICONS.confete}</div>
      <h2 style="margin:0;">Avaliação concluída</h2>
      <p class="text-muted" style="margin:0;">
        Você avaliou ${sessao.itens.length} nota(s) de ${escapeHtml(ctx.nomeContexto)}. Isso não mudou nada na sua fila de revisão.
      </p>
      <div class="retention-legend" style="justify-content:center;">
        <span class="badge badge--success">Fácil ${facil}</span>
        <span class="badge" style="background:var(--color-warning-bg); color:var(--color-warning);">Médio ${medio}</span>
        <span class="badge badge--danger">Difícil ${dificil}</span>
      </div>
      <button class="btn btn--primary" id="btn-terminar" type="button">Voltar</button>
    </div>
    </div>
  `;
  container.querySelector('#btn-terminar')?.addEventListener('click', onSair);
}
