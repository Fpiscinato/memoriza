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
