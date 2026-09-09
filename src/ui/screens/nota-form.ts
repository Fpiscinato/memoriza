import { createNota, deleteNota, getNota, listNotas, toggleNotaFavorito, updateNota } from '../../db/notas';
import { getTema } from '../../db/temas';
import { getEspaco } from '../../db/espacos';
import { stopReviewing } from '../../db/reviews';
import { getDB } from '../../db/schema';
import { clearInputSugestao, escapeHtml } from '../../lib/dom';
import { renderMarkdown, htmlToStoredText, TEXT_COLOR_NAMES, TEXT_COLOR_LABELS } from '../../lib/markdown';
import { buildNotaPlainText } from '../../lib/pdf-text';
import { formatDateBR } from '../../lib/time';
import { navigate } from '../router';
import { confirmAction } from '../components/confirm-modal';
import { renderBreadcrumb, bindBreadcrumb } from '../components/breadcrumb';
import { renderFieldHint } from '../components/field-hint';
import { clearFormDirty, setFormDirty, setFormDirtyPrompt, canNavigateAway } from '../../lib/form-guard';

export type NotaFormParams = { mode: 'nova'; temaId: string } | { mode: 'editar'; notaId: string };

// Mapeia cada cor de texto pra sua variável de acento — azul/vermelho/verde/rosa (índices
// 0/4/1/6 da paleta fixa), ver as classes .text-color--* em src/styles/components.css.
const TEXT_COLOR_SWATCH: Record<(typeof TEXT_COLOR_NAMES)[number], string> = {
  azul: 'var(--accent-0)',
  vermelho: 'var(--accent-4)',
  verde: 'var(--accent-1)',
  rosa: 'var(--accent-6)',
};

// Tira qualquer .text-color de dentro de um fragmento antes de envolvê-lo num novo — ver uso
// nos handlers de cor abaixo. Sem isso, aplicar cor sobre texto já colorido aninha spans, e
// o par renderMarkdown/htmlToStoredText (src/lib/markdown.ts) não sabe serializar aninhamento
// de forma reversível.
function unwrapColorSpans(root: DocumentFragment | HTMLElement): void {
  root.querySelectorAll('.text-color').forEach((el) => el.replaceWith(...Array.from(el.childNodes)));
}

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
      <div>
        <span class="section-header__title">${params.mode === 'nova' ? 'Nova nota' : 'Editar nota'}</span>
        ${
          params.mode === 'editar' && nota
            ? `<div class="section-header__meta text-muted">Criada em ${formatDateBR(nota.criado_em)}${nota.atualizado_em !== nota.criado_em ? ` · Editada em ${formatDateBR(nota.atualizado_em)}` : ''}</div>`
            : ''
        }
      </div>
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
        <input class="input${tituloSugerido ? ' input--sugerido' : ''}" id="input-titulo" type="text" placeholder="Ex: O que é Duration e Convexity?" maxlength="200" value="${escapeHtml(nota?.titulo ?? tituloSugerido ?? '')}" lang="pt-BR" spellcheck="true" autocorrect="on" autocapitalize="sentences" />
        <p class="field__error" role="alert"></p>
        ${tituloSugerido ? `<p class="field__sugestao-hint">↻ Repetido da última nota deste tema — edite antes de salvar</p>` : ''}
      </div>

      <div class="field">
        <label class="field__label" for="input-fonte">Fonte (opcional)${renderFieldHint('Citação/referência — só aparece depois de revelar a resposta, junto do conteúdo.')}</label>
        <input class="input${fonteSugerido ? ' input--sugerido' : ''}" id="input-fonte" type="text" placeholder="Ex: Aula 4, slide 12 ou página 87" maxlength="200" value="${escapeHtml(nota?.fonte ?? fonteSugerido ?? '')}" lang="pt-BR" spellcheck="true" autocorrect="on" autocapitalize="sentences" />
        ${fonteSugerido ? `<p class="field__sugestao-hint">↻ Repetido da última nota deste tema — edite antes de salvar</p>` : ''}
      </div>

      <div class="field">
        <label class="field__label" for="input-conteudo">Conteúdo${renderFieldHint('Selecione um trecho de texto pra deixar em negrito, itálico ou colorido — igual num editor de texto comum. Enter simples só quebra a linha; Enter duas vezes cria um novo parágrafo. Numa lista, Tab indenta o item (Shift+Tab volta).')}</label>
        <div class="editor-toolbar" role="toolbar" aria-label="Formatação do conteúdo">
          <button type="button" class="editor-toolbar__btn" data-cmd="bold" title="Negrito" aria-label="Negrito"><strong>N</strong></button>
          <button type="button" class="editor-toolbar__btn" data-cmd="italic" title="Itálico" aria-label="Itálico"><em>I</em></button>
          <button type="button" class="editor-toolbar__btn" data-cmd="insertUnorderedList" title="Lista com marcadores (Tab indenta, Shift+Tab volta)" aria-label="Lista com marcadores">☰</button>
          <span class="editor-toolbar__sep" aria-hidden="true"></span>
          <button type="button" class="editor-toolbar__btn" data-cmd="undo" title="Desfazer" aria-label="Desfazer">↩</button>
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
          autocorrect="on"
          autocapitalize="sentences"
          lang="pt-BR"
          data-placeholder="Escreva aqui a explicação completa..."
        >${nota?.conteudo ? renderMarkdown(nota.conteudo) : '<p><br></p>'}</div>
        <p class="field__error" role="alert"></p>
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
  container.querySelector('#btn-cancelar')?.addEventListener('click', () => {
    if (!canNavigateAway()) return;
    clearFormDirty();
    navigate(backRoute);
  });

  const conteudoInput = container.querySelector<HTMLElement>('#input-conteudo')!;
  const tituloInput = container.querySelector<HTMLInputElement>('#input-titulo')!;
  const fonteInput = container.querySelector<HTMLInputElement>('#input-fonte')!;

  // Marca o formulário como "sujado" quando o usuário edita qualquer campo.
  const onDirty = () => setFormDirty(true);
  tituloInput.addEventListener('input', onDirty);
  fonteInput.addEventListener('input', onDirty);
  conteudoInput.addEventListener('input', onDirty);
  setFormDirtyPrompt(() => window.confirm('Há alterações não salvas nesta nota. Deseja sair mesmo assim?'));

  if (tituloSugerido) tituloInput.addEventListener('input', () => clearInputSugestao(tituloInput), { once: true });
  if (fonteSugerido) fonteInput.addEventListener('input', () => clearInputSugestao(fonteInput), { once: true });

  // Mantém <p> como bloco de parágrafo (em vez do <div> que alguns navegadores usam por
  // padrão) — necessário pro Enter duplo abaixo, que usa execCommand('insertParagraph').
  conteudoInput.addEventListener('focus', () => {
    try {
      document.execCommand('defaultParagraphSeparator', false, 'p');
    } catch {
      // Sem suporte — degrada pro comportamento padrão do navegador.
    }
  });

  // Sobe os ancestrais a partir do cursor até `conteudoInput` procurando uma tag — usado pra
  // saber se o cursor está dentro de um item de lista (<li>), onde Enter/Tab têm significado
  // próprio (novo item / indentar) e não devem ser tratados como no texto normal.
  function cursorDentroDe(tag: string): boolean {
    let node: Node | null = window.getSelection()?.getRangeAt(0)?.commonAncestorContainer ?? null;
    while (node && node !== conteudoInput) {
      if (node instanceof HTMLElement && node.tagName === tag) return true;
      node = node.parentNode;
    }
    return false;
  }

  // execCommand('insertUnorderedList') deixa o cursor no INÍCIO do item de lista recém-criado
  // (não no fim, como seria intuitivo quando já havia texto na linha) — sem isso, continuar
  // digitando depois de clicar "Lista" insere o texto novo ANTES do texto que já existia ali,
  // não depois. Move o cursor pro fim do <li> mais próximo, se houver.
  function moverCursorParaFimDoItem(): void {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    let node: Node | null = sel.getRangeAt(0).commonAncestorContainer;
    while (node && node !== conteudoInput) {
      if (node instanceof HTMLElement && node.tagName === 'LI') {
        const range = document.createRange();
        range.selectNodeContents(node);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
        return;
      }
      node = node.parentNode;
    }
  }

  // O navegador as vezes cria um <ul> DENTRO do <p> atual em vez de substituí-lo (ex: ao
  // clicar "Lista" com o cursor num parágrafo vazio) — <ul> dentro de <p> é uma estrutura que
  // htmlToStoredText não esperava (perderia os itens, tratando tudo como texto corrido).
  // Desembrulha qualquer <p> que tenha acabado com uma lista dentro.
  function desembrulharListaDeParagrafo(): void {
    conteudoInput.querySelectorAll('p').forEach((p) => {
      if (p.querySelector('ul')) p.replaceWith(...Array.from(p.childNodes));
    });
  }

  // Insere um <br> na posição do cursor e deixa o cursor DEPOIS dele — um <br> no fim de um
  // bloco é tratado pelo navegador como "marcador de linha vazia", sem posição de digitação
  // depois dele (o cursor volta pra ANTES), por isso a "âncora": um caractere invisível
  // (zero-width space) logo após o <br>, onde o cursor de fato fica. Sem isso, digitar depois
  // de um Enter simples inseria o texto ANTES da quebra de linha, não depois.
  // htmlToStoredText (src/lib/markdown.ts) descarta esse caractere na hora de salvar.
  function inserirQuebraDeLinha(): { br: HTMLBRElement; ancora: Text } {
    const sel = window.getSelection()!;
    const range = sel.getRangeAt(0);
    range.deleteContents();
    const br = document.createElement('br');
    range.insertNode(br);
    const ancora = document.createTextNode('​');
    br.after(ancora);
    const novoRange = document.createRange();
    novoRange.setStart(ancora, 1);
    novoRange.collapse(true);
    sel.removeAllRanges();
    sel.addRange(novoRange);
    return { br, ancora };
  }

  // Remove a "âncora" (zero-width space) de uma quebra de linha pendente, mantendo o <br> —
  // a âncora sozinha (mesmo sem nenhum texto digitado depois dela) faz o
  // execCommand('insertUnorderedList') se confundir e criar uma lista NOVA e vazia,
  // desconectada do parágrafo atual (cujo texto sobra solto fora de qualquer <p>). Chamado
  // antes de qualquer comando da toolbar que não seja "continuar digitando".
  function assentarQuebraPendente(): void {
    if (!ultimaQuebraSimples) return;
    const { br, ancora } = ultimaQuebraSimples;
    ultimaQuebraSimples = null;
    if (!document.contains(ancora)) return;
    const parent = ancora.parentNode;
    if (!parent) return;
    const idx = Array.from(parent.childNodes).indexOf(ancora);
    ancora.remove();
    const sel = window.getSelection();
    if (!sel || !document.contains(br)) return;
    const range = document.createRange();
    range.setStart(parent, idx);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  // Enter simples = só quebra a linha (<br>, mesmo espaçamento de sempre); Enter de novo
  // sem digitar nada no meio = vira parágrafo de verdade (mais espaço), como em qualquer
  // editor de texto comum. Antes, TODO Enter criava um novo <p> (margem grande sempre) — e
  // se o texto digitado antes do primeiro Enter nunca tivesse ficado dentro de nenhum <p>
  // (comportamento normal de contenteditable vazio), esse primeiro trecho ficava sem a
  // margem que os parágrafos seguintes ganhavam, dando a impressão de espaçamento
  // "diferente" a cada Enter. Dentro de uma lista, não interfere — Enter cria um novo item
  // (comportamento nativo do navegador).
  let ultimaQuebraSimples: { br: HTMLBRElement; ancora: Text } | null = null;
  conteudoInput.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' || e.shiftKey || e.ctrlKey || e.metaKey || e.altKey || cursorDentroDe('LI')) {
      ultimaQuebraSimples = null;
      return;
    }
    e.preventDefault();
    if (ultimaQuebraSimples && document.contains(ultimaQuebraSimples.br)) {
      ultimaQuebraSimples.ancora.remove();
      ultimaQuebraSimples.br.remove();
      document.execCommand('insertParagraph');
      ultimaQuebraSimples = null;
    } else {
      ultimaQuebraSimples = inserirQuebraDeLinha();
    }
  });
  conteudoInput.addEventListener('mousedown', () => {
    ultimaQuebraSimples = null;
  });

  // Tab só faz algo especial dentro de uma lista (indenta/volta o item, ver botão "Lista"
  // abaixo) — fora de lista, deixa o navegador mover o foco pro próximo campo normalmente.
  conteudoInput.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !cursorDentroDe('LI')) return;
    e.preventDefault();
    assentarQuebraPendente();
    document.execCommand(e.shiftKey ? 'outdent' : 'indent');
    desembrulharListaDeParagrafo();
  });

  // Editor sempre precisa ter pelo menos um <p> pra digitar dentro — um contenteditable
  // completamente vazio deixa o próximo caractere digitado "solto" (sem <p> em volta), o
  // mesmo problema de espaçamento inconsistente descrito acima. Placeholder usa uma classe
  // (não mais :empty) porque com isso o editor nunca fica de fato vazio no sentido do DOM.
  function atualizarPlaceholder(): void {
    conteudoInput.classList.toggle('is-empty', !conteudoInput.textContent?.trim());
  }
  conteudoInput.addEventListener('input', () => {
    if (conteudoInput.childNodes.length === 0) {
      conteudoInput.innerHTML = '<p><br></p>';
      const p = conteudoInput.firstChild as HTMLElement;
      const range = document.createRange();
      range.setStart(p, 0);
      range.collapse(true);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
    atualizarPlaceholder();
  });
  atualizarPlaceholder();

  // Botões de formatação perdem o foco/seleção do editor ao serem clicados — preventDefault
  // no mousedown evita isso, então o comando age sobre o texto selecionado, não sobre o botão.
  container.querySelectorAll<HTMLButtonElement>('.editor-toolbar__btn[data-cmd]').forEach((btn) => {
    btn.addEventListener('mousedown', (e) => e.preventDefault());
    btn.addEventListener('click', () => {
      assentarQuebraPendente();
      document.execCommand(btn.dataset.cmd!);
      if (btn.dataset.cmd === 'insertUnorderedList') {
        desembrulharListaDeParagrafo();
        moverCursorParaFimDoItem();
      }
      conteudoInput.focus();
    });
  });

  container.querySelectorAll<HTMLButtonElement>('.color-picker__swatch').forEach((swatch) => {
    swatch.addEventListener('mousedown', (e) => e.preventDefault());
    swatch.addEventListener('click', () => {
      assentarQuebraPendente();
      const cor = swatch.dataset.cor!;
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;
      const range = sel.getRangeAt(0);
      if (!conteudoInput.contains(range.commonAncestorContainer)) return;
      const fragment = range.extractContents();
      // Se a seleção já contém (ou está dentro de) um trecho colorido, remove essa cor antes
      // de aplicar a nova — sem isso o span novo fica ANINHADO no antigo, e a serialização
      // pra texto puro (htmlToStoredText) gera "[[texto]{azul} resto]{vermelho}", que na
      // hora de exibir de novo (ex: na revisão) sobra colchete/chave solto sem cor nenhuma.
      unwrapColorSpans(fragment);
      const span = document.createElement('span');
      span.className = `text-color text-color--${cor}`;
      span.appendChild(fragment);
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
    assentarQuebraPendente();
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    if (!conteudoInput.contains(range.commonAncestorContainer)) return;
    if (range.collapsed) {
      // Sem texto selecionado (só o cursor) — remove a cor do span onde o cursor está, se houver.
      let node: Node | null = range.commonAncestorContainer;
      while (node && node !== conteudoInput) {
        if (node instanceof HTMLElement && node.classList.contains('text-color')) {
          node.replaceWith(...Array.from(node.childNodes));
          break;
        }
        node = node.parentNode;
      }
    } else {
      const fragment = range.extractContents();
      unwrapColorSpans(fragment);
      range.insertNode(fragment);
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
    const conteudo = htmlToStoredText(conteudoInput).trim();
    let primeiroErro: HTMLElement | null = null;

    const marcarErro = (el: HTMLElement, msg: string) => {
      el.classList.add('input--error');
      el.setAttribute('aria-invalid', 'true');
      const hint = el.closest('.field')?.querySelector<HTMLElement>('.field__error');
      if (hint) {
        hint.textContent = msg;
        hint.style.display = 'block';
      }
      if (!primeiroErro) primeiroErro = el;
    };
    const limparErro = (el: HTMLElement) => {
      el.classList.remove('input--error');
      el.removeAttribute('aria-invalid');
    };

    if (!titulo) marcarErro(tituloInput, 'Informe um título para a nota.');
    if (!conteudo) marcarErro(conteudoInput, 'Informe o conteúdo da nota.');
    if (primeiroErro) {
      (primeiroErro as HTMLElement).focus();
      return;
    }
    limparErro(tituloInput);
    limparErro(conteudoInput);

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
    clearFormDirty();
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
