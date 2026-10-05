import { describe, expect, it } from 'vitest';
import { compararTextos, detectarMes, ordenarPorNome, ordenarTextos } from '../src/lib/ordem';
import { agruparPorCategoria } from '../src/lib/group';

const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

describe('detectarMes', () => {
  it('reconhece meses em pt-BR por extenso e abreviado, sem acento e com ponto', () => {
    expect(detectarMes('Janeiro')).toBe(1);
    expect(detectarMes('março')).toBe(3);
    expect(detectarMes('Marco')).toBe(3);
    expect(detectarMes('Dez.')).toBe(12);
    expect(detectarMes('  OUTUBRO  ')).toBe(10);
  });

  it('reconhece meses em inglês (o fuso do app é Europe/London)', () => {
    expect(detectarMes('January')).toBe(1);
    expect(detectarMes('SEPT')).toBe(9);
    expect(detectarMes('December')).toBe(12);
  });

  it('devolve null para o que não é mês', () => {
    expect(detectarMes('Aula 1')).toBeNull();
    expect(detectarMes('')).toBeNull();
  });
});

describe('ordenarTextos', () => {
  it('coloca os meses do ano na ordem do calendário, não na alfabética', () => {
    const embaralhado = ['Março', 'Janeiro', 'Dezembro', 'Abril', 'Novembro', 'Fevereiro'];
    expect(ordenarTextos(embaralhado)).toEqual([
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Novembro', 'Dezembro',
    ]);
  });

  it('coloca os doze meses do ano na ordem do calendário, não na alfabética', () => {
    // A ordem alfabética dos meses em português seria Abril, Agosto, Dezembro, Fevereiro…
    // (é o que o app mostrava antes desta correção).
    const embaralhado = [...MESES].reverse();
    expect(ordenarTextos(embaralhado)).toEqual(MESES);
  });

  it('mantém a ordem do calendário quando os meses vêm em qualquer caixa', () => {
    expect(ordenarTextos(['dezembro', 'JANEIRO', 'Fevereiro'])).toEqual([
      'JANEIRO', 'Fevereiro', 'dezembro',
    ]);
  });

  it('trata números como número, então Aula 2 vem antes de Aula 10', () => {
    const nomes = ['Aula 10', 'Aula 2', 'Aula 1', 'Aula 20', 'Aula 3'];
    expect(ordenarTextos(nomes)).toEqual(['Aula 1', 'Aula 2', 'Aula 3', 'Aula 10', 'Aula 20']);
  });

  it('não buga ao passar de 9 para 10 em listas de tamanho grande', () => {
    const nomes = Array.from({ length: 40 }, (_, i) => `Capítulo ${40 - i}`);
    expect(ordenarTextos(nomes)).toEqual(
      Array.from({ length: 40 }, (_, i) => `Capítulo ${i + 1}`),
    );
  });

  it('ordena números puro e com zeros à esquerda', () => {
    expect(ordenarTextos(['10', '9', '100', '2', '01'])).toEqual(['01', '2', '9', '10', '100']);
  });

  it('não deixa o acento empurrar a palavra pro começo', () => {
    const saida = ordenarTextos(['ção', 'Abc', 'acao']);
    expect(saida[0]).toBe('Abc');
    expect(saida.slice(1).sort()).toEqual(['acao', 'ção'].sort());
  });

  it('NÃO trata "Mar" como março quando a lista tem itens que não são meses', () => {
    // "mar" em português é o mar. A ordem por mês só entra se a lista inteira for de meses.
    const nomes = ['Janeiro', 'Mar', 'Aula 1'];
    expect(ordenarTextos(nomes)).toEqual(['Aula 1', 'Janeiro', 'Mar']);
  });

  it('trata "Mar" como março quando a lista toda é de meses abreviados', () => {
    expect(ordenarTextos(['Nov', 'Mar', 'Jan'])).toEqual(['Jan', 'Mar', 'Nov']);
  });

  it('desempata meses repetidos pelo resto do nome', () => {
    expect(ordenarTextos(['Março — parte 2', 'Março — parte 1'])).toEqual([
      'Março — parte 1', 'Março — parte 2',
    ]);
  });

  it('devolve lista vazia sem entradas', () => {
    expect(ordenarTextos([])).toEqual([]);
  });

  it('não mexe na lista original', () => {
    const original = ['C', 'A', 'B'];
    ordenarTextos(original);
    expect(original).toEqual(['C', 'A', 'B']);
  });
});

describe('compararTextos', () => {
  it('ordena os números como número', () => {
    expect(compararTextos('Aula 2', 'Aula 10')).toBeLessThan(0);
    expect(compararTextos('Aula 10', 'Aula 2')).toBeGreaterThan(0);
  });

  it('dá empate para textos que só diferem em caixa/acento', () => {
    expect(compararTextos('acao', 'Ação')).toBe(0);
  });
});

describe('ordenarPorNome', () => {
  it('ordena objetos pelo nome, com meses em ordem de calendário', () => {
    const temas = [
      { nome: 'Março' },
      { nome: 'Janeiro' },
      { nome: 'Dezembro' },
    ];
    expect(ordenarPorNome(temas, (t) => t.nome).map((t) => t.nome)).toEqual([
      'Janeiro', 'Março', 'Dezembro',
    ]);
  });

  it('ordena objetos com números no nome', () => {
    const itens = [{ nome: 'Aula 10' }, { nome: 'Aula 2' }];
    expect(ordenarPorNome(itens, (i) => i.nome).map((i) => i.nome)).toEqual(['Aula 2', 'Aula 10']);
  });
});

describe('agruparPorCategoria com meses e números', () => {
  const item = (nome: string, categoria: string) => ({ nome, categoria });

  it('ordena os itens de cada grupo em ordem de calendário, por grupo isolado', () => {
    const itens = [
      item('Março', '2026'),
      item('Janeiro', '2026'),
      item('Dezembro', '2026'),
      item('Bíblia', 'Livros'),
    ];
    const grupos = agruparPorCategoria(itens);
    expect(grupos.map((g) => g.categoria)).toEqual(['2026', 'Livros']);
    expect(grupos[0].itens.map((i) => i.nome)).toEqual(['Janeiro', 'Março', 'Dezembro']);
  });

  it('ordena os itens de um grupo por número quando não são meses', () => {
    const itens = [item('Aula 10', 'Curso'), item('Aula 2', 'Curso'), item('Aula 1', 'Curso')];
    const grupos = agruparPorCategoria(itens);
    expect(grupos[0].itens.map((i) => i.nome)).toEqual(['Aula 1', 'Aula 2', 'Aula 10']);
  });

  it('ordena os grupos por calendário quando as categorias forem todas meses', () => {
    const itens = [
      item('Tema X', 'Dezembro'),
      item('Tema Y', 'Fevereiro'),
      item('Tema Z', 'Setembro'),
    ];
    expect(agruparPorCategoria(itens).map((g) => g.categoria)).toEqual([
      'Fevereiro', 'Setembro', 'Dezembro',
    ]);
  });

  it('mantém "Sem categoria" por último mesmo com meses nas outras categorias', () => {
    const itens = [item('A', ''), item('B', 'Março'), item('C', 'Janeiro')];
    expect(agruparPorCategoria(itens).map((g) => g.categoria)).toEqual([
      'Janeiro', 'Março', '',
    ]);
  });

  it('mantém a ordem alfabética dos grupos quando só alguns são meses', () => {
    const itens = [item('A', 'Março'), item('B', 'Aula'), item('C', 'Janeiro')];
    expect(agruparPorCategoria(itens).map((g) => g.categoria)).toEqual([
      'Aula', 'Janeiro', 'Março',
    ]);
  });
});