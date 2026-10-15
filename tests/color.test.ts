import { describe, expect, it } from 'vitest';
import { ACCENT_COUNT, accentIndexFor, assignAccentVars } from '../src/lib/color';

describe('assignAccentVars', () => {
  it('não repete cores para um conjunto de chaves (até o limite da paleta)', () => {
    const chaves = ['a', 'b', 'c', 'd'];
    const cores = assignAccentVars(chaves);
    const indices = chaves.map((k) => cores.get(k));
    expect(new Set(indices).size).toBe(chaves.length);
  });

  it('distribui todas as cores quando há exatamente ACCENT_COUNT chaves distintas', () => {
    const chaves = Array.from({ length: ACCENT_COUNT }, (_, i) => `espaco-${i}`);
    const cores = assignAccentVars(chaves);
    const indices = chaves.map((k) => cores.get(k));
    expect(new Set(indices).size).toBe(ACCENT_COUNT);
  });

  it('é determinístico e preserva a cor hash quando não há colisão', () => {
    const chaves = ['x', 'y'];
    const primeira = assignAccentVars(chaves);
    const segunda = assignAccentVars(chaves);
    expect([...primeira.entries()]).toEqual([...segunda.entries()]);
    expect(primeira.get('x')).toBe(`var(--accent-${accentIndexFor('x')})`);
  });
});
