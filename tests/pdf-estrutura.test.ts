import { describe, expect, it } from 'vitest';
import {
  anexoCategoria,
  anexoTema,
  montarIndice,
  numerarGrupos,
} from '../src/domain/pdf-estrutura';
import type { CategoriaPdf } from '../src/db/pdf-data';

function nota(titulo: string): { nota: { titulo: string }; fraca: boolean } {
  return { nota: { titulo }, fraca: false };
}

function tema(nome: string, notas: string[]): { tema: { nome: string }; notas: ReturnType<typeof nota>[] } {
  return { tema: { nome }, notas: notas.map(nota) };
}

const grupos: CategoriaPdf[] = [
  { categoria: 'Módulo 1', temas: [tema('Aula A', ['a1', 'a2']), tema('Aula B', ['b1'])] },
  { categoria: '', temas: [tema('Soltos', [])] },
  { categoria: 'Módulo 2', temas: [] },
] as unknown as CategoriaPdf[];

describe('numerarGrupos', () => {
  it('numera categoria, tema e nota em cascata', () => {
    const cats = numerarGrupos(grupos);
    expect(cats.map((c) => c.numero)).toEqual(['1', '2', '3']);
    expect(cats[0].temas.map((t) => t.numero)).toEqual(['1.1', '1.2']);
    expect(cats[0].temas[0].notas.map((n) => n.numero)).toEqual(['1.1.1', '1.1.2']);
    expect(cats[0].temas[1].notas.map((n) => n.numero)).toEqual(['1.2.1']);
  });

  it('conta as notas por categoria', () => {
    const cats = numerarGrupos(grupos);
    expect(cats.map((c) => c.totalNotas)).toEqual([3, 0, 0]);
  });

  it('com uma só categoria (PDF filtrado), a numeração recomeça em 1', () => {
    const cats = numerarGrupos([grupos[0]]);
    expect(cats[0].numero).toBe('1');
    expect(cats[0].temas[0].numero).toBe('1.1');
  });
});

describe('montarIndice', () => {
  it('lista categorias e temas com totais', () => {
    const idx = montarIndice(numerarGrupos(grupos));
    expect(idx.totalTemas).toBe(3);
    expect(idx.totalNotas).toBe(3);
    expect(idx.linhas.map((l) => `${l.nivel}:${l.numero}:${l.nome}:${l.notas}`)).toEqual([
      'categoria:1:Módulo 1:3',
      'tema:1.1:Aula A:2',
      'tema:1.2:Aula B:1',
      'categoria:2:Sem categoria:0',
      'tema:2.1:Soltos:0',
      'categoria:3:Módulo 2:0',
    ]);
  });

  it('usa âncoras sem ponto (id válido e fácil de selecionar)', () => {
    const cats = numerarGrupos(grupos);
    const idx = montarIndice(cats);
    expect(idx.linhas[0].anexo).toBe(anexoCategoria(cats[0]));
    expect(idx.linhas[1].anexo).toBe(anexoTema(cats[0].temas[0]));
    expect(idx.linhas[1].anexo).toBe('pdf-tema-1-1');
    expect(idx.linhas[0].anexo).toBe('pdf-cat-1');
  });
});
