import { describe, expect, it } from 'vitest';
import { computeStreak, isNotaFraca } from '../src/domain/stats';
import { agruparPorCategoria } from '../src/lib/group';

describe('computeStreak', () => {
  it('é 0 quando não há nenhuma atividade recente', () => {
    expect(computeStreak(new Set(), '2026-03-10')).toBe(0);
    expect(computeStreak(new Set(['2026-01-01']), '2026-03-10')).toBe(0);
  });

  it('conta a sequência terminando hoje quando hoje já teve atividade', () => {
    const datas = new Set(['2026-03-08', '2026-03-09', '2026-03-10']);
    expect(computeStreak(datas, '2026-03-10')).toBe(3);
  });

  it('não quebra a sequência só porque hoje ainda não teve revisão', () => {
    const datas = new Set(['2026-03-08', '2026-03-09']);
    expect(computeStreak(datas, '2026-03-10')).toBe(2);
  });

  it('para na primeira lacuna', () => {
    const datas = new Set(['2026-03-06', '2026-03-09', '2026-03-10']);
    expect(computeStreak(datas, '2026-03-10')).toBe(2);
  });
});

describe('isNotaFraca', () => {
  it('é fraca quando difícil > fácil', () => {
    expect(isNotaFraca(['dificil', 'dificil', 'facil'])).toBe(true);
  });

  it('não é fraca quando fácil >= difícil', () => {
    expect(isNotaFraca(['dificil', 'facil'])).toBe(false);
    expect(isNotaFraca(['facil', 'facil', 'dificil'])).toBe(false);
  });

  it('não é fraca sem histórico', () => {
    expect(isNotaFraca([])).toBe(false);
  });

  it('ignora avaliações médias na contagem', () => {
    expect(isNotaFraca(['medio', 'medio', 'dificil'])).toBe(true);
  });
});

describe('agruparPorCategoria', () => {
  interface Item {
    nome: string;
    categoria: string;
  }

  it('agrupa por categoria e ordena alfabeticamente, com "Sem categoria" por último', () => {
    const itens: Item[] = [
      { nome: 'B', categoria: 'Livros' },
      { nome: 'A', categoria: '' },
      { nome: 'C', categoria: 'Cursos' },
      { nome: 'D', categoria: 'Livros' },
    ];
    const grupos = agruparPorCategoria(itens);
    expect(grupos.map((g) => g.categoria)).toEqual(['Cursos', 'Livros', '']);
    expect(grupos.find((g) => g.categoria === 'Livros')?.itens.map((i) => i.nome)).toEqual(['B', 'D']);
  });

  it('trata categoria só com espaços como "Sem categoria"', () => {
    const itens: Item[] = [{ nome: 'A', categoria: '   ' }];
    const grupos = agruparPorCategoria(itens);
    expect(grupos).toEqual([{ categoria: '', itens }]);
  });
});
