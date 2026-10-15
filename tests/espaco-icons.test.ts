import { describe, expect, it } from 'vitest';
import {
  ESPACO_ICONES,
  ESPACO_ICONE_FALLBACK,
  espacoIconeChave,
  getEspacoIcone,
  sugerirEspacoIcone,
} from '../src/ui/espaco-icons';

describe('ESPACO_ICONES', () => {
  it('não tem chaves duplicadas e todas as chaves existem no mapa', () => {
    const chaves = ESPACO_ICONES.map((i) => i.chave);
    expect(new Set(chaves).size).toBe(chaves.length);
    for (const chave of chaves) {
      expect(getEspacoIcone(chave).chave).toBe(chave);
    }
  });

  it('cai no ícone padrão para chave desconhecida ou ausente', () => {
    expect(getEspacoIcone(undefined).chave).toBe(ESPACO_ICONE_FALLBACK);
    expect(getEspacoIcone('nao-existe').chave).toBe(ESPACO_ICONE_FALLBACK);
  });
});

describe('sugerirEspacoIcone', () => {
  it('sugere por palavra do nome/categoria, ignorando acentos e maiúsculas', () => {
    expect(sugerirEspacoIcone('Bíblia')).toBe('igreja');
    expect(sugerirEspacoIcone('Curso de Investimentos')).toBe('capelo');
    expect(sugerirEspacoIcone('Livro: Quem Pensa Enriquece')).toBe('livros');
  });

  it('devolve undefined quando nada casa', () => {
    expect(sugerirEspacoIcone('xyz abc')).toBeUndefined();
    expect(sugerirEspacoIcone('')).toBeUndefined();
  });
});

describe('espacoIconeChave', () => {
  it('prefere o ícone escolhido', () => {
    expect(espacoIconeChave({ icone: 'coracao', nome: 'Curso' })).toBe('coracao');
  });

  it('usa a sugestão quando não há escolha', () => {
    expect(espacoIconeChave({ nome: 'Bíblia' })).toBe('igreja');
  });

  it('cai no padrão quando não há escolha nem sugestão', () => {
    expect(espacoIconeChave({ nome: 'xpto' })).toBe(ESPACO_ICONE_FALLBACK);
  });
});
