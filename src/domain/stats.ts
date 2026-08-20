// Cálculos puros usados pelo Painel — sem IndexedDB, fáceis de testar.

import type { Avaliacao } from '../types';
import { addDaysToISODate } from '../lib/time';

/**
 * Sequência de dias seguidos com pelo menos uma revisão feita, contando pra trás a partir
 * de hoje. Se hoje ainda não teve nenhuma revisão, isso sozinho não quebra a sequência — ela
 * conta a partir de ontem (o dia só "conta como quebrado" na virada, não durante ele).
 */
export function computeStreak(datasComAtividade: ReadonlySet<string>, hoje: string): number {
  let cursor = datasComAtividade.has(hoje) ? hoje : addDaysToISODate(hoje, -1);
  if (!datasComAtividade.has(cursor)) return 0;

  let streak = 0;
  while (datasComAtividade.has(cursor)) {
    streak++;
    cursor = addDaysToISODate(cursor, -1);
  }
  return streak;
}

/** Nota "fraca": o histórico de avaliações tem mais Difícil do que Fácil. */
export function isNotaFraca(avaliacoes: Avaliacao[]): boolean {
  const dificeis = avaliacoes.filter((a) => a === 'dificil').length;
  const faceis = avaliacoes.filter((a) => a === 'facil').length;
  return dificeis > faceis;
}
