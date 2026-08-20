import { getDashboardStats } from '../../db/dashboard';
import { escapeHtml } from '../../lib/dom';

export interface PainelContext {
  perfilId: string;
}

export async function renderPainel(container: HTMLElement, ctx: PainelContext): Promise<void> {
  const stats = await getDashboardStats(ctx.perfilId);

  container.innerHTML = `
    <div class="section-header">
      <span class="section-header__title">Painel</span>
    </div>

    <div class="stat-grid">
      <div class="stat-tile">
        <div class="stat-tile__value">${stats.revisoesUltimos7Dias}</div>
        <div class="stat-tile__label">Revisões (7 dias)</div>
      </div>
      <div class="stat-tile">
        <div class="stat-tile__value">${stats.streakDias}</div>
        <div class="stat-tile__label">Dias seguidos</div>
      </div>
      <div class="stat-tile">
        <div class="stat-tile__value">${stats.espacosAtivos}</div>
        <div class="stat-tile__label">Espaços ativos</div>
      </div>
      <div class="stat-tile">
        <div class="stat-tile__value">${stats.totalTemas}</div>
        <div class="stat-tile__label">Temas</div>
      </div>
      <div class="stat-tile">
        <div class="stat-tile__value">${stats.totalNotas}</div>
        <div class="stat-tile__label">Notas</div>
      </div>
      <div class="stat-tile">
        <div class="stat-tile__value">${stats.itensEmConsulta}</div>
        <div class="stat-tile__label">Aposentadas</div>
      </div>
    </div>

    <div class="section-header">
      <span class="section-header__title" style="font-size: var(--font-size-base);">Temas com mais "Difícil"</span>
    </div>
    ${
      stats.rankingDificeis.length === 0
        ? `<p class="text-muted">Nenhuma avaliação "Difícil" registrada ainda.</p>`
        : `
      <div class="rank-list">
        ${stats.rankingDificeis
          .map(
            (r, i) => `
          <div class="rank-row">
            <span>${i + 1}. ${escapeHtml(r.temaNome)}</span>
            <span class="badge badge--danger">${r.count}× difícil</span>
          </div>
        `,
          )
          .join('')}
      </div>
    `
    }
  `;
}
