import { countEspacoCascade, deleteEspacoCascade, getEspaco, listEspacos, setEspacoArquivado, updateEspaco } from '../../db/espacos';
import { contarFilhosPorPasta, createTema, listTemas } from '../../db/temas';
import { listNotasPorEspaco } from '../../db/notas';
import { getDB } from '../../db/schema';
import { getTempoTotalEspaco } from '../../db/dashboard';
import { escapeHtml } from '../../lib/dom';
import { accentVar, assignEspacoCores, espacoCorVar } from '../../lib/color';
import { daysBetweenISODates, formatDateBR, formatDuracao, toLondonISODate } from '../../lib/time';
import { navigate } from '../router';
import { confirmAction } from '../components/confirm-modal';
import { showInfo } from '../components/info-modal';
import { iniciarAvaliacao, type AvaliacaoContexto } from '../components/avaliacao-aleatoria';
import { renderBreadcrumb, bindBreadcrumb } from '../components/breadcrumb';
import { renderEspacoVisualPicker, bindEspacoVisualPicker, lerEspacoVisual } from '../components/espaco-visual';
import { limparErroCampo, marcarErroCampo, validarCampos } from '../../lib/form-validacao';
import { getEspacoIcone, espacoIconeChave } from '../espaco-icons';
import { ICONS } from '../icons';
import { nomeTemaExibicao } from '../../domain/rotulos';
import type { Tema } from '../../types';

export async function renderEspacoDetail(container: HTMLElement, espacoId: string): Promise<void> {
  const espaco = await getEspaco(espacoId);
  if (!espaco) {
    container.innerHTML = `<p class="text-muted">Pasta não encontrada.</p>`;
    return;
  }
  const temas = await listTemas(espacoId);
  // Órfãs (pai excluído/ausente em dados antigos) aparecem como subpastas da raiz, pra não
  // ficarem invisíveis na tela.
  const idsTemas = new Set(temas.map((t) => t.id));
  const subpastasRaiz = temas.filter((t) => !t.pai_id || !idsTemas.has(t.pai_id));
  const notaCounts = await countNotasPorTema(temas.map((t) => t.id));
  const subpastaCounts = contarFilhosPorPasta(temas);
  const cores = assignEspacoCores(subpastasRaiz);
  const espacoCor = espacoCorVar(espaco.cor, accentVar(espaco.id));
  const espacoIcone = getEspacoIcone(espacoIconeChave(espaco));

  const totalNotas = Array.from(notaCounts.values()).reduce((soma, n) => soma + n, 0);

  container.innerHTML = `
    ${renderBreadcrumb([
      { label: 'Pastas', route: 'espacos' },
      { label: espaco.nome, iconKey: espacoIcone.chave, iconColor: espacoCor },
    ])}

    <div class="section-header">
      <span class="section-header__title">
        <span class="espaco-icon-badge" style="--badge-accent:${espacoCor}" aria-hidden="true">${espacoIcone.svg}</span>${escapeHtml(espaco.nome)}
      </span>
      <div class="section-header__actions">
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
        <label class="field__label" for="input-nome-espaco-editar">Nome da pasta principal</label>
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
        ? `<div class="banner banner--warning"><span>Esta pasta está arquivada — não é possível criar subpastas ou notas nela, mas as revisões já agendadas continuam normalmente.</span></div>`
        : ''
    }

    ${
      !espaco.arquivado
        ? `
    <div id="form-nova-pasta" class="card content-narrow is-hidden">
      <p class="screen-hint sem-margem-topo">Uma subpasta organiza o conteúdo desta pasta principal. Você pode criar subpastas dentro de subpastas e adicionar notas quando quiser.</p>
      <div class="field">
        <label class="field__label" for="input-nome-pasta">Nome da subpasta</label>
        <input class="input" id="input-nome-pasta" type="text" placeholder="Ex: Módulo 1, Capítulo 2, Aula 3" maxlength="120" />
        <p class="field__error" role="alert"></p>
      </div>
      <div style="margin-top: var(--space-4);">
        ${renderEspacoVisualPicker({ prefix: 'nova-pasta' })}
      </div>
      <div class="form-actions com-margem">
        <button class="btn btn--primary btn--sm" id="btn-salvar-pasta" type="button">Criar subpasta</button>
        <button class="btn btn--secondary btn--sm" id="btn-cancelar-pasta" type="button">Cancelar</button>
      </div>
    </div>
    <button class="btn btn--primary btn--sm" id="btn-nova-pasta" type="button" style="margin-bottom: var(--space-5);">+ Nova subpasta</button>
    `
        : ''
    }

    ${
      subpastasRaiz.length === 0
        ? `
      <div class="empty-state">
        <div class="empty-state__icon" aria-hidden="true">${ICONS.folder}</div>
        <div class="empty-state__title">Nenhuma subpasta ainda</div>
        <p class="empty-state__hint">Crie uma subpasta (ex: "Módulo 1") para organizar. As notas ficam dentro das subpastas.</p>
        ${!espaco.arquivado ? `<button class="btn btn--primary btn--sm empty-state__action" id="btn-empty-nova-pasta" type="button">Criar a primeira subpasta</button>` : ''}
      </div>
    `
        : `
      <div class="item-list">
        ${subpastasRaiz
          .map((tema) =>
            renderSubpasta(tema, notaCounts.get(tema.id) ?? 0, subpastaCounts.get(tema.id) ?? 0, cores.get(tema.id) ?? accentVar(tema.id)),
          )
          .join('')}
      </div>
    `
    }
  `;

  bindBreadcrumb(container);
  bindEspacoVisualPicker(container, {
    prefix: 'editar-espaco',
    getTexto: () => container.querySelector<HTMLInputElement>('#input-nome-espaco-editar')?.value ?? '',
  });
  bindEspacoVisualPicker(container, {
    prefix: 'nova-pasta',
    getTexto: () => container.querySelector<HTMLInputElement>('#input-nome-pasta')?.value ?? '',
  });

  container.querySelector('#btn-arquivar')?.addEventListener('click', async () => {
    if (!espaco.arquivado) {
      const ok = await confirmAction({
        title: `Arquivar "${espaco.nome}"?`,
        message:
          'Some da lista principal e não deixa criar subpastas ou notas novas nela — mas as revisões já agendadas continuam normalmente, e dá pra reativar quando quiser.',
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
  container.querySelector('#btn-editar')?.addEventListener('click', () => {
    formEditar.classList.remove('is-hidden');
    nomeEditarInput.focus();
  });
  container.querySelector('#btn-cancelar-edicao')?.addEventListener('click', () => {
    formEditar.classList.add('is-hidden');
  });
  nomeEditarInput.addEventListener('input', () => limparErroCampo(nomeEditarInput));
  container.querySelector('#btn-salvar-edicao')?.addEventListener('click', async () => {
    const nome = nomeEditarInput.value.trim();
    if (!validarCampos([{ input: nomeEditarInput, ok: nome.length > 0, mensagem: 'Informe um nome para a pasta.' }])) {
      return;
    }
    // Duplicata só entre pastas do mesmo perfil (o nome é o identificador visual do grupo).
    const irmaos = await listEspacos(espaco.perfil_id);
    if (irmaos.some((e) => e.id !== espaco.id && e.nome.trim().toLowerCase() === nome.toLowerCase())) {
      marcarErroCampo(nomeEditarInput, 'Já existe uma pasta com esse nome.');
      nomeEditarInput.focus();
      return;
    }
    await updateEspaco(espaco.id, nome, lerEspacoVisual(container, 'editar-espaco'));
    renderEspacoDetail(container, espacoId);
  });

  container.querySelector('#btn-detalhes')?.addEventListener('click', async () => {
    const hoje = toLondonISODate();
    const tempoTotalSegundos = await getTempoTotalEspaco(espaco.id);

    let diasValue: string;
    let diasLabel: string;
    let statusCaption: string;
    if (espaco.arquivado && espaco.arquivado_em) {
      const dias = daysBetweenISODates(toLondonISODate(new Date(espaco.criado_em)), toLondonISODate(new Date(espaco.arquivado_em)));
      diasValue = String(dias);
      diasLabel = 'Dias até arquivar';
      statusCaption = `Criada em ${formatDateBR(espaco.criado_em)} · arquivada em ${formatDateBR(espaco.arquivado_em)}`;
    } else if (espaco.arquivado) {
      diasValue = '—';
      diasLabel = 'Duração';
      statusCaption = `Criada em ${formatDateBR(espaco.criado_em)} · arquivada antes desse registro de data existir`;
    } else {
      const dias = daysBetweenISODates(toLondonISODate(new Date(espaco.criado_em)), hoje);
      diasValue = String(dias);
      diasLabel = dias === 1 ? 'Dia ativo' : 'Dias ativo';
      statusCaption = `Criada em ${formatDateBR(espaco.criado_em)}`;
    }

    showInfo({
      title: espaco.nome,
      bodyHtml: `
        <div class="stat-grid" style="margin-bottom: var(--space-3); grid-template-columns: repeat(2, 1fr);">
          <div class="stat-tile">
            <div class="stat-tile__value">${temas.length}</div>
            <div class="stat-tile__label">Subpastas</div>
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
        <p class="text-muted sem-margem">${statusCaption} · ${espaco.arquivado ? 'Arquivada' : 'Ativa'}</p>
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
      message: `Isso manda pra Lixeira a pasta com ${contagem.temas} subpasta(s) e ${contagem.notas} nota(s).\nDá pra restaurar tudo em Configurações → Lixeira, por até 30 dias.`,
    });
    if (!ok) return;
    await deleteEspacoCascade(espaco.id);
    navigate('espacos');
  });

  const formPasta = container.querySelector<HTMLElement>('#form-nova-pasta');
  const nomePastaInput = container.querySelector<HTMLInputElement>('#input-nome-pasta');
  const abrirFormPasta = () => {
    if (formPasta) formPasta.classList.remove('is-hidden');
    nomePastaInput?.focus();
  };
  container.querySelector('#btn-nova-pasta')?.addEventListener('click', abrirFormPasta);
  container.querySelector('#btn-empty-nova-pasta')?.addEventListener('click', abrirFormPasta);
  container.querySelector('#btn-cancelar-pasta')?.addEventListener('click', () => {
    if (formPasta) formPasta.classList.add('is-hidden');
  });
  nomePastaInput?.addEventListener('input', () => limparErroCampo(nomePastaInput));
  container.querySelector('#btn-salvar-pasta')?.addEventListener('click', async () => {
    if (!nomePastaInput) return;
    const nome = nomePastaInput.value.trim();
    if (!validarCampos([{ input: nomePastaInput, ok: nome.length > 0, mensagem: 'Informe um nome para a subpasta.' }])) {
      return;
    }
    const duplicada = subpastasRaiz.some((t) => t.nome.trim().toLowerCase() === nome.toLowerCase());
    if (duplicada) {
      marcarErroCampo(nomePastaInput, 'Já existe uma subpasta com esse nome aqui.');
      nomePastaInput.focus();
      return;
    }
    const nova = await createTema(espacoId, nome, {
      visual: lerEspacoVisual(container, 'nova-pasta'),
    });
    navigate(`temas/${nova.id}`);
  });

  container.querySelectorAll<HTMLButtonElement>('[data-open]').forEach((btn) => {
    btn.addEventListener('click', () => navigate(`temas/${btn.dataset.open}`));
  });
}

function renderSubpasta(tema: Tema, notaCount: number, subpastaCount: number, cor: string): string {
  const icone = getEspacoIcone(espacoIconeChave(tema));
  const meta = [`${notaCount} nota(s)`, subpastaCount > 0 ? `${subpastaCount} subpasta(s)` : '']
    .filter(Boolean)
    .join(' · ');
  return `
    <div class="item-row" data-id="${escapeHtml(tema.id)}" style="--row-accent:${cor}">
      <button class="item-row__main" data-open="${escapeHtml(tema.id)}" type="button" style="background:none;border:none;text-align:left;cursor:pointer;">
        <span class="item-row__title-row">
          <span class="espaco-icon-badge" style="--badge-accent:${cor}" aria-hidden="true">${icone.svg}</span>
          <span class="item-row__title">${escapeHtml(nomeTemaExibicao(tema.nome))}</span>
        </span>
        <span class="item-row__meta">${meta}</span>
      </button>
    </div>
  `;
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
