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
import { getTempoTotalTema } from '../../db/dashboard';
import { getDB } from '../../db/schema';
import { escapeHtml } from '../../lib/dom';
import { accentVar, assignEspacoCores, espacoCorVar } from '../../lib/color';
import { distinctCategorias } from '../../lib/group';
import { daysBetweenISODates, formatDateBR, formatDuracao, toLondonISODate } from '../../lib/time';
import { navigate } from '../router';
import { confirmAction } from '../components/confirm-modal';
import { showInfo } from '../components/info-modal';
import { iniciarAvaliacao, type AvaliacaoContexto } from '../components/avaliacao-aleatoria';
import { renderBreadcrumb, bindBreadcrumb } from '../components/breadcrumb';
import { renderCategoriaChips, bindCategoriaChips } from '../components/categoria-chips';
import { renderEspacoVisualPicker, bindEspacoVisualPicker, lerEspacoVisual } from '../components/espaco-visual';
import { nomeTemaExibicao } from '../../domain/rotulos';
import { caminhoDe, idsDaSubarvore } from '../../domain/arvore';
import { limparErroCampo, marcarErroCampo, validarCampos } from '../../lib/form-validacao';
import { getEspacoIcone, espacoIconeChave } from '../espaco-icons';
import { ICONS } from '../icons';

export async function renderTemaDetail(container: HTMLElement, temaId: string): Promise<void> {
  const tema = await getTema(temaId);
  if (!tema) {
    container.innerHTML = `<p class="text-muted">Tema não encontrado.</p>`;
    return;
  }
  const espaco = await getEspaco(tema.espaco_id);
  if (!espaco) {
    container.innerHTML = `<p class="text-muted">Espaço não encontrado.</p>`;
    return;
  }

  const todosTemas = await listTemas(tema.espaco_id);
  const filhos = todosTemas.filter((t) => (t.pai_id ?? null) === tema.id);
  const ancestrais = caminhoDe(todosTemas, tema);
  const notas = await listNotas(temaId);
  const notaCounts = await countNotasPorTema(todosTemas.map((t) => t.id));
  const subpastaCounts = contarFilhosPorPasta(todosTemas);
  const cores = assignEspacoCores(filhos);
  const espacoCor = espacoCorVar(espaco.cor, accentVar(espaco.id));
  const espacoIcone = getEspacoIcone(espacoIconeChave(espaco));
  const temaCor = espacoCorVar(tema.cor, accentVar(tema.id));
  const temaIcone = getEspacoIcone(espacoIconeChave(tema));

  // Escopo é só o Espaço deste Tema, não o perfil inteiro — sugestão precisa ser relevante
  // pro "curso" atual.
  const categoriasTema = distinctCategorias(todosTemas.map((t) => t.categoria));
  // Cai pro próprio id do Tema quando não há categoria (nem dele, nem do Espaço) — cair pro
  // id do Espaço fazia TODOS os temas sem categoria dentro do mesmo Espaço saírem com a
  // MESMA cor (a do próprio Espaço), impossível de diferenciar um do outro.
  const temaAccentKey = tema.categoria
    ? tema.categoria.toLowerCase()
    : espaco.categoria
      ? espaco.categoria.toLowerCase()
      : tema.id;
  // A categoria só entra no caminho no primeiro nível (o grupo visível na tela do Espaço).
  // Um Tema aninhado herda o caminho do Tema raiz, sem repetir "categoria" no meio.
  const categoriaDoCaminho = (ancestrais[0] ?? tema).categoria;

  const notasDaSubarvore = (id: string): number =>
    idsDaSubarvore(todosTemas, id).reduce((soma, tid) => soma + (notaCounts.get(tid) ?? 0), 0);

  container.innerHTML = `
    ${renderBreadcrumb([
      { label: 'Espaços', route: 'espacos' },
      ...(espaco.categoria
        ? [{ label: espaco.categoria, colorKey: espaco.categoria.toLowerCase() }]
        : []),
      { label: espaco.nome, route: `espacos/${espaco.id}`, iconKey: espacoIcone.chave, iconColor: espacoCor },
      ...(categoriaDoCaminho
        ? [{ label: categoriaDoCaminho, colorKey: categoriaDoCaminho.toLowerCase() }]
        : []),
      ...ancestrais.map((a) => ({
        label: nomeTemaExibicao(a.nome),
        route: `temas/${a.id}`,
        iconKey: espacoIconeChave(a),
        iconColor: espacoCorVar(a.cor, accentVar(a.id)),
      })),
      { label: nomeTemaExibicao(tema.nome), iconKey: temaIcone.chave, iconColor: temaCor },
    ])}

    <div class="section-header">
      <span class="section-header__title">
        <span class="espaco-icon-badge" style="--badge-accent:${temaCor}" aria-hidden="true">${temaIcone.svg}</span>${tema.favorito ? `${ICONS.star} ` : ''}${escapeHtml(nomeTemaExibicao(tema.nome))}
      </span>
      <div class="section-header__actions">
        <button class="btn btn--secondary btn--sm" id="btn-favoritar-tema" type="button" title="Aparece na sua lista de Favoritos, separada da fila Hoje">
          ${tema.favorito ? '★ Favorito' : '☆ Favoritar'}
        </button>
        <button class="btn btn--secondary btn--sm" id="btn-editar-tema" type="button">Editar</button>
        ${
          !espaco.arquivado
            ? `
          <button class="btn btn--secondary btn--sm" id="btn-nova-subpasta" type="button">+ Subpasta</button>
          <button class="btn btn--primary btn--sm" id="btn-nova-nota" type="button">+ Nova nota</button>
        `
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
        ? `<div class="banner banner--warning"><span>O espaço "${escapeHtml(espaco.nome)}" está arquivado — não é possível criar subpastas ou notas novas aqui.</span></div>`
        : ''
    }

    ${
      !espaco.arquivado
        ? `
    <div id="form-nova-subpasta" class="card content-narrow is-hidden">
      <p class="screen-hint sem-margem-topo">Crie outra pasta dentro desta para continuar organizando. As notas podem ficar nesta pasta ou na subpasta que fizer sentido.</p>
      <div class="field">
        <label class="field__label" for="input-nome-subpasta">Nome da subpasta</label>
        <input class="input" id="input-nome-subpasta" type="text" placeholder="Ex: Capítulo 1, Aula 2, Exercícios" maxlength="120" />
        <p class="field__error" role="alert"></p>
      </div>
      <div style="margin-top: var(--space-4);">
        ${renderEspacoVisualPicker({ prefix: 'nova-subpasta' })}
      </div>
      <div class="form-actions com-margem">
        <button class="btn btn--primary btn--sm" id="btn-salvar-subpasta" type="button">Criar subpasta</button>
        <button class="btn btn--secondary btn--sm" id="btn-cancelar-subpasta" type="button">Cancelar</button>
      </div>
    </div>
    `
        : ''
    }

    ${
      filhos.length > 0
        ? `
    <div class="section-header" style="margin-top: var(--space-5);">
      <span class="section-header__title" style="font-size: var(--font-size-base);">Subpastas</span>
    </div>
    <div class="item-list">
      ${filhos
        .map((filho) => {
          const cor = cores.get(filho.id) ?? accentVar(filho.id);
          const icone = getEspacoIcone(espacoIconeChave(filho));
          const subpastas = subpastaCounts.get(filho.id) ?? 0;
          const meta = [`${notasDaSubarvore(filho.id)} nota(s)`, subpastas > 0 ? `${subpastas} subpasta(s)` : '']
            .filter(Boolean)
            .join(' · ');
          return `
        <div class="item-row" data-id="${escapeHtml(filho.id)}" style="--row-accent:${cor}">
          <button class="item-row__main" data-open="${escapeHtml(filho.id)}" type="button" style="background:none;border:none;text-align:left;cursor:pointer;">
            <span class="item-row__title-row">
              <span class="espaco-icon-badge" style="--badge-accent:${cor}" aria-hidden="true">${icone.svg}</span>
              <span class="item-row__title">${escapeHtml(nomeTemaExibicao(filho.nome))}</span>
            </span>
            <span class="item-row__meta">${meta}</span>
          </button>
        </div>
      `;
        })
        .join('')}
    </div>
    `
        : ''
    }

    <div class="section-header" style="margin-top: var(--space-6);">
      <span class="section-header__title" style="font-size: var(--font-size-base);">Notas neste tema</span>
    </div>

    ${
      notas.length === 0
        ? `
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${ICONS.pen}</div>
        <div class="empty-state__title">Nenhuma nota neste tema ainda</div>
        <p class="empty-state__hint">Cada nota criada aqui já entra na fila de revisão automaticamente, a partir de amanhã.</p>
        ${!espaco.arquivado ? `<button class="btn btn--primary btn--sm empty-state__action" id="btn-empty-nova-nota" type="button">Criar a primeira nota</button>` : ''}
      </div>
    `
        : `
      <div class="item-list">
        ${notas
          .map(
            (n) => `
          <button class="item-row" data-open-nota="${escapeHtml(n.id)}" type="button" style="cursor:pointer; text-align:left; --row-accent:${accentVar(temaAccentKey)}">
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
  bindEspacoVisualPicker(container, {
    prefix: 'editar-tema',
    getTexto: () =>
      `${container.querySelector<HTMLInputElement>('#input-nome-tema-editar')?.value ?? ''} ${
        container.querySelector<HTMLInputElement>('#input-categoria-tema-editar')?.value ?? ''
      }`,
  });
  bindEspacoVisualPicker(container, {
    prefix: 'nova-subpasta',
    getTexto: () => container.querySelector<HTMLInputElement>('#input-nome-subpasta')?.value ?? '',
  });

  container.querySelector('#btn-favoritar-tema')?.addEventListener('click', async () => {
    await toggleTemaFavorito(tema.id);
    renderTemaDetail(container, temaId);
  });

  container.querySelector('#btn-nova-nota')?.addEventListener('click', () => navigate(`temas/${temaId}/nova-nota`));
  container.querySelector('#btn-empty-nova-nota')?.addEventListener('click', () => navigate(`temas/${temaId}/nova-nota`));
  container.querySelectorAll<HTMLButtonElement>('[data-open]').forEach((btn) => {
    btn.addEventListener('click', () => navigate(`temas/${btn.dataset.open}`));
  });
  container.querySelectorAll<HTMLButtonElement>('[data-open-nota]').forEach((btn) => {
    btn.addEventListener('click', () => navigate(`notas/${btn.dataset.openNota}`));
  });

  const formNovo = container.querySelector<HTMLElement>('#form-nova-subpasta');
  const nomeNovoInput = container.querySelector<HTMLInputElement>('#input-nome-subpasta');
  const abrirFormNova = () => {
    if (formNovo) formNovo.classList.remove('is-hidden');
    nomeNovoInput?.focus();
  };
  container.querySelector('#btn-nova-subpasta')?.addEventListener('click', abrirFormNova);
  container.querySelector('#btn-cancelar-subpasta')?.addEventListener('click', () => {
    if (formNovo) formNovo.classList.add('is-hidden');
  });
  nomeNovoInput?.addEventListener('input', () => limparErroCampo(nomeNovoInput));
  container.querySelector('#btn-salvar-subpasta')?.addEventListener('click', async () => {
    if (!nomeNovoInput) return;
    const nome = nomeNovoInput.value.trim();
    if (!validarCampos([{ input: nomeNovoInput, ok: nome.length > 0, mensagem: 'Informe um nome para a subpasta.' }])) {
      return;
    }
    const duplicada = filhos.some((t) => t.nome.trim().toLowerCase() === nome.toLowerCase());
    if (duplicada) {
      marcarErroCampo(nomeNovoInput, 'Já existe uma subpasta com esse nome aqui.');
      nomeNovoInput.focus();
      return;
    }
    const nova = await createTema(tema.espaco_id, nome, {
      categoria: tema.categoria,
      paiId: tema.id,
      visual: lerEspacoVisual(container, 'nova-subpasta'),
    });
    navigate(`temas/${nova.id}`);
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
            <div class="stat-tile__label">Subpastas</div>
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
    if (!validarCampos([{ input: categoriaEditarInput, ok: categoria.length > 0, mensagem: 'Informe uma categoria para o tema.' }])) {
      return;
    }
    const normalizado = (s: string) => s.trim().toLowerCase();
    const irmaos = todosTemas.filter(
      (t) => t.id !== tema.id && (t.pai_id ?? null) === (tema.pai_id ?? null),
    );
    const duplicado = irmaos.some(
      (t) => normalizado(t.categoria) === normalizado(categoria) && normalizado(t.nome) === normalizado(nome) && nome.length > 0,
    );
    if (duplicado) {
      marcarErroCampo(nomeEditarInput, 'Já existe um tema com esse nome nesta categoria.');
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
      message: `Isso manda pra Lixeira este tema com ${contagem.temas} tema(s)/subpasta(s) no total e ${contagem.notas} nota(s).\nDá pra restaurar tudo em Configurações → Lixeira, por até 30 dias.`,
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
