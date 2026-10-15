// Estrutura numerada do PDF de um Espaço: Categoria (1), Tema (1.1), Nota (1.1.1).
// Pura (sem DOM, sem IndexedDB) pra servir o PDF na tela, o texto copiado e o índice —
// os três números batem sempre, que é o ponto de "facil de saber cada nota".

import type { CategoriaPdf, NotaPdf, TemaPdf } from '../db/pdf-data';
import { nomeTemaExibicao } from './rotulos';

export interface NotaNumerada {
  notaPdf: NotaPdf;
  numero: string;
}

export interface TemaNumerada {
  temaPdf: TemaPdf;
  numero: string;
  notas: NotaNumerada[];
}

export interface CategoriaNumerada {
  grupo: CategoriaPdf;
  numero: string;
  temas: TemaNumerada[];
  totalNotas: number;
}

export interface IndiceLinha {
  nivel: 'categoria' | 'tema';
  numero: string;
  nome: string;
  notas: number;
  /** Id do elemento de destino (âncora) do índice. */
  anexo: string;
}

export interface IndicePdf {
  linhas: IndiceLinha[];
  totalTemas: number;
  totalNotas: number;
}

/** Título do índice de uma Categoria "Sem categoria" (mesmo texto mostrado no corpo). */
export function nomeCategoriaOuSemCategoria(categoria: string): string {
  return categoria || 'Sem categoria';
}

function anexoDe(numero: string, prefixo: string): string {
  // '.' não é proibido em id, mas gera seletor CSS chato de escapar — vira '-'.
  return `${prefixo}-${numero.replace(/\./g, '-')}`;
}

/** Numera categoria → tema → nota na ordem exibida. */
export function numerarGrupos(grupos: CategoriaPdf[]): CategoriaNumerada[] {
  return grupos.map((grupo, i) => {
    const numero = `${i + 1}`;
    const temas: TemaNumerada[] = grupo.temas.map((temaPdf, j) => {
      const numeroTema = `${numero}.${j + 1}`;
      return {
        temaPdf,
        numero: numeroTema,
        notas: temaPdf.notas.map((notaPdf, k) => ({
          notaPdf,
          numero: `${numeroTema}.${k + 1}`,
        })),
      };
    });
    return {
      grupo,
      numero,
      temas,
      totalNotas: temas.reduce((soma, t) => soma + t.notas.length, 0),
    };
  });
}

/** Sumário do documento: uma linha por Categoria e por Tema, com contagem de notas. */
export function montarIndice(categorias: CategoriaNumerada[]): IndicePdf {
  const linhas: IndiceLinha[] = [];
  let totalTemas = 0;
  let totalNotas = 0;

  for (const cat of categorias) {
    totalTemas += cat.temas.length;
    totalNotas += cat.totalNotas;
    linhas.push({
      nivel: 'categoria',
      numero: cat.numero,
      nome: nomeCategoriaOuSemCategoria(cat.grupo.categoria),
      notas: cat.totalNotas,
      anexo: anexoDe(cat.numero, 'pdf-cat'),
    });
    for (const tema of cat.temas) {
      linhas.push({
        nivel: 'tema',
        numero: tema.numero,
        nome: nomeTemaExibicao(tema.temaPdf.tema.nome),
        notas: tema.notas.length,
        anexo: anexoDe(tema.numero, 'pdf-tema'),
      });
    }
  }

  return { linhas, totalTemas, totalNotas };
}

/** Id do elemento de uma Categoria (mesmo cálculo do índice). */
export function anexoCategoria(cat: CategoriaNumerada): string {
  return anexoDe(cat.numero, 'pdf-cat');
}

/** Id do elemento de um Tema (mesmo cálculo do índice). */
export function anexoTema(tema: TemaNumerada): string {
  return anexoDe(tema.numero, 'pdf-tema');
}
