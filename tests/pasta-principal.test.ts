// Pasta principal: toda pasta de topo pode ter notas próprias, mesmo o modelo guardando
// notas sempre dentro de um Tema. A solução é uma pasta oculta por pasta de topo, com id
// determinístico — estes testes cobrem o ciclo completo (criar, listar, contar, PDF, busca,
// editar a pasta e mandar pra Lixeira).

import 'fake-indexeddb/auto';
import { describe, expect, it } from 'vitest';
import { createProfile } from '../src/db/profiles';
import {
  countEspacoCascade,
  createEspaco,
  deleteEspacoCascade,
  getEspaco,
  updateEspaco,
} from '../src/db/espacos';
import { createTema, getTema, getTemaRaiz, listTemas } from '../src/db/temas';
import {
  createNota,
  createNotaNaPastaPrincipal,
  getNota,
  listNotas,
  listNotasPorEspaco,
} from '../src/db/notas';
import { buildEspacoPdfData } from '../src/db/pdf-data';
import { searchAll } from '../src/db/search';
import { idPastaPrincipal } from '../src/domain/arvore';

// listNotas/buildEspacoPdfData leem a ordenação das notas do localStorage (Node puro).
const memoria = new Map<string, string>();
Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: {
    getItem: (chave: string) => memoria.get(chave) ?? null,
    setItem: (chave: string, valor: string) => void memoria.set(chave, valor),
    removeItem: (chave: string) => void memoria.delete(chave),
  },
});

const input = (titulo: string) => ({
  titulo,
  conteudo: `Conteúdo de ${titulo}`,
  fonte: '',
  pode_desatualizar: false,
});

describe('notas na pasta principal', () => {
  it('cria a pasta oculta com id determinístico e guarda a nota nela', async () => {
    const perfil = await createProfile('Teste pasta principal');
    const espaco = await createEspaco(perfil.id, 'Curso de Investimentos', 'Cursos');

    const nota = await createNotaNaPastaPrincipal(espaco.id, input('O que é VaR?'));

    const raiz = await getTema(idPastaPrincipal(espaco.id));
    expect(raiz).toBeDefined();
    expect(raiz!.id).toBe(idPastaPrincipal(espaco.id));
    expect(raiz!.oculta).toBe(true);
    expect(raiz!.nome).toBe(espaco.nome);
    expect(raiz!.categoria).toBe(espaco.categoria);
    expect(nota.tema_id).toBe(raiz!.id);

    // A pasta oculta nunca aparece como pasta navegável...
    expect((await listTemas(espaco.id)).some((t) => t.oculta)).toBe(false);
    // ...mas a nota dela aparece na listagem da pasta principal.
    expect((await listNotas(raiz!.id)).map((n) => n.id)).toEqual([nota.id]);
    expect((await listNotasPorEspaco(espaco.id)).map(({ nota: n }) => n.id)).toContain(nota.id);
    expect(await getTemaRaiz(espaco.id)).toBeDefined();
  });

  it('não duplica a pasta oculta ao criar várias notas soltas', async () => {
    const perfil = await createProfile('Teste pasta principal idempotente');
    const espaco = await createEspaco(perfil.id, 'Livro', 'Livros');

    await createNotaNaPastaPrincipal(espaco.id, input('Nota 1'));
    await createNotaNaPastaPrincipal(espaco.id, input('Nota 2'));

    const raiz = await getTemaRaiz(espaco.id);
    expect(raiz).toBeDefined();
    expect((await listNotas(raiz!.id)).map((n) => n.titulo).sort()).toEqual(['Nota 1', 'Nota 2']);
    expect((await listTemas(espaco.id)).length).toBe(0);
  });

  it('acompanha o nome e a categoria quando a pasta principal é editada', async () => {
    const perfil = await createProfile('Teste renomear pasta');
    const espaco = await createEspaco(perfil.id, 'Nome antigo', 'Antiga');
    await createNotaNaPastaPrincipal(espaco.id, input('Nota'));

    await updateEspaco(espaco.id, 'Nome novo', 'Nova categoria');

    const raiz = await getTema(idPastaPrincipal(espaco.id));
    expect(raiz!.nome).toBe('Nome novo');
    expect(raiz!.categoria).toBe('Nova categoria');
    expect((await getEspaco(espaco.id))!.nome).toBe('Nome novo');
  });

  it('conta as notas soltas na cascata, sem contar a pasta oculta como pasta', async () => {
    const perfil = await createProfile('Teste contagem');
    const espaco = await createEspaco(perfil.id, 'Pasta', 'Categoria');
    const tema = await createTema(espaco.id, 'Filha', { categoria: 'Módulo' });
    await createNota(tema.id, input('Nota da filha'));
    await createNotaNaPastaPrincipal(espaco.id, input('Nota solta'));

    expect(await countEspacoCascade(espaco.id)).toEqual({ temas: 1, notas: 2 });

    await deleteEspacoCascade(espaco.id);
    const raiz = await getTema(idPastaPrincipal(espaco.id));
    expect(raiz!.excluido).toBe(true);
    const solta = (await listNotasPorEspaco(espaco.id)).length;
    expect(solta).toBe(0);
  });

  it('leva as notas soltas junto na exclusão da pasta principal', async () => {
    const perfil = await createProfile('Teste exclusão');
    const espaco = await createEspaco(perfil.id, 'Pasta', 'Categoria');
    const nota = await createNotaNaPastaPrincipal(espaco.id, input('Nota solta'));

    await deleteEspacoCascade(espaco.id);

    expect((await getNota(nota.id))!.excluido).toBe(true);
  });

  it('vira a seção "Notas da pasta" no PDF, só quando há notas soltas', async () => {
    const perfil = await createProfile('Teste PDF pasta principal');
    const espaco = await createEspaco(perfil.id, 'Curso', 'Cursos');
    const tema = await createTema(espaco.id, 'Faixa Branca', { categoria: 'Módulo 1' });
    await createNota(tema.id, input('Nota da pasta interna'));

    const semSoltas = await buildEspacoPdfData(espaco.id);
    expect(semSoltas!.grupos.flatMap((g) => g.temas.map((t) => t.rotulo))).not.toContain(
      'Notas da pasta',
    );

    await createNotaNaPastaPrincipal(espaco.id, input('Nota solta'));

    const comSoltas = await buildEspacoPdfData(espaco.id);
    const grupoCursos = comSoltas!.grupos.find((g) => g.categoria === 'Cursos');
    expect(grupoCursos).toBeDefined();
    const secao = grupoCursos!.temas.find((t) => t.rotulo === 'Notas da pasta');
    expect(secao).toBeDefined();
    expect(secao!.notas.map((n) => n.nota.id)).toHaveLength(1);
  });

  it('não devolve a pasta oculta na busca, mas devolve as notas dela', async () => {
    const perfil = await createProfile('Teste busca');
    const espaco = await createEspaco(perfil.id, 'Curso de Investimentos', 'Cursos');
    await createNotaNaPastaPrincipal(espaco.id, input('O que é Value at Risk?'));

    const resultadosPasta = await searchAll(perfil.id, 'Curso de Investimentos');
    expect(resultadosPasta.some((r) => r.kind === 'tema')).toBe(false);
    expect(resultadosPasta.some((r) => r.kind === 'espaco')).toBe(true);

    const resultadosNota = await searchAll(perfil.id, 'Value at Risk');
    const nota = resultadosNota.find((r) => r.kind === 'nota');
    expect(nota).toBeDefined();
    expect(nota!.titulo).toBe('O que é Value at Risk?');
  });
});
