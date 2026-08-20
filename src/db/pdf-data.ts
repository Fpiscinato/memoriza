import { getDB } from './schema';
import { agruparPorCategoria } from '../lib/group';
import { isNotaFraca } from '../domain/stats';
import type { Avaliacao, Espaco, Nota, Tema } from '../types';

export interface NotaPdf {
  nota: Nota;
  /** Histórico de avaliações com mais Difícil do que Fácil — sinaliza ponto a reforçar. */
  fraca: boolean;
}

export interface TemaPdf {
  tema: Tema;
  notas: NotaPdf[];
}

export interface CategoriaPdf {
  categoria: string;
  temas: TemaPdf[];
}

export interface EspacoPdfData {
  espaco: Espaco;
  grupos: CategoriaPdf[];
}

/** Monta os dados agrupados (categoria → tema → notas, cronológico) pra exportar em PDF. */
export async function buildEspacoPdfData(espacoId: string): Promise<EspacoPdfData | undefined> {
  const db = await getDB();
  const espaco = await db.get('espacos', espacoId);
  if (!espaco) return undefined;

  const temas = await db.getAllFromIndex('temas', 'espaco_id', espacoId);
  const gruposTemas = agruparPorCategoria(temas);

  const grupos: CategoriaPdf[] = [];
  for (const grupo of gruposTemas) {
    const temasOrdenados = [...grupo.itens].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    const temasPdf: TemaPdf[] = [];

    for (const tema of temasOrdenados) {
      const notas = (await db.getAllFromIndex('notas', 'tema_id', tema.id)).sort((a, b) =>
        a.criado_em.localeCompare(b.criado_em),
      );
      const notasPdf: NotaPdf[] = [];
      for (const nota of notas) {
        const itens = await db.getAllFromIndex('itens_revisao', 'nota_id', nota.id);
        const avaliacoes = itens.map((i) => i.avaliacao).filter((a): a is Avaliacao => !!a);
        notasPdf.push({ nota, fraca: isNotaFraca(avaliacoes) });
      }
      temasPdf.push({ tema, notas: notasPdf });
    }

    grupos.push({ categoria: grupo.categoria, temas: temasPdf });
  }

  return { espaco, grupos };
}
