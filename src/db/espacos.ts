import { getDB } from './schema';
import type { Espaco } from '../types';
import { uuid } from '../lib/uuid';
import { nowISO } from '../lib/time';

export async function listEspacos(perfilId: string): Promise<Espaco[]> {
  const db = await getDB();
  const all = await db.getAllFromIndex('espacos', 'perfil_id', perfilId);
  return all.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
}

export async function getEspaco(id: string): Promise<Espaco | undefined> {
  const db = await getDB();
  return db.get('espacos', id);
}

export async function createEspaco(perfilId: string, nome: string): Promise<Espaco> {
  const db = await getDB();
  const now = nowISO();
  const espaco: Espaco = {
    id: uuid(),
    perfil_id: perfilId,
    nome,
    criado_em: now,
    atualizado_em: now,
    arquivado: false,
  };
  await db.put('espacos', espaco);
  return espaco;
}

export async function setEspacoArquivado(id: string, arquivado: boolean): Promise<void> {
  const db = await getDB();
  const espaco = await db.get('espacos', id);
  if (!espaco) return;
  espaco.arquivado = arquivado;
  espaco.atualizado_em = nowISO();
  await db.put('espacos', espaco);
}
