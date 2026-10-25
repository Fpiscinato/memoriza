// Escolha de escopo da Avaliação: dá pra avaliar o Espaço inteiro (todos os Temas) ou só uma
// categoria (todos os Temas daquela categoria). Puro (sem DOM, sem IndexedDB) pra ser fácil
// de testar.

import type { NotaComTema } from '../db/notas';
import { nomeCategoriaOuSemCategoria } from './pdf-estrutura';

export interface EscopoAvaliacao {
  rotulo: string;
  escopo: 'espaco' | 'tema' | 'categoria';
  /** Categoria do escopo (só quando `escopo === 'categoria'`), pra registrar na avaliação. */
  categoria?: string;
  itens: NotaComTema[];
}

export interface ContextoEscopo {
  nomeContexto: string;
  /** 'espaco' = oferece a escolha entre o Espaço e cada categoria; 'tema' = já travado. */
  tipo: 'espaco' | 'tema';
}

/**
 * Opções de escopo disponíveis pra uma avaliação.
 * - `tipo: 'tema'`: só um Tema, já escolhido de onde o usuário veio.
 * - Uma categoria só no Espaço: cai direto no escopo inteiro, sem oferta de escolha.
 * - Várias categorias: "todo o espaço" + cada categoria (em ordem alfabética).
 */
export function montarEscopos(todas: NotaComTema[], ctx: ContextoEscopo): EscopoAvaliacao[] {
  if (ctx.tipo === 'tema') {
    return [{ rotulo: ctx.nomeContexto, escopo: 'tema', itens: todas }];
  }

  const porCategoria = new Map<string, EscopoAvaliacao>();
  for (const item of todas) {
    const categoria = item.tema.categoria ?? '';
    let escopo = porCategoria.get(categoria);
    if (!escopo) {
      escopo = {
        rotulo: nomeCategoriaOuSemCategoria(categoria),
        escopo: 'categoria',
        categoria,
        itens: [],
      };
      porCategoria.set(categoria, escopo);
    }
    escopo.itens.push(item);
  }

  if (porCategoria.size <= 1) {
    return [{ rotulo: `${ctx.nomeContexto} (toda a pasta)`, escopo: 'espaco', itens: todas }];
  }

  return [
    { rotulo: `${ctx.nomeContexto} (toda a pasta)`, escopo: 'espaco', itens: todas },
    ...[...porCategoria.values()].sort((a, b) => a.rotulo.localeCompare(b.rotulo, 'pt-BR')),
  ];
}
