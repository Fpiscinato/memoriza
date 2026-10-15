import { describe, expect, it } from 'vitest';
import { nomeTemaExibicao, TEMA_SEM_NOME } from '../src/domain/rotulos';

describe('nomeTemaExibicao', () => {
  it('devolve o nome quando preenchido', () => {
    expect(nomeTemaExibicao('Renda Fixa')).toBe('Renda Fixa');
  });

  it('apara espaços nas pontas', () => {
    expect(nomeTemaExibicao('  Renda Fixa  ')).toBe('Renda Fixa');
  });

  it('cai no fallback quando vazio, só espaços, undefined ou null', () => {
    expect(nomeTemaExibicao('')).toBe(TEMA_SEM_NOME);
    expect(nomeTemaExibicao('   ')).toBe(TEMA_SEM_NOME);
    expect(nomeTemaExibicao(undefined)).toBe(TEMA_SEM_NOME);
    expect(nomeTemaExibicao(null)).toBe(TEMA_SEM_NOME);
  });
});
