import { describe, expect, it } from 'vitest';
import {
  idsParaRemover,
  SNAPSHOT_AUTO_MAX,
  SNAPSHOT_MANUAL_MAX,
  SNAPSHOT_SEMANAL_SEMANAS,
  type SnapshotMeta,
} from '../src/db/snapshot-rotation';

const HOJE = '2026-06-30';

function auto(id: string, dia: string): SnapshotMeta {
  return { id, criado_em: `${dia}T10:00:00.000Z`, automatico: true };
}

function manual(id: string, dia: string): SnapshotMeta {
  return { id, criado_em: `${dia}T10:00:00.000Z`, automatico: false };
}

describe('idsParaRemover', () => {
  it('não remove nada de uma lista vazia', () => {
    expect(idsParaRemover([], HOJE)).toEqual([]);
  });

  it('mantém todos os automáticos dos últimos SNAPSHOT_DIARIO_DIAS dias', () => {
    const snaps = [auto('a', '2026-06-30'), auto('b', '2026-06-27'), auto('c', '2026-06-24')];
    expect(idsParaRemover(snaps, HOJE)).toEqual([]);
  });

  it('fora da janela diária, guarda só o mais novo de cada semana', () => {
    const snaps = [
      auto('recente', '2026-06-30'),
      auto('semana-novo', '2026-06-20'),
      auto('semana-velho', '2026-06-18'),
    ];
    expect(idsParaRemover(snaps, HOJE)).toEqual(['semana-velho']);
  });

  it('limita a quantidade de automáticos antigos a SNAPSHOT_SEMANAL_SEMANAS semanas', () => {
    const semanas = [
      '2026-06-17',
      '2026-06-10',
      '2026-06-03',
      '2026-05-27',
      '2026-05-20',
      '2026-05-13',
      '2026-05-06',
      '2026-04-29',
      '2026-04-22',
    ];
    const snaps = semanas.map((dia, i) => auto(`semana-${i}`, dia));
    const removidos = idsParaRemover(snaps, HOJE);
    expect(removidos).toEqual(['semana-8']);
    expect(semanas.length - removidos.length).toBe(SNAPSHOT_SEMANAL_SEMANAS);
  });

  it('respeita o teto geral de automáticos', () => {
    const snaps = Array.from({ length: SNAPSHOT_AUTO_MAX + 5 }, (_v, i) =>
      auto(`a${i}`, '2026-06-30'),
    );
    const removidos = idsParaRemover(snaps, HOJE);
    expect(removidos.length).toBe(5);
    expect(snaps.length - removidos.length).toBe(SNAPSHOT_AUTO_MAX);
  });

  it('limita os manuais a SNAPSHOT_MANUAL_MAX', () => {
    const snaps = Array.from({ length: SNAPSHOT_MANUAL_MAX + 3 }, (_v, i) =>
      manual(`m${i}`, '2026-06-30'),
    );
    const removidos = idsParaRemover(snaps, HOJE);
    expect(removidos.length).toBe(3);
  });
});
