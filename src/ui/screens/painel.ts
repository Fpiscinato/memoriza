import { getDashboardStats } from '../../db/dashboard';
import { escapeHtml } from '../../lib/dom';
import { formatDuracao } from '../../lib/time';

export interface PainelContext {
  perfilId: string;
}

const ESTAGIO_LABEL: Record<'1' | '7' | '30' | '180', string> = {
  '1': '1 dia',
  '7': '7 dias',
  '30': '30 dias',
  '180': '180 dias',
};

export async function renderPainel(container: HTMLElement, ctx: PainelContext): Promise<void> {
  const stats = await getDashboardStats(ctx.perfilId);

  const DIAS_SEMANA = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
  const hojeIndiceSemana = new Date().getDay();

  container.innerHTML = `
    <p class="screen-hint" style="margin-top:0;">Sua sequência de dias estudando e os Temas onde você mais marcou "Difícil" — os pontos fracos reais.</p>

    <div class="streak-hero">
      <div class="streak-hero__flame" aria-hidden="true">🔥</div>
      <div class="streak-hero__count">${stats.streakDias}</div>
      <div class="streak-hero__label">${stats.streakDias === 1 ? 'dia seguido estudando' : 'dias seguidos estudando'}</div>
      <div class="streak-hero__week" role="img" aria-label="Últimos 7 dias: ${stats.diasAtivosUltimos7.filter(Boolean).length} de 7 com revisão feita">
        ${stats.diasAtivosUltimos7
          .map((ativo, i) => {
            const diaSemanaIndice = (hojeIndiceSemana - (6 - i) + 7) % 7;
            return `
              <span class="streak-hero__day-col">
                <span class="streak-hero__day ${ativo ? 'streak-hero__day--ativo' : ''}"></span>
                <span class="streak-hero__day-label">${DIAS_SEMANA[diaSemanaIndice]}</span>
              </span>
            `;
          })
          .join('')}
      </div>
    </div>

    <div class="stat-grid">
      <div class="stat-tile">
        <div class="stat-tile__value">${stats.revisoesHoje}</div>
        <div class="stat-tile__label">Revisões hoje</div>
      </div>
      <div class="stat-tile">
        <div class="stat-tile__value" style="font-size: var(--font-size-md);">${formatDuracao(stats.tempoHojeSegundos)}</div>
        <div class="stat-tile__label">Tempo hoje</div>
      </div>
      <div class="stat-tile">
        <div class="stat-tile__value">${stats.revisoesUltimos7Dias}</div>
        <div class="stat-tile__label">Revisões (últimos 7 dias)</div>
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
      <span class="section-header__title" style="font-size: var(--font-size-base);">Onde suas notas estão na escada</span>
    </div>
    <p class="screen-hint" style="margin-top:0;">Quantas notas pendentes estão hoje em cada estágio — quanto mais em 30/180 dias, melhor sua retenção.</p>
    <div class="stage-grid">
      ${stats.porEstagio
        .map(
          (s) => `
        <div class="stage-tile">
          <div class="stage-tile__value">${s.count}</div>
          <div class="stage-tile__label">${ESTAGIO_LABEL[s.estagio]}</div>
        </div>
      `,
        )
        .join('')}
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
