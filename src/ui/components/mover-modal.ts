// Seletor de destino do "Mover" (pastas e notas). Substitui o arrastar e soltar por uma
// lista com a árvore de pastas do perfil: funciona no celular, no teclado e em listas
// longas, e deixa claro o caminho de cada destino.
//
// A validação de verdade fica em db/mover.ts — aqui só montamos a lista, filtramos pelo
// texto digitado e mostramos a mensagem de erro que vier de lá.

import { escapeHtml } from '../../lib/dom';
import type { DestinoMover, GrupoDestinosMover } from '../../domain/mover-destinos';
import { gerenciarFocoModal } from './modal-foco';
import { ICONS } from '../icons';

export interface MoverModalOptions {
  titulo: string;
  subtitulo?: string;
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

function descrever(destino: DestinoMover): string {
  return destino.descricao;
}

/** Abre o modal de escolha de destino. Fecha sozinho depois que `onMover` resolve. */
export function abrirModalMover(opts: MoverModalOptions): void {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const gruposHtml = opts.grupos
    .map(
      (grupo) => `
      <div class="mover-grupo" data-mover-grupo>
        <div class="mover-grupo__titulo">
          <span class="mover-grupo__icone" aria-hidden="true">${ICONS.folder}</span>
          <span class="mover-grupo__nome">${escapeHtml(grupo.espacoNome)}</span>
          ${grupo.categoria ? `<span class="mover-grupo__categoria">${escapeHtml(grupo.categoria)}</span>` : ''}
        </div>
        <div class="mover-grupo__itens">
          ${grupo.destinos
            .map(
              (destino) => `
            <button
              class="mover-item"
              type="button"
              data-destino="${escapeHtml(destino.chave)}"
              data-busca="${escapeHtml(normalizar(`${destino.nome} ${destino.caminho} ${destino.categoria}`))}"
              style="--mover-depth:${destino.profundidade}"
              title="${escapeHtml(destino.caminho)}"
            >
              <span class="mover-item__icone" aria-hidden="true">${ICONS.folder}</span>
              <span class="mover-item__texto">
                <span class="mover-item__nome">${escapeHtml(destino.nome)}</span>
                <span class="mover-item__meta">${escapeHtml(descrever(destino))}</span>
              </span>
            </button>
          `,
            )
            .join('')}
        </div>
      </div>
    `,
    )
    .join('');

  overlay.innerHTML = `
    <div class="modal modal--mover" role="dialog" aria-modal="true" aria-labelledby="mover-title">
      <div class="modal__title" id="mover-title">${escapeHtml(opts.titulo)}</div>
      ${
        opts.subtitulo
          ? `<p class="modal__message mover-subtitulo">${escapeHtml(opts.subtitulo)}</p>`
          : ''
      }
      <div class="field mover-busca">
        <label class="field__label" for="mover-busca">Buscar pasta</label>
        <input class="input" id="mover-busca" type="search" placeholder="Digite parte do nome…" autocomplete="off" />
      </div>
      <div class="mover-lista" id="mover-lista">
        ${gruposHtml || '<p class="text-muted sem-margem">Nenhum destino disponível.</p>'}
        <p class="mover-vazio text-muted sem-margem" id="mover-vazio" hidden>Nenhuma pasta encontrada com esse nome.</p>
      </div>
      <p class="field__error mover-erro" id="mover-erro" role="alert"></p>
      <div class="form-actions">
        <button class="btn btn--secondary" id="mover-cancelar" type="button">Cancelar</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const dialog = overlay.querySelector<HTMLElement>('.modal')!;
  const liberarFoco = gerenciarFocoModal(dialog);
  const busca = overlay.querySelector<HTMLInputElement>('#mover-busca')!;
  const vazio = overlay.querySelector<HTMLElement>('#mover-vazio')!;
  const erro = overlay.querySelector<HTMLElement>('#mover-erro')!;
  const botoes = Array.from(overlay.querySelectorAll<HTMLButtonElement>('[data-destino]'));
  const destinos = new Map<string, DestinoMover>();
  for (const grupo of opts.grupos) {
    for (const destino of grupo.destinos) destinos.set(destino.chave, destino);
  }

  let fechado = false;
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

  busca.addEventListener('input', () => {
    const consulta = normalizar(busca.value);
    let visiveis = 0;
    for (const botao of botoes) {
      const combina = !consulta || (botao.dataset.busca ?? '').includes(consulta);
      botao.hidden = !combina;
      if (combina) visiveis++;
    }
    overlay.querySelectorAll<HTMLElement>('[data-mover-grupo]').forEach((grupo) => {
      grupo.hidden = !Array.from(grupo.querySelectorAll<HTMLElement>('[data-destino]')).some(
        (botao) => !botao.hidden,
      );
    });
    if (vazio) vazio.hidden = visiveis > 0 || botoes.length === 0;
  });

  let ocupado = false;
  for (const botao of botoes) {
    botao.addEventListener('click', async () => {
      if (ocupado) return;
      const destino = destinos.get(botao.dataset.destino ?? '');
      if (!destino) return;

      ocupado = true;
      erro.textContent = '';
      for (const item of botoes) item.disabled = true;
      try {
        await opts.onMover(destino);
        fechar();
      } catch (e) {
        erro.textContent = e instanceof Error ? e.message : 'Não foi possível mover.';
        ocupado = false;
        for (const item of botoes) item.disabled = false;
      }
    });
  }

  overlay.querySelector('#mover-cancelar')?.addEventListener('click', fechar);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) fechar();
  });
}
