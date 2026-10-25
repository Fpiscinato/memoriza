import { getDB } from './schema';
import { agruparPorCategoria } from '../lib/group';
import { getNotasOrdem } from '../lib/settings';
import { ordenarPorNome } from '../lib/ordem';
import { isNotaFraca } from '../domain/stats';
import { nomeTemaExibicao } from '../domain/rotulos';
import type { Avaliacao, Espaco, Nota, Tema } from '../types';

export interface NotaPdf {
  nota: Nota;
  /** Histórico de avaliações com mais Difícil do que Fácil — sinaliza ponto a reforçar. */
  fraca: boolean;
}

export interface TemaPdf {
  tema: Tema;
  /** Caminho dentro do grupo (ex: "Capítulo 2 › Exercícios"), pra não perder a hierarquia
   *  quando o Tema tem subpastas. Ausente em dados antigos/testes: cai no nome do Tema. */
  rotulo?: string;
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

/**
 * Monta os dados do PDF agrupados por categoria → tema → notas (como na tela). Temas com
 * subpastas aparecem em pré-ordem dentro da categoria, com o caminho no rótulo (ex:
 * "Módulo 1 › Exercícios"), então a hierarquia opcional continua legível.
 */
export async function buildEspacoPdfData(espacoId: string): Promise<EspacoPdfData | undefined> {
  const db = await getDB();
  const espaco = await db.get('espacos', espacoId);
  if (!espaco) return undefined;

  const temas = (await db.getAllFromIndex('temas', 'espaco_id', espacoId)).filter(
    (t) => !t.excluido,
  );
  const porTitulo = getNotasOrdem() === 'titulo';
  const idsValidos = new Set(temas.map((t) => t.id));

  const filhosPorPai = new Map<string, Tema[]>();
  for (const tema of temas) {
    if (!tema.pai_id || !idsValidos.has(tema.pai_id)) continue;
    const lista = filhosPorPai.get(tema.pai_id);
    if (lista) lista.push(tema);
    else filhosPorPai.set(tema.pai_id, [tema]);
  }
  for (const lista of filhosPorPai.values()) ordenarPorNome(lista, (t) => t.nome);

  // Só os Temas de primeiro nível entram nos grupos de categoria; as subpastas (filhas)
  // aparecem logo abaixo do Tema pai, em pré-ordem.
  const raizes = temas.filter((t) => !t.pai_id || !idsValidos.has(t.pai_id));
  const gruposTemas = agruparPorCategoria(raizes);

  const montarNotas = async (tema: Tema): Promise<NotaPdf[]> => {
    const notas = (await db.getAllFromIndex('notas', 'tema_id', tema.id)).filter((n) => !n.excluido);
    if (porTitulo) ordenarPorNome(notas, (n) => n.titulo);
    else notas.sort((a, b) => a.criado_em.localeCompare(b.criado_em));

    const notasPdf: NotaPdf[] = [];
    for (const nota of notas) {
      const itens = await db.getAllFromIndex('itens_revisao', 'nota_id', nota.id);
      const avaliacoes = itens.map((i) => i.avaliacao).filter((a): a is Avaliacao => !!a);
      notasPdf.push({ nota, fraca: isNotaFraca(avaliacoes) });
    }
    return notasPdf;
  };

  const grupos: CategoriaPdf[] = [];
  for (const grupo of gruposTemas) {
    const temasPdf: TemaPdf[] = [];
    const visitar = async (tema: Tema, prefixo: string): Promise<void> => {
      const nome = nomeTemaExibicao(tema.nome);
      const rotulo = prefixo ? `${prefixo} › ${nome}` : nome;
      temasPdf.push({ tema, rotulo, notas: await montarNotas(tema) });
      for (const filho of filhosPorPai.get(tema.id) ?? []) {
        await visitar(filho, rotulo);
      }
    };
    for (const raiz of grupo.itens) await visitar(raiz, '');
    grupos.push({ categoria: grupo.categoria, temas: temasPdf });
  }

  return { espaco, grupos };
}
