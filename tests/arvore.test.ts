import { describe, expect, it } from 'vitest';
import { caminhoDe, descendentesDe, filhosDe, idsDaSubarvore } from '../src/domain/arvore';
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
});
