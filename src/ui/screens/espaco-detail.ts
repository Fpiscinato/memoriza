import { countEspacoCascade, deleteEspacoCascade, getEspaco, listCategoriasEspacos, listEspacos, setEspacoArquivado, updateEspaco } from '../../db/espacos';
import { createTema, getTemaRaiz, listTemas } from '../../db/temas';
import { listNotas, listNotasPorEspaco } from '../../db/notas';
import { getDB } from '../../db/schema';
import { getTempoTotalEspaco } from '../../db/dashboard';
import { escapeHtml } from '../../lib/dom';
import { agruparPorCategoria, categoriaSugeridaParaNovoItem, deveAgruparPorCategoria } from '../../lib/group';
import { accentVar, assignCategoriaCores, assignEspacoCores, chaveCategoria, espacoCorVar } from '../../lib/color';
import { daysBetweenISODates, formatDateBR, formatDuracao, toLondonISODate } from '../../lib/time';
import { navigate, encodeCategoriaSegment, rotaCategoria } from '../router';
import { confirmAction } from '../components/confirm-modal';
import { showInfo } from '../components/info-modal';
import { iniciarAvaliacao, type AvaliacaoContexto } from '../components/avaliacao-aleatoria';
import { renderBreadcrumb, bindBreadcrumb } from '../components/breadcrumb';
import { renderCategoriaChips, bindCategoriaChips } from '../components/categoria-chips';
import { renderEspacoVisualPicker, bindEspacoVisualPicker, lerEspacoVisual } from '../components/espaco-visual';
import { limparErroCampo, marcarErroCampo, validarCampos } from '../../lib/form-validacao';
import { idsDaSubarvore } from '../../domain/arvore';
import { nomeTemaExibicao } from '../../domain/rotulos';
import { nomeCategoriaOuSemCategoria } from '../../domain/pdf-estrutura';
import { categoriaIconeChave, getEspacoIcone, espacoIconeChave } from '../espaco-icons';
import { ICONS } from '../icons';
import type { Tema } from '../../types';

export async function renderEspacoDetail(container: HTMLElement, espacoId: string): Promise<void> {
  const espaco = await getEspaco(espacoId);
  if (!espaco) {
    container.innerHTML = `<p class="text-muted">Pasta não encontrada.</p>`;
    return;
  }
  const temas = await listTemas(espacoId);
  const idsTemas = new Set(temas.map((t) => t.id));
  // Pastas de primeiro nível aparecem agrupadas por categoria; as subpastas opcionais ficam
  // dentro da pasta pai (ou de outra subpasta), não repetidas na lista principal.
  const temasRaiz = temas.filter((t) => !t.pai_id || !idsTemas.has(t.pai_id));
  const notaCounts = await countNotasPorTema(temas.map((t) => t.id));
  const raiz = await getTemaRaiz(espacoId);
  const notasDiretas = raiz ? await listNotas(raiz.id) : [];
  const grupos = agruparPorCategoria(temasRaiz);
  const agruparPastas = deveAgruparPorCategoria(temasRaiz);
  const categoriasEspaco = await listCategoriasEspacos(espaco.perfil_id);
  // A pasta nova fica dentro desta pasta e usa a categoria das pastas irmãs — assim ela
  // aparece junto delas, em vez de cair em "Sem categoria". Sem irmãs categorizadas, nasce
  // sem categoria; se o usuário clicar no "+ Pasta" de um grupo, aquele grupo manda.
  const categoriaSugerida = categoriaSugeridaParaNovoItem(temasRaiz);
  let categoriaNovaTema = categoriaSugerida;
  const espacoCor = espacoCorVar(espaco.cor, accentVar(espaco.id));
  const espacoIcone = getEspacoIcone(espacoIconeChave(espaco));
  const coresCategoria = assignCategoriaCores(grupos.map((g) => g.categoria));
  const coresTemas = assignEspacoCores(temasRaiz);
  const pastasVazias = temasRaiz.length === 0 && notasDiretas.length === 0;

  const notasDaSubarvore = (temaId: string): number =>
    idsDaSubarvore(temas, temaId).reduce((soma, id) => soma + (notaCounts.get(id) ?? 0), 0);
  const subpastasDoTema = (temaId: string): number =>
    temas.filter((t) => t.pai_id === temaId).length;

  const renderLinhaTema = (t: Tema, corFallback: string): string => {
    const notas = notasDaSubarvore(t.id);
    const subpastas = subpastasDoTema(t.id);
    const meta = [`${notas} nota(s)`, subpastas > 0 ? `${subpastas} pasta(s)` : '']
      .filter(Boolean)
      .join(' · ');
    const corTema = coresTemas.get(t.id) ?? corFallback;
    const iconeTema = getEspacoIcone(espacoIconeChave(t));
    return `
      <button class="item-row" data-open="${escapeHtml(t.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${corTema}">
        <span class="item-row__main">
          <span class="item-row__title-row">
            <span class="espaco-icon-badge" style="--badge-accent:${corTema}" aria-hidden="true">${iconeTema.svg}</span>
            <span class="item-row__title">${t.favorito ? `${ICONS.star} ` : ''}${escapeHtml(nomeTemaExibicao(t.nome))}</span>
          </span>
          <span class="item-row__meta">${meta}</span>
        </span>
      </button>
    `;
  };

  container.innerHTML = `
    ${renderBreadcrumb([
      { label: 'Pastas', route: 'espacos' },
      ...(espaco.categoria
        ? [{
            label: espaco.categoria,
            route: rotaCategoria(espaco.categoria),
            colorKey: espaco.categoria.toLowerCase(),
          }]
        : []),
      { label: espaco.nome, iconKey: espacoIcone.chave, iconColor: espacoCor },
    ])}

    <div class="section-header">
      <div>
        <span class="section-header__title">
          <span class="espaco-icon-badge" style="--badge-accent:${espacoCor}" aria-hidden="true">${espacoIcone.svg}</span>${escapeHtml(espaco.nome)}
        </span>
        <div class="section-header__meta text-muted">Categoria: ${escapeHtml(nomeCategoriaOuSemCategoria(espaco.categoria))}</div>
      </div>
      <div class="section-header__actions">
        ${
          !espaco.arquivado
            ? `
          <button class="btn btn--secondary btn--sm" id="btn-novo-tema" type="button">${ICONS.folder} Nova pasta</button>
          <button class="btn btn--secondary btn--sm" id="btn-nova-nota" type="button">${ICONS.notebook} Nova nota</button>
        `
            : ''
        }
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
            <button id="btn-excluir" class="danger" type="button">Excluir pasta</button>
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
        <label class="field__label" for="input-nome-espaco-editar">Nome da pasta</label>
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
        ? `<div class="banner banner--warning"><span>Esta pasta está arquivada — não é possível criar pastas ou notas novas nela, mas as revisões já agendadas continuam normalmente.</span></div>`
        : ''
    }

    ${
      !espaco.arquivado
        ? `
    <div id="form-nova-pasta" class="card content-narrow is-hidden">
      <div class="field">
        <label class="field__label" for="input-nome-tema">Nome da pasta</label>
        <input class="input" id="input-nome-tema" type="text" placeholder="Ex: Renda Fixa" maxlength="120" />
        <p class="field__error" role="alert"></p>
        <p class="field__sugestao-hint" id="hint-categoria-tema"></p>
      </div>
      <div style="margin-top: var(--space-4);">
        ${renderEspacoVisualPicker({ prefix: 'novo-tema' })}
      </div>
      <div class="form-actions com-margem">
        <button class="btn btn--primary btn--sm" id="btn-salvar-tema" type="button">Criar pasta</button>
        <button class="btn btn--secondary btn--sm" id="btn-cancelar-tema" type="button">Cancelar</button>
      </div>
    </div>
    `
        : ''
    }

    ${
      pastasVazias
        ? `
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${ICONS.folder}</div>
        <div class="empty-state__title">Esta pasta ainda está vazia</div>
        <p class="empty-state__hint">${
          espaco.arquivado
            ? 'Esta pasta está arquivada.'
            : 'Use <strong>Nova pasta</strong> ou <strong>Nova nota</strong> no topo para começar a organizar.'
        }</p>
      </div>
    `
        : `
      ${
        temasRaiz.length === 0
          ? `<p class="text-muted">Nenhuma pasta aqui ainda.</p>`
          : !agruparPastas
            ? `<div class="item-list">
                ${grupos
                  .flatMap((grupo) => grupo.itens)
                  .map((t) => renderLinhaTema(t, coresTemas.get(t.id) ?? espacoCor))
                  .join('')}
              </div>`
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
                ? `<button class="category-group__action" type="button" data-novo-tema-categoria="${escapeHtml(grupo.categoria)}" title="Criar pasta já nesta categoria">+ Pasta</button>`
                : ''
            }
            <button class="category-group__action" type="button" data-pdf-categoria="${escapeHtml(encodeCategoriaSegment(grupo.categoria))}" title="Gerar PDF só desta categoria">PDF</button>
          </span>
        </summary>
        <div class="item-list">
          ${grupo.itens.map((t) => renderLinhaTema(t, corCategoria)).join('')}
        </div>
      </details>
    `;
              })
              .join('')
      }

      <div class="section-header" style="margin-top: var(--space-6);">
        <span class="section-header__title" style="font-size: var(--font-size-base);">Notas nesta pasta</span>
      </div>
      ${
        notasDiretas.length === 0
          ? `
        <div class="empty-state">
          <div class="empty-state__icon" aria-hidden="true">${ICONS.pen}</div>
          <div class="empty-state__title">Nenhuma nota nesta pasta ainda</div>
          <p class="empty-state__hint">${
            espaco.arquivado
              ? 'Esta pasta está arquivada.'
              : 'Use <strong>Nova nota</strong> no topo — cada nota criada aqui já entra na fila de revisão automaticamente, a partir de amanhã.'
          }</p>
        </div>
      `
          : `
        <div class="item-list">
          ${notasDiretas
            .map(
              (n) => `
            <button class="item-row" data-open-nota="${escapeHtml(n.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${espacoCor}">
              <span class="item-row__main">
                <span class="item-row__title">${n.favorito ? `${ICONS.star} ` : ''}${escapeHtml(n.titulo || '(sem título)')}</span>
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
    `
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
          'Some da lista principal e não deixa criar pastas ou notas novas nela — mas as revisões já agendadas continuam normalmente, e dá pra reativar quando quiser.',
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
    container.querySelector<HTMLElement>('#form-nova-pasta')?.classList.add('is-hidden');
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
        { input: categoriaEditarInput, ok: categoria.length > 0, mensagem: 'Informe uma categoria para a pasta.' },
        { input: nomeEditarInput, ok: nome.length > 0, mensagem: 'Informe um nome para a pasta.' },
      ])
    ) {
      return;
    }
    const irmaos = await listEspacos(espaco.perfil_id);
    if (irmaos.some((e) => e.id !== espaco.id && e.nome.trim().toLowerCase() === nome.toLowerCase())) {
      marcarErroCampo(nomeEditarInput, 'Já existe uma pasta com esse nome.');
      nomeEditarInput.focus();
      return;
    }
    await updateEspaco(espaco.id, nome, categoria, lerEspacoVisual(container, 'editar-espaco'));
    renderEspacoDetail(container, espacoId);
  });

  container.querySelector('#btn-detalhes')?.addEventListener('click', async () => {
    const totalNotas =
      Array.from(notaCounts.values()).reduce((soma, n) => soma + n, 0) + notasDiretas.length;
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
            <div class="stat-tile__label">Pastas</div>
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
      message: `Isso manda pra Lixeira a pasta com ${contagem.temas} pasta(s) e ${contagem.notas} nota(s).\nDá pra restaurar tudo em Configurações → Lixeira, por até 30 dias.`,
    });
    if (!ok) return;
    await deleteEspacoCascade(espaco.id);
    navigate('espacos');
  });

  const formTema = container.querySelector<HTMLElement>('#form-nova-pasta');
  const nomeTemaInput = container.querySelector<HTMLInputElement>('#input-nome-tema')!;
  const hintCategoriaTema = container.querySelector<HTMLElement>('#hint-categoria-tema');

  bindEspacoVisualPicker(container, {
    prefix: 'novo-tema',
    getTexto: () => `${nomeTemaInput.value} ${categoriaNovaTema}`,
  });

  const atualizarHintCategoria = () => {
    if (!hintCategoriaTema) return;
    hintCategoriaTema.textContent = categoriaNovaTema
      ? `Categoria: ${categoriaNovaTema} — dá pra trocar depois em Editar.`
      : 'Sem categoria — dá pra definir depois em Editar.';
  };
  const abrirFormTema = (categoria?: string) => {
    // Um formulário por vez: abrir "Nova pasta" fecha o "Editar" (e vice-versa).
    formEditar.classList.add('is-hidden');
    // Sem categoria vinda do contexto, a pasta nova repete a categoria das irmãs.
    categoriaNovaTema = (categoria ?? categoriaSugerida).trim();
    atualizarHintCategoria();
    if (formTema) formTema.classList.remove('is-hidden');
    nomeTemaInput.focus();
    formTema?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  container.querySelector('#btn-novo-tema')?.addEventListener('click', () => abrirFormTema());
  container.querySelector('#btn-cancelar-tema')?.addEventListener('click', () => {
    if (formTema) formTema.classList.add('is-hidden');
  });
  nomeTemaInput.addEventListener('input', () => limparErroCampo(nomeTemaInput));
  container.querySelectorAll<HTMLButtonElement>('[data-novo-tema-categoria]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      abrirFormTema(btn.dataset.novoTemaCategoria ?? '');
    });
  });
  container.querySelector('#btn-salvar-tema')?.addEventListener('click', async () => {
    const nome = nomeTemaInput.value.trim();
    if (
      !validarCampos([
        { input: nomeTemaInput, ok: nome.length > 0, mensagem: 'Informe um nome para a pasta.' },
      ])
    ) {
      return;
    }
    const normalizado = (s: string) => s.trim().toLowerCase();
    const duplicado = temasRaiz.some((t) => normalizado(t.nome) === normalizado(nome));
    if (duplicado) {
      marcarErroCampo(nomeTemaInput, 'Já existe uma pasta com esse nome aqui.');
      nomeTemaInput.focus();
      return;
    }
    const novoTema = await createTema(espacoId, nome, {
      categoria: categoriaNovaTema,
      visual: lerEspacoVisual(container, 'novo-tema'),
    });
    navigate(`temas/${novoTema.id}`);
  });

  container.querySelector('#btn-nova-nota')?.addEventListener('click', () => navigate(`espacos/${espacoId}/nova-nota`));

  container.querySelectorAll<HTMLButtonElement>('[data-open]').forEach((btn) => {
    btn.addEventListener('click', () => navigate(`temas/${btn.dataset.open}`));
  });
  container.querySelectorAll<HTMLButtonElement>('[data-open-nota]').forEach((btn) => {
    btn.addEventListener('click', () => navigate(`notas/${btn.dataset.openNota}`));
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
