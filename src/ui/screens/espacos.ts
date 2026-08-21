import { countEspacoCascade, createEspaco, deleteEspacoCascade, listCategoriasEspacos, listEspacos, setEspacoArquivado } from '../../db/espacos';
import { getDB } from '../../db/schema';
import { escapeHtml } from '../../lib/dom';
import { agruparPorCategoria } from '../../lib/group';
import { accentVar } from '../../lib/color';
import { navigate } from '../router';
import { confirmAction } from '../components/confirm-modal';
import { renderCategoriaChips, bindCategoriaChips } from '../components/categoria-chips';

export interface EspacosContext {
  perfilId: string;
}

export async function renderEspacos(container: HTMLElement, ctx: EspacosContext): Promise<void> {
  const todos = await listEspacos(ctx.perfilId);
  const ativos = todos.filter((e) => !e.arquivado);
  const arquivados = todos.filter((e) => e.arquivado);
  const temaCounts = await countTemasPorEspaco(todos.map((e) => e.id));
  const grupos = agruparPorCategoria(ativos);
  const categoriasConhecidas = await listCategoriasEspacos(ctx.perfilId);

  container.innerHTML = `
    <div style="display:flex; align-items:center; justify-content:space-between; gap: var(--space-3); flex-wrap:wrap; margin-bottom: var(--space-4);">
      <p class="screen-hint" style="margin:0;">Cada Espaço é um curso, um livro ou um estudo — agrupe por categoria pra manter organizado.</p>
      <button class="btn btn--primary btn--sm" id="btn-novo-espaco" type="button">+ Novo espaço</button>
    </div>

    <div id="form-novo-espaco" style="display:none" class="card">
      <div class="field">
        <label class="field__label" for="input-nome-espaco">Nome do espaço</label>
        <input class="input" id="input-nome-espaco" type="text" placeholder="Ex: Curso de Investimentos" maxlength="120" />
      </div>
      <div class="field" style="margin-top: var(--space-3);">
        <label class="field__label" for="input-categoria-espaco">Categoria (opcional)</label>
        <input class="input" id="input-categoria-espaco" type="text" placeholder="Ex: Cursos, Livros, Estudos" maxlength="80" />
        ${renderCategoriaChips(categoriasConhecidas, 'input-categoria-espaco')}
      </div>
      <div class="form-actions" style="margin-top: var(--space-3);">
        <button class="btn btn--primary btn--sm" id="btn-salvar-espaco" type="button">Criar</button>
        <button class="btn btn--secondary btn--sm" id="btn-cancelar-espaco" type="button">Cancelar</button>
      </div>
    </div>

    ${
      ativos.length === 0
        ? `
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">📚</div>
        <div class="empty-state__title">Nenhum espaço de estudo ainda</div>
        <p class="empty-state__hint">Crie um espaço (ex: "Curso de Investimentos") para organizar seus temas e notas.</p>
      </div>
    `
        : grupos
            .map(
              (grupo) => `
      <details class="category-group">
        <summary class="category-group__title" ${grupo.categoria ? `style="--group-accent:${accentVar(grupo.categoria.toLowerCase())}"` : ''}>
          <span class="category-group__label">
            ${grupo.categoria ? `<span class="color-dot" style="--dot-color:${accentVar(grupo.categoria.toLowerCase())}"></span>` : ''}
            ${escapeHtml(grupo.categoria || 'Sem categoria')}
          </span>
        </summary>
        <div class="item-list">
          ${grupo.itens.map((e) => renderRow(e, temaCounts.get(e.id) ?? 0)).join('')}
        </div>
      </details>
    `,
            )
            .join('')
    }

    ${
      arquivados.length > 0
        ? `
      <details style="margin-top: var(--space-6);">
        <summary class="text-muted" style="cursor:pointer;">Arquivados (${arquivados.length})</summary>
        <div class="item-list" style="margin-top: var(--space-3);">
          ${arquivados
            .map(
              (e) => `
            <div class="item-row" data-id="${escapeHtml(e.id)}">
              <button class="item-row__main" data-open="${escapeHtml(e.id)}" type="button" style="background:none;border:none;text-align:left;cursor:pointer;">
                <span class="item-row__title">${escapeHtml(e.nome)}</span>
                <span class="item-row__meta">Arquivado</span>
              </button>
              <div class="item-row__actions">
                <button class="btn btn--secondary btn--sm" data-unarchive="${escapeHtml(e.id)}" type="button">Reativar</button>
              </div>
            </div>
          `,
            )
            .join('')}
        </div>
      </details>
    `
        : ''
    }
  `;

  bindCategoriaChips(container);

  const form = container.querySelector<HTMLElement>('#form-novo-espaco')!;
  container.querySelector('#btn-novo-espaco')?.addEventListener('click', () => {
    form.style.display = 'block';
    container.querySelector<HTMLInputElement>('#input-nome-espaco')?.focus();
  });
  container.querySelector('#btn-cancelar-espaco')?.addEventListener('click', () => {
    form.style.display = 'none';
  });
  container.querySelector('#btn-salvar-espaco')?.addEventListener('click', async () => {
    const input = container.querySelector<HTMLInputElement>('#input-nome-espaco')!;
    const categoriaInput = container.querySelector<HTMLInputElement>('#input-categoria-espaco')!;
    const nome = input.value.trim();
    if (!nome) return;
    const novo = await createEspaco(ctx.perfilId, nome, categoriaInput.value.trim());
    navigate(`espacos/${novo.id}`);
  });

  container.querySelectorAll<HTMLButtonElement>('[data-open]').forEach((btn) => {
    btn.addEventListener('click', () => navigate(`espacos/${btn.dataset.open}`));
  });
  container.querySelectorAll<HTMLButtonElement>('[data-archive]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      await setEspacoArquivado(btn.dataset.archive!, true);
      renderEspacos(container, ctx);
    });
  });
  container.querySelectorAll<HTMLButtonElement>('[data-unarchive]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      await setEspacoArquivado(btn.dataset.unarchive!, false);
      renderEspacos(container, ctx);
    });
  });
  container.querySelectorAll<HTMLButtonElement>('[data-excluir]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.excluir!;
      const nome = btn.dataset.nome ?? '';
      const contagem = await countEspacoCascade(id);
      const ok = await confirmAction({
        title: `Excluir "${nome}"?`,
        message: `Isso vai apagar ${contagem.temas} tema(s) e ${contagem.notas} nota(s), com todo o histórico de revisão delas.\nNão pode ser desfeito — mas dá pra restaurar de um backup exportado, se tiver um.`,
      });
      if (!ok) return;
      await deleteEspacoCascade(id);
      renderEspacos(container, ctx);
    });
  });
}

function renderRow(e: { id: string; nome: string }, temaCount: number): string {
  return `
    <div class="item-row" data-id="${escapeHtml(e.id)}" style="--row-accent:${accentVar(e.id)}">
      <button class="item-row__main" data-open="${escapeHtml(e.id)}" type="button" style="background:none;border:none;text-align:left;cursor:pointer;">
        <span class="item-row__title">${escapeHtml(e.nome)}</span>
        <span class="item-row__meta">${temaCount} tema(s)</span>
      </button>
      <div class="item-row__actions">
        <button class="btn btn--secondary btn--sm" data-archive="${escapeHtml(e.id)}" type="button" title="As revisões já agendadas continuam normalmente — só some da lista principal">Arquivar</button>
        <details class="item-menu">
          <summary aria-label="Mais opções">⋯</summary>
          <div class="item-menu__panel">
            <button data-excluir="${escapeHtml(e.id)}" data-nome="${escapeHtml(e.nome)}" class="danger" type="button">Excluir</button>
          </div>
        </details>
      </div>
    </div>
  `;
}

async function countTemasPorEspaco(espacoIds: string[]): Promise<Map<string, number>> {
  const db = await getDB();
  const counts = new Map<string, number>();
  for (const id of espacoIds) {
    const temas = await db.getAllFromIndex('temas', 'espaco_id', id);
    counts.set(id, temas.length);
  }
  return counts;
}
