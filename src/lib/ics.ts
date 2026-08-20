// Gera um .ics de lembrete diário, 100% no navegador (sem chamada de rede). Usa hora "flutuante"
// (sem Z, sem TZID) de propósito: é a forma padrão do RFC 5545 de dizer "nesse horário, no fuso
// que o calendário do aparelho já usa" — o jeito certo pra um lembrete pessoal de celular, sem
// precisar embutir uma tabela VTIMEZONE inteira.

import { uuid } from './uuid';
import { todayLondonISODate } from './time';

function toBasicDate(iso: string): string {
  return iso.replace(/-/g, '');
}

function toBasicDateTime(dateISO: string, horaHHMM: string): string {
  const [hora, minuto] = horaHHMM.split(':');
  return `${toBasicDate(dateISO)}T${hora.padStart(2, '0')}${minuto.padStart(2, '0')}00`;
}

function toBasicUtcStamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function escapeICSText(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,');
}

/** `horaHHMM` no formato "HH:MM" (ex: "19:30"). */
export function generateDailyReminderICS(horaHHMM: string): string {
  const dtstart = toBasicDateTime(todayLondonISODate(), horaHHMM);
  const dtstamp = toBasicUtcStamp(new Date());
  const summary = escapeICSText('Revisar Memoriza');

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Memoriza//Lembrete Diario//PT-BR',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${uuid()}@memoriza`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${dtstart}`,
    'DURATION:PT15M',
    'RRULE:FREQ=DAILY',
    `SUMMARY:${summary}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return lines.join('\r\n');
}

export function downloadICS(icsContent: string, filename = 'memoriza-lembrete.ics'): void {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
