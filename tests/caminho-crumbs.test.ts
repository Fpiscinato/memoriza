import { describe, expect, it } from 'vitest';
import { crumbsCaminho } from '../src/ui/caminho-crumbs';
import type { Espaco, Tema } from '../src/types';

function espacoFake(nome: string, categoria: string): Espaco {
  return {
    id: 'espaco-1',
    perfil_id: 'perfil-1',
    nome,
    categoria,
    criado_em: '2026-01-01T00:00:00.000Z',
    atualizado_em: '2026-01-01T00:00:00.000Z',
    arquivado: false,
  };
}

function temaFake(
  id: string,
  nome: string,
  categoria: string,
  paiId?: string,
): Tema {
  return {
    id,
    espaco_id: 'espaco-1',
    nome,
    categoria,
    pai_id: paiId,
    favorito: false,
    criado_em: '2026-01-01T00:00:00.000Z',
    atualizado_em: '2026-01-01T00:00:00.000Z',
  };
}

describe('caminho com categorias', () => {
  const espaco = espacoFake('Devocional', 'Bíblia');

  it('não mostra categoria que a lista do nível esconde (uma categoria só)', () => {
    const agosto = temaFake('agosto', 'Agosto', '2026');
    expect(crumbsCaminho(espaco, [agosto], agosto).map((crumb) => crumb.label)).toEqual([
      'Pastas',
      'Bíblia',
      'Devocional',
      'Agosto',
    ]);
  });

  it('mostra a categoria quando há mais de uma categoria no mesmo nível', () => {
    const agosto = temaFake('agosto', 'Agosto', '2026');
    const setembro = temaFake('setembro', 'Setembro', '2027');
    const labels = crumbsCaminho(espaco, [agosto, setembro], agosto).map((c) => c.label);
    expect(labels).toEqual(['Pastas', 'Bíblia', 'Devocional', '2026', 'Agosto']);
  });

  it('continua mostrando categorias nos níveis mais fundos quando agrupados', () => {
    const modulo = temaFake('modulo', 'Módulo 1', 'Cursos');
    const outro = temaFake('outro', 'Outro', 'Livros');
    const aula = temaFake('aula', 'Aula 1', 'Março', 'modulo');
    const extra = temaFake('extra', 'Extra', 'Abril', 'modulo');
    const labels = crumbsCaminho(espaco, [modulo, outro, aula, extra], aula).map(
      (c) => c.label,
    );
    expect(labels).toEqual([
      'Pastas',
      'Bíblia',
      'Devocional',
      'Cursos',
      'Módulo 1',
      'Março',
      'Aula 1',
    ]);
  });
});
