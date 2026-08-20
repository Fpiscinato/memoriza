import { getDB } from './schema';
import type { Tema } from '../types';
import { uuid } from '../lib/uuid';
import { nowISO } from '../lib/time';

export async function listTemas(espacoId: string): Promise<Tema[]> {
  const db = await getDB();
  const all = await db.getAllFromIndex('temas', 'espaco_id', espacoId);
  return all.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
}

export async function getTema(id: string): Promise<Tema | undefined> {
  const db = await getDB();
  return db.get('temas', id);
}

export async function createTema(espacoId: string, nome: string, categoria: string): Promise<Tema> {
  const db = await getDB();
  const now = nowISO();
  const tema: Tema = {
    id: uuid(),
    espaco_id: espacoId,
    nome,
    categoria,
    criado_em: now,
    atualizado_em: now,
  };
  await db.put('temas', tema);
  return tema;
}

export async function updateTema(id: string, nome: string, categoria: string): Promise<void> {
  const db = await getDB();
  const tema = await db.get('temas', id);
  if (!tema) return;
  tema.nome = nome;
  tema.categoria = categoria;
  tema.atualizado_em = nowISO();
  await db.put('temas', tema);
}

/** Conta o que seria apagado em cascata (Notas), pra mostrar no modal de confirmação. */
export async function countTemaCascade(temaId: string): Promise<{ notas: number }> {
  const db = await getDB();
  const notas = await db.getAllFromIndex('notas', 'tema_id', temaId);
  return { notas: notas.length };
}

/** Apaga o Tema e, em cascata, suas Notas e os Itens de Revisão delas. */
export async function deleteTemaCascade(temaId: string): Promise<void> {
  const db = await getDB();
  const notas = await db.getAllFromIndex('notas', 'tema_id', temaId);
  const itensPorNota = await Promise.all(
    notas.map((nota) => db.getAllFromIndex('itens_revisao', 'nota_id', nota.id)),
  );
  const itens = itensPorNota.flat();

  const tx = db.transaction(['temas', 'notas', 'itens_revisao'], 'readwrite');
  await tx.objectStore('temas').delete(temaId);
  for (const nota of notas) await tx.objectStore('notas').delete(nota.id);
  for (const item of itens) await tx.objectStore('itens_revisao').delete(item.id);
  await tx.done;
}
