import { countTemaCascade, deleteTemaCascade, getTema, listTemas, toggleTemaFavorito, updateTema } from '../../db/temas';
import { getEspaco } from '../../db/espacos';
import { listNotas } from '../../db/notas';
import { getTempoTotalTema } from '../../db/dashboard';
import { escapeHtml } from '../../lib/dom';
import { accentVar } from '../../lib/color';
import { distinctCategorias } from '../../lib/group';
import { daysBetweenISODates, formatDateBR, formatDuracao, toLondonISODate } from '../../lib/time';
import { navigate } from '../router';
import { confirmAction } from '../components/confirm-modal';
import { showInfo } from '../components/info-modal';
import { iniciarAvaliacao, type AvaliacaoContexto } from '../components/avaliacao-aleatoria';
import { renderBreadcrumb, bindBreadcrumb } from '../components/breadcrumb';
import { renderCategoriaChips, bindCategoriaChips } from '../components/categoria-chips';
import { nomeTemaExibicao } from '../../domain/rotulos';
import { limparErroCampo, marcarErroCampo, validarCampos } from '../../lib/form-validacao';
import { ICONS } from '../icons';

export async function renderTemaDetail(container: HTMLElement, temaId: string): Promise<void> {
  const tema = await getTema(temaId);
  if (!tema) {
    container.innerHTML = `<p class="text-muted">Tema não encontrado.</p>`;
    return;
  }
  const espaco = await getEspaco(tema.espaco_id);
  const notas = await listNotas(temaId);
  // Escopo é só o Espaço deste Tema, não o perfil inteiro — sugestão precisa ser relevante
  // pro "curso" atual.
  const temasDoEspaco = espaco ? await listTemas(espaco.id) : [];
  const categoriasTema = distinctCategorias(temasDoEspaco.map((t) => t.categoria));
  // Cai pro próprio id do Tema quando não há categoria (nem dele, nem do Espaço) — cair pro
  // id do Espaço fazia TODOS os temas sem categoria dentro do mesmo Espaço saírem com a
  // MESMA cor (a do próprio Espaço), impossível de diferenciar um do outro.
  const temaAccentKey = tema.categoria
    ? tema.categoria.toLowerCase()
    : espaco?.categoria
      ? espaco.categoria.toLowerCase()
      : tema.id;

  container.innerHTML = `
    ${renderBreadcrumb([
      { label: 'Espaços', route: 'espacos' },
      ...(espaco?.categoria ? [{ label: espaco.categoria, colorKey: espaco.categoria.toLowerCase() }] : []),
      ...(espaco ? [{ label: espaco.nome, route: `espacos/${espaco.id}`, colorKey: espaco.id }] : []),
      ...(tema.categoria ? [{ label: tema.categoria, colorKey: tema.categoria.toLowerCase() }] : []),
      { label: nomeTemaExibicao(tema.nome) },
    ])}

    <div class="section-header">
      <span class="section-header__title">
        <span class="color-dot" style="--dot-color:${accentVar(temaAccentKey)}"></span>${tema.favorito ? `${ICONS.star} ` : ''}${escapeHtml(nomeTemaExibicao(tema.nome))}
      </span>
      <div class="section-header__actions">
        <button class="btn btn--secondary btn--sm" id="btn-favoritar-tema" type="button" title="Aparece na sua lista de Favoritos, separada da fila Hoje">
          ${tema.favorito ? '★ Favorito' : '☆ Favoritar'}
        </button>
        <button class="btn btn--secondary btn--sm" id="btn-editar-tema" type="button">Editar</button>
        ${
          !espaco?.arquivado
            ? `<button class="btn btn--primary btn--sm" id="btn-nova-nota" type="button">+ Nova nota</button>`
            : ''
        }
        <details class="item-menu">
          <summary aria-label="Mais opções">⋯</summary>
          <div class="item-menu__panel">
            <button id="btn-detalhes-tema" type="button">${ICONS.info} Detalhes</button>
            <button id="btn-avaliar-tema" type="button">${ICONS.dice} Avaliar notas</button>
            <button id="btn-excluir-tema" class="danger" type="button">Excluir tema</button>
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
        <label class="field__label" for="input-nome-tema-editar">Nome (opcional)</label>
        <input class="input" id="input-nome-tema-editar" type="text" value="${escapeHtml(tema.nome)}" maxlength="120" />
        <p class="field__error" role="alert"></p>
      </div>
      <div class="form-actions com-margem">
        <button class="btn btn--primary btn--sm" id="btn-salvar-edicao-tema" type="button">Salvar</button>
        <button class="btn btn--secondary btn--sm" id="btn-cancelar-edicao-tema" type="button">Cancelar</button>
      </div>
    </div>

    ${
      espaco?.arquivado
        ? `<div class="banner banner--warning"><span>O espaço "${escapeHtml(espaco.nome)}" está arquivado — não é possível criar notas novas aqui.</span></div>`
        : ''
    }

    ${
      notas.length === 0
        ? `
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${ICONS.pen}</div>
        <div class="empty-state__title">Nenhuma nota neste tema ainda</div>
        <p class="empty-state__hint">Cada nota criada aqui já entra na fila de revisão automaticamente, a partir de amanhã.</p>
        ${!espaco?.arquivado ? `<button class="btn btn--primary btn--sm empty-state__action" id="btn-empty-nova-nota" type="button">Criar a primeira nota</button>` : ''}
      </div>
    `
        : `
      <div class="item-list">
        ${notas
          .map(
            (n) => `
          <button class="item-row" data-open="${escapeHtml(n.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${accentVar(temaAccentKey)}">
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
  `;

  bindBreadcrumb(container);
  bindCategoriaChips(container);
  container.querySelector('#btn-nova-nota')?.addEventListener('click', () => navigate(`temas/${temaId}/nova-nota`));
  container.querySelector('#btn-empty-nova-nota')?.addEventListener('click', () => navigate(`temas/${temaId}/nova-nota`));
  container.querySelectorAll<HTMLButtonElement>('[data-open]').forEach((btn) => {
    btn.addEventListener('click', () => navigate(`notas/${btn.dataset.open}`));
  });

  container.querySelector('#btn-favoritar-tema')?.addEventListener('click', async () => {
    await toggleTemaFavorito(tema.id);
    renderTemaDetail(container, temaId);
  });

  container.querySelector('#btn-detalhes-tema')?.addEventListener('click', async () => {
    const tempoTotalSegundos = await getTempoTotalTema(tema.id);
    const dias = daysBetweenISODates(toLondonISODate(new Date(tema.criado_em)), toLondonISODate());

    showInfo({
      title: nomeTemaExibicao(tema.nome),
      bodyHtml: `
        <div class="stat-grid" style="margin-bottom: var(--space-3); grid-template-columns: repeat(2, 1fr);">
          <div class="stat-tile">
            <div class="stat-tile__value">${notas.length}</div>
            <div class="stat-tile__label">Notas</div>
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

  container.querySelector('#btn-avaliar-tema')?.addEventListener('click', () => {
    const notasComTema = notas.map((nota) => ({ nota, tema }));
    const ctx: AvaliacaoContexto = {
      perfilId: espaco!.perfil_id,
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
    if (!validarCampos([{ input: categoriaEditarInput, ok: categoria.length > 0, mensagem: 'Informe uma categoria para o tema.' }])) {
      return;
    }
    const normalizado = (s: string) => s.trim().toLowerCase();
    const duplicado = temasDoEspaco.some(
      (t) =>
        t.id !== tema.id &&
        normalizado(t.categoria) === normalizado(categoria) &&
        normalizado(t.nome) === normalizado(nome) &&
        nome.length > 0,
    );
    if (duplicado) {
      marcarErroCampo(nomeEditarInput, 'Já existe um tema com esse nome nesta categoria.');
      nomeEditarInput.focus();
      return;
    }
    await updateTema(tema.id, nome, categoria);
    renderTemaDetail(container, temaId);
  });

  container.querySelector('#btn-excluir-tema')?.addEventListener('click', async () => {
    const contagem = await countTemaCascade(tema.id);
    const ok = await confirmAction({
      title: `Excluir "${nomeTemaExibicao(tema.nome)}"?`,
      message: `Isso manda pra Lixeira o tema com ${contagem.notas} nota(s).\nDá pra restaurar tudo em Configurações → Lixeira, por até 30 dias.`,
    });
    if (!ok) return;
    await deleteTemaCascade(tema.id);
    navigate(`espacos/${tema.espaco_id}`);
  });
}
