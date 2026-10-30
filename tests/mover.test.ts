// "Mover" pastas e notas: troca de pai/Espaço sem recriar nada, com as travas que evitam
// ciclo, duplicata e destino arquivado. Os helpers de destino são puros; o resto usa
// fake-indexeddb como os outros testes de banco.

import 'fake-indexeddb/auto';
import { describe, expect, it } from 'vitest';
import { createProfile } from '../src/db/profiles';
import { createEspaco, setEspacoArquivado } from '../src/db/espacos';
import { createTema, getTema, getTemaRaiz, listTemas } from '../src/db/temas';
import { createNota, getNota } from '../src/db/notas';
import { listarDestinosMover, moverNota, moverTema } from '../src/db/mover';
import { caminhoLegivel, montarDestinosMover } from '../src/domain/mover-destinos';
import { idPastaPrincipal } from '../src/domain/arvore';
import { getDB } from '../src/db/schema';
import type { Espaco, Tema } from '../src/types';

// listNotas lê a ordenação do localStorage (Node puro) — mesmo shim dos outros testes.
const memoria = new Map<string, string>();
Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: {
    getItem: (chave: string) => memoria.get(chave) ?? null,
    setItem: (chave: string, valor: string) => void memoria.set(chave, valor),
    removeItem: (chave: string) => void memoria.delete(chave),
  },
});

const notaInput = (titulo: string) => ({
  titulo,
  conteudo: `Conteúdo de ${titulo}`,
  fonte: '',
  pode_desatualizar: false,
});

function espacoFake(id: string, nome: string, categoria = ''): Espaco {
  return {
    id,
    perfil_id: 'perfil',
    nome,
    categoria,
    criado_em: '2026-01-01T00:00:00.000Z',
    atualizado_em: '2026-01-01T00:00:00.000Z',
    arquivado: false,
  };
}

function temaFake(id: string, nome: string, espacoId: string, paiId?: string): Tema {
  return {
    id,
    espaco_id: espacoId,
    nome,
    categoria: '',
    pai_id: paiId,
    favorito: false,
    criado_em: '2026-01-01T00:00:00.000Z',
    atualizado_em: '2026-01-01T00:00:00.000Z',
  };
}

describe('destinos do Mover (puro)', () => {
  const espaco = espacoFake('e1', 'Curso', 'Cursos');
  const a = temaFake('a', 'Aula 2', 'e1');
  const b = temaFake('b', 'Aula 10', 'e1');
  const c = temaFake('c', 'Capítulo 1', 'e1', 'a');
  const d = temaFake('d', 'Exercícios', 'e1', 'c');
  const todos = [a, b, c, d];

  it('monta a árvore em pré-ordem, com profundidade e a raiz do Espaço primeiro', () => {
    const grupos = montarDestinosMover([espaco], todos);
    expect(grupos).toHaveLength(1);
    expect(grupos[0].destinos.map((destino) => destino.chave)).toEqual([
      'espaco:e1',
      'tema:a',
      'tema:c',
      'tema:d',
      'tema:b',
    ]);
    expect(grupos[0].destinos.map((destino) => destino.profundidade)).toEqual([0, 1, 2, 3, 1]);
    expect(grupos[0].destinos[3].caminho).toBe(
      'Cursos › Curso › Aula 2 › Capítulo 1 › Exercícios',
    );
  });

  it('tira a pasta em movimento e toda a subárvore das opções', () => {
    const grupos = montarDestinosMover([espaco], todos, { excluirTemaId: 'a' });
    expect(grupos[0].destinos.map((destino) => destino.chave)).toEqual([
      'espaco:e1',
      'tema:b',
    ]);
  });

  it('não oferece o lugar onde o item já está', () => {
    const grupos = montarDestinosMover([espaco], todos, { destinoAtual: 'tema:a' });
    expect(grupos[0].destinos.map((destino) => destino.chave)).not.toContain('tema:a');
    expect(grupos[0].destinos.map((destino) => destino.chave)).toContain('tema:c');
  });

  it('monta o caminho com as categorias e não repete um rótulo em sequência', () => {
    const raiz = espacoFake('e3', 'MGD9', 'Cursos');
    const modulo = {
      ...temaFake('p1', 'M1 - Deus e dinheiro', 'e3'),
      categoria: 'Faixa branca',
    };
    expect(caminhoLegivel(raiz, [modulo])).toBe(
      'Cursos › MGD9 › Faixa branca › M1 - Deus e dinheiro',
    );

    const repetido = { ...modulo, categoria: 'M1 - Deus e dinheiro' };
    expect(caminhoLegivel(raiz, [repetido])).toBe('Cursos › MGD9 › M1 - Deus e dinheiro');
  });

  it('agrupa por Espaço e descarta grupos sem nenhum destino', () => {
    const outro = espacoFake('e2', 'Livro', 'Livros');
    const grupos = montarDestinosMover([espaco, outro], todos, {
      destinoAtual: 'espaco:e2',
    });
    expect(grupos.map((grupo) => grupo.espacoId)).toEqual(['e1']);
  });
});

describe('mover pasta (IndexedDB)', () => {
  it('move a pasta com subpastas e notas, mantendo o conteúdo', async () => {
    const perfil = await createProfile('Teste mover pasta');
    const origem = await createEspaco(perfil.id, 'Curso', 'Cursos');
    const destino = await createEspaco(perfil.id, 'Livros', 'Livros');
    const pasta = await createTema(origem.id, 'Módulo 1', { categoria: 'Módulo 1' });
    const sub = await createTema(origem.id, 'Aula 1', {
      categoria: 'Módulo 1',
      paiId: pasta.id,
    });
    const nota = await createNota(sub.id, notaInput('O que é Duration?'));
    const alvo = await createTema(destino.id, 'Capítulo 1');

    await moverTema(pasta.id, { tipo: 'tema', id: alvo.id });

    expect((await getTema(pasta.id))!.pai_id).toBe(alvo.id);
    expect((await getTema(sub.id))!.pai_id).toBe(pasta.id);
    expect((await getNota(nota.id))!.tema_id).toBe(sub.id);
    expect((await listTemas(origem.id)).map((t) => t.id)).not.toContain(pasta.id);
    expect((await listTemas(destino.id)).map((t) => t.id)).toContain(alvo.id);
  });

  it('mover para outro Espaço leva a subárvore junto (troca o espaco_id)', async () => {
    const perfil = await createProfile('Teste mover entre pastas de topo');
    const origem = await createEspaco(perfil.id, 'Curso', 'Cursos');
    const destino = await createEspaco(perfil.id, 'Livros', 'Livros');
    const pasta = await createTema(origem.id, 'Módulo 1');
    const sub = await createTema(origem.id, 'Aula 1', { paiId: pasta.id });

    await moverTema(pasta.id, { tipo: 'espaco', id: destino.id });

    expect((await getTema(pasta.id))!.espaco_id).toBe(destino.id);
    expect((await getTema(pasta.id))!.pai_id).toBeUndefined();
    expect((await getTema(sub.id))!.espaco_id).toBe(destino.id);
    expect((await getTema(sub.id))!.pai_id).toBe(pasta.id);
    expect((await listTemas(origem.id)).length).toBe(0);
    expect((await listTemas(destino.id)).map((t) => t.id).sort()).toEqual(
      [pasta.id, sub.id].sort(),
    );
  });

  it('bloqueia mover para dentro da própria pasta ou de uma descendente', async () => {
    const perfil = await createProfile('Teste ciclo');
    const espaco = await createEspaco(perfil.id, 'Curso', 'Cursos');
    const pasta = await createTema(espaco.id, 'Módulo 1');
    const sub = await createTema(espaco.id, 'Aula 1', { paiId: pasta.id });

    await expect(moverTema(pasta.id, { tipo: 'tema', id: pasta.id })).rejects.toThrow(
      'dentro dela mesma',
    );
    await expect(moverTema(pasta.id, { tipo: 'tema', id: sub.id })).rejects.toThrow(
      'dentro dela mesma',
    );
    expect((await getTema(pasta.id))!.pai_id).toBeUndefined();
  });

  it('bloqueia nome repetido no destino e pasta de destino arquivada', async () => {
    const perfil = await createProfile('Teste destinos inválidos');
    const origem = await createEspaco(perfil.id, 'Curso', 'Cursos');
    const destino = await createEspaco(perfil.id, 'Livros', 'Livros');
    const pasta = await createTema(origem.id, 'Módulo 1');
    const alvo = await createTema(destino.id, 'Capítulo 1');
    await createTema(destino.id, 'Módulo 1', { paiId: alvo.id });

    await expect(moverTema(pasta.id, { tipo: 'tema', id: alvo.id })).rejects.toThrow(
      'Já existe uma pasta com esse nome',
    );

    await setEspacoArquivado(destino.id, true);
    await expect(moverTema(pasta.id, { tipo: 'espaco', id: destino.id })).rejects.toThrow(
      'arquivada',
    );
  });
});

describe('mover nota (IndexedDB)', () => {
  it('troca só o vínculo com a pasta, preservando a revisão', async () => {
    const perfil = await createProfile('Teste mover nota');
    const espaco = await createEspaco(perfil.id, 'Curso', 'Cursos');
    const origem = await createTema(espaco.id, 'Módulo 1');
    const destino = await createTema(espaco.id, 'Módulo 2');
    const nota = await createNota(origem.id, notaInput('O que é VaR?'));

    const db = await getDB();
    const antes = await db.getAllFromIndex('itens_revisao', 'nota_id', nota.id);

    await moverNota(nota.id, { tipo: 'tema', id: destino.id });

    expect((await getNota(nota.id))!.tema_id).toBe(destino.id);
    const depois = await db.getAllFromIndex('itens_revisao', 'nota_id', nota.id);
    expect(depois.map((item) => item.id)).toEqual(antes.map((item) => item.id));
    expect(depois.map((item) => item.data_agendada)).toEqual(antes.map((item) => item.data_agendada));
  });

  it('move para a pasta principal de outro Espaço, criando a pasta oculta', async () => {
    const perfil = await createProfile('Teste mover nota para pasta principal');
    const origem = await createEspaco(perfil.id, 'Curso', 'Cursos');
    const destino = await createEspaco(perfil.id, 'Livros', 'Livros');
    const pasta = await createTema(origem.id, 'Módulo 1');
    const nota = await createNota(pasta.id, notaInput('Resumo'));

    await moverNota(nota.id, { tipo: 'espaco', id: destino.id });

    const raiz = await getTemaRaiz(destino.id);
    expect(raiz).toBeDefined();
    expect(raiz!.id).toBe(idPastaPrincipal(destino.id));
    expect((await getNota(nota.id))!.tema_id).toBe(raiz!.id);
  });

  it('bloqueia destino arquivado e a própria pasta atual', async () => {
    const perfil = await createProfile('Teste mover nota inválida');
    const espaco = await createEspaco(perfil.id, 'Curso', 'Cursos');
    const pasta = await createTema(espaco.id, 'Módulo 1');
    const nota = await createNota(pasta.id, notaInput('Resumo'));

    await expect(moverNota(nota.id, { tipo: 'tema', id: pasta.id })).rejects.toThrow(
      'já está nessa pasta',
    );
    await setEspacoArquivado(espaco.id, true);
    await expect(moverNota(nota.id, { tipo: 'espaco', id: espaco.id })).rejects.toThrow(
      'arquivada',
    );
  });
});

describe('listarDestinosMover', () => {
  it('não oferece a pasta atual, a subárvore nem Espaços arquivados', async () => {
    const perfil = await createProfile('Teste listar destinos');
    const ativo = await createEspaco(perfil.id, 'Curso', 'Cursos');
    const arquivado = await createEspaco(perfil.id, 'Antigo', 'Cursos');
    await setEspacoArquivado(arquivado.id, true);
    const pasta = await createTema(ativo.id, 'Módulo 1');
    const sub = await createTema(ativo.id, 'Aula 1', { paiId: pasta.id });
    const irma = await createTema(ativo.id, 'Módulo 2');

    const { grupos, atual } = await listarDestinosMover(perfil.id, { temaId: pasta.id });
    expect(atual).toBe(`espaco:${ativo.id}`);
    const chaves = grupos.flatMap((grupo) => grupo.destinos.map((destino) => destino.chave));
    expect(chaves).not.toContain(`tema:${pasta.id}`);
    expect(chaves).not.toContain(`tema:${sub.id}`);
    expect(chaves).toContain(`tema:${irma.id}`);
    expect(grupos.some((grupo) => grupo.espacoId === arquivado.id)).toBe(false);
    // O Espaço atual ainda aparece como raiz? Não: a pasta já está na raiz dele.
    expect(chaves).not.toContain(`espaco:${ativo.id}`);
  });

  it('para uma nota, o destino atual é a pasta dela', async () => {
    const perfil = await createProfile('Teste listar destinos nota');
    const espaco = await createEspaco(perfil.id, 'Curso', 'Cursos');
    const pasta = await createTema(espaco.id, 'Módulo 1');
    const nota = await createNota(pasta.id, notaInput('Resumo'));

    const { atual, grupos } = await listarDestinosMover(perfil.id, { notaId: nota.id });
    expect(atual).toBe(`tema:${pasta.id}`);
    expect(grupos.flatMap((g) => g.destinos.map((d) => d.chave))).toContain(
      `espaco:${espaco.id}`,
    );
  });

  it('devolve o caminho de onde a pasta e a nota estão agora', async () => {
    const perfil = await createProfile('Teste caminho atual');
    const espaco = await createEspaco(perfil.id, 'Curso', 'Cursos');
    const pasta = await createTema(espaco.id, 'Módulo 1');
    const sub = await createTema(espaco.id, 'Aula 1', { paiId: pasta.id });
    const nota = await createNota(sub.id, notaInput('Resumo'));

    const destinoPasta = await listarDestinosMover(perfil.id, { temaId: sub.id });
    expect(destinoPasta.atualCaminho).toBe('Cursos › Curso › Módulo 1');

    const destinoNota = await listarDestinosMover(perfil.id, { notaId: nota.id });
    expect(destinoNota.atualCaminho).toBe('Cursos › Curso › Módulo 1 › Aula 1');
  });
});
