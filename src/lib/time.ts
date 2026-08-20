// Utilidades de data com fuso de referência Europe/London (considera BST automaticamente
// via Intl). Toda regra de agendamento (Fase 1b) e o aviso de backup (Fase 1a) devem
// calcular "o dia de hoje" a partir daqui, nunca de new Date() cru — evita bugs de fuso
// perto da meia-noite para quem mora fora do Reino Unido.

export const REFERENCE_TIME_ZONE = 'Europe/London';

const dateFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: REFERENCE_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/** Retorna a data (YYYY-MM-DD) correspondente ao instante `date`, no fuso de Londres. */
export function toLondonISODate(date: Date = new Date()): string {
  // en-CA formata como YYYY-MM-DD.
  return dateFormatter.format(date);
}

/** Data de hoje (YYYY-MM-DD) no fuso de Londres. */
export function todayLondonISODate(): string {
  return toLondonISODate(new Date());
}

/** Número de dias corridos entre duas datas YYYY-MM-DD (b - a). */
export function daysBetweenISODates(a: string, b: string): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  const dateA = new Date(`${a}T00:00:00Z`);
  const dateB = new Date(`${b}T00:00:00Z`);
  return Math.round((dateB.getTime() - dateA.getTime()) / msPerDay);
}

export function nowISO(): string {
  return new Date().toISOString();
}

/**
 * Soma `days` dias corridos a uma data-calendário YYYY-MM-DD. Trabalha em UTC de propósito:
 * `data_agendada`/`data_concluida`/`validade_ate` representam um dia do calendário de
 * Londres, não um instante — uma vez convertidos para YYYY-MM-DD (via toLondonISODate), a
 * aritmética de dias não deve reintroduzir fuso horário nem DST.
 */
export function addDaysToISODate(date: string, days: number): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}
