import { describe, expect, it } from 'vitest';
import { montarStatusHeader } from '../src/domain/header-status';

const base = {
  syncConfigurado: true,
  diasDesdeSync: 0 as number | null,
  diasDesdeSnapshot: 0 as number | null,
  lixeiraContagem: 0,
};

describe('montarStatusHeader', () => {
  it('sync configurado e recente fica verde (ok)', () => {
    const { sync } = montarStatusHeader({ ...base, diasDesdeSync: 2 });
    expect(sync.estado).toBe('ok');
    expect(sync.visivel).toBe(true);
    expect(sync.titulo).toContain('Sincronizado');
  });

  it('sync desligado fica off e visível', () => {
    const { sync } = montarStatusHeader({ ...base, syncConfigurado: false });
    expect(sync.estado).toBe('off');
    expect(sync.visivel).toBe(true);
    expect(sync.titulo).toContain('desligada');
  });

  it('sync nunca rodou fica em atenção', () => {
    const { sync } = montarStatusHeader({ ...base, diasDesdeSync: null });
    expect(sync.estado).toBe('atencao');
  });

  it('sync atrasado (acima do limite) vira atenção', () => {
    const { sync } = montarStatusHeader({ ...base, diasDesdeSync: 10 });
    expect(sync.estado).toBe('atencao');
    expect(sync.titulo).toContain('10 dias');
  });

  it('respeita o limite customizado de sync', () => {
    const { sync } = montarStatusHeader({ ...base, diasDesdeSync: 3, avisarSyncDias: 2 });
    expect(sync.estado).toBe('atencao');
  });

  it('backup sem snapshot fica em atenção', () => {
    const { backup } = montarStatusHeader({ ...base, diasDesdeSnapshot: null });
    expect(backup.estado).toBe('atencao');
    expect(backup.titulo).toContain('Nenhum snapshot');
  });

  it('backup recente fica verde (ok)', () => {
    const { backup } = montarStatusHeader({ ...base, diasDesdeSnapshot: 3 });
    expect(backup.estado).toBe('ok');
    expect(backup.titulo).toContain('em dia');
  });

  it('backup antigo vira atenção', () => {
    const { backup } = montarStatusHeader({ ...base, diasDesdeSnapshot: 40 });
    expect(backup.estado).toBe('atencao');
  });

  it('lixeira vazia fica visível mas neutra (off)', () => {
    const { lixeira } = montarStatusHeader({ ...base, lixeiraContagem: 0 });
    expect(lixeira.visivel).toBe(true);
    expect(lixeira.estado).toBe('off');
    expect(lixeira.contagem).toBe(0);
  });

  it('lixeira com itens fica visível e em atenção', () => {
    const { lixeira } = montarStatusHeader({ ...base, lixeiraContagem: 3 });
    expect(lixeira.visivel).toBe(true);
    expect(lixeira.estado).toBe('atencao');
    expect(lixeira.titulo).toContain('3 item(ns)');
  });
});
