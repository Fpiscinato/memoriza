import { describe, expect, it } from 'vitest';
import { mergeRecords, combineSummaries } from '../src/db/merge';

interface Item {
  id: string;
  atualizado_em: string;
  valor: string;
}

function item(id: string, atualizado_em: string, valor: string): Item {
  return { id, atualizado_em, valor };
}

describe('mergeRecords', () => {
  it('mantém um registro que só existe localmente (não apaga nada)', () => {
    const local = [item('a', '2026-01-01T00:00:00.000Z', 'local-a')];
    const incoming: Item[] = [];

    const result = mergeRecords(local, incoming);

    expect(result.merged).toEqual(local);
    expect(result.toWrite).toEqual([]);
    expect(result).toMatchObject({ criados: 0, atualizados: 0, mantidos: 0 });
  });

  it('cria um registro que só existe no arquivo importado', () => {
    const local: Item[] = [];
    const incoming = [item('b', '2026-01-01T00:00:00.000Z', 'arquivo-b')];

    const result = mergeRecords(local, incoming);

    expect(result.merged).toEqual(incoming);
    expect(result.toWrite).toEqual(incoming);
    expect(result).toMatchObject({ criados: 1, atualizados: 0, mantidos: 0 });
  });

  it('mantém o local quando o local é mais recente que o arquivo', () => {
    const local = [item('c', '2026-02-01T00:00:00.000Z', 'local-recente')];
    const incoming = [item('c', '2026-01-01T00:00:00.000Z', 'arquivo-antigo')];

    const result = mergeRecords(local, incoming);

    expect(result.merged).toEqual(local);
    expect(result.toWrite).toEqual([]);
    expect(result).toMatchObject({ criados: 0, atualizados: 0, mantidos: 1 });
  });

  it('substitui pelo registro do arquivo quando ele é mais recente que o local', () => {
    const local = [item('d', '2026-01-01T00:00:00.000Z', 'local-antigo')];
    const incoming = [item('d', '2026-02-01T00:00:00.000Z', 'arquivo-recente')];

    const result = mergeRecords(local, incoming);

    expect(result.merged).toEqual(incoming);
    expect(result.toWrite).toEqual(incoming);
    expect(result).toMatchObject({ criados: 0, atualizados: 1, mantidos: 0 });
  });

  it('mantém o local quando os timestamps são idênticos (nada muda de fato)', () => {
    const local = [item('e', '2026-01-01T00:00:00.000Z', 'igual')];
    const incoming = [item('e', '2026-01-01T00:00:00.000Z', 'igual')];

    const result = mergeRecords(local, incoming);

    expect(result.toWrite).toEqual([]);
    expect(result).toMatchObject({ criados: 0, atualizados: 0, mantidos: 1 });
  });

  it('resolve IDs conflitantes por registro dentro do mesmo lote de mesclagem', () => {
    const local = [
      item('f1', '2026-03-01T00:00:00.000Z', 'local-mais-novo'),
      item('f2', '2026-01-01T00:00:00.000Z', 'local-mais-velho'),
    ];
    const incoming = [
      item('f1', '2026-01-15T00:00:00.000Z', 'arquivo-mais-velho'), // conflito -> mantém local
      item('f2', '2026-02-01T00:00:00.000Z', 'arquivo-mais-novo'), // conflito -> aplica arquivo
      item('f3', '2026-01-01T00:00:00.000Z', 'novo-do-arquivo'), // só no arquivo -> cria
    ];

    const result = mergeRecords(local, incoming);

    const byId = new Map(result.merged.map((r) => [r.id, r]));
    expect(byId.get('f1')?.valor).toBe('local-mais-novo');
    expect(byId.get('f2')?.valor).toBe('arquivo-mais-novo');
    expect(byId.get('f3')?.valor).toBe('novo-do-arquivo');
    expect(result).toMatchObject({ criados: 1, atualizados: 1, mantidos: 1 });
  });
});

describe('combineSummaries', () => {
  it('soma os totais de várias lojas', () => {
    const total = combineSummaries([
      { criados: 1, atualizados: 2, mantidos: 3 },
      { criados: 4, atualizados: 0, mantidos: 1 },
    ]);
    expect(total).toEqual({ criados: 5, atualizados: 2, mantidos: 4 });
  });
});
