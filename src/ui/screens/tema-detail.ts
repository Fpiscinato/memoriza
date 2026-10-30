import {
  contarFilhosPorPasta,
  countTemaCascade,
  createTema,
  deleteTemaCascade,
  getTema,
  listTemas,
  toggleTemaFavorito,
  updateTema,
} from '../../db/temas';
import { getEspaco } from '../../db/espacos';
import { listNotas, listNotasPorEspaco } from '../../db/notas';
import { listarDestinosMover, moverTema } from '../../db/mover';
import { getTempoTotalTema } from '../../db/dashboard';
import { getDB } from '../../db/schema';
import { escapeHtml } from '../../lib/dom';
import { accentVar, assignCategoriaCores, assignEspacoCores, chaveCategoria, espacoCorVar } from '../../lib/color';
import { agruparPorCategoria, categoriaSugeridaParaNovoItem, distinctCategorias, deveAgruparPorCategoria } from '../../lib/group';
import { daysBetweenISODates, formatDateBR, formatDuracao, toLondonISODate } from '../../lib/time';
import { navigate } from '../router';
import { confirmAction } from '../components/confirm-modal';
import { showInfo } from '../components/info-modal';
import { abrirModalMover } from '../components/mover-modal';
import { iniciarAvaliacao, type AvaliacaoContexto } from '../components/avaliacao-aleatoria';
import { renderBreadcrumb, bindBreadcrumb, type BreadcrumbCrumb } from '../components/breadcrumb';
import { renderCategoriaChips, bindCategoriaChips } from '../components/categoria-chips';
import { renderEspacoVisualPicker, bindEspacoVisualPicker, lerEspacoVisual } from '../components/espaco-visual';
import { nomeTemaExibicao } from '../../domain/rotulos';
import { caminhoDe, idsDaSubarvore } from '../../domain/arvore';
import { limparErroCampo, marcarErroCampo, validarCampos } from '../../lib/form-validacao';
import { categoriaIconeChave, getEspacoIcone, espacoIconeChave } from '../espaco-icons';
import { ICONS } from '../icons';
import type { Tema } from '../../types';

export async function renderTemaDetail(container: HTMLElement, temaId: string): Promise<void> {
  const tema = await getTema(temaId);
  if (!tema || tema.oculta) {
    container.innerHTML = `<p class="text-muted">Pasta não encontrada.</p>`;
    return;
  }
  const espaco = await getEspaco(tema.espaco_id);
  if (!espaco) {
    container.innerHTML = `<p class="text-muted">Pasta não encontrada.</p>`;
    return;
  }

  const todosTemas = await listTemas(tema.espaco_id);
  const filhos = todosTemas.filter((t) => (t.pai_id ?? null) === tema.id);
  const ancestrais = caminhoDe(todosTemas, tema);
  const notas = await listNotas(temaId);
  const notaCounts = await countNotasPorTema(todosTemas.map((t) => t.id));
  const subpastaCounts = contarFilhosPorPasta(todosTemas);
  const grupos = agruparPorCategoria(filhos);
  const agruparPastas = deveAgruparPorCategoria(filhos);
  const coresFilhos = assignEspacoCores(filhos);
  const coresCategoria = assignCategoriaCores(grupos.map((g) => g.categoria));
  const espacoCor = espacoCorVar(espaco.cor, accentVar(espaco.id));
  const espacoIcone = getEspacoIcone(espacoIconeChave(espaco));
  const temaCor = espacoCorVar(tema.cor, accentVar(tema.id));
  const temaIcone = getEspacoIcone(espacoIconeChave(tema));

  // Categorias já usadas nesta pasta de topo — só para os chips do formulário de "Editar".
  const categoriasTema = distinctCategorias(todosTemas.map((t) => t.categoria));

  // Pasta nova nasce dentro desta pasta e repete a categoria das pastas irmãs — assim ela
  // aparece junto delas, em vez de cair em "Sem categoria". Se o usuário tocar no "+ Pasta"
  // de um grupo, a categoria daquele grupo manda.
  const categoriaSugerida = categoriaSugeridaParaNovoItem(filhos);
  let categoriaNova = categoriaSugerida;

  const notasDaSubarvore = (id: string): number =>
    idsDaSubarvore(todosTemas, id).reduce((soma, tid) => soma + (notaCounts.get(tid) ?? 0), 0);

  // Caminho visual: Categoria › Pasta › Categoria › Pasta … Como o Tema de topo costuma
  // repetir a categoria da pasta principal, categorias iguais em sequência são omitidas.
  const crumbs: BreadcrumbCrumb[] = [{ label: 'Pastas', route: 'espacos' }];
  let ultimoRotulo = 'Pastas';
  const adicionarCategoria = (categoria: string): void => {
    const limpa = categoria.trim();
    if (!limpa || limpa === ultimoRotulo) return;
    crumbs.push({ label: limpa, colorKey: limpa.toLowerCase() });
    ultimoRotulo = limpa;
  };
  adicionarCategoria(espaco.categoria);
  crumbs.push({
    label: espaco.nome,
    route: `espacos/${espaco.id}`,
    iconKey: espacoIcone.chave,
    iconColor: espacoCor,
  });
  ultimoRotulo = espaco.nome;
  for (const pasta of [...ancestrais, tema]) {
    adicionarCategoria(pasta.categoria);
    const nome = nomeTemaExibicao(pasta.nome);
    crumbs.push({
      label: nome,
      route: `temas/${pasta.id}`,
      iconKey: espacoIconeChave(pasta),
      iconColor: espacoCorVar(pasta.cor, accentVar(pasta.id)),
    });
    ultimoRotulo = nome;
  }

  const pastasVazias = filhos.length === 0 && notas.length === 0;

  const renderLinhaFilho = (filho: Tema, corFallback: string): string => {
    const cor = coresFilhos.get(filho.id) ?? corFallback;
    const icone = getEspacoIcone(espacoIconeChave(filho));
    const subpastas = subpastaCounts.get(filho.id) ?? 0;
    const meta = [
      `${notasDaSubarvore(filho.id)} nota(s)`,
      subpastas > 0 ? `${subpastas} pasta(s)` : '',
    ]
      .filter(Boolean)
      .join(' · ');
    return `
      <button class="item-row" data-open="${escapeHtml(filho.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${cor}">
        <span class="item-row__main">
          <span class="item-row__title-row">
            <span class="espaco-icon-badge" style="--badge-accent:${cor}" aria-hidden="true">${icone.svg}</span>
            <span class="item-row__title">${filho.favorito ? `${ICONS.star} ` : ''}${escapeHtml(nomeTemaExibicao(filho.nome))}</span>
          </span>
          <span class="item-row__meta">${meta}</span>
        </span>
      </button>
    `;
  };

  container.innerHTML = `
    ${renderBreadcrumb(crumbs)}

    <div class="section-header">
      <span class="section-header__title">
        <span class="espaco-icon-badge" style="--badge-accent:${temaCor}" aria-hidden="true">${temaIcone.svg}</span>${tema.favorito ? `${ICONS.star} ` : ''}${escapeHtml(nomeTemaExibicao(tema.nome))}
      </span>
      <div class="section-header__actions">
        ${
          !espaco.arquivado
            ? `
          <button class="btn btn--secondary btn--sm" id="btn-nova-subpasta" type="button">${ICONS.folder} Nova pasta</button>
          <button class="btn btn--primary btn--sm" id="btn-nova-nota" type="button">${ICONS.notebook} Nova nota</button>
        `
            : ''
        }
        <button class="btn btn--secondary btn--sm" id="btn-favoritar-tema" type="button" title="Aparece na sua lista de Favoritos, separada da fila Hoje">
          ${tema.favorito ? '★ Favorito' : '☆ Favoritar'}
        </button>
        <button class="btn btn--secondary btn--sm" id="btn-editar-tema" type="button">Editar</button>
        <details class="item-menu">
          <summary aria-label="Mais opções">⋯</summary>
          <div class="item-menu__panel">
            <button id="btn-mover-tema" type="button">${ICONS.move} Mover pasta</button>
            <button id="btn-detalhes-tema" type="button">${ICONS.info} Detalhes</button>
            <button id="btn-avaliar-tema" type="button">${ICONS.dice} Avaliar notas</button>
            <button id="btn-excluir-tema" class="danger" type="button">Excluir pasta</button>
          </div>
        </details>
      </div>
    </div>

    <div id="form-editar-tema" class="card is-hidden">
      <div class="field">
        <label class="field__label" for="input-categoria-tema-editar">Categoria</label>
        <input class="input" id="input-categoria-tema-editar" type="text" value="${escapeHtml(tema.categoria)}" maxlength="80" />
        <p class="field__error" role="alert"></p>
        ${renderCategoriaChips(categoriasTema, 'input-categoria-tema-editar')}
      </div>
      <div class="field com-margem">
        <label class="field__label" for="input-nome-tema-editar">Nome da pasta</label>
        <input class="input" id="input-nome-tema-editar" type="text" value="${escapeHtml(tema.nome)}" maxlength="120" />
        <p class="field__error" role="alert"></p>
      </div>
      <div style="margin-top: var(--space-4);">
        ${renderEspacoVisualPicker({ prefix: 'editar-tema', icone: tema.icone, cor: tema.cor })}
      </div>
      <div class="form-actions com-margem">
        <button class="btn btn--primary btn--sm" id="btn-salvar-edicao-tema" type="button">Salvar</button>
        <button class="btn btn--secondary btn--sm" id="btn-cancelar-edicao-tema" type="button">Cancelar</button>
      </div>
    </div>

    ${
      espaco.arquivado
        ? `<div class="banner banner--warning"><span>A pasta "${escapeHtml(espaco.nome)}" está arquivada — não é possível criar pastas ou notas novas aqui.</span></div>`
        : ''
    }

    ${
      !espaco.arquivado
        ? `
    <div id="form-nova-subpasta" class="card content-narrow is-hidden">
      <div class="field">
        <label class="field__label" for="input-nome-subpasta">Nome da pasta</label>
        <input class="input" id="input-nome-subpasta" type="text" placeholder="Ex: Capítulo 1, Aula 2, Exercícios" maxlength="120" />
        <p class="field__error" role="alert"></p>
        <p class="field__sugestao-hint" id="hint-categoria-subpasta"></p>
      </div>
      <div style="margin-top: var(--space-4);">
        ${renderEspacoVisualPicker({ prefix: 'nova-subpasta' })}
      </div>
      <div class="form-actions com-margem">
        <button class="btn btn--primary btn--sm" id="btn-salvar-subpasta" type="button">Criar pasta</button>
        <button class="btn btn--secondary btn--sm" id="btn-cancelar-subpasta" type="button">Cancelar</button>
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
            ? 'A pasta de topo está arquivada.'
            : 'Use <strong>Nova pasta</strong> ou <strong>Nova nota</strong> no topo para começar a organizar.'
        }</p>
      </div>
    `
        : `
      ${
        filhos.length > 0
          ? `
        <div class="section-header" style="margin-top: var(--space-5);">
          <span class="section-header__title" style="font-size: var(--font-size-base);">Pastas</span>
        </div>
        ${!agruparPastas
          ? `<div class="item-list">
              ${grupos
                .flatMap((grupo) => grupo.itens)
                .map((filho) => renderLinhaFilho(filho, coresFilhos.get(filho.id) ?? temaCor))
                .join('')}
            </div>`
          : grupos
              .map((grupo) => {
                const corCategoria =
                  coresCategoria.get(chaveCategoria(grupo.categoria)) ??
                  accentVar(grupo.categoria || 'sem-categoria');
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
                ? `<button class="category-group__action" type="button" data-nova-pasta-categoria="${escapeHtml(grupo.categoria)}" title="Criar pasta já nesta categoria">+ Pasta</button>`
                : ''
            }
          </span>
        </summary>
        <div class="item-list">
          ${grupo.itens.map((filho) => renderLinhaFilho(filho, corCategoria)).join('')}
        </div>
      </details>
    `;
              })
              .join('')}
      `
          : `<p class="text-muted">Nenhuma pasta aqui ainda.</p>`
      }

      <div class="section-header" style="margin-top: var(--space-6);">
        <span class="section-header__title" style="font-size: var(--font-size-base);">Notas nesta pasta</span>
      </div>
      ${
        notas.length === 0
          ? `
        <div class="empty-state">
          <div class="empty-state__icon" aria-hidden="true">${ICONS.pen}</div>
          <div class="empty-state__title">Nenhuma nota nesta pasta ainda</div>
          <p class="empty-state__hint">${
            espaco.arquivado
              ? 'A pasta de topo está arquivada.'
              : 'Use <strong>Nova nota</strong> no topo — cada nota criada aqui já entra na fila de revisão automaticamente, a partir de amanhã.'
          }</p>
        </div>
      `
          : `
        <div class="item-list">
          ${notas
            .map(
              (n) => `
            <button class="item-row" data-open-nota="${escapeHtml(n.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${temaCor}">
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
    prefix: 'editar-tema',
    getTexto: () =>
      `${container.querySelector<HTMLInputElement>('#input-nome-tema-editar')?.value ?? ''} ${
        container.querySelector<HTMLInputElement>('#input-categoria-tema-editar')?.value ?? ''
      }`,
  });

  container.querySelector('#btn-favoritar-tema')?.addEventListener('click', async () => {
    await toggleTemaFavorito(tema.id);
    renderTemaDetail(container, temaId);
  });

  const irParaNovaNota = () => navigate(`temas/${temaId}/nova-nota`);
  container.querySelector('#btn-nova-nota')?.addEventListener('click', irParaNovaNota);
  container.querySelectorAll<HTMLButtonElement>('[data-open]').forEach((btn) => {
    btn.addEventListener('click', () => navigate(`temas/${btn.dataset.open}`));
  });
  container.querySelectorAll<HTMLButtonElement>('[data-open-nota]').forEach((btn) => {
    btn.addEventListener('click', () => navigate(`notas/${btn.dataset.openNota}`));
  });

  const formNovo = container.querySelector<HTMLElement>('#form-nova-subpasta');
  const nomeNovoInput = container.querySelector<HTMLInputElement>('#input-nome-subpasta');
  const hintCategoria = container.querySelector<HTMLElement>('#hint-categoria-subpasta');

  bindEspacoVisualPicker(container, {
    prefix: 'nova-subpasta',
    getTexto: () => `${nomeNovoInput?.value ?? ''} ${categoriaNova}`,
  });

  const atualizarHintCategoria = () => {
    if (!hintCategoria) return;
    hintCategoria.textContent = categoriaNova
      ? `Categoria: ${categoriaNova} — dá pra trocar depois em Editar.`
      : 'Sem categoria — dá pra definir depois em Editar.';
  };
  const abrirFormNova = (categoria?: string) => {
    // Sem categoria vinda do contexto, a pasta nova repete a categoria das irmãs.
    categoriaNova = (categoria ?? categoriaSugerida).trim();
    atualizarHintCategoria();
    formNovo?.classList.remove('is-hidden');
    nomeNovoInput?.focus();
    formNovo?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  container.querySelector('#btn-nova-subpasta')?.addEventListener('click', () => abrirFormNova());
  container.querySelectorAll<HTMLButtonElement>('[data-nova-pasta-categoria]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      abrirFormNova(btn.dataset.novaPastaCategoria ?? '');
    });
  });
  container.querySelector('#btn-cancelar-subpasta')?.addEventListener('click', () => {
    if (formNovo) formNovo.classList.add('is-hidden');
  });
  nomeNovoInput?.addEventListener('input', () => limparErroCampo(nomeNovoInput));
  container.querySelector('#btn-salvar-subpasta')?.addEventListener('click', async () => {
    if (!nomeNovoInput) return;
    const nome = nomeNovoInput.value.trim();
    if (
      !validarCampos([
        { input: nomeNovoInput, ok: nome.length > 0, mensagem: 'Informe um nome para a pasta.' },
      ])
    ) {
      return;
    }
    const duplicada = filhos.some((t) => t.nome.trim().toLowerCase() === nome.toLowerCase());
    if (duplicada) {
      marcarErroCampo(nomeNovoInput, 'Já existe uma pasta com esse nome aqui.');
      nomeNovoInput.focus();
      return;
    }
    const nova = await createTema(tema.espaco_id, nome, {
      categoria: categoriaNova,
      paiId: tema.id,
      visual: lerEspacoVisual(container, 'nova-subpasta'),
    });
    navigate(`temas/${nova.id}`);
  });

  container.querySelector('#btn-mover-tema')?.addEventListener('click', async () => {
    const { grupos, atualCaminho } = await listarDestinosMover(espaco.perfil_id, { temaId: tema.id });
    if (grupos.length === 0) {
      showInfo({
        title: 'Mover pasta',
        bodyHtml: '<p class="sem-margem">Não há outra pasta ativa que possa receber esta pasta.</p>',
      });
      return;
    }
    abrirModalMover({
      titulo: `Mover "${nomeTemaExibicao(tema.nome)}"`,
      subtitulo: 'As subpastas e as notas dentro dela vão junto.',
      itemNome: nomeTemaExibicao(tema.nome),
      atualCaminho,
      grupos,
      onMover: async (destino) => {
        await moverTema(tema.id, { tipo: destino.tipo, id: destino.id });
        renderTemaDetail(container, temaId);
      },
    });
  });

  container.querySelector('#btn-detalhes-tema')?.addEventListener('click', async () => {
    const tempoTotalSegundos = await getTempoTotalTema(tema.id);
    const dias = daysBetweenISODates(toLondonISODate(new Date(tema.criado_em)), toLondonISODate());

    showInfo({
      title: nomeTemaExibicao(tema.nome),
      bodyHtml: `
        <div class="stat-grid" style="margin-bottom: var(--space-3); grid-template-columns: repeat(2, 1fr);">
          <div class="stat-tile">
            <div class="stat-tile__value">${notasDaSubarvore(tema.id)}</div>
            <div class="stat-tile__label">Notas</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${filhos.length}</div>
            <div class="stat-tile__label">Pastas</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value stat-tile__value--compacto">${formatDuracao(tempoTotalSegundos)}</div>
            <div class="stat-tile__label">Tempo revisando</div>
          </div>
          <div class="stat-tile">
            <div class="stat-tile__value">${dias}</div>
            <div class="stat-tile__label">${dias === 1 ? 'Dia ativo' : 'Dias ativo'}</div>
          </div>
        </div>
        <p class="text-muted sem-margem">Criado em ${formatDateBR(tema.criado_em)}</p>
      `,
    });
  });

  container.querySelector('#btn-avaliar-tema')?.addEventListener('click', async () => {
    const ids = new Set(idsDaSubarvore(todosTemas, tema.id));
    const notasComTema = (await listNotasPorEspaco(tema.espaco_id)).filter(({ tema: t }) =>
      ids.has(t.id),
    );
    const ctx: AvaliacaoContexto = {
      perfilId: espaco.perfil_id,
      espacoId: tema.espaco_id,
      nomeContexto: nomeTemaExibicao(tema.nome),
      tipo: 'tema',
    };
    iniciarAvaliacao(container, notasComTema, ctx, () => renderTemaDetail(container, temaId));
  });

  const formEditar = container.querySelector<HTMLElement>('#form-editar-tema')!;
  const nomeEditarInput = container.querySelector<HTMLInputElement>('#input-nome-tema-editar')!;
  const categoriaEditarInput = container.querySelector<HTMLInputElement>('#input-categoria-tema-editar')!;
  container.querySelector('#btn-editar-tema')?.addEventListener('click', () => {
    formEditar.classList.remove('is-hidden');
    categoriaEditarInput.focus();
  });
  container.querySelector('#btn-cancelar-edicao-tema')?.addEventListener('click', () => {
    formEditar.classList.add('is-hidden');
  });
  for (const input of [nomeEditarInput, categoriaEditarInput]) {
    input.addEventListener('input', () => limparErroCampo(input));
  }
  container.querySelector('#btn-salvar-edicao-tema')?.addEventListener('click', async () => {
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
    const normalizado = (s: string) => s.trim().toLowerCase();
    const irmaos = todosTemas.filter(
      (t) => t.id !== tema.id && (t.pai_id ?? null) === (tema.pai_id ?? null),
    );
    const duplicado = irmaos.some(
      (t) =>
        normalizado(t.categoria) === normalizado(categoria) &&
        normalizado(t.nome) === normalizado(nome) &&
        nome.length > 0,
    );
    if (duplicado) {
      marcarErroCampo(nomeEditarInput, 'Já existe uma pasta com esse nome nesta categoria.');
      nomeEditarInput.focus();
      return;
    }
    await updateTema(tema.id, nome, categoria, lerEspacoVisual(container, 'editar-tema'));
    renderTemaDetail(container, temaId);
  });

  container.querySelector('#btn-excluir-tema')?.addEventListener('click', async () => {
    const contagem = await countTemaCascade(tema.id);
    const ok = await confirmAction({
      title: `Excluir "${nomeTemaExibicao(tema.nome)}"?`,
      message: `Isso manda pra Lixeira esta pasta com ${contagem.temas} pasta(s) no total e ${contagem.notas} nota(s).\nDá pra restaurar tudo em Configurações → Lixeira, por até 30 dias.`,
    });
    if (!ok) return;
    const destino = tema.pai_id ? `temas/${tema.pai_id}` : `espacos/${tema.espaco_id}`;
    await deleteTemaCascade(tema.id);
    navigate(destino);
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
