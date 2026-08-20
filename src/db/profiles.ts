import { getDB } from './schema';
import type { Perfil } from '../types';
import { nowISO } from '../lib/time';

/**
 * Perfis padrão criados no primeiro uso (sem senha, sem conta). Os IDs são fixos (não
 * gerados por uuid()) de propósito: se o usuário reinstalar o app ou trocar de aparelho e
 * importar um backup antigo, o registro do perfil precisa ter o mesmo id de antes para a
 * mesclagem atualizar o perfil existente em vez de criar um duplicado (ver db/merge.ts).
 */
const DEFAULT_PROFILES: { id: string; nome: string }[] = [
  { id: '00000000-0000-4000-8000-000000000001', nome: 'Fernando' },
  { id: '00000000-0000-4000-8000-000000000002', nome: 'Esposa' },
];

export async function listProfiles(): Promise<Perfil[]> {
  const db = await getDB();
  const all = await db.getAll('perfis');
  return all.sort((a, b) => a.criado_em.localeCompare(b.criado_em));
}

export async function ensureDefaultProfiles(): Promise<Perfil[]> {
  const db = await getDB();
  const existing = await db.getAll('perfis');
  if (existing.length > 0) return listProfiles();

  const tx = db.transaction('perfis', 'readwrite');
  for (const { id, nome } of DEFAULT_PROFILES) {
    const now = nowISO();
    const perfil: Perfil = { id, nome, criado_em: now, atualizado_em: now };
    await tx.store.put(perfil);
  }
  await tx.done;
  return listProfiles();
}

export async function getProfile(id: string): Promise<Perfil | undefined> {
  const db = await getDB();
  return db.get('perfis', id);
}
