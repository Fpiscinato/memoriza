// Seletor de destino do "Mover" (pastas e notas). Substitui o arrastar e soltar por uma
// lista com a árvore de pastas do perfil: funciona no celular, no teclado e em listas
// longas, e deixa claro de onde o item sai e para onde vai.
//
// A validação de verdade fica em db/mover.ts — aqui só montamos a lista, filtramos pelo
// texto digitado, pedimos confirmação e mostramos a mensagem de erro que vier de lá.

import { escapeHtml } from '../../lib/dom';
import { accentVar, espacoCorVar } from '../../lib/color';
import type { DestinoMover, GrupoDestinosMover } from '../../domain/mover-destinos';
import { getEspacoIcone, espacoIconeChave } from '../espaco-icons';
import { gerenciarFocoModal } from './modal-foco';

export interface MoverModalOptions {
  titulo: string;
  subtitulo?: string;
  /** Nome do item em movimento, usado na pergunta de confirmação. */
  itemNome?: string;
  /** Caminho de onde o item está agora (ex: "Curso › Módulo 1"). */
  atualCaminho?: string;
  grupos: GrupoDestinosMover[];
  onMover: (destino: DestinoMover) => Promise<void>;
}

function normalizar(valor: string): string {
  return valor
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function visualDoDestino(destino: DestinoMover): { svg: string; cor: string } {
  const icone = getEspacoIcone(
    espacoIconeChave({
      icone: destino.icone,
      nome: destino.iconeNome,
      categoria: destino.categoria,
    }),
  );
  return { svg: icone.svg, cor: espacoCorVar(destino.cor, accentVar(destino.id)) };
}

function visualDoGrupo(grupo: GrupoDestinosMover): { svg: string; cor: string } {
  const icone = getEspacoIcone(
    espacoIconeChave({
      icone: grupo.icone,
      nome: grupo.espacoNome,
      categoria: grupo.categoria,
    }),
  );
  return { svg: icone.svg, cor: espacoCorVar(grupo.cor, accentVar(grupo.espacoId)) };
}

/** Abre o modal de escolha de destino. Fecha sozinho depois que `onMover` resolve. */
export function abrirModalMover(opts: MoverModalOptions): void {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const gruposHtml = opts.grupos
    .map((grupo) => {
      const visualGrupo = visualDoGrupo(grupo);
      return `
      <details class="mover-grupo" data-mover-grupo>
        <summary class="mover-grupo__titulo" style="--group-accent:${visualGrupo.cor}">
          <span class="espaco-icon-inline mover-grupo__icone" style="--badge-accent:${visualGrupo.cor}" aria-hidden="true">${visualGrupo.svg}</span>
          <span class="mover-grupo__nome">${escapeHtml(grupo.espacoNome)}</span>
          ${grupo.categoria ? `<span class="mover-grupo__categoria">${escapeHtml(grupo.categoria)}</span>` : ''}
          <span class="mover-grupo__contagem">${grupo.destinos.length}</span>
        </summary>
        <div class="mover-grupo__itens">
          ${grupo.destinos
            .map((destino) => {
              const visual = visualDoDestino(destino);
              return `
            <button
              class="mover-item"
              type="button"
              data-destino="${escapeHtml(destino.chave)}"
              data-busca="${escapeHtml(normalizar(`${destino.nome} ${destino.caminho} ${destino.categoria}`))}"
              style="--mover-depth:${destino.profundidade}; --row-accent:${visual.cor}"
              title="${escapeHtml(destino.caminho)}"
            >
              <span class="espaco-icon-inline mover-item__icone" style="--badge-accent:${visual.cor}" aria-hidden="true">${visual.svg}</span>
              <span class="mover-item__texto">
                <span class="mover-item__nome">${escapeHtml(destino.nome)}</span>
                <span class="mover-item__meta">${escapeHtml(destino.descricao)}</span>
              </span>
            </button>
          `;
            })
            .join('')}
        </div>
      </details>
    `;
    })
    .join('');

  const itemNome = opts.itemNome?.trim();

  overlay.innerHTML = `
    <div class="modal modal--mover" role="dialog" aria-modal="true" aria-labelledby="mover-title">
      <div class="modal__title" id="mover-title">${escapeHtml(opts.titulo)}</div>
      ${
        opts.subtitulo
          ? `<p class="modal__message mover-subtitulo">${escapeHtml(opts.subtitulo)}</p>`
          : ''
      }
      ${
        opts.atualCaminho
          ? `
        <div class="mover-atual">
          <span class="mover-atual__rotulo">De</span>
          <span class="mover-atual__caminho">${escapeHtml(opts.atualCaminho)}</span>
        </div>
      `
          : ''
      }

      <div id="mover-escolha">
        <div class="field mover-busca">
          <label class="field__label" for="mover-busca">Buscar pasta</label>
          <input class="input" id="mover-busca" type="search" placeholder="Digite parte do nome…" autocomplete="off" />
        </div>
        <div class="mover-lista" id="mover-lista">
          ${gruposHtml || '<p class="text-muted sem-margem">Nenhum destino disponível.</p>'}
          <p class="mover-vazio text-muted sem-margem" id="mover-vazio" hidden>Nenhuma pasta encontrada com esse nome.</p>
        </div>
      </div>

      <div class="mover-confirmacao is-hidden" id="mover-confirmacao">
        <p class="mover-confirmacao__pergunta">
          Mover${itemNome ? ` <strong>${escapeHtml(itemNome)}</strong>` : ' este item'} para esta pasta?
        </p>
        <div class="mover-confirmacao__destino" id="mover-confirmacao-destino"></div>
      </div>

      <p class="field__error mover-erro" id="mover-erro" role="alert"></p>
      <div class="form-actions">
        <button class="btn btn--secondary" id="mover-cancelar" type="button">Cancelar</button>
        <button class="btn btn--secondary is-hidden" id="mover-voltar" type="button">Voltar</button>
        <button class="btn btn--primary is-hidden" id="mover-confirmar" type="button">Mover</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const dialog = overlay.querySelector<HTMLElement>('.modal')!;
  const liberarFoco = gerenciarFocoModal(dialog);
  const busca = overlay.querySelector<HTMLInputElement>('#mover-busca')!;
  const vazio = overlay.querySelector<HTMLElement>('#mover-vazio')!;
  const erro = overlay.querySelector<HTMLElement>('#mover-erro')!;
  const escolha = overlay.querySelector<HTMLElement>('#mover-escolha')!;
  const confirmacao = overlay.querySelector<HTMLElement>('#mover-confirmacao')!;
  const confirmacaoDestino = overlay.querySelector<HTMLElement>('#mover-confirmacao-destino')!;
  const btnCancelar = overlay.querySelector<HTMLButtonElement>('#mover-cancelar')!;
  const btnVoltar = overlay.querySelector<HTMLButtonElement>('#mover-voltar')!;
  const btnConfirmar = overlay.querySelector<HTMLButtonElement>('#mover-confirmar')!;
  const botoes = Array.from(overlay.querySelectorAll<HTMLButtonElement>('[data-destino]'));
  const gruposEls = Array.from(overlay.querySelectorAll<HTMLDetailsElement>('[data-mover-grupo]'));
  const destinos = new Map<string, DestinoMover>();
  for (const grupo of opts.grupos) {
    for (const destino of grupo.destinos) destinos.set(destino.chave, destino);
  }

  let fechado = false;
  let ocupado = false;
  let pendente: DestinoMover | null = null;

  function fechar(): void {
    if (fechado) return;
    fechado = true;
    document.removeEventListener('keydown', onKeydown);
    overlay.remove();
    liberarFoco();
  }

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') fechar();
  };
  document.addEventListener('keydown', onKeydown);

  function mostrarEscolha(): void {
    pendente = null;
    erro.textContent = '';
    escolha.classList.remove('is-hidden');
    confirmacao.classList.add('is-hidden');
    btnCancelar.classList.remove('is-hidden');
    btnVoltar.classList.add('is-hidden');
    btnConfirmar.classList.add('is-hidden');
    busca.focus();
  }

  function mostrarConfirmacao(destino: DestinoMover): void {
    pendente = destino;
    erro.textContent = '';
    const visual = visualDoDestino(destino);
    confirmacaoDestino.innerHTML = `
      <span class="mover-atual__rotulo">Para</span>
      <span class="espaco-icon-badge" style="--badge-accent:${visual.cor}" aria-hidden="true">${visual.svg}</span>
      <span class="mover-confirmacao__texto">
        <span class="mover-confirmacao__nome">${escapeHtml(destino.nome)}</span>
        <span class="mover-confirmacao__caminho">${escapeHtml(destino.caminho)}</span>
      </span>
    `;
    escolha.classList.add('is-hidden');
    confirmacao.classList.remove('is-hidden');
    btnCancelar.classList.add('is-hidden');
    btnVoltar.classList.remove('is-hidden');
    btnConfirmar.classList.remove('is-hidden');
    btnConfirmar.focus();
  }

  busca.addEventListener('input', () => {
    const consulta = normalizar(busca.value);
    let visiveis = 0;
    for (const botao of botoes) {
      const combina = !consulta || (botao.dataset.busca ?? '').includes(consulta);
      botao.hidden = !combina;
      if (combina) visiveis++;
    }
    for (const grupo of gruposEls) {
      const visiveisNoGrupo = Array.from(
        grupo.querySelectorAll<HTMLElement>('[data-destino]'),
      ).filter((botao) => !botao.hidden).length;
      grupo.hidden = visiveisNoGrupo === 0;
      // A lista começa recolhida; a busca abre só os grupos que têm resultado.
      grupo.open = Boolean(consulta) && visiveisNoGrupo > 0;
    }
    vazio.hidden = visiveis > 0 || botoes.length === 0;
  });

  for (const botao of botoes) {
    botao.addEventListener('click', () => {
      if (ocupado) return;
      const destino = destinos.get(botao.dataset.destino ?? '');
      if (!destino) return;
      mostrarConfirmacao(destino);
    });
  }

  btnVoltar.addEventListener('click', () => {
    if (ocupado) return;
    mostrarEscolha();
  });

  btnConfirmar.addEventListener('click', async () => {
    if (ocupado || !pendente) return;
    ocupado = true;
    erro.textContent = '';
    btnConfirmar.disabled = true;
    btnVoltar.disabled = true;
    try {
      await opts.onMover(pendente);
      fechar();
    } catch (e) {
      erro.textContent = e instanceof Error ? e.message : 'Não foi possível mover.';
      ocupado = false;
      btnConfirmar.disabled = false;
      btnVoltar.disabled = false;
    }
  });

  btnCancelar.addEventListener('click', fechar);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) fechar();
  });
}
