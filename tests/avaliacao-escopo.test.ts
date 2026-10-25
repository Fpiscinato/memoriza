import { describe, expect, it } from 'vitest';
import { montarEscopos, type ContextoEscopo } from '../src/domain/avaliacao-escopo';
import type { NotaComTema } from '../src/db/notas';

function notaComTema(
  espacoId: string,
  temaId: string,
  notaId: string,
  temaNome: string,
  categoria: string,
): NotaComTema {
  return {
    espaco_id: espacoId,
    tema: { id: temaId, espaco_id: espacoId, nome: temaNome, categoria },
    nota: { id: notaId, tema_id: temaId },
  } as unknown as NotaComTema;
}

const semEspaco = 'e1';
const notas = [
  notaComTema(semEspaco, 't1', 'n1', 'Biologia', 'Fundamentos'),
  notaComTema(semEspaco, 't1', 'n2', 'Biologia', 'Fundamentos'),
  notaComTema(semEspaco, 't2', 'n3', 'História', 'Avançado'),
  notaComTema(semEspaco, 't3', 'n4', 'Química', 'Avançado'),
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

  it('numa pasta com várias categorias, oferece "toda a pasta" + cada categoria', () => {
    const escopos = montarEscopos(notas, { nomeContexto: 'Curso', tipo: 'espaco' });
    expect(escopos).toHaveLength(3);

    expect(escopos[0].escopo).toBe('espaco');
    expect(escopos[0].rotulo).toBe('Curso (toda a pasta)');
    expect(escopos[0].itens).toHaveLength(4);

    const demais = escopos.slice(1);
    expect(demais.every((e) => e.escopo === 'categoria')).toBe(true);
    expect(demais.map((e) => e.rotulo)).toEqual(['Avançado', 'Fundamentos']);
    expect(demais.every((e) => e.itens.length > 0)).toBe(true);
  });

  it('guarda a categoria no escopo pra registrar na avaliação', () => {
    const escopos = montarEscopos(notas, { nomeContexto: 'Curso', tipo: 'espaco' });
    const avançado = escopos.find((e) => e.rotulo === 'Avançado')!;
    expect(avançado.categoria).toBe('Avançado');
    expect(avançado.itens).toHaveLength(2);
  });

  it('numa pasta com uma única categoria, cai direto no escopo inteiro', () => {
    const escopos = montarEscopos(notas.slice(0, 2), { nomeContexto: 'Curso', tipo: 'espaco' });
    expect(escopos).toHaveLength(1);
    expect(escopos[0].escopo).toBe('espaco');
    expect(escopos[0].itens).toHaveLength(2);
  });

  it('categoria vazia vira "Sem categoria"', () => {
    const comVazia = [
      notaComTema(semEspaco, 't1', 'n1', 'A', ''),
      notaComTema(semEspaco, 't2', 'n2', 'B', ''),
      notaComTema(semEspaco, 't3', 'n3', 'C', 'Módulo'),
    ];
    const escopos = montarEscopos(comVazia, { nomeContexto: 'Curso', tipo: 'espaco' });
    const rotulos = escopos.map((e) => e.rotulo);
    expect(rotulos).toContain('Sem categoria');
    expect(rotulos).toContain('Módulo');
  });
});
