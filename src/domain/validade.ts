import { addDaysToISODate, todayLondonISODate } from '../lib/time';

const JANELA_AVISO_DIAS = 30;

/** True quando a nota já venceu ou vence nos próximos 30 dias. */
export function precisaAvisoDeValidade(nota: {
  pode_desatualizar: boolean;
  validade_ate?: string;
}): boolean {
  if (!nota.pode_desatualizar || !nota.validade_ate) return false;
  const limiteAviso = addDaysToISODate(todayLondonISODate(), JANELA_AVISO_DIAS);
  return nota.validade_ate <= limiteAviso;
}
