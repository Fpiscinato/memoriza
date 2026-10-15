import { describe, expect, it } from 'vitest';
import { marcarExcluido, marcarRestaurado } from '../src/db/lixeira';

interface Registro {
  id: string;
  nome: string;
  atualizado_em: string;
  excluido?: boolean;
  excluido_em?: string;
}

const base: Registro = { id: '1', nome: 'Bio', atualizado_em: '2026-01-01T00:00:00.000Z' };

describe('marcarExcluido', () => {
  it('marca o registro e carimba a data de exclusão e de atualização', () => {
    const marcado = marcarExcluido(base, '2026-02-02T10:00:00.000Z');
    expect(marcado.excluido).toBe(true);
    expect(marcado.excluido_em).toBe('2026-02-02T10:00:00.000Z');
    expect(marcado.atualizado_em).toBe('2026-02-02T10:00:00.000Z');
  });

  it('não muta o registro original', () => {
    marcarExcluido(base, '2026-02-02T10:00:00.000Z');
    expect(base.excluido).toBeUndefined();
    expect(base.excluido_em).toBeUndefined();
  });
});

describe('marcarRestaurado', () => {
  it('remove as marcas de exclusão e atualiza a data', () => {
    const marcado = marcarExcluido(base, '2026-02-02T10:00:00.000Z');
    const voltou = marcarRestaurado(marcado, '2026-03-03T10:00:00.000Z');
    expect(voltou.excluido).toBeUndefined();
    expect(voltou.excluido_em).toBeUndefined();
    expect(voltou.atualizado_em).toBe('2026-03-03T10:00:00.000Z');
    expect(voltou.id).toBe('1');
  });
});
