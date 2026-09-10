import { getDashboardStats } from '../../db/dashboard';
import { escapeHtml } from '../../lib/dom';
import { formatDuracao } from '../../lib/time';
import { ICONS } from '../icons';

export interface PainelContext {
  perfilId: string;
}

const ESTAGIO_LABEL: Record<'1' | '7' | '30' | '180', string> = {
  '1': '1 dia',
  '7': '7 dias',
  '30': '30 dias',
  '180': '180 dias',
};

function labelDiaSemana(dataISO: string): string {
  return new Date(`${dataISO}T00:00:00Z`).toLocaleDateString('pt-BR', {
    timeZone: 'UTC',
    weekday: 'short',
  });
}

function formatCarga(dataISO: string): string {
  return new Date(`${dataISO}T00:00:00Z`).toLocaleDateString('pt-BR', {
    timeZone: 'UTC',
    day: '2-digit',
    month: '2-digit',
  });
}

export async function renderPainel(container: HTMLElement, ctx: PainelContext): Promise<void> {
  const stats = await getDashboardStats(ctx.perfilId);

  const DIAS_SEMANA = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
  const hojeIndiceSemana = new Date().getDay();

  const maxCarga = Math.max(1, ...stats.cargaProximos7.map((d) => d.count));
  const pctRetencao =
    stats.retencao30.total > 0
      ? {
          facil: Math.round((stats.retencao30.facil / stats.retencao30.total) * 100),
          medio: Math.round((stats.retencao30.medio / stats.retencao30.total) * 100),
          dificil: Math.round((stats.retencao30.dificil / stats.retencao30.total) * 100),
        }
      : null;

  container.innerHTML = `
    <p class="screen-hint" style="margin-top:0;">Sua sequência de dias estudando e os Temas onde você mais marcou "Difícil" — os pontos fracos reais.</p>

    <div class="streak-hero">
      <div class="streak-hero__flame" aria-hidden="true">${ICONS.flame}</div>
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
      <span class="section-header__title" style="font-size: var(--font-size-base);">Próximos 7 dias${ICONS.chart}</span>
    </div>
    <p class="screen-hint" style="margin-top:0;">Revisões pendentes agendadas por dia — amanhã primeiro.</p>
    <div class="load-chart" role="img" aria-label="Carga de revisões dos próximos 7 dias: ${stats.cargaProximos7
      .map((d) => `${d.count} em ${formatCarga(d.data)}`)
      .join(', ')}">
      ${stats.cargaProximos7
        .map((d) => {
          const diaSemana = labelDiaSemana(d.data);
          return `
          <div class="load-chart__col">
            <div class="load-chart__val">${d.count}</div>
            <div class="load-chart__bar">
              <div class="load-chart__fill" style="height: ${(d.count / maxCarga) * 100}%"></div>
            </div>
            <div class="load-chart__label">${diaSemana}</div>
          </div>
        `;
        })
        .join('')}
    </div>

    <div class="section-header">
      <span class="section-header__title" style="font-size: var(--font-size-base);">Retenção · últimos 30 dias</span>
    </div>
    <p class="screen-hint" style="margin-top:0;">% de Fácil, Médio e Difícil nas revisões feitas — o quanto você realmente está lembrando.</p>
    ${
      stats.retencao30.total === 0
        ? `<p class="text-muted">Ainda não há avaliações em 30 dias.</p>`
        : `
      <div class="retention-bar" role="img" aria-label="Fácil ${pctRetencao!.facil}%, Médio ${pctRetencao!.medio}%, Difícil ${pctRetencao!.dificil}%">
        <div class="retention-bar__fill retention-bar__fill--dificil" style="width:${pctRetencao!.dificil}%"></div>
        <div class="retention-bar__fill retention-bar__fill--medio" style="width:${pctRetencao!.medio}%"></div>
        <div class="retention-bar__fill retention-bar__fill--facil" style="width:${pctRetencao!.facil}%"></div>
      </div>
      <div class="retention-legend">
        <span class="badge badge--danger">Difícil ${pctRetencao!.dificil}%</span>
        <span class="badge" style="background:var(--color-warning-bg); color:var(--color-warning);">Médio ${pctRetencao!.medio}%</span>
        <span class="badge badge--success">Fácil ${pctRetencao!.facil}%</span>
        <span class="text-muted" style="font-size: var(--font-size-xs);">${stats.retencao30.total} avaliada(s)</span>
      </div>
    `
    }

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
