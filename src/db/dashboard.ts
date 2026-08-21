import { getDB } from './schema';
import { addDaysToISODate, todayLondonISODate } from '../lib/time';
import { computeStreak } from '../domain/stats';

export interface TemaDificil {
  temaId: string;
  temaNome: string;
  count: number;
}

export interface DashboardStats {
  revisoesUltimos7Dias: number;
  streakDias: number;
  /** Um por dia dos últimos 7 (mais antigo primeiro) — true se teve alguma revisão feita naquele dia. */
  diasAtivosUltimos7: boolean[];
  rankingDificeis: TemaDificil[];
  espacosAtivos: number;
  totalTemas: number;
  totalNotas: number;
  itensEmConsulta: number;
}

const TOP_RANKING = 5;

export async function getDashboardStats(perfilId: string): Promise<DashboardStats> {
  const db = await getDB();
  const hoje = todayLondonISODate();
  const inicioJanela = addDaysToISODate(hoje, -6);

  const itens = await db.getAllFromIndex('itens_revisao', 'perfil_id', perfilId);
  const revisoesFeitas = itens.filter((i) => i.status === 'feita' && i.avaliacao);

  const revisoesUltimos7Dias = revisoesFeitas.filter(
    (i) => i.data_concluida && i.data_concluida >= inicioJanela && i.data_concluida <= hoje,
  ).length;

  const datasComAtividade = new Set(revisoesFeitas.map((i) => i.data_concluida!));
  const streakDias = computeStreak(datasComAtividade, hoje);

  const diasAtivosUltimos7: boolean[] = [];
  for (let i = 6; i >= 0; i--) {
    diasAtivosUltimos7.push(datasComAtividade.has(addDaysToISODate(hoje, -i)));
  }

  const itensEmConsulta = itens.filter((i) => i.estagio === 'consulta').length;

  const dificeis = itens.filter((i) => i.avaliacao === 'dificil');
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

  let totalTemas = 0;
  let totalNotas = 0;
  for (const espaco of espacos) {
    const temasDoEspaco = await db.getAllFromIndex('temas', 'espaco_id', espaco.id);
    totalTemas += temasDoEspaco.length;
    for (const tema of temasDoEspaco) {
      totalNotas += (await db.getAllFromIndex('notas', 'tema_id', tema.id)).length;
    }
  }

  return {
    revisoesUltimos7Dias,
    streakDias,
    diasAtivosUltimos7,
    rankingDificeis,
    espacosAtivos,
    totalTemas,
    totalNotas,
    itensEmConsulta,
  };
}
