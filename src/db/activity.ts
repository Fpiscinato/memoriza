import { getDB } from './schema';
import { extrairDatasCriacoes, extrairDatasRevisoes, gerarHeatmap, unionDatas } from '../domain/activity';
import { toLondonISODate } from '../lib/time';

export interface ActivitySummary {
  datasRevisaoSet: Set<string>;
  datasCriacaoSet: Set<string>;
  totalDiasRevisao: number;
  totalDiasCriacao: number;
  totalDiasAtividade: number;
  notasCriadasHoje: number;
  revisoesFeitasHoje: number;
  notasCriadasEsteMes: number;
  revisoesFeitasEsteMes: number;
}

export async function getActivitySummary(perfilId: string): Promise<ActivitySummary> {
  const db = await getDB();
  const hoje = toLondonISODate();

  const [feitas, notas] = await Promise.all([
    db.getAllFromIndex('itens_revisao', 'perfil_status', IDBKeyRange.only([perfilId, 'feita'])),
    (async () => {
      const espacos = await db.getAllFromIndex('espacos', 'perfil_id', perfilId);
      const temasPorEspaco = await Promise.all(
        espacos.map((e) => db.getAllFromIndex('temas', 'espaco_id', e.id)),
      );
      const todosTemas = temasPorEspaco.flat();
      const notasPorTema = await Promise.all(
        todosTemas.map((tema) => db.getAllFromIndex('notas', 'tema_id', tema.id)),
      );
      return notasPorTema.flat();
    })(),
  ]);

  const datasConcluidas = feitas.filter((i) => i.data_concluida).map((i) => i.data_concluida!);
  const datasRevisaoSet = extrairDatasRevisoes(datasConcluidas);
  const datasCriacaoSet = extrairDatasCriacoes(notas.map((n) => n.criado_em));

  const revisoesFeitasHoje = feitas.filter((i) => i.data_concluida === hoje).length;
  const notasCriadasHoje = notas.filter((n) => toLondonISODate(new Date(n.criado_em)) === hoje).length;

  const ano = hoje.slice(0, 4);
  const mes = hoje.slice(5, 7);
  const mesAtualPrefix = `${ano}-${mes}`;
  const revisoesFeitasEsteMes = datasConcluidas.filter((d) => d.startsWith(mesAtualPrefix)).length;
  const notasCriadasEsteMes = notas.filter((n) => toLondonISODate(new Date(n.criado_em)).startsWith(mesAtualPrefix)).length;

  const totalDiasRevisao = datasRevisaoSet.size;
  const totalDiasCriacao = datasCriacaoSet.size;
  const totalDiasAtividade = unionDatas(datasRevisaoSet, datasCriacaoSet).size;

  return {
    datasRevisaoSet,
    datasCriacaoSet,
    totalDiasRevisao,
    totalDiasCriacao,
    totalDiasAtividade,
    notasCriadasHoje,
    revisoesFeitasHoje,
    notasCriadasEsteMes,
    revisoesFeitasEsteMes,
  };
}

export async function getHeatmapData(perfilId: string, diasAtras = 365) {
  const s = await getActivitySummary(perfilId);
  return gerarHeatmap(s.datasRevisaoSet, s.datasCriacaoSet, diasAtras);
}
