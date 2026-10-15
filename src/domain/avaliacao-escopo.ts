// Escolha de escopo da Avaliação: dá pra avaliar o Espaço inteiro (todos os Temas) ou só um
// Tema específico. Puro (sem DOM, sem IndexedDB) pra ser fácil de testar.

import type { NotaComTema } from '../db/notas';

export interface EscopoAvaliacao {
  rotulo: string;
  escopo: 'espaco' | 'tema';
  itens: NotaComTema[];
}

export interface ContextoEscopo {
  nomeContexto: string;
  /** 'espaco' = oferece a escolha entre o Espaço e cada Tema; 'tema' = já travado. */
  tipo: 'espaco' | 'tema';
}

/**
 * Opções de escopo disponíveis pra uma avaliação.
 * - `tipo: 'tema'`: só um Tema, já escolhido de onde o usuário veio.
 * - Um Tema só no Espaço: cai direto no escopo inteiro, sem oferta de escolha.
 * - Vários Temas: "todo o espaço" + cada Tema (em ordem alfabética).
 */
export function montarEscopos(todas: NotaComTema[], ctx: ContextoEscopo): EscopoAvaliacao[] {
  if (ctx.tipo === 'tema') {
    return [{ rotulo: ctx.nomeContexto, escopo: 'tema', itens: todas }];
  }

  const porTema = new Map<string, EscopoAvaliacao>();
  for (const item of todas) {
    let escopo = porTema.get(item.tema.id);
    if (!escopo) {
      escopo = { rotulo: item.tema.nome, escopo: 'tema', itens: [] };
      porTema.set(item.tema.id, escopo);
    }
    escopo.itens.push(item);
  }

  if (porTema.size <= 1) {
    return [{ rotulo: `${ctx.nomeContexto} (todo o espaço)`, escopo: 'espaco', itens: todas }];
  }

  return [
    { rotulo: `${ctx.nomeContexto} (todo o espaço)`, escopo: 'espaco', itens: todas },
    ...[...porTema.values()].sort((a, b) => a.rotulo.localeCompare(b.rotulo, 'pt-BR')),
  ];
}
