import { createNota, deleteNota, getNota, toggleNotaFavorito, updateNota } from '../../db/notas';
import { getTema } from '../../db/temas';
import { getEspaco } from '../../db/espacos';
import { devReviewNow, stopReviewing } from '../../db/reviews';
import { getDB } from '../../db/schema';
import { escapeHtml } from '../../lib/dom';
import { renderMarkdown, TEXT_COLOR_NAMES, TEXT_COLOR_LABELS } from '../../lib/markdown';
import { navigate } from '../router';
import { confirmAction } from '../components/confirm-modal';
import { renderBreadcrumb, bindBreadcrumb } from '../components/breadcrumb';

export type NotaFormParams = { mode: 'nova'; temaId: string } | { mode: 'editar'; notaId: string };

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
        <label class="field__label" for="input-titulo">Título</label>
        <input class="input" id="input-titulo" type="text" placeholder="Ex: O que é Duration e Convexity?" maxlength="200" value="${escapeHtml(nota?.titulo ?? '')}" />
        <p class="settings-row__desc" style="margin:0;">É isso que aparece na fila "Hoje" antes de revelar a resposta — pense numa pergunta ou frase-chave, não numa citação.</p>
      </div>

      <div class="field">
        <label class="field__label" for="input-fonte">Fonte (opcional)</label>
        <input class="input" id="input-fonte" type="text" placeholder="Ex: Aula 4, slide 12 ou página 87" maxlength="200" value="${escapeHtml(nota?.fonte ?? '')}" />
        <p class="settings-row__desc" style="margin:0;">Citação/referência — só aparece depois de revelar a resposta, junto do conteúdo.</p>
      </div>

      <div>
        <div style="display:flex; align-items:center; justify-content:space-between; gap: var(--space-2); flex-wrap: wrap;">
          <div class="tabs" role="tablist">
            <button class="tabs__tab" id="tab-editar" role="tab" aria-selected="true" type="button">Editar</button>
            <button class="tabs__tab" id="tab-preview" role="tab" aria-selected="false" type="button">Preview</button>
          </div>
          <select class="input" id="input-cor-aplicar" style="max-width:150px;" title="Selecione um trecho do conteúdo antes de escolher uma cor">
            <option value="">Cor do texto…</option>
            ${TEXT_COLOR_NAMES.map((cor) => `<option value="${cor}">${escapeHtml(TEXT_COLOR_LABELS[cor])}</option>`).join('')}
          </select>
        </div>
        <p class="settings-row__desc" style="margin: var(--space-1) 0 var(--space-2);">
          Pra colorir: selecione um trecho no conteúdo e escolha uma cor — dá pra usar várias cores diferentes na mesma nota.
        </p>
        <div id="pane-editar">
          <textarea class="textarea" id="input-conteudo" placeholder="Conteúdo em markdown simples: # títulos, **negrito**, *itálico*, listas com -, [link](url)">${escapeHtml(nota?.conteudo ?? '')}</textarea>
        </div>
        <div id="pane-preview" class="markdown-preview card" style="display:none;"></div>
      </div>

      <div>
        <div class="checkbox-row">
          <input type="checkbox" id="input-pode-desatualizar" ${nota?.pode_desatualizar ? 'checked' : ''} />
          <label for="input-pode-desatualizar">Esse conteúdo pode ficar desatualizado?</label>
        </div>
        <p class="settings-row__desc" style="margin: var(--space-1) 0 0 26px;">
          Marque para taxas, leis ou números que mudam com o tempo (ex: Selic, limites de imposto).
        </p>
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

  const tabEditar = container.querySelector<HTMLButtonElement>('#tab-editar')!;
  const tabPreview = container.querySelector<HTMLButtonElement>('#tab-preview')!;
  const paneEditar = container.querySelector<HTMLElement>('#pane-editar')!;
  const panePreview = container.querySelector<HTMLElement>('#pane-preview')!;
  const conteudoInput = container.querySelector<HTMLTextAreaElement>('#input-conteudo')!;
  const tituloInput = container.querySelector<HTMLInputElement>('#input-titulo')!;

  tabEditar.addEventListener('click', () => {
    tabEditar.setAttribute('aria-selected', 'true');
    tabPreview.setAttribute('aria-selected', 'false');
    paneEditar.style.display = 'block';
    panePreview.style.display = 'none';
  });
  tabPreview.addEventListener('click', () => {
    tabEditar.setAttribute('aria-selected', 'false');
    tabPreview.setAttribute('aria-selected', 'true');
    paneEditar.style.display = 'none';
    panePreview.style.display = 'block';
    panePreview.innerHTML = renderMarkdown(conteudoInput.value) || '<p class="text-muted">(sem conteúdo)</p>';
  });

  const corSelect = container.querySelector<HTMLSelectElement>('#input-cor-aplicar')!;
  corSelect.addEventListener('change', () => {
    const cor = corSelect.value;
    corSelect.value = '';
    if (!cor) return;
    const start = conteudoInput.selectionStart ?? conteudoInput.value.length;
    const end = conteudoInput.selectionEnd ?? conteudoInput.value.length;
    const selecionado = conteudoInput.value.slice(start, end) || 'texto';
    const antes = conteudoInput.value.slice(0, start);
    const depois = conteudoInput.value.slice(end);
    const inserido = `[${selecionado}]{${cor}}`;
    conteudoInput.value = antes + inserido + depois;
    conteudoInput.focus();
    const cursor = antes.length + inserido.length;
    conteudoInput.setSelectionRange(cursor, cursor);
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
    const conteudo = conteudoInput.value.trim();
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
