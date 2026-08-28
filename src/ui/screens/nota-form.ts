import { createNota, deleteNota, getNota, listNotas, toggleNotaFavorito, updateNota } from '../../db/notas';
import { getTema } from '../../db/temas';
import { getEspaco } from '../../db/espacos';
import { devReviewNow, stopReviewing } from '../../db/reviews';
import { getDB } from '../../db/schema';
import { clearInputSugestao, escapeHtml } from '../../lib/dom';
import { renderMarkdown, htmlToStoredText, TEXT_COLOR_NAMES, TEXT_COLOR_LABELS } from '../../lib/markdown';
import { buildNotaPlainText } from '../../lib/pdf-text';
import { navigate } from '../router';
import { confirmAction } from '../components/confirm-modal';
import { renderBreadcrumb, bindBreadcrumb } from '../components/breadcrumb';
import { renderFieldHint } from '../components/field-hint';

export type NotaFormParams = { mode: 'nova'; temaId: string } | { mode: 'editar'; notaId: string };

// Mapeia cada cor de texto pra sua variável de acento — azul/vermelho/verde (índices 0/4/1
// da paleta fixa), ver as classes .text-color--* em src/styles/components.css.
const TEXT_COLOR_SWATCH: Record<(typeof TEXT_COLOR_NAMES)[number], string> = {
  azul: 'var(--accent-0)',
  vermelho: 'var(--accent-4)',
  verde: 'var(--accent-1)',
};

export async function renderNotaForm(container: HTMLElement, params: NotaFormParams): Promise<void> {
  const temaId = params.mode === 'nova' ? params.temaId : (await getNota(params.notaId))?.tema_id;
  if (!temaId) {
    container.innerHTML = `<p class="text-muted">Nota não encontrada.</p>`;
    return;
  }
  const tema = await getTema(temaId);
  if (!tema) {
    container.innerHTML = `<p class="text-muted">Tema não encontrado.</p>`;
    return;
  }
  const espaco = await getEspaco(tema.espaco_id);
  if (params.mode === 'nova' && espaco?.arquivado) {
    container.innerHTML = `
      <div class="banner banner--warning">
        <span>O espaço "${escapeHtml(espaco.nome)}" está arquivado — não é possível criar notas novas aqui.</span>
      </div>
      <button class="btn btn--secondary btn--sm" id="btn-voltar-arquivado" type="button">← Voltar</button>
    `;
    container
      .querySelector('#btn-voltar-arquivado')
      ?.addEventListener('click', () => navigate(`temas/${temaId}`));
    return;
  }

  const nota = params.mode === 'editar' ? await getNota(params.notaId) : undefined;
  const temItemPendente = nota ? await hasPendingItem(nota.id) : false;

  // Sugere Título/Fonte com base na última Nota criada neste mesmo Tema — comum ter um
  // padrão repetido (ex: "Aula 1", "Aula 2"), e o usuário só precisa ajustar o número.
  const ultimaNota = params.mode === 'nova' ? (await listNotas(temaId)).at(-1) : undefined;
  const tituloSugerido = ultimaNota?.titulo;
  const fonteSugerido = ultimaNota?.fonte;

  container.innerHTML = `
    ${renderBreadcrumb([
      { label: 'Espaços', route: 'espacos' },
      ...(espaco?.categoria ? [{ label: espaco.categoria, colorKey: espaco.categoria.toLowerCase() }] : []),
      ...(espaco ? [{ label: espaco.nome, route: `espacos/${espaco.id}`, colorKey: espaco.id }] : []),
      ...(tema.categoria ? [{ label: tema.categoria, colorKey: tema.categoria.toLowerCase() }] : []),
      { label: tema.nome, route: `temas/${tema.id}` },
      { label: params.mode === 'nova' ? 'Nova nota' : nota?.titulo || 'Editar nota' },
    ])}

    <div class="section-header">
      <span class="section-header__title">${params.mode === 'nova' ? 'Nova nota' : 'Editar nota'}</span>
      ${
        params.mode === 'editar'
          ? `
        <div class="section-header__actions">
          <button class="btn btn--secondary btn--sm" id="btn-favoritar-nota" type="button" title="Aparece na sua lista de Favoritos, separada da fila Hoje">
            ${nota?.favorito ? '★ Favorito' : '☆ Favoritar'}
          </button>
          <button class="btn btn--secondary btn--sm" id="btn-compartilhar-nota" type="button" title="Compartilhar o texto desta nota">
            Compartilhar
          </button>
          <details class="item-menu">
            <summary aria-label="Mais opções">⋯</summary>
            <div class="item-menu__panel">
              <button id="btn-excluir-nota" class="danger" type="button">Excluir nota</button>
            </div>
          </details>
        </div>
      `
          : ''
      }
    </div>

    <p class="screen-hint">Título = o que puxa sua memória · Conteúdo = a explicação completa · Fonte = de onde veio.</p>

    ${
      params.mode === 'editar' && nota && !nota.titulo_revisado
        ? `<div class="banner banner--warning"><span>Esta nota foi migrada automaticamente — revise o título abaixo (hoje ele é uma cópia da Fonte antiga).</span></div>`
        : ''
    }

    <div class="content-narrow">
    <div class="card stack">
      <div class="field">
        <label class="field__label" for="input-titulo">Título${renderFieldHint('É isso que aparece na fila "Hoje" antes de revelar a resposta — pense numa pergunta ou frase-chave, não numa citação.')}</label>
        <input class="input${tituloSugerido ? ' input--sugerido' : ''}" id="input-titulo" type="text" placeholder="Ex: O que é Duration e Convexity?" maxlength="200" value="${escapeHtml(nota?.titulo ?? tituloSugerido ?? '')}" />
        ${tituloSugerido ? `<p class="field__sugestao-hint">↻ Repetido da última nota deste tema — edite antes de salvar</p>` : ''}
      </div>

      <div class="field">
        <label class="field__label" for="input-fonte">Fonte (opcional)${renderFieldHint('Citação/referência — só aparece depois de revelar a resposta, junto do conteúdo.')}</label>
        <input class="input${fonteSugerido ? ' input--sugerido' : ''}" id="input-fonte" type="text" placeholder="Ex: Aula 4, slide 12 ou página 87" maxlength="200" value="${escapeHtml(nota?.fonte ?? fonteSugerido ?? '')}" />
        ${fonteSugerido ? `<p class="field__sugestao-hint">↻ Repetido da última nota deste tema — edite antes de salvar</p>` : ''}
      </div>

      <div class="field">
        <label class="field__label" for="input-conteudo">Conteúdo${renderFieldHint('Selecione um trecho de texto pra deixar em negrito, itálico ou colorido — igual num editor de texto comum.')}</label>
        <div class="editor-toolbar" role="toolbar" aria-label="Formatação do conteúdo">
          <button type="button" class="editor-toolbar__btn" data-cmd="bold" title="Negrito" aria-label="Negrito"><strong>N</strong></button>
          <button type="button" class="editor-toolbar__btn" data-cmd="italic" title="Itálico" aria-label="Itálico"><em>I</em></button>
          <span class="editor-toolbar__sep" aria-hidden="true"></span>
          <div class="color-picker" role="group" aria-label="Cor do texto">
            ${TEXT_COLOR_NAMES.map(
              (cor) =>
                `<button type="button" class="color-picker__swatch" data-cor="${cor}" style="--dot-color:${TEXT_COLOR_SWATCH[cor]}" title="${escapeHtml(TEXT_COLOR_LABELS[cor])}" aria-label="${escapeHtml(TEXT_COLOR_LABELS[cor])}"></button>`,
            ).join('')}
            <button type="button" class="editor-toolbar__btn" data-cor-limpar title="Remover cor" aria-label="Remover cor">✕</button>
          </div>
        </div>
        <div
          class="markdown-preview editor-conteudo"
          id="input-conteudo"
          contenteditable="true"
          spellcheck="true"
          lang="pt-BR"
          data-placeholder="Escreva aqui a explicação completa..."
        >${renderMarkdown(nota?.conteudo ?? '')}</div>
      </div>

      <div>
        <div class="checkbox-row">
          <input type="checkbox" id="input-pode-desatualizar" ${nota?.pode_desatualizar ? 'checked' : ''} />
          <label for="input-pode-desatualizar">Esse conteúdo pode ficar desatualizado?${renderFieldHint('Marque para taxas, leis ou números que mudam com o tempo (ex: Selic, limites de imposto).')}</label>
        </div>
      </div>

      <div class="field" id="wrapper-validade" style="display:${nota?.pode_desatualizar ? 'flex' : 'none'};">
        <label class="field__label" for="input-validade">Válido até</label>
        <input class="input" id="input-validade" type="date" value="${escapeHtml(nota?.validade_ate ?? '')}" style="max-width: 200px;" />
      </div>

      <div class="form-actions">
        <button class="btn btn--primary" id="btn-salvar" type="button">Salvar</button>
        <button class="btn btn--secondary" id="btn-cancelar" type="button">Cancelar</button>
      </div>
    </div>

    ${
      params.mode === 'editar' && nota
        ? `
      <div class="card stack" style="margin-top: var(--space-5);">
        <div class="settings-row__label">Revisão</div>
        ${
          temItemPendente
            ? `
          <p class="text-muted">Essa nota está na fila de revisão normalmente.</p>
          <div class="form-actions">
            <button class="btn btn--secondary btn--sm" id="btn-parar-revisar" type="button">Parar de revisar</button>
            <button class="btn btn--secondary btn--sm" id="btn-revisar-agora" type="button">Revisar agora (teste)</button>
          </div>
        `
            : `<p class="text-muted">Essa nota não está mais na fila de revisão (estágio "consulta").</p>`
        }
      </div>
    `
        : ''
    }
    </div>
  `;

  const backRoute = `temas/${temaId}`;
  bindBreadcrumb(container);
  container.querySelector('#btn-cancelar')?.addEventListener('click', () => navigate(backRoute));

  const conteudoInput = container.querySelector<HTMLElement>('#input-conteudo')!;
  const tituloInput = container.querySelector<HTMLInputElement>('#input-titulo')!;
  const fonteInput = container.querySelector<HTMLInputElement>('#input-fonte')!;

  if (tituloSugerido) tituloInput.addEventListener('input', () => clearInputSugestao(tituloInput), { once: true });
  if (fonteSugerido) fonteInput.addEventListener('input', () => clearInputSugestao(fonteInput), { once: true });

  // Enter cria um novo parágrafo (<p>) em vez do <div> que alguns navegadores usam por
  // padrão — mantém a estrutura previsível que htmlToStoredText (src/lib/markdown.ts) sabe
  // converter de volta pro texto salvo.
  conteudoInput.addEventListener('focus', () => {
    try {
      document.execCommand('defaultParagraphSeparator', false, 'p');
    } catch {
      // Sem suporte — degrada pro comportamento padrão do navegador.
    }
  });

  // Ao apagar tudo o navegador costuma deixar um <p><br></p> pra trás — sem isso o
  // placeholder (CSS :empty) não reaparece.
  conteudoInput.addEventListener('input', () => {
    if (!conteudoInput.textContent?.trim()) conteudoInput.innerHTML = '';
  });

  // Botões de formatação perdem o foco/seleção do editor ao serem clicados — preventDefault
  // no mousedown evita isso, então o comando age sobre o texto selecionado, não sobre o botão.
  container.querySelectorAll<HTMLButtonElement>('.editor-toolbar__btn[data-cmd]').forEach((btn) => {
    btn.addEventListener('mousedown', (e) => e.preventDefault());
    btn.addEventListener('click', () => {
      document.execCommand(btn.dataset.cmd!);
      conteudoInput.focus();
    });
  });

  container.querySelectorAll<HTMLButtonElement>('.color-picker__swatch').forEach((swatch) => {
    swatch.addEventListener('mousedown', (e) => e.preventDefault());
    swatch.addEventListener('click', () => {
      const cor = swatch.dataset.cor!;
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;
      const range = sel.getRangeAt(0);
      if (!conteudoInput.contains(range.commonAncestorContainer)) return;
      const span = document.createElement('span');
      span.className = `text-color text-color--${cor}`;
      span.appendChild(range.extractContents());
      range.insertNode(span);
      sel.removeAllRanges();
      const novaSelecao = document.createRange();
      novaSelecao.selectNodeContents(span);
      sel.addRange(novaSelecao);
      conteudoInput.focus();
    });
  });

  const btnLimparCor = container.querySelector<HTMLButtonElement>('[data-cor-limpar]')!;
  btnLimparCor.addEventListener('mousedown', (e) => e.preventDefault());
  btnLimparCor.addEventListener('click', () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    let node: Node | null = sel.getRangeAt(0).commonAncestorContainer;
    while (node && node !== conteudoInput) {
      if (node instanceof HTMLElement && node.classList.contains('text-color')) {
        node.replaceWith(...Array.from(node.childNodes));
        break;
      }
      node = node.parentNode;
    }
    conteudoInput.focus();
  });

  const checkboxDesatualizar = container.querySelector<HTMLInputElement>('#input-pode-desatualizar')!;
  const wrapperValidade = container.querySelector<HTMLElement>('#wrapper-validade')!;
  checkboxDesatualizar.addEventListener('change', () => {
    wrapperValidade.style.display = checkboxDesatualizar.checked ? 'flex' : 'none';
  });

  container.querySelector('#btn-salvar')?.addEventListener('click', async () => {
    const titulo = tituloInput.value.trim();
    if (!titulo) {
      tituloInput.focus();
      return;
    }
    const conteudo = htmlToStoredText(conteudoInput).trim();
    if (!conteudo) {
      conteudoInput.focus();
      return;
    }
    const input = {
      titulo,
      conteudo,
      fonte: container.querySelector<HTMLInputElement>('#input-fonte')!.value.trim(),
      pode_desatualizar: checkboxDesatualizar.checked,
      validade_ate: container.querySelector<HTMLInputElement>('#input-validade')!.value || undefined,
    };

    if (params.mode === 'nova') {
      await createNota(temaId, input);
    } else {
      await updateNota(params.notaId, input);
    }
    navigate(backRoute);
  });

  if (params.mode === 'editar' && nota) {
    container.querySelector('#btn-favoritar-nota')?.addEventListener('click', async () => {
      await toggleNotaFavorito(nota.id);
      renderNotaForm(container, params);
    });
    container.querySelector('#btn-parar-revisar')?.addEventListener('click', async () => {
      await stopReviewing(nota.id);
      renderNotaForm(container, params);
    });
    const btnCompartilhar = container.querySelector<HTMLButtonElement>('#btn-compartilhar-nota');
    btnCompartilhar?.addEventListener('click', async () => {
      const texto = buildNotaPlainText(nota);
      // No celular usa o share sheet nativo (mesmo menu de "compartilhar" de foto/PDF);
      // sem suporte (a maioria dos navegadores desktop) cai pra copiar no clipboard.
      if (navigator.share) {
        try {
          await navigator.share({ title: nota.titulo || 'Nota', text: texto });
        } catch {
          // Usuário cancelou o compartilhamento — nada a fazer.
        }
        return;
      }
      const original = btnCompartilhar.textContent;
      try {
        await navigator.clipboard.writeText(texto);
        btnCompartilhar.textContent = 'Copiado!';
      } catch {
        btnCompartilhar.textContent = 'Não foi possível copiar';
      }
      setTimeout(() => {
        btnCompartilhar.textContent = original;
      }, 1800);
    });
    container.querySelector('#btn-revisar-agora')?.addEventListener('click', async () => {
      await devReviewNow(nota.id);
      navigate('hoje');
    });
    container.querySelector('#btn-excluir-nota')?.addEventListener('click', async () => {
      const ok = await confirmAction({
        title: 'Excluir esta nota?',
        message: 'Isso vai apagar a nota e todo o seu histórico de revisões.\nNão pode ser desfeito — mas dá pra restaurar de um backup exportado, se tiver um.',
      });
      if (!ok) return;
      await deleteNota(nota.id);
      navigate(backRoute);
    });
  }
}

async function hasPendingItem(notaId: string): Promise<boolean> {
  const db = await getDB();
  const itens = await db.getAllFromIndex('itens_revisao', 'nota_id', notaId);
  return itens.some((i) => i.status === 'pendente');
}
