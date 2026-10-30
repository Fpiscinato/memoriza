// Rotas do breadcrumb: a categoria virou um nível navegável ("pasta virtual"), no topo do
// perfil e dentro de uma pasta. Testa só a tradução hash → rota (sem DOM/IndexedDB).

import { afterEach, describe, expect, it, vi } from 'vitest';
import { getCurrentRoute, rotaCategoria, topLevelFor } from '../src/ui/router';

function comHash(hash: string): void {
  vi.stubGlobal('window', { location: { hash } });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('rotas de categoria', () => {
  it('monta a rota no topo, dentro de um Espaço e dentro de uma pasta', () => {
    expect(rotaCategoria('Cursos')).toBe('espacos/categoria/Cursos');
    expect(rotaCategoria('Faixa Branca', { tipo: 'espaco', id: 'espaco-1' })).toBe(
      'espacos/espaco-1/categoria/Faixa%20Branca',
    );
    expect(rotaCategoria('Faixa Branca', { tipo: 'tema', id: 'tema-1' })).toBe(
      'temas/tema-1/categoria/Faixa%20Branca',
    );
  });

  it('lê a categoria do topo do perfil', () => {
    comHash('#/espacos/categoria/Cursos');
    expect(getCurrentRoute()).toEqual({ name: 'categoria-espacos', categoria: 'Cursos' });
  });

  it('lê a categoria dentro de um Espaço', () => {
    comHash('#/espacos/espaco-1/categoria/Faixa%20Branca');
    expect(getCurrentRoute()).toEqual({
      name: 'categoria-espaco',
      espacoId: 'espaco-1',
      categoria: 'Faixa Branca',
    });
  });

  it('lê a categoria dentro de uma pasta, inclusive com acento e barra', () => {
    comHash(`#/${rotaCategoria('Bíblia / Antigo', { tipo: 'tema', id: 'tema-1' })}`);
    expect(getCurrentRoute()).toEqual({
      name: 'categoria-tema',
      temaId: 'tema-1',
      categoria: 'Bíblia / Antigo',
    });
  });

  it('trata a categoria vazia como "Sem categoria" sem quebrar o caminho', () => {
    comHash('#/espacos/categoria/_sem-categoria_');
    expect(getCurrentRoute()).toEqual({ name: 'categoria-espacos', categoria: '' });
  });

  it('mantém a aba Pastas destacada nas duas rotas de categoria', () => {
    expect(
      topLevelFor({ name: 'categoria-espacos', categoria: 'Cursos' }),
    ).toBe('espacos');
    expect(
      topLevelFor({ name: 'categoria-espaco', espacoId: 'espaco-1', categoria: 'Cursos' }),
    ).toBe('espacos');
    expect(
      topLevelFor({ name: 'categoria-tema', temaId: 'tema-1', categoria: 'Cursos' }),
    ).toBe('espacos');
  });
});
