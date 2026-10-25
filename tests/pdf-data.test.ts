// Teste de integração (IndexedDB de verdade, via fake-indexeddb) da montagem do PDF:
// a tela antiga agrupava por categoria → tema → notas, e a v1.21 voltou a esse layout
// mantendo subpastas opcionais. O PDF precisa refletir exatamente isso.

import 'fake-indexeddb/auto';
import { describe, expect, it } from 'vitest';
import { createProfile } from '../src/db/profiles';
import { createEspaco } from '../src/db/espacos';
import { createTema } from '../src/db/temas';
import { createNota } from '../src/db/notas';
import { buildEspacoPdfData } from '../src/db/pdf-data';

// buildEspacoPdfData lê a preferência de ordenação das notas (localStorage). O ambiente de
// teste é Node puro, sem DOM — um stub mínimo basta.
const memoria = new Map<string, string>();
Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: {
    getItem: (chave: string) => memoria.get(chave) ?? null,
    setItem: (chave: string, valor: string) => void memoria.set(chave, valor),
    removeItem: (chave: string) => void memoria.delete(chave),
  },
});

describe('PDF de um Espaço', () => {
  it('agrupa os Temas de primeiro nível por categoria e mantém as subpastas em pré-ordem', async () => {
    const perfil = await createProfile('Teste PDF categorias');
    const espaco = await createEspaco(perfil.id, 'Curso de Investimentos', 'Cursos');

    const temaRaiz = await createTema(espaco.id, 'Faixa Branca', { categoria: 'Módulo 1' });
    const subpasta = await createTema(espaco.id, 'Exercícios', {
      categoria: 'Módulo 1',
      paiId: temaRaiz.id,
    });
    const outroTema = await createTema(espaco.id, 'Renda Fixa', { categoria: 'Módulo 2' });
    const semCategoria = await createTema(espaco.id, 'Anotações soltas');

    await createNota(temaRaiz.id, {
      titulo: 'Nota do tema',
      conteudo: 'Conteúdo',
      fonte: '',
      pode_desatualizar: false,
    });
    await createNota(subpasta.id, {
      titulo: 'Nota da subpasta',
      conteudo: 'Conteúdo',
      fonte: '',
      pode_desatualizar: false,
    });

    const data = await buildEspacoPdfData(espaco.id);
    expect(data).toBeDefined();

    // Categorias em ordem alfabética, com "Sem categoria" por último.
    expect(data!.grupos.map((g) => g.categoria)).toEqual(['Módulo 1', 'Módulo 2', '']);

    // A subpasta não vira um grupo próprio: ela aparece logo depois do Tema pai, com o
    // caminho no rótulo.
    expect(data!.grupos[0].temas.map((t) => t.rotulo)).toEqual([
      'Faixa Branca',
      'Faixa Branca › Exercícios',
    ]);
    expect(data!.grupos[0].temas.map((t) => t.notas.length)).toEqual([1, 1]);
    expect(data!.grupos[1].temas.map((t) => t.tema.id)).toEqual([outroTema.id]);
    expect(data!.grupos[2].temas.map((t) => t.tema.id)).toEqual([semCategoria.id]);
  });
});
