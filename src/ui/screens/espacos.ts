import { countEspacoCascade, createEspaco, deleteEspacoCascade, listCategoriasEspacos, listEspacos, setEspacoArquivado } from '../../db/espacos';
import { getDB } from '../../db/schema';
import { escapeHtml } from '../../lib/dom';
import { agruparPorCategoria } from '../../lib/group';
import { accentVar, assignCategoriaCores, assignEspacoCores, chaveCategoria } from '../../lib/color';
import { navigate } from '../router';
import { confirmAction } from '../components/confirm-modal';
import { renderCategoriaChips, bindCategoriaChips } from '../components/categoria-chips';
import { renderEspacoVisualPicker, bindEspacoVisualPicker, lerEspacoVisual } from '../components/espaco-visual';
import { limparErroCampo, marcarErroCampo, validarCampos } from '../../lib/form-validacao';
import { categoriaIconeChave, getEspacoIcone, espacoIconeChave } from '../espaco-icons';
import { ICONS } from '../icons';
import type { Espaco } from '../../types';

export interface EspacosContext {
  perfilId: string;
}

export async function renderEspacos(container: HTMLElement, ctx: EspacosContext): Promise<void> {
  const todos = await listEspacos(ctx.perfilId);
  const ativos = todos.filter((e) => !e.arquivado);
  const arquivados = todos.filter((e) => e.arquivado);
  const temaCounts = await countTemasPorEspaco(todos.map((e) => e.id));
  const grupos = agruparPorCategoria(ativos);
  const cores = assignEspacoCores(ativos);
  const coresCategoria = assignCategoriaCores(grupos.map((g) => g.categoria));
  const categoriasConhecidas = await listCategoriasEspacos(ctx.perfilId);

  container.innerHTML = `
    <div style="display:flex; align-items:center; justify-content:space-between; gap: var(--space-3); flex-wrap:wrap; margin-bottom: var(--space-4);">
      <p class="screen-hint sem-margem">Cada pasta é um curso, um livro ou um estudo — agrupe por categoria pra manter organizado.</p>
      <button class="btn btn--primary btn--sm" id="btn-novo-espaco" type="button">+ Nova pasta</button>
    </div>

    <div id="form-novo-espaco" class="card is-hidden">
      <div class="field">
        <label class="field__label" for="input-categoria-espaco">Categoria</label>
        <input class="input" id="input-categoria-espaco" type="text" placeholder="Ex: Cursos, Livros, Estudos" maxlength="80" />
        <p class="field__error" role="alert"></p>
        ${renderCategoriaChips(categoriasConhecidas, 'input-categoria-espaco')}
      </div>
      <div class="field com-margem">
        <label class="field__label" for="input-nome-espaco">Nome da pasta</label>
        <input class="input" id="input-nome-espaco" type="text" placeholder="Ex: Curso de Investimentos" maxlength="120" />
        <p class="field__error" role="alert"></p>
      </div>
      <div style="margin-top: var(--space-4);">
        ${renderEspacoVisualPicker({ prefix: 'novo-espaco' })}
      </div>
      <div class="form-actions com-margem">
        <button class="btn btn--primary btn--sm" id="btn-salvar-espaco" type="button">Criar</button>
        <button class="btn btn--secondary btn--sm" id="btn-cancelar-espaco" type="button">Cancelar</button>
      </div>
    </div>

    ${
      ativos.length === 0
        ? `
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${ICONS.bookOpen}</div>
        <div class="empty-state__title">Nenhuma pasta ainda</div>
        <p class="empty-state__hint">Crie uma pasta (ex: "Curso de Investimentos") para organizar outras pastas e notas.</p>
        <button class="btn btn--primary btn--sm empty-state__action" id="btn-empty-novo-espaco" type="button">Criar a primeira pasta</button>
      </div>
    `
        : grupos
            .map((grupo) => {
              const unico = grupo.itens.length === 1 ? grupo.itens[0] : null;
              const corGrupo = unico
                ? cores.get(unico.id) ?? accentVar(unico.id)
                : coresCategoria.get(chaveCategoria(grupo.categoria)) ?? accentVar(grupo.categoria);
              const iconeGrupo = getEspacoIcone(unico ? espacoIconeChave(unico) : categoriaIconeChave(grupo.categoria));
              return `
      <details class="category-group">
        <summary class="category-group__title" style="--group-accent:${corGrupo}">
          <span class="category-group__label">
            <span class="espaco-icon-inline" style="--badge-accent:${corGrupo}" aria-hidden="true">${iconeGrupo.svg}</span>
            ${escapeHtml(grupo.categoria || 'Sem categoria')}
          </span>
        </summary>
        <div class="item-list">
          ${grupo.itens.map((e) => renderRow(e, temaCounts.get(e.id) ?? 0, cores.get(e.id) ?? accentVar(e.id))).join('')}
        </div>
      </details>
    `;
            })
            .join('')
    }

    ${
      arquivados.length > 0
        ? `
      <details style="margin-top: var(--space-6);">
        <summary class="text-muted" style="cursor:pointer;">Arquivados (${arquivados.length})</summary>
        <div class="item-list com-margem">
          ${arquivados
            .map(
              (e) => `
            <div class="item-row" data-id="${escapeHtml(e.id)}">
              <button class="item-row__main" data-open="${escapeHtml(e.id)}" type="button" style="background:none;border:none;text-align:left;cursor:pointer;">
                <span class="item-row__title-row">
                  <span class="espaco-icon-badge" style="--badge-accent:${accentVar(e.id)}" aria-hidden="true">${getEspacoIcone(espacoIconeChave(e)).svg}</span>
                  <span class="item-row__title">${escapeHtml(e.nome)}</span>
                </span>
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
  bindEspacoVisualPicker(container, {
    prefix: 'novo-espaco',
    getTexto: () =>
      `${container.querySelector<HTMLInputElement>('#input-nome-espaco')?.value ?? ''} ${
        container.querySelector<HTMLInputElement>('#input-categoria-espaco')?.value ?? ''
      }`,
  });

  const form = container.querySelector<HTMLElement>('#form-novo-espaco')!;
  const abrirFormEspaco = () => {
    form.classList.remove('is-hidden');
    container.querySelector<HTMLInputElement>('#input-categoria-espaco')?.focus();
  };
  container.querySelector('#btn-novo-espaco')?.addEventListener('click', abrirFormEspaco);
  container.querySelector('#btn-empty-novo-espaco')?.addEventListener('click', abrirFormEspaco);
  container.querySelector('#btn-cancelar-espaco')?.addEventListener('click', () => {
    form.classList.add('is-hidden');
  });
  for (const id of ['#input-nome-espaco', '#input-categoria-espaco']) {
    container.querySelector<HTMLInputElement>(id)?.addEventListener('input', (e) => {
      limparErroCampo(e.target as HTMLElement);
    });
  }
  container.querySelector('#btn-salvar-espaco')?.addEventListener('click', async () => {
    const input = container.querySelector<HTMLInputElement>('#input-nome-espaco')!;
    const categoriaInput = container.querySelector<HTMLInputElement>('#input-categoria-espaco')!;
    const nome = input.value.trim();
    const categoria = categoriaInput.value.trim();
    const nomeJaExiste = todos.some((e) => e.nome.trim().toLowerCase() === nome.toLowerCase());

    if (
      !validarCampos([
        { input: categoriaInput, ok: categoria.length > 0, mensagem: 'Informe uma categoria para a pasta.' },
        {
          input,
          ok: nome.length > 0,
          mensagem: 'Informe um nome para a pasta.',
        },
      ])
    ) {
      return;
    }
    if (nomeJaExiste) {
      marcarErroCampo(input, 'Já existe uma pasta com esse nome.');
      input.focus();
      return;
    }

    const novo = await createEspaco(ctx.perfilId, nome, categoria, lerEspacoVisual(container, 'novo-espaco'));
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
        message: `Isso manda pra Lixeira a pasta com ${contagem.temas} pasta(s) e ${contagem.notas} nota(s).\nDá pra restaurar tudo em Configurações → Lixeira, por até 30 dias.`,
      });
      if (!ok) return;
      await deleteEspacoCascade(id);
      renderEspacos(container, ctx);
    });
  });
}

function renderRow(e: Espaco, temaCount: number, cor: string): string {
  const icone = getEspacoIcone(espacoIconeChave(e));
  return `
    <div class="item-row" data-id="${escapeHtml(e.id)}" style="--row-accent:${cor}">
      <button class="item-row__main" data-open="${escapeHtml(e.id)}" type="button" style="background:none;border:none;text-align:left;cursor:pointer;">
        <span class="item-row__title-row">
          <span class="espaco-icon-badge" style="--badge-accent:${cor}" aria-hidden="true">${icone.svg}</span>
          <span class="item-row__title">${escapeHtml(e.nome)}</span>
        </span>
        <span class="item-row__meta">${temaCount} pasta(s)</span>
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
  const resultados = await Promise.all(
    espacoIds.map((id) => db.getAllFromIndex('temas', 'espaco_id', id)),
  );
  const counts = new Map<string, number>();
  espacoIds.forEach((id, i) => {
    counts.set(id, resultados[i].filter((t) => !t.excluido && !t.oculta).length);
  });
  return counts;
}
