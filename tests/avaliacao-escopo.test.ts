import { describe, expect, it } from 'vitest';
import { montarEscopos, type ContextoEscopo } from '../src/domain/avaliacao-escopo';
import type { NotaComTema } from '../src/db/notas';

function notaComTema(espacoId: string, temaId: string, notaId: string, temaNome: string): NotaComTema {
  return {
    espaco_id: espacoId,
    tema: { id: temaId, espaco_id: espacoId, nome: temaNome },
    nota: { id: notaId, tema_id: temaId },
  } as unknown as NotaComTema;
}

const semEspaco = 'e1';
const notas = [
  notaComTema(semEspaco, 't1', 'n1', 'Biologia'),
  notaComTema(semEspaco, 't1', 'n2', 'Biologia'),
  notaComTema(semEspaco, 't2', 'n3', 'História'),
  notaComTema(semEspaco, 't3', 'n4', 'Química'),
];

describe('montarEscopos', () => {
  it('quando vem de um Tema, oferece só esse Tema', () => {
    const ctx: ContextoEscopo = { nomeContexto: 'Biologia', tipo: 'tema' };
    const escopos = montarEscopos(notas.slice(0, 2), ctx);
    expect(escopos).toHaveLength(1);
    expect(escopos[0].escopo).toBe('tema');
    expect(escopos[0].rotulo).toBe('Biologia');
    expect(escopos[0].itens).toHaveLength(2);
  });

  it('num Espaço com vários Temas, oferece "todo o espaço" + cada Tema', () => {
    const escopos = montarEscopos(notas, { nomeContexto: 'Curso', tipo: 'espaco' });
    expect(escopos).toHaveLength(4);

    expect(escopos[0].escopo).toBe('espaco');
    expect(escopos[0].rotulo).toBe('Curso (todo o espaço)');
    expect(escopos[0].itens).toHaveLength(4);

    const rotulos = escopos.slice(1).map((e) => e.rotulo);
    expect(rotulos).toEqual(['Biologia', 'História', 'Química']);
    expect(escopos.every((e) => e.itens.length > 0)).toBe(true);
  });

  it('num Espaço com um único Tema, cai direto no escopo inteiro', () => {
    const escopos = montarEscopos(notas.slice(0, 2), { nomeContexto: 'Curso', tipo: 'espaco' });
    expect(escopos).toHaveLength(1);
    expect(escopos[0].escopo).toBe('espaco');
    expect(escopos[0].itens).toHaveLength(2);
  });
});
