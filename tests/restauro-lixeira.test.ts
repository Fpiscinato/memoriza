import { describe, expect, it } from 'vitest';
import { gerarNomeUnico, resolverConflito } from '../src/domain/restauro-lixeira';

describe('gerarNomeUnico', () => {
  it('devolve o nome original quando está livre', () => {
    expect(gerarNomeUnico('Curso', ['Livro'])).toBe('Curso');
  });

  it('acrescenta "(restaurado)" quando o nome já existe', () => {
    expect(gerarNomeUnico('Curso', ['Curso'])).toBe('Curso (restaurado)');
  });

  it('ignora maiúsculas/espaços ao comparar', () => {
    expect(gerarNomeUnico('curso', ['  CURSO '])).toBe('curso (restaurado)');
  });

  it('incrementa até achar um livre', () => {
    expect(gerarNomeUnico('Curso', ['Curso', 'Curso (restaurado)'])).toBe(
      'Curso (restaurado 2)',
    );
  });
});

describe('resolverConflito', () => {
  it('sem colegas, não há conflito', () => {
    expect(resolverConflito('Curso', [])).toEqual({ conflito: false, nomeSugerido: 'Curso' });
  });

  it('detecta conflito e sugere nome único', () => {
    expect(resolverConflito('Curso', [{ nome: 'Curso' }])).toEqual({
      conflito: true,
      nomeSugerido: 'Curso (restaurado)',
    });
  });

  it('num Tema, só considera irmãos da mesma categoria', () => {
    const existentes = [
      { nome: 'Módulo 1', categoria: 'Avançado' },
      { nome: 'Módulo 1', categoria: 'Fundamentos' },
    ];
    const r = resolverConflito('Módulo 1', existentes, 'Avançado');
    expect(r.conflito).toBe(true);
    expect(r.nomeSugerido).toBe('Módulo 1 (restaurado)');
  });

  it('num Tema, não conflita com nome igual em outra categoria', () => {
    const existentes = [{ nome: 'Módulo 1', categoria: 'Fundamentos' }];
    expect(resolverConflito('Módulo 1', existentes, 'Avançado')).toEqual({
      conflito: false,
      nomeSugerido: 'Módulo 1',
    });
  });

  it('nome vazio nunca conflita (vários "Sem nome" são permitidos)', () => {
    expect(resolverConflito('', [{ nome: '' }, { nome: '' }], 'Baixa')).toEqual({
      conflito: false,
      nomeSugerido: '',
    });
  });
});
