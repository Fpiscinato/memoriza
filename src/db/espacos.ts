import { getDB } from './schema';
import type { Espaco } from '../types';
import { uuid } from '../lib/uuid';
import { nowISO } from '../lib/time';
import { distinctCategorias } from '../lib/group';

export async function listEspacos(perfilId: string): Promise<Espaco[]> {
  const db = await getDB();
  const all = await db.getAllFromIndex('espacos', 'perfil_id', perfilId);
  return all.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
}

/** Categorias já usadas em Espaços deste perfil — pra sugerir no autocomplete. */
export async function listCategoriasEspacos(perfilId: string): Promise<string[]> {
  const espacos = await listEspacos(perfilId);
  return distinctCategorias(espacos.map((e) => e.categoria));
}

export async function getEspaco(id: string): Promise<Espaco | undefined> {
  const db = await getDB();
  return db.get('espacos', id);
}

export async function createEspaco(perfilId: string, nome: string, categoria: string): Promise<Espaco> {
  const db = await getDB();
  const now = nowISO();
  const espaco: Espaco = {
    id: uuid(),
    perfil_id: perfilId,
    nome,
    categoria,
    criado_em: now,
    atualizado_em: now,
    arquivado: false,
  };
  await db.put('espacos', espaco);
  return espaco;
}

export async function updateEspaco(id: string, nome: string, categoria: string): Promise<void> {
  const db = await getDB();
  const espaco = await db.get('espacos', id);
  if (!espaco) return;
  espaco.nome = nome;
  espaco.categoria = categoria;
  espaco.atualizado_em = nowISO();
  await db.put('espacos', espaco);
}

export async function setEspacoArquivado(id: string, arquivado: boolean): Promise<void> {
  const db = await getDB();
  const espaco = await db.get('espacos', id);
  if (!espaco) return;
  espaco.arquivado = arquivado;
  espaco.arquivado_em = arquivado ? nowISO() : undefined;
  espaco.atualizado_em = nowISO();
  await db.put('espacos', espaco);
}

export interface EspacoCascadeCount {
  temas: number;
  notas: number;
}

/** Conta o que seria apagado em cascata, pra mostrar no modal de confirmação. */
export async function countEspacoCascade(espacoId: string): Promise<EspacoCascadeCount> {
  const db = await getDB();
  const temas = await db.getAllFromIndex('temas', 'espaco_id', espacoId);
  let notas = 0;
  for (const tema of temas) {
    notas += (await db.getAllFromIndex('notas', 'tema_id', tema.id)).length;
  }
  return { temas: temas.length, notas };
}

/** Apaga o Espaço e, em cascata, seus Temas, Notas e Itens de Revisão. */
export async function deleteEspacoCascade(espacoId: string): Promise<void> {
  const db = await getDB();
  const temas = await db.getAllFromIndex('temas', 'espaco_id', espacoId);

  const notasPorTema = await Promise.all(
    temas.map((tema) => db.getAllFromIndex('notas', 'tema_id', tema.id)),
  );
  const notas = notasPorTema.flat();

  const itensPorNota = await Promise.all(
    notas.map((nota) => db.getAllFromIndex('itens_revisao', 'nota_id', nota.id)),
  );
  const itens = itensPorNota.flat();

  const tx = db.transaction(['espacos', 'temas', 'notas', 'itens_revisao'], 'readwrite');
  await tx.objectStore('espacos').delete(espacoId);
  for (const tema of temas) await tx.objectStore('temas').delete(tema.id);
  for (const nota of notas) await tx.objectStore('notas').delete(nota.id);
  for (const item of itens) await tx.objectStore('itens_revisao').delete(item.id);
  await tx.done;
}
