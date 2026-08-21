import { getDashboardStats } from '../../db/dashboard';
import { escapeHtml } from '../../lib/dom';

export interface PainelContext {
  perfilId: string;
}

export async function renderPainel(container: HTMLElement, ctx: PainelContext): Promise<void> {
  const stats = await getDashboardStats(ctx.perfilId);

  const DIAS_SEMANA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const hojeIndiceSemana = new Date().getDay();

  container.innerHTML = `
    <div class="section-header">
      <span class="section-header__title">Painel</span>
    </div>
    <p class="screen-hint">Sua sequência de dias estudando e os Temas onde você mais marcou "Difícil" — os pontos fracos reais.</p>

    <div class="streak-hero">
      <div class="streak-hero__flame" aria-hidden="true">🔥</div>
      <div class="streak-hero__count">${stats.streakDias}</div>
      <div class="streak-hero__label">${stats.streakDias === 1 ? 'dia seguido estudando' : 'dias seguidos estudando'}</div>
      <div class="streak-hero__week" role="img" aria-label="Últimos 7 dias: ${stats.diasAtivosUltimos7.filter(Boolean).length} de 7 com revisão feita">
        ${stats.diasAtivosUltimos7
          .map((ativo, i) => {
            const diaSemanaIndice = (hojeIndiceSemana - (6 - i) + 7) % 7;
            return `<span class="streak-hero__day ${ativo ? 'streak-hero__day--ativo' : ''}" title="${DIAS_SEMANA[diaSemanaIndice]}"></span>`;
          })
          .join('')}
      </div>
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
