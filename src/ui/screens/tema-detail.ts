import { countTemaCascade, deleteTemaCascade, getTema, listCategoriasTemas, toggleTemaFavorito, updateTema } from '../../db/temas';
import { getEspaco } from '../../db/espacos';
import { listNotas } from '../../db/notas';
import { escapeHtml } from '../../lib/dom';
import { navigate } from '../router';
import { confirmAction } from '../components/confirm-modal';

export async function renderTemaDetail(container: HTMLElement, temaId: string): Promise<void> {
  const tema = await getTema(temaId);
  if (!tema) {
    container.innerHTML = `<p class="text-muted">Tema não encontrado.</p>`;
    return;
  }
  const espaco = await getEspaco(tema.espaco_id);
  const notas = await listNotas(temaId);
  const categoriasTema = espaco ? await listCategoriasTemas(espaco.perfil_id) : [];

  container.innerHTML = `
    <div class="breadcrumb">
      <button class="link" data-back type="button">← ${escapeHtml(espaco?.nome ?? 'Espaço')}</button>
    </div>

    <div class="section-header">
      <span class="section-header__title">${tema.favorito ? '⭐ ' : ''}${escapeHtml(tema.nome)}</span>
      <div style="display:flex; gap: var(--space-2);">
        <button class="btn btn--secondary btn--sm" id="btn-favoritar-tema" type="button">
          ${tema.favorito ? '★ Favorito' : '☆ Favoritar'}
        </button>
        <button class="btn btn--secondary btn--sm" id="btn-editar-tema" type="button">Editar</button>
        ${
          !espaco?.arquivado
            ? `<button class="btn btn--primary btn--sm" id="btn-nova-nota" type="button">+ Nova nota</button>`
            : ''
        }
        <details class="item-menu">
          <summary aria-label="Mais opções">⋯</summary>
          <div class="item-menu__panel">
            <button id="btn-excluir-tema" class="danger" type="button">Excluir tema</button>
          </div>
        </details>
      </div>
    </div>

    <div id="form-editar-tema" style="display:none" class="card">
      <div class="field">
        <label class="field__label" for="input-nome-tema-editar">Nome</label>
        <input class="input" id="input-nome-tema-editar" type="text" value="${escapeHtml(tema.nome)}" maxlength="120" />
      </div>
      <div class="field" style="margin-top: var(--space-3);">
        <label class="field__label" for="input-categoria-tema-editar">Categoria (opcional)</label>
        <input class="input" id="input-categoria-tema-editar" type="text" list="lista-categorias-tema-editar" value="${escapeHtml(tema.categoria)}" maxlength="80" />
        <datalist id="lista-categorias-tema-editar">
          ${categoriasTema.map((c) => `<option value="${escapeHtml(c)}"></option>`).join('')}
        </datalist>
      </div>
      <div class="form-actions" style="margin-top: var(--space-3);">
        <button class="btn btn--primary btn--sm" id="btn-salvar-edicao-tema" type="button">Salvar</button>
        <button class="btn btn--secondary btn--sm" id="btn-cancelar-edicao-tema" type="button">Cancelar</button>
      </div>
    </div>

    ${
      espaco?.arquivado
        ? `<div class="banner banner--warning"><span>O espaço "${escapeHtml(espaco.nome)}" está arquivado — não é possível criar notas novas aqui.</span></div>`
        : ''
    }

    ${
      notas.length === 0
        ? `
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">📝</div>
        <div class="empty-state__title">Nenhuma nota neste tema ainda</div>
        <p class="empty-state__hint">Cada nota criada aqui já entra na fila de revisão automaticamente, a partir de amanhã.</p>
      </div>
    `
        : `
      <div class="item-list">
        ${notas
          .map(
            (n) => `
          <button class="item-row" data-open="${escapeHtml(n.id)}" type="button" style="cursor:pointer; text-align:left;">
            <span class="item-row__main">
              <span class="item-row__title">${n.favorito ? '⭐ ' : ''}${escapeHtml(n.titulo || '(sem título)')}</span>
              <span class="item-row__meta">${escapeHtml(n.fonte || 'Sem fonte')}${n.pode_desatualizar ? ' · pode desatualizar' : ''}</span>
            </span>
            ${!n.titulo_revisado ? '<span class="badge badge--muted">revisar título</span>' : ''}
          </button>
        `,
          )
          .join('')}
      </div>
    `
    }
  `;

  container.querySelector('[data-back]')?.addEventListener('click', () => navigate(`espacos/${tema.espaco_id}`));
  container.querySelector('#btn-nova-nota')?.addEventListener('click', () => navigate(`temas/${temaId}/nova-nota`));
  container.querySelectorAll<HTMLButtonElement>('[data-open]').forEach((btn) => {
    btn.addEventListener('click', () => navigate(`notas/${btn.dataset.open}`));
  });

  container.querySelector('#btn-favoritar-tema')?.addEventListener('click', async () => {
    await toggleTemaFavorito(tema.id);
    renderTemaDetail(container, temaId);
  });

  const formEditar = container.querySelector<HTMLElement>('#form-editar-tema')!;
  container.querySelector('#btn-editar-tema')?.addEventListener('click', () => {
    formEditar.style.display = 'block';
    container.querySelector<HTMLInputElement>('#input-nome-tema-editar')?.focus();
  });
  container.querySelector('#btn-cancelar-edicao-tema')?.addEventListener('click', () => {
    formEditar.style.display = 'none';
  });
  container.querySelector('#btn-salvar-edicao-tema')?.addEventListener('click', async () => {
    const nome = container.querySelector<HTMLInputElement>('#input-nome-tema-editar')!.value.trim();
    const categoria = container.querySelector<HTMLInputElement>('#input-categoria-tema-editar')!.value.trim();
    if (!nome) return;
    await updateTema(tema.id, nome, categoria);
    renderTemaDetail(container, temaId);
  });

  container.querySelector('#btn-excluir-tema')?.addEventListener('click', async () => {
    const contagem = await countTemaCascade(tema.id);
    const ok = await confirmAction({
      title: `Excluir "${tema.nome}"?`,
      message: `Isso vai apagar ${contagem.notas} nota(s), com todo o histórico de revisão delas.\nNão pode ser desfeito — mas dá pra restaurar de um backup exportado, se tiver um.`,
    });
    if (!ok) return;
    await deleteTemaCascade(tema.id);
    navigate(`espacos/${tema.espaco_id}`);
  });
}
