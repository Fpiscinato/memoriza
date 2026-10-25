import { getFavoritos } from '../../db/favorites';
import { escapeHtml } from '../../lib/dom';
import { nomeTemaExibicao } from '../../domain/rotulos';
import { ehPastaOculta } from '../../domain/arvore';
import { accentVar, assignEspacoCores } from '../../lib/color';
import { navigate } from '../router';
import { getEspacoIcone, espacoIconeChave } from '../espaco-icons';
import { ICONS } from '../icons';
import type { Espaco } from '../../types';

export interface FavoritosContext {
  perfilId: string;
}

export async function renderFavoritos(container: HTMLElement, ctx: FavoritosContext): Promise<void> {
  const { temas, notas } = await getFavoritos(ctx.perfilId);

  if (temas.length === 0 && notas.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${ICONS.star}</div>
        <div class="empty-state__title">Nenhum favorito ainda</div>
        <p class="empty-state__hint">Marque uma Pasta ou uma Nota como favorito (☆ Favoritar) pra vê-las aqui, organizadas.</p>
        <button class="btn btn--secondary btn--sm empty-state__action" id="btn-empty-espacos" type="button">Explorar Pastas</button>
      </div>
    `;
    container.querySelector('#btn-empty-espacos')?.addEventListener('click', () => navigate('espacos'));
    return;
  }

  const temasPorEspaco = new Map<string, { espaco: Espaco; itens: typeof temas }>();
  for (const tf of temas) {
    const grupo = temasPorEspaco.get(tf.espaco.id) ?? { espaco: tf.espaco, itens: [] };
    grupo.itens.push(tf);
    temasPorEspaco.set(tf.espaco.id, grupo);
  }

  const notasPorTema = new Map<string, { temaNome: string; espaco: Espaco; itens: typeof notas }>();
  for (const nf of notas) {
    const grupo = notasPorTema.get(nf.tema.id) ?? {
      // Nota solta da pasta principal: o cabeçalho é a própria pasta, sem repetir o nome.
      temaNome: ehPastaOculta(nf.tema) ? '' : nomeTemaExibicao(nf.tema.nome),
      espaco: nf.espaco,
      itens: [],
    };
    grupo.itens.push(nf);
    notasPorTema.set(nf.tema.id, grupo);
  }

  const espacosPresentes = new Map<string, Espaco>();
  for (const tf of temas) espacosPresentes.set(tf.espaco.id, tf.espaco);
  for (const nf of notas) espacosPresentes.set(nf.espaco.id, nf.espaco);
  const cores = assignEspacoCores([...espacosPresentes.values()]);

  const marcador = (espaco: Espaco): string => {
    const cor = cores.get(espaco.id) ?? accentVar(espaco.id);
    const icone = getEspacoIcone(espacoIconeChave(espaco));
    return `<span class="espaco-icon-inline" style="--badge-accent:${cor}" aria-hidden="true">${icone.svg}</span>`;
  };

  container.innerHTML = `
    <p class="screen-hint sem-margem-topo">Pastas e Notas que você marcou pra achar rápido, sem precisar navegar por tudo.</p>

    ${
      temas.length > 0
        ? `
      <div class="category-group__title" style="margin-bottom: var(--space-3);">Pastas favoritas</div>
      ${Array.from(temasPorEspaco.values())
        .map(
          (grupo) => `
        <div class="category-group">
          <div class="queue-group__title" style="--group-accent:${cores.get(grupo.espaco.id) ?? accentVar(grupo.espaco.id)}; text-transform:none; letter-spacing:normal; font-size: var(--font-size-sm);">
            ${marcador(grupo.espaco)}${escapeHtml(grupo.espaco.nome)}
          </div>
          <div class="item-list">
            ${grupo.itens
              .map(
                (tf) => `
              <button class="item-row" data-tema="${escapeHtml(tf.tema.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${cores.get(grupo.espaco.id) ?? accentVar(grupo.espaco.id)}">
                <span class="item-row__main">
                  <span class="item-row__title">${ICONS.star} ${escapeHtml(nomeTemaExibicao(tf.tema.nome))}</span>
                </span>
              </button>
            `,
              )
              .join('')}
          </div>
        </div>
      `,
        )
        .join('')}
    `
        : ''
    }

    ${
      notas.length > 0
        ? `
      <div class="category-group__title" style="margin-bottom: var(--space-3); margin-top: ${temas.length > 0 ? 'var(--space-6)' : '0'};">Notas favoritas</div>
      ${Array.from(notasPorTema.values())
        .map(
          (grupo) => `
        <div class="category-group">
          <div class="queue-group__title" style="--group-accent:${cores.get(grupo.espaco.id) ?? accentVar(grupo.espaco.id)}; text-transform:none; letter-spacing:normal; font-size: var(--font-size-sm);">
            ${marcador(grupo.espaco)}${
              grupo.temaNome
                ? `${escapeHtml(grupo.temaNome)} <span class="queue-group__espaco"> · ${escapeHtml(grupo.espaco.nome)}</span>`
                : escapeHtml(grupo.espaco.nome)
            }
          </div>
          <div class="item-list">
            ${grupo.itens
              .map(
                (nf) => `
              <button class="item-row" data-nota="${escapeHtml(nf.nota.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${cores.get(grupo.espaco.id) ?? accentVar(grupo.espaco.id)}">
                <span class="item-row__main">
                  <span class="item-row__title">${ICONS.star} ${escapeHtml(nf.nota.titulo || '(sem título)')}</span>
                  <span class="item-row__meta">${escapeHtml(nf.nota.fonte || 'Sem fonte')}</span>
                </span>
              </button>
            `,
              )
              .join('')}
          </div>
        </div>
      `,
        )
        .join('')}
    `
        : ''
    }
  `;

  container.querySelectorAll<HTMLButtonElement>('[data-tema]').forEach((btn) => {
    btn.addEventListener('click', () => navigate(`temas/${btn.dataset.tema}`));
  });
  container.querySelectorAll<HTMLButtonElement>('[data-nota]').forEach((btn) => {
    btn.addEventListener('click', () => navigate(`notas/${btn.dataset.nota}`));
  });
}
