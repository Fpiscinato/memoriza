// Visão de uma categoria — a "pasta virtual" que o breadcrumb abre ao clicar em Cursos,
// Faixa Branca etc. No topo do perfil lista as Pastas daquela categoria; dentro de um Espaço
// ou de uma pasta lista as subpastas daquele nível com a mesma categoria. É o que faz cada
// pedaço do caminho se comportar como no Windows Explorer, em vez de ser só um rótulo.

import { getEspaco, listEspacos } from '../../db/espacos';
import { contarFilhosPorPasta, getTema, listTemas } from '../../db/temas';
import { getDB } from '../../db/schema';
import { escapeHtml } from '../../lib/dom';
import { accentVar, assignCategoriaCores, assignEspacoCores, chaveCategoria } from '../../lib/color';
import { nomeCategoriaOuSemCategoria } from '../../domain/pdf-estrutura';
import { nomeTemaExibicao } from '../../domain/rotulos';
import { navigate } from '../router';
import { renderBreadcrumb, bindBreadcrumb, type BreadcrumbCrumb } from '../components/breadcrumb';
import { crumbsCaminho } from '../caminho-crumbs';
import { categoriaIconeChave, getEspacoIcone, espacoIconeChave } from '../espaco-icons';
import { ICONS } from '../icons';
import type { Espaco, Tema } from '../../types';

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
    <p class="empty-state__hint">As pastas aparecem aqui pelo campo <strong>Categoria</strong> — dá pra ajustar em <strong>Editar</strong>.</p>
  </div>`;
}

function renderLinhaEspaco(espaco: Espaco, cor: string, pastas: number): string {
  const icone = getEspacoIcone(espacoIconeChave(espaco));
  return `
    <button class="item-row" data-open-espaco="${escapeHtml(espaco.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${cor}">
      <span class="item-row__main">
        <span class="item-row__title-row">
          <span class="espaco-icon-badge" style="--badge-accent:${cor}" aria-hidden="true">${icone.svg}</span>
          <span class="item-row__title">${escapeHtml(espaco.nome)}</span>
        </span>
        <span class="item-row__meta">${pastas} pasta(s)</span>
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

/** Categoria no nível de cima: lista as Pastas (Espaços) daquela categoria. */
export async function renderCategoriaEspacos(
  container: HTMLElement,
  perfilId: string,
  categoria: string,
): Promise<void> {
  const alvo = normalizarCategoria(categoria);
  const espacos = (await listEspacos(perfilId)).filter(
    (espaco) => !espaco.arquivado && normalizarCategoria(espaco.categoria) === alvo,
  );
  const cores = assignEspacoCores(espacos);
  const pastasPorEspaco = await contarPastasPorEspaco(espacos.map((espaco) => espaco.id));
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
        <div class="section-header__meta text-muted">${espacos.length} pasta(s) nesta categoria</div>
      </div>
    </div>

    ${
      espacos.length === 0
        ? categoriaVazia()
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
  `;

  bindBreadcrumb(container);
  bindLinhas(container);
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
  const ids = new Set(todosTemas.map((tema) => tema.id));
  // Raízes do Espaço = sem pai, ou com pai fora dele (dados antigos/importados).
  const filhos = todosTemas.filter(
    (tema) =>
      (!tema.pai_id || !ids.has(tema.pai_id)) && normalizarCategoria(tema.categoria) === alvo,
  );
  const crumbs = crumbsCaminho(espaco, todosTemas);
  const nome = nomeCategoriaOuSemCategoria(categoria);
  if (crumbs[crumbs.length - 1]?.label !== nome) crumbs.push({ label: nome });

  await renderCategoriaFilhos(container, {
    categoria,
    espaco,
    todosTemas,
    filhos,
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
  const filhos = todosTemas.filter(
    (filho) =>
      (filho.pai_id ?? null) === tema.id && normalizarCategoria(filho.categoria) === alvo,
  );
  const crumbs = crumbsCaminho(espaco, todosTemas, tema);
  const nome = nomeCategoriaOuSemCategoria(categoria);
  if (crumbs[crumbs.length - 1]?.label !== nome) crumbs.push({ label: nome });

  await renderCategoriaFilhos(container, {
    categoria,
    espaco,
    todosTemas,
    filhos,
    crumbs,
    contexto: nomeTemaExibicao(tema.nome),
  });
}

interface CategoriaFilhos {
  categoria: string;
  espaco: Espaco;
  todosTemas: Tema[];
  filhos: Tema[];
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

  container.innerHTML = `
    ${renderBreadcrumb(ctx.crumbs)}

    <div class="section-header">
      <div>
        <span class="section-header__title">
          <span class="espaco-icon-badge" style="--badge-accent:${cor}" aria-hidden="true">${icone.svg}</span>${escapeHtml(nome)}
        </span>
        <div class="section-header__meta text-muted">${ctx.filhos.length} pasta(s) nesta categoria dentro de "${escapeHtml(ctx.contexto)}"</div>
      </div>
    </div>

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
