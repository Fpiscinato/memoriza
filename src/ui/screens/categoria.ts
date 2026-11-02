// Visão de uma categoria — a "pasta virtual" que o breadcrumb abre ao clicar em Cursos,
// Faixa Branca etc. No topo do perfil lista as Pastas daquela categoria; dentro de um Espaço
// ou de uma pasta lista as subpastas daquele nível com a mesma categoria. É o que faz cada
// pedaço do caminho se comportar como no Windows Explorer, em vez de ser só um rótulo.

import { createEspaco, getEspaco, listCategoriasEspacos, listEspacos } from '../../db/espacos';
import { contarFilhosPorPasta, createTema, getTema, listTemas } from '../../db/temas';
import { getDB } from '../../db/schema';
import { escapeHtml } from '../../lib/dom';
import { accentVar, assignCategoriaCores, assignEspacoCores, chaveCategoria } from '../../lib/color';
import { limparErroCampo, marcarErroCampo, validarCampos } from '../../lib/form-validacao';
import { nomeCategoriaOuSemCategoria } from '../../domain/pdf-estrutura';
import { nomeTemaExibicao } from '../../domain/rotulos';
import { ehRaizVisivel } from '../../domain/arvore';
import { navigate } from '../router';
import { renderBreadcrumb, bindBreadcrumb, type BreadcrumbCrumb } from '../components/breadcrumb';
import { crumbsCaminho } from '../caminho-crumbs';
import { renderCategoriaChips, bindCategoriaChips } from '../components/categoria-chips';
import {
  renderEspacoVisualPicker,
  bindEspacoVisualPicker,
  lerEspacoVisual,
} from '../components/espaco-visual';
import { categoriaIconeChave, getEspacoIcone, espacoIconeChave } from '../espaco-icons';
import { ICONS } from '../icons';
import type { Espaco, Tema } from '../../types';

const FORM_CATEGORIA = 'form-nova-pasta-categoria';
const NOVO_VISUAL_PREFIX = 'categoria-nova-pasta';

function normalizarCategoria(valor: string): string {
  return valor.trim().toLowerCase();
}

function corDaCategoria(categoria: string): string {
  return (
    assignCategoriaCores([categoria]).get(chaveCategoria(categoria)) ??
    accentVar(categoria || 'sem-categoria')
  );
}

function categoriaVazia(): string {
  return `<div class="empty-state">
    <div class="empty-state__icon" aria-hidden="true">${ICONS.folder}</div>
    <div class="empty-state__title">Nenhuma pasta nesta categoria</div>
    <p class="empty-state__hint">Use <strong>Nova pasta</strong> para criar a primeira já nesta categoria — ou ajuste a categoria de uma pasta em <strong>Editar</strong>.</p>
  </div>`;
}

function renderLinhaEspaco(
  espaco: Espaco,
  cor: string,
  pastas: number,
  arquivada = false,
): string {
  const icone = getEspacoIcone(espacoIconeChave(espaco));
  return `
    <button class="item-row" data-open-espaco="${escapeHtml(espaco.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${cor}">
      <span class="item-row__main">
        <span class="item-row__title-row">
          <span class="espaco-icon-badge" style="--badge-accent:${cor}" aria-hidden="true">${icone.svg}</span>
          <span class="item-row__title">${escapeHtml(espaco.nome)}</span>
        </span>
        <span class="item-row__meta">${arquivada ? 'Arquivada' : `${pastas} pasta(s)`}</span>
      </span>
    </button>
  `;
}

function renderLinhaTema(tema: Tema, cor: string, notas: number, pastas: number): string {
  const icone = getEspacoIcone(espacoIconeChave(tema));
  const meta = [`${notas} nota(s)`, pastas > 0 ? `${pastas} pasta(s)` : ''].filter(Boolean).join(' · ');
  return `
    <button class="item-row" data-open-tema="${escapeHtml(tema.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${cor}">
      <span class="item-row__main">
        <span class="item-row__title-row">
          <span class="espaco-icon-badge" style="--badge-accent:${cor}" aria-hidden="true">${icone.svg}</span>
          <span class="item-row__title">${tema.favorito ? `${ICONS.star} ` : ''}${escapeHtml(nomeTemaExibicao(tema.nome))}</span>
        </span>
        <span class="item-row__meta">${meta}</span>
      </span>
    </button>
  `;
}

function bindLinhas(container: HTMLElement): void {
  container.querySelectorAll<HTMLButtonElement>('[data-open-espaco]').forEach((btn) => {
    btn.addEventListener('click', () => navigate(`espacos/${btn.dataset.openEspaco}`));
  });
  container.querySelectorAll<HTMLButtonElement>('[data-open-tema]').forEach((btn) => {
    btn.addEventListener('click', () => navigate(`temas/${btn.dataset.openTema}`));
  });
}

/** Botão de ação que abre o formulário de criação já com a categoria desta tela. */
function renderBotaoNovaPasta(podeCriar: boolean): string {
  return podeCriar
    ? `<div class="section-header__actions">
        <button class="btn btn--secondary btn--sm" id="btn-nova-pasta-categoria" type="button">${ICONS.folder} Nova pasta</button>
      </div>`
    : '';
}

/** Formulário de criação de uma pasta dentro de um Espaço ou de outra pasta. */
function renderFormNovaPasta(contexto: string): string {
  return `
    <div id="${FORM_CATEGORIA}" class="card content-narrow is-hidden">
      <div class="field">
        <label class="field__label" for="input-nome-pasta-categoria">Nome da pasta</label>
        <input class="input" id="input-nome-pasta-categoria" type="text" placeholder="Ex: Capítulo 1, Aula 2, Exercícios" maxlength="120" />
        <p class="field__error" role="alert"></p>
        <p class="field__sugestao-hint">Categoria: ${escapeHtml(contexto)}</p>
      </div>
      <div style="margin-top: var(--space-4);">
        ${renderEspacoVisualPicker({ prefix: NOVO_VISUAL_PREFIX })}
      </div>
      <div class="form-actions com-margem">
        <button class="btn btn--primary btn--sm" id="btn-salvar-pasta-categoria" type="button">Criar pasta</button>
        <button class="btn btn--secondary btn--sm" id="btn-cancelar-pasta-categoria" type="button">Cancelar</button>
      </div>
    </div>
  `;
}

/** Categoria no nível de cima: lista as Pastas (Espaços) daquela categoria. */
export async function renderCategoriaEspacos(
  container: HTMLElement,
  perfilId: string,
  categoria: string,
): Promise<void> {
  const alvo = normalizarCategoria(categoria);
  const todosEspacos = await listEspacos(perfilId);
  const daCategoria = todosEspacos.filter(
    (espaco) => normalizarCategoria(espaco.categoria) === alvo,
  );
  const espacos = daCategoria.filter((espaco) => !espaco.arquivado);
  const arquivados = daCategoria.filter((espaco) => espaco.arquivado);
  const cores = assignEspacoCores(daCategoria);
  const pastasPorEspaco = await contarPastasPorEspaco(daCategoria.map((espaco) => espaco.id));
  const categoriasConhecidas = await listCategoriasEspacos(perfilId);
  const cor = corDaCategoria(categoria);
  const icone = getEspacoIcone(categoriaIconeChave(categoria));
  const nome = nomeCategoriaOuSemCategoria(categoria);

  container.innerHTML = `
    ${renderBreadcrumb([
      { label: 'Pastas', route: 'espacos' },
      { label: nome },
    ])}

    <div class="section-header">
      <div>
        <span class="section-header__title">
          <span class="espaco-icon-badge" style="--badge-accent:${cor}" aria-hidden="true">${icone.svg}</span>${escapeHtml(nome)}
        </span>
        <div class="section-header__meta text-muted">Categoria · ${espacos.length} pasta(s) ativa(s)${
          arquivados.length > 0 ? ` · ${arquivados.length} arquivada(s)` : ''
        }</div>
      </div>
      ${renderBotaoNovaPasta(true)}
    </div>

    <p class="screen-hint">Estas são as pastas com esta categoria. Toque numa pasta para abrir — ou crie outra já nesta categoria.</p>

    <div id="${FORM_CATEGORIA}" class="card is-hidden">
      <div class="field">
        <label class="field__label" for="input-categoria-cat">Categoria</label>
        <input class="input" id="input-categoria-cat" type="text" value="${escapeHtml(categoria)}" maxlength="80" />
        <p class="field__error" role="alert"></p>
        ${renderCategoriaChips(categoriasConhecidas, 'input-categoria-cat')}
      </div>
      <div class="field com-margem">
        <label class="field__label" for="input-nome-cat">Nome da pasta</label>
        <input class="input" id="input-nome-cat" type="text" placeholder="Ex: A coragem de ser imperfeito" maxlength="120" />
        <p class="field__error" role="alert"></p>
      </div>
      <div style="margin-top: var(--space-4);">
        ${renderEspacoVisualPicker({ prefix: NOVO_VISUAL_PREFIX })}
      </div>
      <div class="form-actions com-margem">
        <button class="btn btn--primary btn--sm" id="btn-salvar-pasta-categoria" type="button">Criar pasta</button>
        <button class="btn btn--secondary btn--sm" id="btn-cancelar-pasta-categoria" type="button">Cancelar</button>
      </div>
    </div>

    ${
      espacos.length === 0 && arquivados.length === 0
        ? categoriaVazia()
        : espacos.length === 0
          ? ''
          : `<div class="item-list">
              ${espacos
                .map((espaco) =>
                  renderLinhaEspaco(
                    espaco,
                    cores.get(espaco.id) ?? accentVar(espaco.id),
                    pastasPorEspaco.get(espaco.id) ?? 0,
                  ),
                )
                .join('')}
            </div>`
    }

    ${
      arquivados.length > 0
        ? `<details style="margin-top: var(--space-6);">
            <summary class="text-muted" style="cursor:pointer;">Arquivadas (${arquivados.length})</summary>
            <div class="item-list com-margem">
              ${arquivados
                .map((espaco) =>
                  renderLinhaEspaco(
                    espaco,
                    cores.get(espaco.id) ?? accentVar(espaco.id),
                    pastasPorEspaco.get(espaco.id) ?? 0,
                    true,
                  ),
                )
                .join('')}
            </div>
          </details>`
        : ''
    }
  `;

  bindBreadcrumb(container);
  bindLinhas(container);

  const form = container.querySelector<HTMLElement>(`#${FORM_CATEGORIA}`)!;
  const categoriaInput = container.querySelector<HTMLInputElement>('#input-categoria-cat')!;
  const nomeInput = container.querySelector<HTMLInputElement>('#input-nome-cat')!;

  bindCategoriaChips(container);
  bindEspacoVisualPicker(container, {
    prefix: NOVO_VISUAL_PREFIX,
    getTexto: () => `${nomeInput.value} ${categoriaInput.value}`,
  });

  container.querySelector('#btn-nova-pasta-categoria')?.addEventListener('click', () => {
    form.classList.remove('is-hidden');
    nomeInput.focus();
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  container.querySelector('#btn-cancelar-pasta-categoria')?.addEventListener('click', () => {
    form.classList.add('is-hidden');
  });
  for (const input of [categoriaInput, nomeInput]) {
    input.addEventListener('input', () => limparErroCampo(input));
  }
  container.querySelector('#btn-salvar-pasta-categoria')?.addEventListener('click', async () => {
    const nome = nomeInput.value.trim();
    const categoriaNova = categoriaInput.value.trim();
    if (
      !validarCampos([
        { input: categoriaInput, ok: categoriaNova.length > 0, mensagem: 'Informe uma categoria para a pasta.' },
        { input: nomeInput, ok: nome.length > 0, mensagem: 'Informe um nome para a pasta.' },
      ])
    ) {
      return;
    }
    if (todosEspacos.some((e) => e.nome.trim().toLowerCase() === nome.toLowerCase())) {
      marcarErroCampo(nomeInput, 'Já existe uma pasta com esse nome.');
      nomeInput.focus();
      return;
    }
    const nova = await createEspaco(
      perfilId,
      nome,
      categoriaNova,
      lerEspacoVisual(container, NOVO_VISUAL_PREFIX),
    );
    navigate(`espacos/${nova.id}`);
  });
}

/** Categoria dentro de um Espaço: lista as subpastas daquele nível com a mesma categoria. */
export async function renderCategoriaEspaco(
  container: HTMLElement,
  espacoId: string,
  categoria: string,
): Promise<void> {
  const espaco = await getEspaco(espacoId);
  if (!espaco) {
    container.innerHTML = `<p class="text-muted">Pasta não encontrada.</p>`;
    return;
  }

  const alvo = normalizarCategoria(categoria);
  const todosTemas = await listTemas(espaco.id);
  // Raízes do Espaço = sem pai, ou com pai fora dele (dados antigos/importados).
  const raizes = todosTemas.filter((tema) => ehRaizVisivel(todosTemas, tema));
  const filhos = raizes.filter((tema) => normalizarCategoria(tema.categoria) === alvo);
  const crumbs = crumbsCaminho(espaco, todosTemas);
  const nome = nomeCategoriaOuSemCategoria(categoria);
  if (crumbs[crumbs.length - 1]?.label !== nome) crumbs.push({ label: nome });

  await renderCategoriaFilhos(container, {
    categoria,
    espaco,
    todosTemas,
    filhos,
    irmaos: raizes,
    paiId: null,
    crumbs,
    contexto: espaco.nome,
  });
}

/** Categoria dentro de uma pasta: lista as subpastas daquele nível com a mesma categoria. */
export async function renderCategoriaTema(
  container: HTMLElement,
  temaId: string,
  categoria: string,
): Promise<void> {
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

  const alvo = normalizarCategoria(categoria);
  const todosTemas = await listTemas(espaco.id);
  const irmaos = todosTemas.filter((filho) => (filho.pai_id ?? null) === tema.id);
  const filhos = irmaos.filter((filho) => normalizarCategoria(filho.categoria) === alvo);
  const crumbs = crumbsCaminho(espaco, todosTemas, tema);
  const nome = nomeCategoriaOuSemCategoria(categoria);
  if (crumbs[crumbs.length - 1]?.label !== nome) crumbs.push({ label: nome });

  await renderCategoriaFilhos(container, {
    categoria,
    espaco,
    todosTemas,
    filhos,
    irmaos,
    paiId: tema.id,
    crumbs,
    contexto: nomeTemaExibicao(tema.nome),
  });
}

interface CategoriaFilhos {
  categoria: string;
  espaco: Espaco;
  todosTemas: Tema[];
  filhos: Tema[];
  /** Pastas no mesmo nível, de qualquer categoria — base da checagem de nome repetido. */
  irmaos: Tema[];
  /** Pasta pai das novas pastas (null = direto no Espaço). */
  paiId: string | null;
  crumbs: BreadcrumbCrumb[];
  contexto: string;
}

async function renderCategoriaFilhos(
  container: HTMLElement,
  ctx: CategoriaFilhos,
): Promise<void> {
  const cores = assignEspacoCores(ctx.filhos);
  const pastasPorTema = contarFilhosPorPasta(ctx.todosTemas);
  const notasPorTema = await contarNotasPorTema(ctx.filhos.map((filho) => filho.id));
  const cor = corDaCategoria(ctx.categoria);
  const icone = getEspacoIcone(categoriaIconeChave(ctx.categoria));
  const nome = nomeCategoriaOuSemCategoria(ctx.categoria);
  const podeCriar = !ctx.espaco.arquivado;

  container.innerHTML = `
    ${renderBreadcrumb(ctx.crumbs)}

    <div class="section-header">
      <div>
        <span class="section-header__title">
          <span class="espaco-icon-badge" style="--badge-accent:${cor}" aria-hidden="true">${icone.svg}</span>${escapeHtml(nome)}
        </span>
        <div class="section-header__meta text-muted">Categoria dentro de "${escapeHtml(ctx.contexto)}" · ${ctx.filhos.length} pasta(s) aqui</div>
      </div>
      ${renderBotaoNovaPasta(podeCriar)}
    </div>

    ${
      podeCriar
        ? `<p class="screen-hint">Estas são as pastas com esta categoria neste nível. Toque numa pasta para abrir — ou crie outra já nesta categoria.</p>`
        : ''
    }

    ${
      ctx.espaco.arquivado
        ? `<div class="banner banner--warning"><span>A pasta "${escapeHtml(ctx.espaco.nome)}" está arquivada — não é possível criar pastas novas nela.</span></div>`
        : ''
    }

    ${podeCriar ? renderFormNovaPasta(nome) : ''}

    ${
      ctx.filhos.length === 0
        ? categoriaVazia()
        : `<div class="item-list">
            ${ctx.filhos
              .map((filho) =>
                renderLinhaTema(
                  filho,
                  cores.get(filho.id) ?? accentVar(filho.id),
                  notasPorTema.get(filho.id) ?? 0,
                  pastasPorTema.get(filho.id) ?? 0,
                ),
              )
              .join('')}
          </div>`
    }
  `;

  bindBreadcrumb(container);
  bindLinhas(container);

  const form = container.querySelector<HTMLElement>(`#${FORM_CATEGORIA}`);
  const nomeInput = container.querySelector<HTMLInputElement>('#input-nome-pasta-categoria');
  if (!form || !nomeInput || !podeCriar) return;

  bindEspacoVisualPicker(container, {
    prefix: NOVO_VISUAL_PREFIX,
    getTexto: () => `${nomeInput.value} ${ctx.categoria}`,
  });

  container.querySelector('#btn-nova-pasta-categoria')?.addEventListener('click', () => {
    form.classList.remove('is-hidden');
    nomeInput.focus();
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  container.querySelector('#btn-cancelar-pasta-categoria')?.addEventListener('click', () => {
    form.classList.add('is-hidden');
  });
  nomeInput.addEventListener('input', () => limparErroCampo(nomeInput));
  container.querySelector('#btn-salvar-pasta-categoria')?.addEventListener('click', async () => {
    const nomeNovo = nomeInput.value.trim();
    if (
      !validarCampos([
        { input: nomeInput, ok: nomeNovo.length > 0, mensagem: 'Informe um nome para a pasta.' },
      ])
    ) {
      return;
    }
    const normalizado = (valor: string) => valor.trim().toLowerCase();
    if (ctx.irmaos.some((tema) => normalizado(tema.nome) === normalizado(nomeNovo))) {
      marcarErroCampo(nomeInput, 'Já existe uma pasta com esse nome aqui.');
      nomeInput.focus();
      return;
    }
    const nova = await createTema(ctx.espaco.id, nomeNovo, {
      categoria: ctx.categoria,
      paiId: ctx.paiId,
      visual: lerEspacoVisual(container, NOVO_VISUAL_PREFIX),
    });
    navigate(`temas/${nova.id}`);
  });
}

async function contarPastasPorEspaco(espacoIds: string[]): Promise<Map<string, number>> {
  const db = await getDB();
  const resultados = await Promise.all(
    espacoIds.map((id) => db.getAllFromIndex('temas', 'espaco_id', id)),
  );
  const counts = new Map<string, number>();
  espacoIds.forEach((id, i) => {
    counts.set(id, resultados[i].filter((tema) => !tema.excluido && !tema.oculta).length);
  });
  return counts;
}

async function contarNotasPorTema(temaIds: string[]): Promise<Map<string, number>> {
  const db = await getDB();
  const resultados = await Promise.all(
    temaIds.map((id) => db.getAllFromIndex('notas', 'tema_id', id)),
  );
  const counts = new Map<string, number>();
  temaIds.forEach((id, i) => {
    counts.set(id, resultados[i].filter((nota) => !nota.excluido).length);
  });
  return counts;
}
