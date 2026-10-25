import { countEspacoCascade, deleteEspacoCascade, getEspaco, listCategoriasEspacos, listEspacos, setEspacoArquivado, updateEspaco } from '../../db/espacos';
import { createTema, listTemas } from '../../db/temas';
import { listNotasPorEspaco } from '../../db/notas';
import { getDB } from '../../db/schema';
import { getTempoTotalEspaco } from '../../db/dashboard';
import { clearInputSugestao, escapeHtml } from '../../lib/dom';
import { agruparPorCategoria, distinctCategorias } from '../../lib/group';
import { accentVar, assignCategoriaCores, assignEspacoCores, chaveCategoria, espacoCorVar } from '../../lib/color';
import { daysBetweenISODates, formatDateBR, formatDuracao, toLondonISODate } from '../../lib/time';
import { navigate, encodeCategoriaSegment } from '../router';
import { confirmAction } from '../components/confirm-modal';
import { showInfo } from '../components/info-modal';
import { iniciarAvaliacao, type AvaliacaoContexto } from '../components/avaliacao-aleatoria';
import { renderBreadcrumb, bindBreadcrumb } from '../components/breadcrumb';
import { renderCategoriaChips, bindCategoriaChips } from '../components/categoria-chips';
import { renderEspacoVisualPicker, bindEspacoVisualPicker, lerEspacoVisual } from '../components/espaco-visual';
import { limparErroCampo, marcarErroCampo, validarCampos } from '../../lib/form-validacao';
import { idsDaSubarvore } from '../../domain/arvore';
import { nomeTemaExibicao } from '../../domain/rotulos';
import { categoriaIconeChave, getEspacoIcone, espacoIconeChave } from '../espaco-icons';
import { ICONS } from '../icons';

export async function renderEspacoDetail(container: HTMLElement, espacoId: string): Promise<void> {
  const espaco = await getEspaco(espacoId);
  if (!espaco) {
    container.innerHTML = `<p class="text-muted">Espaço não encontrado.</p>`;
    return;
  }
  const temas = await listTemas(espacoId);
  const idsTemas = new Set(temas.map((t) => t.id));
  // Temas de primeiro nível aparecem agrupados por categoria; as subpastas opcionais ficam
  // dentro do Tema pai (ou de outra subpasta), não repetidas na lista do Espaço.
  const temasRaiz = temas.filter((t) => !t.pai_id || !idsTemas.has(t.pai_id));
  const notaCounts = await countNotasPorTema(temas.map((t) => t.id));
  const grupos = agruparPorCategoria(temasRaiz);
  const categoriasEspaco = await listCategoriasEspacos(espaco.perfil_id);
  // Escopo é só este Espaço (não o perfil inteiro) — sugestão de categoria de Tema precisa
  // ser relevante pro "curso" atual, não misturar módulos de outros Espaços.
  const categoriasTema = distinctCategorias(temasRaiz.map((t) => t.categoria));
  // Sugere a categoria do último Tema criado neste Espaço — ajuda a lembrar o "módulo" atual
  // sem precisar rolar a tela pra conferir os outros Temas já criados.
  const ultimoTemaCriado = [...temas].sort((a, b) => b.criado_em.localeCompare(a.criado_em))[0];
  const categoriaTemaSugerida = ultimoTemaCriado?.categoria?.trim() || undefined;
  const nomeTemaSugerido = ultimoTemaCriado?.nome?.trim() || undefined;
  const espacoCor = espacoCorVar(espaco.cor, accentVar(espaco.id));
  const espacoIcone = getEspacoIcone(espacoIconeChave(espaco));
  const coresCategoria = assignCategoriaCores(grupos.map((g) => g.categoria));
  const coresTemas = assignEspacoCores(temasRaiz);

  const notasDaSubarvore = (temaId: string): number =>
    idsDaSubarvore(temas, temaId).reduce((soma, id) => soma + (notaCounts.get(id) ?? 0), 0);
  const subpastasDoTema = (temaId: string): number =>
    temas.filter((t) => t.pai_id === temaId).length;

  container.innerHTML = `
    ${renderBreadcrumb([
      { label: 'Espaços', route: 'espacos' },
      ...(espaco.categoria ? [{ label: espaco.categoria, colorKey: espaco.categoria.toLowerCase() }] : []),
      { label: espaco.nome, iconKey: espacoIcone.chave, iconColor: espacoCor },
    ])}

    <div class="section-header">
      <span class="section-header__title">
        <span class="espaco-icon-badge" style="--badge-accent:${espacoCor}" aria-hidden="true">${espacoIcone.svg}</span>${escapeHtml(espaco.nome)}
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
            <button id="btn-detalhes" type="button">${ICONS.info} Detalhes</button>
            <button id="btn-avaliar" type="button">${ICONS.dice} Avaliar notas</button>
            <button id="btn-excluir" class="danger" type="button">Excluir espaço</button>
          </div>
        </details>
      </div>
    </div>

    <div id="form-editar-espaco" class="card content-narrow is-hidden">
      <div class="field">
        <label class="field__label" for="input-categoria-espaco-editar">Categoria</label>
        <input class="input" id="input-categoria-espaco-editar" type="text" value="${escapeHtml(espaco.categoria)}" maxlength="80" />
        <p class="field__error" role="alert"></p>
        ${renderCategoriaChips(categoriasEspaco, 'input-categoria-espaco-editar')}
      </div>
      <div class="field com-margem">
        <label class="field__label" for="input-nome-espaco-editar">Nome</label>
        <input class="input" id="input-nome-espaco-editar" type="text" value="${escapeHtml(espaco.nome)}" maxlength="120" />
        <p class="field__error" role="alert"></p>
      </div>
      <div style="margin-top: var(--space-4);">
        ${renderEspacoVisualPicker({ prefix: 'editar-espaco', icone: espaco.icone, cor: espaco.cor })}
      </div>
      <div class="form-actions com-margem">
        <button class="btn btn--primary btn--sm" id="btn-salvar-edicao" type="button">Salvar</button>
        <button class="btn btn--secondary btn--sm" id="btn-cancelar-edicao" type="button">Cancelar</button>
      </div>
    </div>

    ${
      espaco.arquivado
        ? `<div class="banner banner--warning"><span>Este espaço está arquivado — não é possível criar novos temas, subpastas ou notas nele, mas as revisões já agendadas continuam normalmente.</span></div>`
        : ''
    }

    ${
      !espaco.arquivado
        ? `
    <div id="form-novo-tema" class="card content-narrow is-hidden">
      <p class="screen-hint sem-margem-topo">Um Tema é um assunto ou aula dentro deste Espaço. A <strong>categoria</strong> agrupa os temas (ex: o módulo do curso) — preencha ela primeiro; o nome é opcional.</p>
      <div class="field">
        <label class="field__label" for="input-categoria-tema">Categoria</label>
        <input class="input${categoriaTemaSugerida ? ' input--sugerido' : ''}" id="input-categoria-tema" type="text" placeholder="Ex: nome do módulo" maxlength="80" value="${escapeHtml(categoriaTemaSugerida ?? '')}" />
        <p class="field__error" role="alert"></p>
        ${categoriaTemaSugerida ? `<p class="field__sugestao-hint">↻ Categoria do último tema criado aqui — edite se for outro módulo</p>` : ''}
        ${renderCategoriaChips(categoriasTema, 'input-categoria-tema')}
      </div>
      <div class="field com-margem">
        <label class="field__label" for="input-nome-tema">Nome do tema (opcional)</label>
        <input class="input${nomeTemaSugerido ? ' input--sugerido' : ''}" id="input-nome-tema" type="text" placeholder="Ex: Renda Fixa" maxlength="120" value="${escapeHtml(nomeTemaSugerido ?? '')}" />
        <p class="field__error" role="alert"></p>
        ${nomeTemaSugerido ? `<p class="field__sugestao-hint">↻ Nome do último tema criado aqui — edite antes de salvar</p>` : ''}
      </div>
      <div style="margin-top: var(--space-4);">
        ${renderEspacoVisualPicker({ prefix: 'novo-tema' })}
      </div>
      <div class="form-actions com-margem">
        <button class="btn btn--primary btn--sm" id="btn-salvar-tema" type="button">Criar</button>
        <button class="btn btn--secondary btn--sm" id="btn-cancelar-tema" type="button">Cancelar</button>
      </div>
    </div>
    <button class="btn btn--primary btn--sm" id="btn-novo-tema" type="button" style="margin-bottom: var(--space-5);">+ Novo tema</button>
    `
        : ''
    }

    ${
      temasRaiz.length === 0
        ? `
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${ICONS.folder}</div>
        <div class="empty-state__title">Nenhum tema neste espaço ainda</div>
        <p class="empty-state__hint">Temas organizam as notas dentro de um espaço — ex: "Renda Fixa", "Renda Variável".</p>
        ${!espaco.arquivado ? `<button class="btn btn--primary btn--sm empty-state__action" id="btn-empty-novo-tema" type="button">Criar o primeiro tema</button>` : ''}
      </div>
    `
        : grupos
            .map((grupo) => {
              const corCategoria = coresCategoria.get(chaveCategoria(grupo.categoria)) ?? accentVar(grupo.categoria || 'sem-categoria');
              const iconeCategoria = getEspacoIcone(categoriaIconeChave(grupo.categoria));
              return `
      <details class="category-group">
        <summary class="category-group__title" style="--group-accent:${corCategoria}">
          <span class="category-group__label">
            <span class="espaco-icon-inline" style="--badge-accent:${corCategoria}" aria-hidden="true">${iconeCategoria.svg}</span>
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
            .map((t) => {
              const notas = notasDaSubarvore(t.id);
              const subpastas = subpastasDoTema(t.id);
              const meta = [`${notas} nota(s)`, subpastas > 0 ? `${subpastas} subpasta(s)` : '']
                .filter(Boolean)
                .join(' · ');
              const corTema = coresTemas.get(t.id) ?? corCategoria;
              return `
            <button class="item-row" data-open="${escapeHtml(t.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${corTema}">
              <span class="item-row__main">
                <span class="item-row__title">${t.favorito ? `${ICONS.star} ` : ''}${escapeHtml(nomeTemaExibicao(t.nome))}</span>
                <span class="item-row__meta">${meta}</span>
              </span>
            </button>
          `;
            })
            .join('')}
        </div>
      </details>
    `;
            })
            .join('')
    }
  `;

  bindBreadcrumb(container);
  bindCategoriaChips(container);
  bindEspacoVisualPicker(container, {
    prefix: 'editar-espaco',
    getTexto: () =>
      `${container.querySelector<HTMLInputElement>('#input-nome-espaco-editar')?.value ?? ''} ${
        container.querySelector<HTMLInputElement>('#input-categoria-espaco-editar')?.value ?? ''
      }`,
  });
  bindEspacoVisualPicker(container, {
    prefix: 'novo-tema',
    getTexto: () =>
      `${container.querySelector<HTMLInputElement>('#input-nome-tema')?.value ?? ''} ${
        container.querySelector<HTMLInputElement>('#input-categoria-tema')?.value ?? ''
      }`,
  });

  container.querySelectorAll<HTMLButtonElement>('[data-pdf-categoria]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      navigate(`espacos/${espacoId}/pdf/${btn.dataset.pdfCategoria}`);
    });
  });

  container.querySelector('#btn-arquivar')?.addEventListener('click', async () => {
    if (!espaco.arquivado) {
      const ok = await confirmAction({
        title: `Arquivar "${espaco.nome}"?`,
        message:
          'Some da lista principal e não deixa criar temas ou notas novas nele — mas as revisões já agendadas continuam normalmente, e dá pra reativar quando quiser.',
        confirmLabel: 'Arquivar',
        confirmVariant: 'primary',
      });
      if (!ok) return;
    }
    await setEspacoArquivado(espaco.id, !espaco.arquivado);
    renderEspacoDetail(container, espacoId);
  });

  const formEditar = container.querySelector<HTMLElement>('#form-editar-espaco')!;
  const nomeEditarInput = container.querySelector<HTMLInputElement>('#input-nome-espaco-editar')!;
  const categoriaEditarInput = container.querySelector<HTMLInputElement>('#input-categoria-espaco-editar')!;
  container.querySelector('#btn-editar')?.addEventListener('click', () => {
    formEditar.classList.remove('is-hidden');
    categoriaEditarInput.focus();
  });
  container.querySelector('#btn-cancelar-edicao')?.addEventListener('click', () => {
    formEditar.classList.add('is-hidden');
  });
  for (const input of [nomeEditarInput, categoriaEditarInput]) {
    input.addEventListener('input', () => limparErroCampo(input));
  }
  container.querySelector('#btn-salvar-edicao')?.addEventListener('click', async () => {
    const nome = nomeEditarInput.value.trim();
    const categoria = categoriaEditarInput.value.trim();
    if (
      !validarCampos([
        { input: categoriaEditarInput, ok: categoria.length > 0, mensagem: 'Informe uma categoria para o espaço.' },
        { input: nomeEditarInput, ok: nome.length > 0, mensagem: 'Informe um nome para o espaço.' },
      ])
    ) {
      return;
    }
    const irmaos = await listEspacos(espaco.perfil_id);
    if (irmaos.some((e) => e.id !== espaco.id && e.nome.trim().toLowerCase() === nome.toLowerCase())) {
      marcarErroCampo(nomeEditarInput, 'Já existe um espaço com esse nome.');
      nomeEditarInput.focus();
      return;
    }
    await updateEspaco(espaco.id, nome, categoria, lerEspacoVisual(container, 'editar-espaco'));
    renderEspacoDetail(container, espacoId);
  });

  container.querySelector('#btn-detalhes')?.addEventListener('click', async () => {
    const totalNotas = Array.from(notaCounts.values()).reduce((soma, n) => soma + n, 0);
    const hoje = toLondonISODate();
    const tempoTotalSegundos = await getTempoTotalEspaco(espaco.id);

    let diasValue: string;
    let diasLabel: string;
    let statusCaption: string;
    if (espaco.arquivado && espaco.arquivado_em) {
      const dias = daysBetweenISODates(toLondonISODate(new Date(espaco.criado_em)), toLondonISODate(new Date(espaco.arquivado_em)));
      diasValue = String(dias);
      diasLabel = 'Dias até arquivar';
      statusCaption = `Criado em ${formatDateBR(espaco.criado_em)} · arquivado em ${formatDateBR(espaco.arquivado_em)}`;
    } else if (espaco.arquivado) {
      diasValue = '—';
      diasLabel = 'Duração';
      statusCaption = `Criado em ${formatDateBR(espaco.criado_em)} · arquivado antes desse registro de data existir`;
    } else {
      const dias = daysBetweenISODates(toLondonISODate(new Date(espaco.criado_em)), hoje);
      diasValue = String(dias);
      diasLabel = dias === 1 ? 'Dia ativo' : 'Dias ativo';
      statusCaption = `Criado em ${formatDateBR(espaco.criado_em)}`;
    }

    showInfo({
      title: espaco.nome,
      bodyHtml: `
        <div class="stat-grid" style="margin-bottom: var(--space-3); grid-template-columns: repeat(2, 1fr);">
          <div class="stat-tile">
            <div class="stat-tile__value">${temas.length}</div>
            <div class="stat-tile__label">Temas/subpastas</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${totalNotas}</div>
            <div class="stat-tile__label">Notas</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value stat-tile__value--compacto">${formatDuracao(tempoTotalSegundos)}</div>
            <div class="stat-tile__label">Tempo revisando</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${diasValue}</div>
            <div class="stat-tile__label">${diasLabel}</div>
          </div>
        </div>
        <p class="text-muted sem-margem">${statusCaption} · ${espaco.arquivado ? 'Arquivado' : 'Ativo'}</p>
      `,
    });
  });

  container.querySelector('#btn-avaliar')?.addEventListener('click', async () => {
    const notasComTema = await listNotasPorEspaco(espaco.id);
    const ctx: AvaliacaoContexto = {
      perfilId: espaco.perfil_id,
      espacoId: espaco.id,
      nomeContexto: espaco.nome,
      tipo: 'espaco',
    };
    iniciarAvaliacao(container, notasComTema, ctx, () => renderEspacoDetail(container, espacoId));
  });

  container.querySelector('#btn-excluir')?.addEventListener('click', async () => {
    const contagem = await countEspacoCascade(espaco.id);
    const ok = await confirmAction({
      title: `Excluir "${espaco.nome}"?`,
      message: `Isso manda pra Lixeira o espaço com ${contagem.temas} tema(s) e ${contagem.notas} nota(s).\nDá pra restaurar tudo em Configurações → Lixeira, por até 30 dias.`,
    });
    if (!ok) return;
    await deleteEspacoCascade(espaco.id);
    navigate('espacos');
  });

  const formTema = container.querySelector<HTMLElement>('#form-novo-tema');
  const abrirFormTema = () => {
    if (formTema) formTema.classList.remove('is-hidden');
    container.querySelector<HTMLInputElement>('#input-categoria-tema')?.focus();
  };
  container.querySelector('#btn-novo-tema')?.addEventListener('click', abrirFormTema);
  container.querySelector('#btn-empty-novo-tema')?.addEventListener('click', abrirFormTema);
  container.querySelector('#btn-cancelar-tema')?.addEventListener('click', () => {
    if (formTema) formTema.classList.add('is-hidden');
  });
  const nomeTemaInput = container.querySelector<HTMLInputElement>('#input-nome-tema')!;
  const categoriaTemaInput = container.querySelector<HTMLInputElement>('#input-categoria-tema')!;
  if (nomeTemaSugerido) {
    nomeTemaInput.addEventListener('input', () => clearInputSugestao(nomeTemaInput), { once: true });
  }
  if (categoriaTemaSugerida) {
    categoriaTemaInput.addEventListener('input', () => clearInputSugestao(categoriaTemaInput), { once: true });
  }
  for (const input of [nomeTemaInput, categoriaTemaInput]) {
    input.addEventListener('input', () => limparErroCampo(input));
  }
  container.querySelectorAll<HTMLButtonElement>('[data-novo-tema-categoria]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (formTema) formTema.classList.remove('is-hidden');
      categoriaTemaInput.value = btn.dataset.novoTemaCategoria!;
      clearInputSugestao(categoriaTemaInput);
      nomeTemaInput.focus();
      formTema?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  container.querySelector('#btn-salvar-tema')?.addEventListener('click', async () => {
    const nome = nomeTemaInput.value.trim();
    const categoria = categoriaTemaInput.value.trim();
    if (!validarCampos([{ input: categoriaTemaInput, ok: categoria.length > 0, mensagem: 'Informe uma categoria para o tema.' }])) {
      return;
    }
    // Categoria + Nome iguais no mesmo Espaço = Tema duplicado. Sem nome, não dá pra comparar.
    const normalizado = (s: string) => s.trim().toLowerCase();
    const duplicado = temasRaiz.some(
      (t) => normalizado(t.categoria) === normalizado(categoria) && normalizado(t.nome) === normalizado(nome) && nome.length > 0,
    );
    if (duplicado) {
      marcarErroCampo(nomeTemaInput, 'Já existe um tema com esse nome nesta categoria.');
      nomeTemaInput.focus();
      return;
    }
    const novoTema = await createTema(espacoId, nome, {
      categoria,
      visual: lerEspacoVisual(container, 'novo-tema'),
    });
    navigate(`temas/${novoTema.id}`);
  });

  container.querySelectorAll<HTMLButtonElement>('[data-open]').forEach((btn) => {
    btn.addEventListener('click', () => navigate(`temas/${btn.dataset.open}`));
  });
}

async function countNotasPorTema(temaIds: string[]): Promise<Map<string, number>> {
  const db = await getDB();
  const resultados = await Promise.all(
    temaIds.map((id) => db.getAllFromIndex('notas', 'tema_id', id)),
  );
  const counts = new Map<string, number>();
  temaIds.forEach((id, i) => {
    counts.set(id, resultados[i].filter((n) => !n.excluido).length);
  });
  return counts;
}
