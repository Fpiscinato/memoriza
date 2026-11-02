import { describe, expect, it } from 'vitest';
import { caminhoDe, descendentesDe, ehRaizVisivel, filhosDe, idsDaSubarvore } from '../src/domain/arvore';
import type { Tema } from '../src/types';

function tema(id: string, nome: string, paiId?: string): Tema {
  return {
    id,
    espaco_id: 'espaco',
    nome,
    categoria: '',
    pai_id: paiId,
    favorito: false,
    criado_em: '2026-01-01T00:00:00.000Z',
    atualizado_em: '2026-01-01T00:00:00.000Z',
  };
}

const a = tema('a', 'A');
const b = tema('b', 'B');
const c = tema('c', 'C', 'a');
const d = tema('d', 'D', 'c');
const e = tema('e', 'E', 'b');
const todos = [a, b, c, d, e];

describe('árvore de pastas', () => {
  it('lista filhos diretos da raiz e de uma pasta', () => {
    expect(filhosDe(todos, null).map((t) => t.id)).toEqual(['a', 'b']);
    expect(filhosDe(todos, 'a').map((t) => t.id)).toEqual(['c']);
  });

  it('desce todos os níveis em pré-ordem, sem incluir a raiz', () => {
    expect(descendentesDe(todos, 'a').map((t) => t.id)).toEqual(['c', 'd']);
    expect(idsDaSubarvore(todos, 'a')).toEqual(['a', 'c', 'd']);
  });

  it('monta o caminho da raiz até o pai imediato', () => {
    expect(caminhoDe(todos, a)).toEqual([]);
    expect(caminhoDe(todos, d).map((t) => t.id)).toEqual(['a', 'c']);
  });

  it('não entra em loop com dados corrompidos (ciclo)', () => {
    const x = tema('x', 'X', 'y');
    const y = tema('y', 'Y', 'x');
    expect(descendentesDe([x, y], 'x').map((t) => t.id)).toEqual(['y']);
    expect(caminhoDe([x, y], x).map((t) => t.id)).toEqual(['y']);
  });

  describe('quem aparece na raiz do Espaço', () => {
    it('inclui pastas sem pai e pastas cujo pai não está visível', () => {
      const orfa = tema('orfa', 'Órfã', 'pai-que-nao-existe');
      const deOutroEspaco = tema('outro', 'Outro Espaço', 'tema-de-outro-espaco');
      expect(ehRaizVisivel(todos, a)).toBe(true);
      expect(ehRaizVisivel(todos, c)).toBe(false);
      expect(ehRaizVisivel(todos, orfa)).toBe(true);
      expect(ehRaizVisivel(todos, deOutroEspaco)).toBe(true);
    });

    it('não esconde pastas com pai apontando para si mesmas', () => {
      const propria = tema('propria', 'Própria', 'propria');
      expect(ehRaizVisivel([propria], propria)).toBe(true);
    });

    it('não esconde pastas presas num ciclo de dados importados', () => {
      const x = tema('x', 'X', 'y');
      const y = tema('y', 'Y', 'x');
      expect(ehRaizVisivel([x, y], x)).toBe(true);
      expect(ehRaizVisivel([x, y], y)).toBe(true);
    });
  });
});
