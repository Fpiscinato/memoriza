// Destinos possíveis do "Mover" — pastas e notas podem trocar de lugar sem arrastar e
// soltar: o menu ⋯ abre um seletor com a árvore de pastas do perfil. Funções puras
// (sem DOM/IndexedDB) para a interface e os testes usarem a mesma regra:
//
//  - cada Espaço (pasta de topo) vira um grupo, com uma entrada "raiz" para as notas soltas
//    na pasta principal (e para mover uma pasta para o primeiro nível);
//  - dentro do grupo, as pastas aparecem em pré-ordem, com a profundidade para indentar;
//  - a pasta que está sendo movida (e tudo abaixo dela) nunca aparece como destino, senão
//    seria possível criar um ciclo.

import type { Espaco, Tema } from '../types';
import { ordenarPorNome } from '../lib/ordem';
import { descendentesDe } from './arvore';
import { nomeTemaExibicao } from './rotulos';

export type DestinoMoverTipo = 'espaco' | 'tema';

/** Chave estável de um destino — usada no DOM (`data-destino`) e para marcar o atual. */
export function chaveDestino(tipo: DestinoMoverTipo, id: string): string {
  return `${tipo}:${id}`;
}

export interface DestinoMover {
  chave: string;
  tipo: DestinoMoverTipo;
  id: string;
  nome: string;
  /** Linha de apoio exibida abaixo do nome no seletor. */
  descricao: string;
  categoria: string;
  espacoId: string;
  espacoNome: string;
  /** Caminho legível (com o Espaço), usado na busca e no rótulo acessível. */
  caminho: string;
  /** 0 = raiz do Espaço; 1 = pasta de primeiro nível; 2 = subpasta; etc. */
  profundidade: number;
  /** Aparência escolhida no destino (ausente = sugestão automática pela UI). */
  icone?: string;
  cor?: number;
  /** Nome usado para sugerir ícone quando o destino não tem escolha manual. */
  iconeNome: string;
}

export interface GrupoDestinosMover {
  espacoId: string;
  espacoNome: string;
  categoria: string;
  /** Aparência da pasta de topo que abre o grupo. */
  icone?: string;
  cor?: number;
  destinos: DestinoMover[];
}

export interface OpcoesMontarDestinos {
  /** Pasta sendo movida: ela e os descendentes saem das opções. */
  excluirTemaId?: string;
  /** Chave do destino onde o item está agora — não faz sentido oferecer de novo. */
  destinoAtual?: string | null;
  /** Rótulo da entrada que representa a raiz do Espaço. */
  rotuloRaiz?: string;
  /** Texto de apoio da entrada que representa a raiz do Espaço. */
  descricaoRaiz?: string;
}

/**
 * Monta os grupos de destino a partir dos Espaços ativos e das pastas visíveis de cada um.
 * `temas` pode vir de todos os Espaços juntos: o filtro por Espaço é feito aqui.
 */
export function montarDestinosMover(
  espacos: Espaco[],
  temas: Tema[],
  opcoes: OpcoesMontarDestinos = {},
): GrupoDestinosMover[] {
  const excluidos = new Set<string>();
  if (opcoes.excluirTemaId) {
    const alvo = temas.find((tema) => tema.id === opcoes.excluirTemaId);
    excluidos.add(opcoes.excluirTemaId);
    if (alvo) {
      for (const descendente of descendentesDe(temas, alvo.id)) excluidos.add(descendente.id);
    }
  }

  const grupos: GrupoDestinosMover[] = [];

  for (const espaco of ordenarPorNome(espacos, (e) => e.nome)) {
    const doEspaco = temas.filter((tema) => tema.espaco_id === espaco.id);
    const porId = new Map(doEspaco.map((tema) => [tema.id, tema]));
    const destinos: DestinoMover[] = [];

    const chaveRaiz = chaveDestino('espaco', espaco.id);
    if (chaveRaiz !== opcoes.destinoAtual) {
      destinos.push({
        chave: chaveRaiz,
        tipo: 'espaco',
        id: espaco.id,
        nome: opcoes.rotuloRaiz ?? 'Pasta principal',
        descricao: opcoes.descricaoRaiz ?? 'notas soltas nesta pasta',
        categoria: espaco.categoria,
        espacoId: espaco.id,
        espacoNome: espaco.nome,
        caminho: espaco.nome,
        profundidade: 0,
        icone: espaco.icone,
        cor: espaco.cor,
        iconeNome: espaco.nome,
      });
    }

    // Raízes = sem pai, ou com pai fora deste Espaço (dados antigos/importados).
    const raizes = ordenarPorNome(
      doEspaco.filter((tema) => !tema.pai_id || !porId.has(tema.pai_id)),
      (tema) => nomeTemaExibicao(tema.nome),
    );

    const visitados = new Set<string>();
    const visitar = (tema: Tema, profundidade: number, ancestrais: string[]): void => {
      if (visitados.has(tema.id)) return;
      visitados.add(tema.id);
      if (excluidos.has(tema.id)) return;

      const nome = nomeTemaExibicao(tema.nome);
      const chave = chaveDestino('tema', tema.id);
      if (chave !== opcoes.destinoAtual) {
        destinos.push({
          chave,
          tipo: 'tema',
          id: tema.id,
          nome,
          descricao: tema.categoria.trim() || 'Sem categoria',
          categoria: tema.categoria,
          espacoId: espaco.id,
          espacoNome: espaco.nome,
          caminho: [espaco.nome, ...ancestrais, nome].join(' › '),
          profundidade,
          icone: tema.icone,
          cor: tema.cor,
          iconeNome: nome,
        });
      }

      const filhos = ordenarPorNome(
        doEspaco.filter((filho) => filho.pai_id === tema.id),
        (filho) => nomeTemaExibicao(filho.nome),
      );
      for (const filho of filhos) visitar(filho, profundidade + 1, [...ancestrais, nome]);
    };

    for (const raiz of raizes) visitar(raiz, 1, []);

    if (destinos.length > 0) {
      grupos.push({
        espacoId: espaco.id,
        espacoNome: espaco.nome,
        categoria: espaco.categoria,
        icone: espaco.icone,
        cor: espaco.cor,
        destinos,
      });
    }
  }

  return grupos;
}
