import { getDB } from './schema';
import type { Tema } from '../types';
import { uuid } from '../lib/uuid';
import { nowISO } from '../lib/time';
import { ordenarPorNome } from '../lib/ordem';
import { marcarExcluido } from './lixeira';

export async function listTemas(espacoId: string): Promise<Tema[]> {
  const db = await getDB();
  const all = await db.getAllFromIndex('temas', 'espaco_id', espacoId);
  return ordenarPorNome(all.filter((t) => !t.excluido), (t) => t.nome);
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
    favorito: false,
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

export async function toggleTemaFavorito(id: string): Promise<boolean> {
  const db = await getDB();
  const tema = await db.get('temas', id);
  if (!tema) return false;
  tema.favorito = !tema.favorito;
  tema.atualizado_em = nowISO();
  await db.put('temas', tema);
  return tema.favorito;
}

/** Conta o que seria mandado pra Lixeira em cascata (Notas), pra mostrar no modal de confirmação. */
export async function countTemaCascade(temaId: string): Promise<{ notas: number }> {
  const db = await getDB();
  const notas = await db.getAllFromIndex('notas', 'tema_id', temaId);
  return { notas: notas.filter((n) => !n.excluido).length };
}

/** Manda o Tema e, em cascata, suas Notas pra Lixeira (exclusão suave). */
export async function deleteTemaCascade(temaId: string): Promise<void> {
  const db = await getDB();
  const tema = await db.get('temas', temaId);
  if (!tema) return;
  const notas = (await db.getAllFromIndex('notas', 'tema_id', temaId)).filter((n) => !n.excluido);

  const agora = nowISO();
  const tx = db.transaction(['temas', 'notas'], 'readwrite');
  await tx.objectStore('temas').put(marcarExcluido(tema, agora));
  for (const nota of notas) await tx.objectStore('notas').put(marcarExcluido(nota, agora));
  await tx.done;
}
