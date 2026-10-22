import { describe, expect, it } from 'vitest';
import {
  criarPurga,
  filtrarPurgados,
  chavePurga,
  mergePurgas,
  purgaCobre,
  purgasParaGravar,
} from '../src/domain/purga';
import { mergeRecordsComPurga } from '../src/db/merge';
import type { Purga } from '../src/types';

const T0 = '2026-01-01T10:00:00.000Z';
const T1 = '2026-02-01T10:00:00.000Z';
const T2 = '2026-03-01T10:00:00.000Z';

interface NotaFake {
  id: string;
  titulo: string;
  atualizado_em: string;
}

function nota(id: string, atualizadoEm: string): NotaFake {
  return { id, titulo: 'Nota', atualizado_em: atualizadoEm };
}

describe('criarPurga', () => {
  it('cria uma lápide determinística (mesmo alvo = mesma lápide)', () => {
    const a = criarPurga('notas', 'n1', T1);
    const b = criarPurga('notas', 'n1', T2);
    expect(a.id).toBe(b.id);
    expect(a.loja).toBe('notas');
    expect(a.alvo_id).toBe('n1');
  });

  it('distingue lojas diferentes com o mesmo id', () => {
    expect(chavePurga('notas', 'x')).not.toBe(chavePurga('temas', 'x'));
  });
});

describe('purgaCobre', () => {
  const purgas = [criarPurga('notas', 'n1', T1)];

  it('cobre o registro quando a exclusão é mais recente', () => {
    expect(purgaCobre(purgas, 'notas', 'n1', T0)).toBe(true);
  });

  it('não cobre quando o registro foi mexido depois da exclusão', () => {
    expect(purgaCobre(purgas, 'notas', 'n1', T2)).toBe(false);
  });

  it('não cobre registro de outra loja', () => {
    expect(purgaCobre(purgas, 'temas', 'n1', T0)).toBe(false);
  });

  it('não cobre outro registro', () => {
    expect(purgaCobre(purgas, 'notas', 'n2', T0)).toBe(false);
  });
});

describe('mergePurgas', () => {
  it('mantém a lápide mais recente quando as duas têm o mesmo alvo', () => {
    const local = [criarPurga('notas', 'n1', T1)];
    const incoming = [criarPurga('notas', 'n1', T2)];
    const merged = mergePurgas(local, incoming);
    expect(merged).toHaveLength(1);
    expect(merged[0].purgado_em).toBe(T2);
  });

  it('une lápides de alvos diferentes', () => {
    const merged = mergePurgas([criarPurga('notas', 'n1', T1)], [criarPurga('temas', 't1', T1)]);
    expect(merged).toHaveLength(2);
  });

  it('ignora lápides malformadas vindas de arquivo antigo', () => {
    const quebrada = { id: 'x', purgado_em: T1 } as unknown as Purga;
    expect(mergePurgas([], [quebrada])).toHaveLength(0);
  });
});

describe('purgasParaGravar', () => {
  it('grava só as lápides novas ou mais recentes que a local', () => {
    const local = [criarPurga('notas', 'n1', T2)];
    const incoming = [criarPurga('notas', 'n1', T1), criarPurga('notas', 'n2', T1)];
    const paraGravar = purgasParaGravar(local, incoming);
    expect(paraGravar.map((p) => p.alvo_id)).toEqual(['n2']);
  });
});

describe('filtrarPurgados', () => {
  it('tira do export os registros cobertos por lápide', () => {
    const purgas = [criarPurga('notas', 'n1', T1)];
    const registros = [nota('n1', T0), nota('n2', T0)];
    expect(filtrarPurgados(registros, purgas, 'notas').map((n) => n.id)).toEqual(['n2']);
  });
});

describe('mergeRecordsComPurga — o item da Lixeira não volta', () => {
  it('ignora o registro do backup quando ele foi purgado de vez (e não recria localmente)', () => {
    const local: NotaFake[] = [];
    const incoming = [nota('n1', T0)];
    const purgas = [criarPurga('notas', 'n1', T1)];

    const result = mergeRecordsComPurga(local, incoming, purgas, 'notas');

    expect(result.toWrite).toHaveLength(0);
    expect(result.merged).toHaveLength(0);
    expect(result.ignorados).toEqual(['n1']);
  });

  it('apaga localmente o registro que foi purgado em outro aparelho', () => {
    const local = [nota('n1', T0)];
    const incoming: NotaFake[] = [];
    const purgas = [criarPurga('notas', 'n1', T1)];

    const result = mergeRecordsComPurga(local, incoming, purgas, 'notas');

    expect(result.apagados).toEqual(['n1']);
    expect(result.merged).toHaveLength(0);
  });

  it('mantém o registro que foi mexido depois da purga (restaurado e editado)', () => {
    const local = [nota('n1', T2)];
    const incoming = [nota('n1', T0)];
    const purgas = [criarPurga('notas', 'n1', T1)];

    const result = mergeRecordsComPurga(local, incoming, purgas, 'notas');

    expect(result.apagados).toHaveLength(0);
    expect(result.merged).toHaveLength(1);
    expect(result.merged[0].atualizado_em).toBe(T2);
  });

  it('sem lápide, o comportamento antigo continua: o backup recria o registro', () => {
    const result = mergeRecordsComPurga([], [nota('n1', T0)], [], 'notas');
    expect(result.toWrite.map((n) => n.id)).toEqual(['n1']);
  });
});
