import { countEspacoCascade, deleteEspacoCascade, getEspaco, listCategoriasEspacos, setEspacoArquivado, updateEspaco } from '../../db/espacos';
import { createTema, listCategoriasTemas, listTemas } from '../../db/temas';
import { getDB } from '../../db/schema';
import { escapeHtml } from '../../lib/dom';
import { agruparPorCategoria } from '../../lib/group';
import { accentVar } from '../../lib/color';
import { daysBetweenISODates, formatDateBR, toLondonISODate } from '../../lib/time';
import { navigate, encodeCategoriaSegment } from '../router';
import { confirmAction } from '../components/confirm-modal';
import { showInfo } from '../components/info-modal';
import { iniciarAvaliacaoAleatoria } from '../components/avaliacao-aleatoria';
import { renderBreadcrumb, bindBreadcrumb } from '../components/breadcrumb';
import { renderCategoriaChips, bindCategoriaChips } from '../components/categoria-chips';

export async function renderEspacoDetail(container: HTMLElement, espacoId: string): Promise<void> {
  const espaco = await getEspaco(espacoId);
  if (!espaco) {
    container.innerHTML = `<p class="text-muted">Espaço não encontrado.</p>`;
    return;
  }
  const temas = await listTemas(espacoId);
  const notaCounts = await countNotasPorTema(temas.map((t) => t.id));
  const grupos = agruparPorCategoria(temas);
  const categoriasEspaco = await listCategoriasEspacos(espaco.perfil_id);
  const categoriasTema = await listCategoriasTemas(espaco.perfil_id);

  container.innerHTML = `
    ${renderBreadcrumb([
      { label: 'Espaços', route: 'espacos' },
      ...(espaco.categoria ? [{ label: espaco.categoria, colorKey: espaco.categoria.toLowerCase() }] : []),
      { label: espaco.nome, colorKey: espaco.id },
    ])}

    <div class="section-header">
      <span class="section-header__title">
        <span class="color-dot" style="--dot-color:${accentVar(espaco.id)}"></span>${escapeHtml(espaco.nome)}
      </span>
      <div class="section-header__actions">
        <button class="btn btn--secondary btn--sm" id="btn-editar" type="button">Editar</button>
        <button class="btn btn--secondary btn--sm" id="btn-arquivar" type="button" ${espaco.arquivado ? '' : 'title="As revisões já agendadas continuam normalmente — só some da lista principal"'}>
          ${espaco.arquivado ? 'Reativar' : 'Arquivar'}
        </button>
        <a class="btn btn--secondary btn--sm" href="#/espacos/${escapeHtml(espaco.id)}/pdf">PDF</a>
        <details class="item-menu">
          <summary aria-label="Mais opções">⋯</summary>
          <div class="item-menu__panel">
            <button id="btn-detalhes" type="button">ℹ️ Detalhes</button>
            <button id="btn-avaliar" type="button">🎲 Avaliação aleatória</button>
            <button id="btn-excluir" class="danger" type="button">Excluir espaço</button>
          </div>
        </details>
      </div>
    </div>

    <div id="form-editar-espaco" style="display:none" class="card content-narrow">
      <div class="field">
        <label class="field__label" for="input-nome-espaco-editar">Nome</label>
        <input class="input" id="input-nome-espaco-editar" type="text" value="${escapeHtml(espaco.nome)}" maxlength="120" />
      </div>
      <div class="field" style="margin-top: var(--space-3);">
        <label class="field__label" for="input-categoria-espaco-editar">Categoria (opcional)</label>
        <input class="input" id="input-categoria-espaco-editar" type="text" value="${escapeHtml(espaco.categoria)}" maxlength="80" />
        ${renderCategoriaChips(categoriasEspaco, 'input-categoria-espaco-editar')}
      </div>
      <div class="form-actions" style="margin-top: var(--space-3);">
        <button class="btn btn--primary btn--sm" id="btn-salvar-edicao" type="button">Salvar</button>
        <button class="btn btn--secondary btn--sm" id="btn-cancelar-edicao" type="button">Cancelar</button>
      </div>
    </div>

    ${
      espaco.arquivado
        ? `<div class="banner banner--warning"><span>Este espaço está arquivado — não é possível criar novos temas ou notas nele, mas as revisões já agendadas continuam normalmente.</span></div>`
        : ''
    }

    ${
      !espaco.arquivado
        ? `
    <div id="form-novo-tema" style="display:none" class="card content-narrow">
      <p class="screen-hint" style="margin-top:0;">Um Tema é um assunto ou aula dentro deste Espaço — não precisa de categoria se não fizer sentido agrupar.</p>
      <div class="field">
        <label class="field__label" for="input-nome-tema">Nome do tema</label>
        <input class="input" id="input-nome-tema" type="text" placeholder="Ex: Renda Fixa" maxlength="120" />
      </div>
      <div class="field" style="margin-top: var(--space-3);">
        <label class="field__label" for="input-categoria-tema">Categoria (opcional)</label>
        <input class="input" id="input-categoria-tema" type="text" placeholder="Ex: nome do módulo" maxlength="80" />
        ${renderCategoriaChips(categoriasTema, 'input-categoria-tema')}
      </div>
      <div class="form-actions" style="margin-top: var(--space-3);">
        <button class="btn btn--primary btn--sm" id="btn-salvar-tema" type="button">Criar</button>
        <button class="btn btn--secondary btn--sm" id="btn-cancelar-tema" type="button">Cancelar</button>
      </div>
    </div>
    <button class="btn btn--primary btn--sm" id="btn-novo-tema" type="button" style="margin-bottom: var(--space-5);">+ Novo tema</button>
    `
        : ''
    }

    ${
      temas.length === 0
        ? `
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">🗂️</div>
        <div class="empty-state__title">Nenhum tema neste espaço ainda</div>
        <p class="empty-state__hint">Temas organizam as notas dentro de um espaço — ex: "Renda Fixa", "Renda Variável".</p>
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
          <span class="category-group__actions">
            ${
              !espaco.arquivado
                ? `<button class="category-group__action" type="button" data-novo-tema-categoria="${escapeHtml(grupo.categoria)}" title="Criar tema já nesta categoria">+ Tema</button>`
                : ''
            }
            <button class="category-group__action" type="button" data-pdf-categoria="${escapeHtml(encodeCategoriaSegment(grupo.categoria))}" title="Gerar PDF só desta categoria">PDF</button>
          </span>
        </summary>
        <div class="item-list">
          ${grupo.itens
            .map(
              (t) => `
            <button class="item-row" data-open="${escapeHtml(t.id)}" type="button" style="cursor:pointer; text-align:left;">
              <span class="item-row__main">
                <span class="item-row__title">${t.favorito ? '⭐ ' : ''}${escapeHtml(t.nome)}</span>
                <span class="item-row__meta">${notaCounts.get(t.id) ?? 0} nota(s)</span>
              </span>
            </button>
          `,
            )
            .join('')}
        </div>
      </details>
    `,
            )
            .join('')
    }
  `;

  bindBreadcrumb(container);
  bindCategoriaChips(container);

  container.querySelectorAll<HTMLButtonElement>('[data-pdf-categoria]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      navigate(`espacos/${espacoId}/pdf/${btn.dataset.pdfCategoria}`);
    });
  });

  container.querySelector('#btn-arquivar')?.addEventListener('click', async () => {
    await setEspacoArquivado(espaco.id, !espaco.arquivado);
    renderEspacoDetail(container, espacoId);
  });

  const formEditar = container.querySelector<HTMLElement>('#form-editar-espaco')!;
  container.querySelector('#btn-editar')?.addEventListener('click', () => {
    formEditar.style.display = 'block';
    container.querySelector<HTMLInputElement>('#input-nome-espaco-editar')?.focus();
  });
  container.querySelector('#btn-cancelar-edicao')?.addEventListener('click', () => {
    formEditar.style.display = 'none';
  });
  container.querySelector('#btn-salvar-edicao')?.addEventListener('click', async () => {
    const nome = container.querySelector<HTMLInputElement>('#input-nome-espaco-editar')!.value.trim();
    const categoria = container.querySelector<HTMLInputElement>('#input-categoria-espaco-editar')!.value.trim();
    if (!nome) return;
    await updateEspaco(espaco.id, nome, categoria);
    renderEspacoDetail(container, espacoId);
  });

  container.querySelector('#btn-detalhes')?.addEventListener('click', () => {
    const totalNotas = Array.from(notaCounts.values()).reduce((soma, n) => soma + n, 0);
    const hoje = toLondonISODate();

    let statusInfo: string;
    if (espaco.arquivado && espaco.arquivado_em) {
      const dias = daysBetweenISODates(toLondonISODate(new Date(espaco.criado_em)), toLondonISODate(new Date(espaco.arquivado_em)));
      statusInfo = `Arquivado em ${formatDateBR(espaco.arquivado_em)} — levou ${dias} dia(s) desde a criação.`;
    } else if (espaco.arquivado) {
      statusInfo = 'Arquivado antes desse registro de data existir, então não dá pra calcular quanto tempo levou.';
    } else {
      const dias = daysBetweenISODates(toLondonISODate(new Date(espaco.criado_em)), hoje);
      statusInfo = `Ativo há ${dias} dia(s).`;
    }

    showInfo({
      title: `Detalhes — ${espaco.nome}`,
      bodyHtml: `
        <div class="stack">
          <div class="settings-row"><span class="settings-row__label">Criado em</span><span>${formatDateBR(espaco.criado_em)}</span></div>
          <div class="settings-row"><span class="settings-row__label">Temas</span><span>${temas.length}</span></div>
          <div class="settings-row"><span class="settings-row__label">Notas</span><span>${totalNotas}</span></div>
          <div class="settings-row"><span class="settings-row__label">Status</span><span>${espaco.arquivado ? 'Arquivado' : 'Ativo'}</span></div>
        </div>
        <p class="text-muted" style="margin: var(--space-3) 0 0;">${statusInfo}</p>
      `,
    });
  });

  container.querySelector('#btn-avaliar')?.addEventListener('click', () => {
    iniciarAvaliacaoAleatoria(container, espaco.id, espaco.nome, () => renderEspacoDetail(container, espacoId));
  });

  container.querySelector('#btn-excluir')?.addEventListener('click', async () => {
    const contagem = await countEspacoCascade(espaco.id);
    const ok = await confirmAction({
      title: `Excluir "${espaco.nome}"?`,
      message: `Isso vai apagar ${contagem.temas} tema(s) e ${contagem.notas} nota(s), com todo o histórico de revisão delas.\nNão pode ser desfeito — mas dá pra restaurar de um backup exportado, se tiver um.`,
    });
    if (!ok) return;
    await deleteEspacoCascade(espaco.id);
    navigate('espacos');
  });

  const formTema = container.querySelector<HTMLElement>('#form-novo-tema');
  container.querySelector('#btn-novo-tema')?.addEventListener('click', () => {
    if (formTema) formTema.style.display = 'block';
    container.querySelector<HTMLInputElement>('#input-nome-tema')?.focus();
  });
  container.querySelector('#btn-cancelar-tema')?.addEventListener('click', () => {
    if (formTema) formTema.style.display = 'none';
  });
  container.querySelectorAll<HTMLButtonElement>('[data-novo-tema-categoria]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (formTema) formTema.style.display = 'block';
      const categoriaInput = container.querySelector<HTMLInputElement>('#input-categoria-tema');
      if (categoriaInput) categoriaInput.value = btn.dataset.novoTemaCategoria!;
      container.querySelector<HTMLInputElement>('#input-nome-tema')?.focus();
      formTema?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  container.querySelector('#btn-salvar-tema')?.addEventListener('click', async () => {
    const nomeInput = container.querySelector<HTMLInputElement>('#input-nome-tema')!;
    const categoriaInput = container.querySelector<HTMLInputElement>('#input-categoria-tema')!;
    const nome = nomeInput.value.trim();
    if (!nome) return;
    const novoTema = await createTema(espacoId, nome, categoriaInput.value.trim());
    navigate(`temas/${novoTema.id}`);
  });

  container.querySelectorAll<HTMLButtonElement>('[data-open]').forEach((btn) => {
    btn.addEventListener('click', () => navigate(`temas/${btn.dataset.open}`));
  });
}

async function countNotasPorTema(temaIds: string[]): Promise<Map<string, number>> {
  const db = await getDB();
  const counts = new Map<string, number>();
  for (const id of temaIds) {
    const notas = await db.getAllFromIndex('notas', 'tema_id', id);
    counts.set(id, notas.length);
  }
  return counts;
}
