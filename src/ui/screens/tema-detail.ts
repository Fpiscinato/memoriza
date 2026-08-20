import { getTema } from '../../db/temas';
import { getEspaco } from '../../db/espacos';
import { listNotas } from '../../db/notas';
import { escapeHtml } from '../../lib/dom';
import { navigate } from '../router';

function primeiraLinha(conteudo: string): string {
  const linha = conteudo.split('\n').find((l) => l.trim().length > 0) ?? '';
  return linha.length > 80 ? `${linha.slice(0, 80)}…` : linha;
}

export async function renderTemaDetail(container: HTMLElement, temaId: string): Promise<void> {
  const tema = await getTema(temaId);
  if (!tema) {
    container.innerHTML = `<p class="text-muted">Tema não encontrado.</p>`;
    return;
  }
  const espaco = await getEspaco(tema.espaco_id);
  const notas = await listNotas(temaId);

  container.innerHTML = `
    <div class="breadcrumb">
      <button class="link" data-back type="button">← ${escapeHtml(espaco?.nome ?? 'Espaço')}</button>
    </div>

    <div class="section-header">
      <span class="section-header__title">${escapeHtml(tema.nome)}</span>
      ${
        !espaco?.arquivado
          ? `<button class="btn btn--primary btn--sm" id="btn-nova-nota" type="button">+ Nova nota</button>`
          : ''
      }
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
        <div class="empty-state__icon" aria-hidden="true">📝</div>
        <div class="empty-state__title">Nenhuma nota neste tema ainda</div>
        <p class="empty-state__hint">Cada nota criada aqui já entra na fila de revisão automaticamente, a partir de amanhã.</p>
      </div>
    `
        : `
      <div class="item-list">
        ${notas
          .map(
            (n) => `
          <button class="item-row" data-open="${escapeHtml(n.id)}" type="button" style="cursor:pointer; text-align:left;">
            <span class="item-row__main">
              <span class="item-row__title">${escapeHtml(primeiraLinha(n.conteudo) || '(sem conteúdo)')}</span>
              <span class="item-row__meta">${escapeHtml(n.fonte || 'Sem fonte')}${n.pode_desatualizar ? ' · pode desatualizar' : ''}</span>
            </span>
          </button>
        `,
          )
          .join('')}
      </div>
    `
    }
  `;

  container.querySelector('[data-back]')?.addEventListener('click', () => navigate(`espacos/${tema.espaco_id}`));
  container.querySelector('#btn-nova-nota')?.addEventListener('click', () => navigate(`temas/${temaId}/nova-nota`));
  container.querySelectorAll<HTMLButtonElement>('[data-open]').forEach((btn) => {
    btn.addEventListener('click', () => navigate(`notas/${btn.dataset.open}`));
  });
}
