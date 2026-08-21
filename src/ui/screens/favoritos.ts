import { getFavoritos } from '../../db/favorites';
import { escapeHtml } from '../../lib/dom';
import { accentVar } from '../../lib/color';
import { navigate } from '../router';

export interface FavoritosContext {
  perfilId: string;
}

export async function renderFavoritos(container: HTMLElement, ctx: FavoritosContext): Promise<void> {
  const { temas, notas } = await getFavoritos(ctx.perfilId);

  if (temas.length === 0 && notas.length === 0) {
    container.innerHTML = `
      <div class="section-header">
        <span class="section-header__title">Favoritos</span>
      </div>
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">⭐</div>
        <div class="empty-state__title">Nenhum favorito ainda</div>
        <p class="empty-state__hint">Marque um Tema ou uma Nota como favorito (☆ Favoritar) pra vê-los aqui, organizados.</p>
      </div>
    `;
    return;
  }

  const temasPorEspaco = new Map<string, { espacoId: string; espacoNome: string; itens: typeof temas }>();
  for (const tf of temas) {
    const grupo = temasPorEspaco.get(tf.espaco.id) ?? {
      espacoId: tf.espaco.id,
      espacoNome: tf.espaco.nome,
      itens: [],
    };
    grupo.itens.push(tf);
    temasPorEspaco.set(tf.espaco.id, grupo);
  }

  const notasPorTema = new Map<
    string,
    { temaNome: string; espacoId: string; espacoNome: string; itens: typeof notas }
  >();
  for (const nf of notas) {
    const grupo = notasPorTema.get(nf.tema.id) ?? {
      temaNome: nf.tema.nome,
      espacoId: nf.espaco.id,
      espacoNome: nf.espaco.nome,
      itens: [],
    };
    grupo.itens.push(nf);
    notasPorTema.set(nf.tema.id, grupo);
  }

  container.innerHTML = `
    <div class="section-header">
      <span class="section-header__title">Favoritos</span>
    </div>
    <p class="screen-hint">Temas e Notas que você marcou pra achar rápido, sem navegar pelos Espaços.</p>

    ${
      temas.length > 0
        ? `
      <div class="category-group__title" style="margin-bottom: var(--space-3);">Temas favoritos</div>
      ${Array.from(temasPorEspaco.values())
        .map(
          (grupo) => `
        <div class="category-group">
          <div class="queue-group__title" style="--group-accent:${accentVar(grupo.espacoId)}; text-transform:none; letter-spacing:normal; font-size: var(--font-size-sm);">
            <span class="color-dot" style="--dot-color:${accentVar(grupo.espacoId)}"></span>${escapeHtml(grupo.espacoNome)}
          </div>
          <div class="item-list">
            ${grupo.itens
              .map(
                (tf) => `
              <button class="item-row" data-tema="${escapeHtml(tf.tema.id)}" type="button" style="cursor:pointer; text-align:left;">
                <span class="item-row__main">
                  <span class="item-row__title">⭐ ${escapeHtml(tf.tema.nome)}</span>
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
          <div class="queue-group__title" style="--group-accent:${accentVar(grupo.espacoId)}; text-transform:none; letter-spacing:normal; font-size: var(--font-size-sm);">
            <span class="color-dot" style="--dot-color:${accentVar(grupo.espacoId)}"></span>${escapeHtml(grupo.temaNome)} <span class="queue-group__espaco"> · ${escapeHtml(grupo.espacoNome)}</span>
          </div>
          <div class="item-list">
            ${grupo.itens
              .map(
                (nf) => `
              <button class="item-row" data-nota="${escapeHtml(nf.nota.id)}" type="button" style="cursor:pointer; text-align:left;">
                <span class="item-row__main">
                  <span class="item-row__title">⭐ ${escapeHtml(nf.nota.titulo || '(sem título)')}</span>
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
