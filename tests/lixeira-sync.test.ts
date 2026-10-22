// Teste de integração (IndexedDB de verdade, via fake-indexeddb) do ciclo
// excluir -> Lixeira -> "Excluir de vez" -> sync.
//
// O bug: o item apagado de vez voltava na Lixeira depois de cada sync. A causa era a
// mesclagem do importar/sync nunca apagar o que existe local — o backup remoto ainda
// tinha a cópia do item, então ele era "recriado" (com `excluido: true`) e voltava a
// aparecer na Lixeira. A correção é a lápide de exclusão definitiva (src/domain/purga.ts).

import 'fake-indexeddb/auto';
import { describe, expect, it } from 'vitest';
import { createProfile } from '../src/db/profiles';
import { createEspaco } from '../src/db/espacos';
import { createTema } from '../src/db/temas';
import { createNota, deleteNota } from '../src/db/notas';
import { expurgarItem, listarLixeira, restaurarItem } from '../src/db/lixeira';
import { exportAll, importData } from '../src/db/export-import';
import { getDB } from '../src/db/schema';
import { criarPurga } from '../src/domain/purga';
import { searchAll } from '../src/db/search';

async function montarCenario(nome: string) {
  const perfil = await createProfile(nome);
  const espaco = await createEspaco(perfil.id, 'Espaço', 'Cursos');
  const tema = await createTema(espaco.id, 'Tema', 'Matéria');
  const nota = await createNota(tema.id, {
    titulo: 'Nota',
    conteudo: 'Conteúdo',
    fonte: '',
    pode_desatualizar: false,
  });
  return { perfil, espaco, tema, nota };
}

/** Simula o backup remoto: o conteúdo que o Gist guardaria. */
async function backupRemoto(): Promise<string> {
  return JSON.stringify(await exportAll());
}

/** Simula uma sincronização: importa o backup remoto e devolve o que seria enviado de volta. */
async function sincronizar(remoto: string): Promise<string> {
  await importData(JSON.parse(remoto));
  return JSON.stringify(await exportAll());
}

describe('Lixeira + sync: o item excluído de vez não volta', () => {
  it('não ressuscita a nota expurgada quando o backup remoto ainda tem a cópia', async () => {
    const { perfil, nota } = await montarCenario('Teste Ressurreição');

    // 1) Excluir (manda pra Lixeira) e sincronizar: o backup remoto passa a ter o item.
    await deleteNota(nota.id);
    const remoto = await backupRemoto();
    expect(JSON.parse(remoto).dados.notas.map((n: { id: string }) => n.id)).toContain(nota.id);

    // 2) "Excluir de vez" na Lixeira.
    await expurgarItem('nota', nota.id);
    expect((await listarLixeira(perfil.id)).map((i) => i.id)).not.toContain(nota.id);

    // 3) Sync: o backup remoto ainda tem a cópia antiga do item…
    const depois = JSON.parse(await sincronizar(remoto));

    // …mas o item NÃO volta pra Lixeira, nem reaparece nos dados.
    expect((await listarLixeira(perfil.id)).map((i) => i.id)).not.toContain(nota.id);
    expect(depois.dados.notas.map((n: { id: string }) => n.id)).not.toContain(nota.id);

    // 4) E o que volta pro Gist também não tem o item — o backup em nuvem perde ele de vez.
    const db = await getDB();
    expect(await db.get('notas', nota.id)).toBeUndefined();
  });

  it('apaga localmente o item que foi expurgado em outro aparelho', async () => {
    const { perfil, nota } = await montarCenario('Teste Outro Aparelho');

    // Este aparelho: a nota foi excluída (está na Lixeira) e o backup remoto tem a cópia.
    await deleteNota(nota.id);
    const remoto = await backupRemoto();

    // O "outro aparelho" expurgou a nota: chega aqui a lápide da exclusão definitiva.
    const db = await getDB();
    await db.put('purgas', criarPurga('notas', nota.id, new Date().toISOString()));

    expect((await listarLixeira(perfil.id)).map((i) => i.id)).toContain(nota.id);

    await importData(JSON.parse(remoto));

    // A cópia local do item expurgado é removida — ele não fica "escondido" na Lixeira.
    expect((await listarLixeira(perfil.id)).map((i) => i.id)).not.toContain(nota.id);
    expect(await db.get('notas', nota.id)).toBeUndefined();
  });

  it('o expurgo de um Espaço leva junto temas, notas e o item de revisão', async () => {
    const { perfil, espaco, tema, nota } = await montarCenario('Teste Cascata');
    const db = await getDB();
    const itensDaNota = await db.getAllFromIndex('itens_revisao', 'nota_id', nota.id);

    await deleteNota(nota.id);
    const remoto = await backupRemoto();
    await expurgarItem('espaco', espaco.id);

    const depois = JSON.parse(await sincronizar(remoto));
    expect(depois.dados.espacos.map((e: { id: string }) => e.id)).not.toContain(espaco.id);
    expect(depois.dados.temas.map((t: { id: string }) => t.id)).not.toContain(tema.id);
    expect(depois.dados.notas.map((n: { id: string }) => n.id)).not.toContain(nota.id);
    for (const item of itensDaNota) {
      expect(depois.dados.itens_revisao.map((i: { id: string }) => i.id)).not.toContain(item.id);
    }
    expect((await listarLixeira(perfil.id))).toHaveLength(0);
  });

  it('item na Lixeira não aparece na busca global', async () => {
    const { perfil, nota } = await montarCenario('Teste Busca');
    const db = await getDB();

    // Antes de excluir, a nota aparece na busca.
    const antes = await searchAll(perfil.id, 'Nota');
    expect(antes.map((r) => r.id)).toContain(nota.id);

    // Excluída (na Lixeira), ela some da busca.
    await deleteNota(nota.id);
    const depois = await searchAll(perfil.id, 'Nota');
    expect(depois.map((r) => r.id)).not.toContain(nota.id);

    // Restaurada, volta a aparecer.
    await restaurarItem('nota', nota.id);
    const restaurada = await searchAll(perfil.id, 'Nota');
    expect(restaurada.map((r) => r.id)).toContain(nota.id);
    expect(await db.get('notas', nota.id)).toBeDefined();
  });
});
