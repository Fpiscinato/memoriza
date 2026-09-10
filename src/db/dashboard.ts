import { getDB } from './schema';
import { addDaysToISODate, todayLondonISODate } from '../lib/time';
import { computeStreak } from '../domain/stats';

export interface TemaDificil {
  temaId: string;
  temaNome: string;
  count: number;
}

export interface DashboardStats {
  revisoesHoje: number;
  revisoesUltimos7Dias: number;
  streakDias: number;
  /** Um por dia dos últimos 7 (mais antigo primeiro) — true se teve alguma revisão feita naquele dia. */
  diasAtivosUltimos7: boolean[];
  rankingDificeis: TemaDificil[];
  espacosAtivos: number;
  totalTemas: number;
  totalNotas: number;
  itensEmConsulta: number;
  /** Quantas notas pendentes estão hoje em cada estágio da escada (1/7/30/180 dias) — mostra o progresso, não só o que já foi feito. */
  porEstagio: { estagio: '1' | '7' | '30' | '180'; count: number }[];
  /** Soma de duracao_segundos das revisões concluídas hoje (só conta a partir de quando isso passou a ser medido). */
  tempoHojeSegundos: number;
  /** Quantas revisões pendentes estão agendadas pra cada um dos próximos 7 dias (amanhã primeiro). */
  cargaProximos7: { data: string; count: number }[];
  /** Distribuição das avaliações feitas nos últimos 30 dias — a "retenção" percebida. */
  retencao30: { facil: number; medio: number; dificil: number; total: number };
}

const TOP_RANKING = 5;

export async function getDashboardStats(perfilId: string): Promise<DashboardStats> {
  const db = await getDB();
  const hoje = todayLondonISODate();
  const inicioJanela = addDaysToISODate(hoje, -6);

  const [feitas, pendentes] = await Promise.all([
    db.getAllFromIndex('itens_revisao', 'perfil_status', IDBKeyRange.only([perfilId, 'feita'])),
    db.getAllFromIndex('itens_revisao', 'perfil_status', IDBKeyRange.only([perfilId, 'pendente'])),
  ]);
  const revisoesFeitas = feitas.filter((i) => i.avaliacao);

  const revisoesDeHoje = revisoesFeitas.filter((i) => i.data_concluida === hoje);
  const revisoesHoje = revisoesDeHoje.length;
  const tempoHojeSegundos = revisoesDeHoje.reduce((soma, i) => soma + (i.duracao_segundos ?? 0), 0);

  const revisoesUltimos7Dias = revisoesFeitas.filter(
    (i) => i.data_concluida && i.data_concluida >= inicioJanela && i.data_concluida <= hoje,
  ).length;

  const porEstagio = (['1', '7', '30', '180'] as const).map((estagio) => ({
    estagio,
    count: pendentes.filter((i) => i.estagio === estagio).length,
  }));

  const cargaProximos7: { data: string; count: number }[] = [];
  for (let i = 1; i <= 7; i++) {
    const data = addDaysToISODate(hoje, i);
    cargaProximos7.push({ data, count: pendentes.filter((x) => x.data_agendada === data).length });
  }

  const inicioJanela30 = addDaysToISODate(hoje, -29);
  const ultimos30 = revisoesFeitas.filter((i) => i.data_concluida! >= inicioJanela30);
  const retencao30 = {
    facil: ultimos30.filter((i) => i.avaliacao === 'facil').length,
    medio: ultimos30.filter((i) => i.avaliacao === 'medio').length,
    dificil: ultimos30.filter((i) => i.avaliacao === 'dificil').length,
    total: 0,
  };
  retencao30.total = retencao30.facil + retencao30.medio + retencao30.dificil;

  const datasComAtividade = new Set(revisoesFeitas.map((i) => i.data_concluida!));
  const streakDias = computeStreak(datasComAtividade, hoje);

  const diasAtivosUltimos7: boolean[] = [];
  for (let i = 6; i >= 0; i--) {
    diasAtivosUltimos7.push(datasComAtividade.has(addDaysToISODate(hoje, -i)));
  }

  const itensEmConsulta = revisoesFeitas.filter((i) => i.estagio === 'consulta').length;

  const dificeis = revisoesFeitas.filter((i) => i.avaliacao === 'dificil');
  const notaIds = Array.from(new Set(dificeis.map((i) => i.nota_id)));
  const notas = await Promise.all(notaIds.map((id) => db.get('notas', id)));
  const temaIdPorNota = new Map(
    notas.filter((n): n is NonNullable<typeof n> => !!n).map((n) => [n.id, n.tema_id]),
  );

  const contagemPorTema = new Map<string, number>();
  for (const item of dificeis) {
    const temaId = temaIdPorNota.get(item.nota_id);
    if (!temaId) continue;
    contagemPorTema.set(temaId, (contagemPorTema.get(temaId) ?? 0) + 1);
  }

  const temaIdsRanking = Array.from(contagemPorTema.keys());
  const temas = await Promise.all(temaIdsRanking.map((id) => db.get('temas', id)));
  const rankingDificeis: TemaDificil[] = temas
    .filter((t): t is NonNullable<typeof t> => !!t)
    .map((tema) => ({ temaId: tema.id, temaNome: tema.nome, count: contagemPorTema.get(tema.id)! }))
    .sort((a, b) => b.count - a.count)
    .slice(0, TOP_RANKING);

  const espacos = await db.getAllFromIndex('espacos', 'perfil_id', perfilId);
  const espacosAtivos = espacos.filter((e) => !e.arquivado).length;

  const temasPorEspaco = await Promise.all(
    espacos.map((e) => db.getAllFromIndex('temas', 'espaco_id', e.id)),
  );
  const todosTemas = temasPorEspaco.flat();
  const totalTemas = todosTemas.length;

  const notasPorTema = await Promise.all(
    todosTemas.map((tema) => db.getAllFromIndex('notas', 'tema_id', tema.id)),
  );
  const totalNotas = notasPorTema.reduce((soma, notas) => soma + notas.length, 0);

  return {
    revisoesHoje,
    revisoesUltimos7Dias,
    streakDias,
    diasAtivosUltimos7,
    rankingDificeis,
    espacosAtivos,
    totalTemas,
    totalNotas,
    itensEmConsulta,
    porEstagio,
    tempoHojeSegundos,
    cargaProximos7,
    retencao30,
  };
}

/** Soma de duracao_segundos de todas as revisões concluídas de notas deste Espaço — pro modal de Detalhes. */
export async function getTempoTotalEspaco(espacoId: string): Promise<number> {
  const db = await getDB();
  const temas = await db.getAllFromIndex('temas', 'espaco_id', espacoId);

  const notasPorTema = await Promise.all(
    temas.map((tema) => db.getAllFromIndex('notas', 'tema_id', tema.id)),
  );
  const todasNotas = notasPorTema.flat();
  const itensPorNota = await Promise.all(
    todasNotas.map((nota) => db.getAllFromIndex('itens_revisao', 'nota_id', nota.id)),
  );

  return itensPorNota
    .flat()
    .reduce((soma, item) => soma + (item.duracao_segundos ?? 0), 0);
}

/** Mesma soma de getTempoTotalEspaco, mas só das notas de UM tema — pro modal de Detalhes do Tema. */
export async function getTempoTotalTema(temaId: string): Promise<number> {
  const db = await getDB();
  const notas = await db.getAllFromIndex('notas', 'tema_id', temaId);

  const itensPorNota = await Promise.all(
    notas.map((nota) => db.getAllFromIndex('itens_revisao', 'nota_id', nota.id)),
  );

  return itensPorNota
    .flat()
    .reduce((soma, item) => soma + (item.duracao_segundos ?? 0), 0);
}
