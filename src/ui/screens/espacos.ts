import { countEspacoCascade, createEspaco, deleteEspacoCascade, listEspacos, setEspacoArquivado } from '../../db/espacos';
import { getDB } from '../../db/schema';
import { escapeHtml } from '../../lib/dom';
import { accentVar, assignEspacoCores } from '../../lib/color';
import { navigate } from '../router';
import { confirmAction } from '../components/confirm-modal';
import { renderEspacoVisualPicker, bindEspacoVisualPicker, lerEspacoVisual } from '../components/espaco-visual';
import { limparErroCampo, marcarErroCampo, validarCampos } from '../../lib/form-validacao';
import { getEspacoIcone, espacoIconeChave } from '../espaco-icons';
import { ICONS } from '../icons';

export interface EspacosContext {
  perfilId: string;
}

export async function renderEspacos(container: HTMLElement, ctx: EspacosContext): Promise<void> {
  const todos = await listEspacos(ctx.perfilId);
  const ativos = todos.filter((e) => !e.arquivado);
  const arquivados = todos.filter((e) => e.arquivado);
  const contagens = await countConteudoPorEspaco(todos.map((e) => e.id));
  const cores = assignEspacoCores(ativos);

  container.innerHTML = `
    <div style="display:flex; align-items:center; justify-content:space-between; gap: var(--space-3); flex-wrap:wrap; margin-bottom: var(--space-4);">
      <p class="screen-hint sem-margem">Cada pasta principal é um grande grupo (ex: Bíblia, Livros, Cursos). Dentro dela você cria subpastas e, dentro das subpastas, as notas.</p>
      <button class="btn btn--primary btn--sm" id="btn-novo-espaco" type="button">+ Nova pasta principal</button>
    </div>

    <div id="form-novo-espaco" class="card is-hidden">
      <div class="field">
        <label class="field__label" for="input-nome-espaco">Nome da pasta principal</label>
        <input class="input" id="input-nome-espaco" type="text" placeholder="Ex: Bíblia, Livros, Cursos, Estudos" maxlength="120" />
        <p class="espaco-visual__hint">Esse é o grupo principal. Depois de criá-lo, abra a pasta e crie as subpastas que quiser.</p>
        <p class="field__error" role="alert"></p>
      </div>
      <div style="margin-top: var(--space-4);">
        ${renderEspacoVisualPicker({ prefix: 'novo-espaco' })}
      </div>
      <div class="form-actions com-margem">
        <button class="btn btn--primary btn--sm" id="btn-salvar-espaco" type="button">Criar pasta</button>
        <button class="btn btn--secondary btn--sm" id="btn-cancelar-espaco" type="button">Cancelar</button>
      </div>
    </div>

    ${
      ativos.length === 0
        ? `
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${ICONS.folder}</div>
        <div class="empty-state__title">Nenhuma pasta principal ainda</div>
        <p class="empty-state__hint">Crie uma pasta principal (ex: "Bíblia") para começar. Dentro dela você cria subpastas e notas.</p>
        <button class="btn btn--primary btn--sm empty-state__action" id="btn-empty-novo-espaco" type="button">Criar a primeira pasta</button>
      </div>
    `
        : `
      <div class="item-list">
        ${ativos
          .map((e) => {
            const cor = cores.get(e.id) ?? accentVar(e.id);
            const icone = getEspacoIcone(espacoIconeChave(e));
            const c = contagens.get(e.id) ?? { pastas: 0, notas: 0 };
            return `
          <div class="item-row" data-id="${escapeHtml(e.id)}" style="--row-accent:${cor}">
            <button class="item-row__main" data-open="${escapeHtml(e.id)}" type="button" style="background:none;border:none;text-align:left;cursor:pointer;">
              <span class="item-row__title-row">
                <span class="espaco-icon-badge" style="--badge-accent:${cor}" aria-hidden="true">${icone.svg}</span>
                <span class="item-row__title">${escapeHtml(e.nome)}</span>
              </span>
              <span class="item-row__meta">${c.pastas} pasta(s) · ${c.notas} nota(s)</span>
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
          })
          .join('')}
      </div>
    `
    }

    ${
      arquivados.length > 0
        ? `
      <details style="margin-top: var(--space-6);">
        <summary class="text-muted" style="cursor:pointer;">Arquivadas (${arquivados.length})</summary>
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
                <span class="item-row__meta">Arquivada</span>
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

  bindEspacoVisualPicker(container, {
    prefix: 'novo-espaco',
    getTexto: () => container.querySelector<HTMLInputElement>('#input-nome-espaco')?.value ?? '',
  });

  const form = container.querySelector<HTMLElement>('#form-novo-espaco')!;
  const nomeInput = container.querySelector<HTMLInputElement>('#input-nome-espaco')!;
  const abrirFormEspaco = () => {
    form.classList.remove('is-hidden');
    nomeInput.focus();
  };
  container.querySelector('#btn-novo-espaco')?.addEventListener('click', abrirFormEspaco);
  container.querySelector('#btn-empty-novo-espaco')?.addEventListener('click', abrirFormEspaco);
  container.querySelector('#btn-cancelar-espaco')?.addEventListener('click', () => {
    form.classList.add('is-hidden');
  });
  nomeInput.addEventListener('input', () => limparErroCampo(nomeInput));
  container.querySelector('#btn-salvar-espaco')?.addEventListener('click', async () => {
    const nome = nomeInput.value.trim();
    if (!validarCampos([{ input: nomeInput, ok: nome.length > 0, mensagem: 'Informe um nome para a pasta.' }])) {
      return;
    }
    const nomeJaExiste = todos.some((e) => e.nome.trim().toLowerCase() === nome.toLowerCase());
    if (nomeJaExiste) {
      marcarErroCampo(nomeInput, 'Já existe uma pasta com esse nome.');
      nomeInput.focus();
      return;
    }

    const novo = await createEspaco(ctx.perfilId, nome, lerEspacoVisual(container, 'novo-espaco'));
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
        message: `Isso manda pra Lixeira a pasta com ${contagem.temas} subpasta(s) e ${contagem.notas} nota(s).\nDá pra restaurar tudo em Configurações → Lixeira, por até 30 dias.`,
      });
      if (!ok) return;
      await deleteEspacoCascade(id);
      renderEspacos(container, ctx);
    });
  });
}

async function countConteudoPorEspaco(
  espacoIds: string[],
): Promise<Map<string, { pastas: number; notas: number }>> {
  const db = await getDB();
  const resultado = new Map<string, { pastas: number; notas: number }>();
  for (const espacoId of espacoIds) {
    const temas = (await db.getAllFromIndex('temas', 'espaco_id', espacoId)).filter(
      (t) => !t.excluido,
    );
    let notas = 0;
    for (const tema of temas) {
      notas += (await db.getAllFromIndex('notas', 'tema_id', tema.id)).filter((n) => !n.excluido)
        .length;
    }
    resultado.set(espacoId, { pastas: temas.length, notas });
  }
  return resultado;
}
