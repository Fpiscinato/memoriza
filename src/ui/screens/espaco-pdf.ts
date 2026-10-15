import { buildEspacoPdfData } from '../../db/pdf-data';
import { buildPlainText } from '../../lib/pdf-text';
import { escapeHtml } from '../../lib/dom';
import { renderMarkdown } from '../../lib/markdown';
import { accentVar, assignCategoriaCores, chaveCategoria, espacoCorVar } from '../../lib/color';
import { formatDateBR, toLondonISODate } from '../../lib/time';
import {
  anexoCategoria,
  anexoTema,
  montarIndice,
  nomeCategoriaOuSemCategoria,
  numerarGrupos,
} from '../../domain/pdf-estrutura';
import { nomeTemaExibicao } from '../../domain/rotulos';
import { navigate } from '../router';
import { getEspacoIcone, espacoIconeChave } from '../espaco-icons';
import { ICONS } from '../icons';

const CHAVE_INDICE = 'memoriza:pdf:indice';
const CHAVE_QUEBRA = 'memoriza:pdf:quebraCategoria';

function lerFlag(chave: string, padrao: boolean): boolean {
  const valor = localStorage.getItem(chave);
  return valor === null ? padrao : valor === '1';
}

function salvarFlag(chave: string, valor: boolean): void {
  localStorage.setItem(chave, valor ? '1' : '0');
}

function plural(n: number, singular: string): string {
  return `${n} ${singular}${n === 1 ? '' : 's'}`;
}

export async function renderEspacoPdf(container: HTMLElement, espacoId: string, categoria?: string): Promise<void> {
  const data = await buildEspacoPdfData(espacoId);
  if (!data) {
    container.innerHTML = `<p class="text-muted">Espaço não encontrado.</p>`;
    return;
  }
  const { espaco } = data;
  const grupos = categoria === undefined ? data.grupos : data.grupos.filter((g) => g.categoria === categoria);
  const textoPlano = buildPlainText(espaco, grupos);
  const espacoCor = espacoCorVar(espaco.cor, accentVar(espaco.id));
  const espacoIcone = getEspacoIcone(espacoIconeChave(espaco));

  const categorias = numerarGrupos(grupos);
  const indice = montarIndice(categorias);
  // Uma cor por Categoria, sem repetir dentro do Espaço; o Tema herda a cor da sua Categoria —
  // a cor diz "isto é do mesmo bloco", o número diz "este Tema/Nota em específico".
  const coresCategoria = assignCategoriaCores(grupos.map((g) => g.categoria));
  const corDaCategoria = (nome: string): string =>
    coresCategoria.get(chaveCategoria(nome)) ?? accentVar(chaveCategoria(nome));

  const vazio = grupos.every((g) => g.temas.length === 0);
  // Com uma Categoria só (PDF filtrado) as opções não fazem sentido — índice de 1 linha e
  // "quebra por categoria" seriam só ruído.
  const mostrarOpcoes = grupos.length > 1;
  const opcaoIndice = mostrarOpcoes && lerFlag(CHAVE_INDICE, true);
  const opcaoQuebra = mostrarOpcoes && lerFlag(CHAVE_QUEBRA, true);

  container.innerHTML = `
    <div class="pdf-toolbar no-print">
      <button class="btn btn--secondary btn--sm" data-back type="button">← Voltar</button>
      <button class="btn btn--primary btn--sm" id="btn-imprimir" type="button">Imprimir / Salvar como PDF</button>
      <button class="btn btn--secondary btn--sm" id="btn-copiar" type="button">Copiar texto</button>
      ${
        mostrarOpcoes
          ? `
        <label class="pdf-opcao"><input type="checkbox" id="pdf-opcao-indice" ${opcaoIndice ? 'checked' : ''}> Índice</label>
        <label class="pdf-opcao"><input type="checkbox" id="pdf-opcao-quebra" ${opcaoQuebra ? 'checked' : ''}> Nova página por Categoria</label>
      `
          : ''
      }
      <span class="text-muted" style="font-size: var(--font-size-sm);">
        "Imprimir" e depois "Salvar como PDF" (ou similar) gera o arquivo. "Copiar texto" é pra colar direto numa conversa, ex: WhatsApp.
      </span>
    </div>

    <article class="pdf-page" data-quebra="${opcaoQuebra ? 'categoria' : 'fluxo'}">
      <header class="pdf-capa">
        <h1>
          <span class="espaco-icon-inline" style="--badge-accent:${espacoCor}" aria-hidden="true">${espacoIcone.svg}</span>${escapeHtml(espaco.nome)}
        </h1>
        <p class="pdf-meta">
          ${
            categoria !== undefined
              ? `Categoria: ${escapeHtml(nomeCategoriaOuSemCategoria(categoria))} · `
              : ''
          }Gerado em ${formatDateBR(toLondonISODate() + 'T00:00:00Z')}
          · ${plural(grupos.length, 'categoria')} · ${plural(indice.totalTemas, 'tema')} · ${plural(indice.totalNotas, 'nota')}
        </p>
      </header>

      ${
        vazio
          ? `<p class="text-muted">${categoria !== undefined ? 'Esta categoria ainda não tem temas ou notas.' : 'Este espaço ainda não tem temas ou notas.'}</p>`
          : ''
      }

      ${
        mostrarOpcoes
          ? `
        <nav class="pdf-indice" id="pdf-indice" aria-label="Índice" ${opcaoIndice ? '' : 'hidden'}>
          <div class="pdf-indice__cabecalho">
            <span class="pdf-indice__titulo">Índice</span>
            <span class="pdf-contagem">${plural(grupos.length, 'categoria')} · ${plural(indice.totalTemas, 'tema')} · ${plural(indice.totalNotas, 'nota')}</span>
          </div>
          <ul class="pdf-indice__lista">
            ${indice.linhas
              .map(
                (linha) => `
              <li class="pdf-indice__item pdf-indice__item--${linha.nivel}">
                <button class="pdf-indice__link" type="button" data-ancora="${linha.anexo}">
                  <span class="pdf-num">${linha.numero}</span>
                  <span class="pdf-indice__nome">${escapeHtml(linha.nome)}</span>
                  <span class="pdf-contagem">${plural(linha.notas, 'nota')}</span>
                </button>
              </li>
            `,
              )
              .join('')}
          </ul>
        </nav>
      `
          : ''
      }

      ${categorias
        .map((cat, i) => {
          const corCat = corDaCategoria(cat.grupo.categoria);
          return `
        <section class="pdf-category${i === 0 ? ' pdf-category--primeira' : ''}" id="${anexoCategoria(cat)}" style="--cat-accent:${corCat}">
          <div class="pdf-category__title">
            <span class="pdf-num">${cat.numero}</span>
            <span class="color-dot" style="--dot-color:${corCat}" aria-hidden="true"></span>
            <span class="pdf-nivel">Categoria</span>
            <span class="pdf-category__nome">${escapeHtml(nomeCategoriaOuSemCategoria(cat.grupo.categoria))}</span>
            <span class="pdf-contagem">${plural(cat.temas.length, 'tema')} · ${plural(cat.totalNotas, 'nota')}</span>
          </div>
          ${cat.temas
            .map(
              (tema) => `
            <section class="pdf-tema" id="${anexoTema(tema)}" style="--tema-accent:${corCat}">
              <div class="pdf-tema__title">
                <span class="pdf-num pdf-num--tema">${tema.numero}</span>
                <span class="pdf-nivel">Tema</span>
                ${tema.temaPdf.tema.favorito ? `${ICONS.star} ` : ''}<span class="pdf-tema__nome">${escapeHtml(nomeTemaExibicao(tema.temaPdf.tema.nome))}</span>
                <span class="pdf-contagem">${plural(tema.notas.length, 'nota')}</span>
              </div>
              ${
                tema.notas.length === 0
                  ? `<p class="text-muted">Sem notas.</p>`
                  : tema.notas
                      .map(
                        (notaNumerada) => `
                <div class="pdf-nota">
                  <div class="pdf-nota__titulo">
                    <span class="pdf-num pdf-num--nota">${notaNumerada.numero}</span>
                    ${notaNumerada.notaPdf.nota.favorito ? `${ICONS.star} ` : ''}
                    <span class="pdf-nota__nome">${escapeHtml(notaNumerada.notaPdf.nota.titulo || '(sem título)')}</span>
                    ${notaNumerada.notaPdf.fraca ? `<span class="badge badge--danger">${ICONS.alert} Reforçar</span>` : ''}
                  </div>
                  ${notaNumerada.notaPdf.nota.fonte ? `<div class="pdf-nota__meta">${escapeHtml(notaNumerada.notaPdf.nota.fonte)}</div>` : ''}
                  <div class="markdown-preview">${renderMarkdown(notaNumerada.notaPdf.nota.conteudo)}</div>
                </div>
              `,
                      )
                      .join('')
              }
            </section>
          `,
            )
            .join('')}
        </section>
      `;
        })
        .join('')}
    </article>
  `;

  container.querySelector('[data-back]')?.addEventListener('click', () => navigate(`espacos/${espacoId}`));
  container.querySelector('#btn-imprimir')?.addEventListener('click', () => window.print());

  const indiceEl = container.querySelector<HTMLElement>('#pdf-indice');
  const chkIndice = container.querySelector<HTMLInputElement>('#pdf-opcao-indice');
  chkIndice?.addEventListener('change', () => {
    if (indiceEl) indiceEl.hidden = !chkIndice.checked;
    salvarFlag(CHAVE_INDICE, chkIndice.checked);
  });

  const artigo = container.querySelector<HTMLElement>('.pdf-page');
  const chkQuebra = container.querySelector<HTMLInputElement>('#pdf-opcao-quebra');
  chkQuebra?.addEventListener('change', () => {
    if (artigo) artigo.dataset.quebra = chkQuebra.checked ? 'categoria' : 'fluxo';
    salvarFlag(CHAVE_QUEBRA, chkQuebra.checked);
  });

  // Link do índice rola até o item. É <button> (não <a href="#...">) de propósito: o hash da
  // URL é o roteador do app, e um href cru tiraria o usuário da tela do PDF.
  container.querySelectorAll<HTMLElement>('[data-ancora]').forEach((el) => {
    el.addEventListener('click', () => {
      document.getElementById(el.dataset.ancora ?? '')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const btnCopiar = container.querySelector<HTMLButtonElement>('#btn-copiar');
  btnCopiar?.addEventListener('click', async () => {
    const original = btnCopiar.textContent;
    try {
      await navigator.clipboard.writeText(textoPlano);
      btnCopiar.textContent = 'Copiado!';
    } catch {
      btnCopiar.textContent = 'Não foi possível copiar';
    }
    setTimeout(() => {
      btnCopiar.textContent = original;
    }, 1800);
  });
}
