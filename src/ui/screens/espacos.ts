import { createEspaco, listEspacos, setEspacoArquivado } from '../../db/espacos';
import { getDB } from '../../db/schema';
import { escapeHtml } from '../../lib/dom';
import { navigate } from '../router';

export interface EspacosContext {
  perfilId: string;
}

export async function renderEspacos(container: HTMLElement, ctx: EspacosContext): Promise<void> {
  const todos = await listEspacos(ctx.perfilId);
  const ativos = todos.filter((e) => !e.arquivado);
  const arquivados = todos.filter((e) => e.arquivado);
  const temaCounts = await countTemasPorEspaco(todos.map((e) => e.id));

  container.innerHTML = `
    <div class="section-header">
      <span class="section-header__title">Espaços de estudo</span>
      <button class="btn btn--primary btn--sm" id="btn-novo-espaco" type="button">+ Novo espaço</button>
    </div>

    <div id="form-novo-espaco" style="display:none" class="card">
      <div class="field">
        <label class="field__label" for="input-nome-espaco">Nome do espaço</label>
        <input class="input" id="input-nome-espaco" type="text" placeholder="Ex: Curso de Investimentos" maxlength="120" />
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
        : `
      <div class="item-list">
        ${ativos
          .map(
            (e) => `
          <div class="item-row" data-id="${escapeHtml(e.id)}">
            <button class="item-row__main link" data-open="${escapeHtml(e.id)}" type="button" style="background:none;border:none;text-align:left;cursor:pointer;">
              <span class="item-row__title">${escapeHtml(e.nome)}</span>
              <span class="item-row__meta">${temaCounts.get(e.id) ?? 0} tema(s)</span>
            </button>
            <div class="item-row__actions">
              <button class="btn btn--secondary btn--sm" data-archive="${escapeHtml(e.id)}" type="button">Arquivar</button>
            </div>
          </div>
        `,
          )
          .join('')}
      </div>
    `
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
              <button class="item-row__main link" data-open="${escapeHtml(e.id)}" type="button" style="background:none;border:none;text-align:left;cursor:pointer;">
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
    const nome = input.value.trim();
    if (!nome) return;
    const novo = await createEspaco(ctx.perfilId, nome);
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
