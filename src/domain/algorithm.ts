// Algoritmo híbrido de repetição espaçada: marco fixo (1/7/30/180 dias) + auto-avaliação
// ajustando o próximo intervalo. Pura (sem IndexedDB) para ser fácil de testar — ver
// tests/algorithm.test.ts para a tabela de transição completa.

import type { Avaliacao, EstagioRevisao } from '../types';
import { addDaysToISODate } from '../lib/time';

type EstagioNaEscada = Exclude<EstagioRevisao, 'consulta'>;

/** Escada de marcos fixos, em ordem. 'consulta' é terminal e fica fora da escada. */
const LADDER: readonly EstagioNaEscada[] = ['1', '7', '30', '180'];

const STAGE_OFFSET_DAYS: Record<Exclude<EstagioRevisao, 'consulta'>, number> = {
  '1': 1,
  '7': 7,
  '30': 30,
  '180': 180,
};

export interface NextReviewResult {
  estagio: EstagioRevisao;
  streak_facil: number;
  /** Só definido quando o novo estágio ainda entra na fila (tudo exceto 'consulta'). */
  data_agendada?: string;
  /** true quando o item deixou de ser agendado (virou 'consulta'). */
  aposentado: boolean;
}

/**
 * Calcula o próximo estágio a partir do estágio atual, da avaliação dada, e do
 * `streak_facil` acumulado até aqui. `dataConcluida` é a data (YYYY-MM-DD, fuso Londres) em
 * que a revisão foi de fato concluída — o reagendamento sempre conta a partir dela, nunca da
 * data_agendada original, pra não empilhar atraso.
 */
export function computeNextReview(
  estagioAtual: EstagioRevisao,
  avaliacao: Avaliacao,
  streakFacilAtual: number,
  dataConcluida: string,
): NextReviewResult {
  if (estagioAtual === 'consulta') {
    // Item já aposentado; não deveria chegar aqui via fila normal, mas não há para onde ir.
    return { estagio: 'consulta', streak_facil: streakFacilAtual, aposentado: true };
  }

  const idxAtual = LADDER.indexOf(estagioAtual);

  if (avaliacao === 'dificil') {
    const novoEstagio = LADDER[Math.max(0, idxAtual - 1)];
    return {
      estagio: novoEstagio,
      streak_facil: 0,
      data_agendada: addDaysToISODate(dataConcluida, STAGE_OFFSET_DAYS[novoEstagio]),
      aposentado: false,
    };
  }

  if (avaliacao === 'medio') {
    const novoEstagio = LADDER[Math.min(LADDER.length - 1, idxAtual + 1)];
    return {
      estagio: novoEstagio,
      streak_facil: 0,
      data_agendada: addDaysToISODate(dataConcluida, STAGE_OFFSET_DAYS[novoEstagio]),
      aposentado: false,
    };
  }

  // Fácil: avança dois marcos; duas fáceis seguidas (streak_facil chega a 2) aposenta.
  const novoStreak = streakFacilAtual + 1;
  const idxDoisMarcos = idxAtual + 2;
  const estagioPelaEscada: EstagioRevisao =
    idxDoisMarcos <= LADDER.length - 1 ? LADDER[idxDoisMarcos] : 'consulta';
  const estagioFinal: EstagioRevisao = novoStreak >= 2 ? 'consulta' : estagioPelaEscada;

  if (estagioFinal === 'consulta') {
    return { estagio: 'consulta', streak_facil: novoStreak, aposentado: true };
  }
  return {
    estagio: estagioFinal,
    streak_facil: novoStreak,
    data_agendada: addDaysToISODate(dataConcluida, STAGE_OFFSET_DAYS[estagioFinal]),
    aposentado: false,
  };
}
