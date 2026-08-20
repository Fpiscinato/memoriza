import { getDB } from './schema';
import type { Perfil } from '../types';
import { uuid } from '../lib/uuid';
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

export async function createProfile(nome: string): Promise<Perfil> {
  const db = await getDB();
  const now = nowISO();
  const perfil: Perfil = { id: uuid(), nome, criado_em: now, atualizado_em: now };
  await db.put('perfis', perfil);
  return perfil;
}

export async function renameProfile(id: string, novoNome: string): Promise<void> {
  const db = await getDB();
  const perfil = await db.get('perfis', id);
  if (!perfil) return;
  perfil.nome = novoNome;
  perfil.atualizado_em = nowISO();
  await db.put('perfis', perfil);
}

export interface ProfileCascadeCount {
  espacos: number;
  temas: number;
  notas: number;
}

/** Conta o que seria apagado em cascata (todo o conteúdo do perfil), pro modal de confirmação. */
export async function countProfileCascade(perfilId: string): Promise<ProfileCascadeCount> {
  const db = await getDB();
  const espacos = await db.getAllFromIndex('espacos', 'perfil_id', perfilId);
  let temas = 0;
  let notas = 0;
  for (const espaco of espacos) {
    const temasDoEspaco = await db.getAllFromIndex('temas', 'espaco_id', espaco.id);
    temas += temasDoEspaco.length;
    for (const tema of temasDoEspaco) {
      notas += (await db.getAllFromIndex('notas', 'tema_id', tema.id)).length;
    }
  }
  return { espacos: espacos.length, temas, notas };
}

/** Apaga o Perfil e, em cascata, todos os seus Espaços, Temas, Notas e Itens de Revisão. */
export async function deleteProfileCascade(perfilId: string): Promise<void> {
  const db = await getDB();
  const espacos = await db.getAllFromIndex('espacos', 'perfil_id', perfilId);

  const temasPorEspaco = await Promise.all(
    espacos.map((espaco) => db.getAllFromIndex('temas', 'espaco_id', espaco.id)),
  );
  const temas = temasPorEspaco.flat();

  const notasPorTema = await Promise.all(
    temas.map((tema) => db.getAllFromIndex('notas', 'tema_id', tema.id)),
  );
  const notas = notasPorTema.flat();

  const itensPorNota = await Promise.all(
    notas.map((nota) => db.getAllFromIndex('itens_revisao', 'nota_id', nota.id)),
  );
  const itens = itensPorNota.flat();

  const tx = db.transaction(['perfis', 'espacos', 'temas', 'notas', 'itens_revisao'], 'readwrite');
  await tx.objectStore('perfis').delete(perfilId);
  for (const espaco of espacos) await tx.objectStore('espacos').delete(espaco.id);
  for (const tema of temas) await tx.objectStore('temas').delete(tema.id);
  for (const nota of notas) await tx.objectStore('notas').delete(nota.id);
  for (const item of itens) await tx.objectStore('itens_revisao').delete(item.id);
  await tx.done;
}
