// Snapshots locais: cópias de segurança guardadas no próprio IndexedDB (fora do export/sync,
// pra não inflar o backup da nuvem com backups). Cria-se um automático por dia ao abrir o app
// e o usuário pode criar/restaurar/apagar manuais. A rotação fica em snapshot-rotation.ts.

import { getDB } from './schema';
import { exportAll, importData, parseExportFile, type ImportSummary } from './export-import';
import { idsParaRemover } from './snapshot-rotation';
import { uuid } from '../lib/uuid';
import { nowISO, todayLondonISODate } from '../lib/time';
import type { Snapshot } from '../types';

export async function criarSnapshot(
  opts: { automatico?: boolean; titulo?: string } = {},
): Promise<Snapshot> {
  const db = await getDB();
  const conteudo = JSON.stringify(await exportAll());
  const automatico = opts.automatico ?? false;
  const snap: Snapshot = {
    id: uuid(),
    criado_em: nowISO(),
    automatico,
    titulo: opts.titulo ?? (automatico ? 'Automático' : 'Manual'),
    bytes: conteudo.length,
    conteudo,
  };
  await db.put('snapshots', snap);
  await rotacionarSnapshots();
  return snap;
}

export async function listarSnapshots(): Promise<Snapshot[]> {
  const db = await getDB();
  const todos = await db.getAll('snapshots');
  return todos.sort((a, b) => b.criado_em.localeCompare(a.criado_em));
}

export async function removerSnapshot(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('snapshots', id);
}

/** Restaura um snapshot mesclando (mesma regra do importar): nunca apaga o que já existe local. */
export async function restaurarSnapshot(id: string): Promise<ImportSummary> {
  const db = await getDB();
  const snap = await db.get('snapshots', id);
  if (!snap) throw new Error('Snapshot não encontrado.');
  return importData(parseExportFile(snap.conteudo));
}

export async function rotacionarSnapshots(): Promise<void> {
  const db = await getDB();
  const remover = idsParaRemover(await db.getAll('snapshots'), todayLondonISODate());
  if (remover.length === 0) return;
  const tx = db.transaction('snapshots', 'readwrite');
  for (const id of remover) await tx.store.delete(id);
  await tx.done;
}

/** Cria um snapshot automático se ainda não houver nenhum de hoje. Roda ao abrir o app. */
export async function snapshotAutomaticoSePreciso(): Promise<Snapshot | null> {
  const db = await getDB();
  const hoje = todayLondonISODate();
  const jaTemHoje = (await db.getAll('snapshots')).some(
    (s) => s.automatico && s.criado_em.slice(0, 10) === hoje,
  );
  if (jaTemHoje) return null;
  return criarSnapshot({ automatico: true });
}
