import { getDB } from './schema';
import type { Avaliacao, Espaco, ItemRevisao, Nota, Tema } from '../types';
import { uuid } from '../lib/uuid';
import { nowISO, todayLondonISODate } from '../lib/time';
import { computeNextReview, type NextReviewResult } from '../domain/algorithm';

export interface QueueEntry {
  item: ItemRevisao;
  nota: Nota;
  tema: Tema;
  espaco: Espaco;
}

/** Fila de hoje: pendentes com data_agendada <= hoje (atrasados entram misturados, sem UI própria). */
export async function getTodayQueue(perfilId: string): Promise<QueueEntry[]> {
  const db = await getDB();
  const hoje = todayLondonISODate();
  const itens = (await db.getAllFromIndex('itens_revisao', 'perfil_id', perfilId)).filter(
    (i) => i.status === 'pendente' && i.data_agendada <= hoje,
  );

  const notaIds = Array.from(new Set(itens.map((i) => i.nota_id)));
  const notas = await Promise.all(notaIds.map((id) => db.get('notas', id)));
  const notaById = new Map(notas.filter((n): n is Nota => !!n).map((n) => [n.id, n]));

  const temaIds = Array.from(new Set(Array.from(notaById.values()).map((n) => n.tema_id)));
  const temas = await Promise.all(temaIds.map((id) => db.get('temas', id)));
  const temaById = new Map(temas.filter((t): t is Tema => !!t).map((t) => [t.id, t]));

  const espacoIds = Array.from(new Set(Array.from(temaById.values()).map((t) => t.espaco_id)));
  const espacos = await Promise.all(espacoIds.map((id) => db.get('espacos', id)));
  const espacoById = new Map(espacos.filter((e): e is Espaco => !!e).map((e) => [e.id, e]));

  const entries: QueueEntry[] = [];
  for (const item of itens) {
    const nota = notaById.get(item.nota_id);
    const tema = nota && temaById.get(nota.tema_id);
    const espaco = tema && espacoById.get(tema.espaco_id);
    if (!nota || !tema || !espaco) continue;
    entries.push({ item, nota, tema, espaco });
  }

  entries.sort(
    (a, b) =>
      a.tema.nome.localeCompare(b.tema.nome, 'pt-BR') ||
      a.item.data_agendada.localeCompare(b.item.data_agendada),
  );
  return entries;
}

/**
 * Conclui uma revisão: fecha o item atual (status 'feita', com a avaliação) e cria um novo
 * Item de Revisão para o próximo estágio calculado (histórico preservado, nunca reaproveita
 * o registro antigo). Quando o resultado é 'aposentado' (virou 'consulta'), o novo item já
 * nasce com status 'feita' — não deve entrar na fila.
 */
export async function completeReview(
  itemId: string,
  avaliacao: Avaliacao,
): Promise<NextReviewResult> {
  const db = await getDB();
  const item = await db.get('itens_revisao', itemId);
  if (!item) throw new Error('Item de revisão não encontrado.');

  const hoje = todayLondonISODate();
  const resultado = computeNextReview(item.estagio, avaliacao, item.streak_facil, hoje);
  const now = nowISO();

  const itemConcluido: ItemRevisao = {
    ...item,
    status: 'feita',
    avaliacao,
    data_concluida: hoje,
    atualizado_em: now,
  };

  const proximoItem: ItemRevisao = {
    id: uuid(),
    nota_id: item.nota_id,
    perfil_id: item.perfil_id,
    estagio: resultado.estagio,
    data_agendada: resultado.aposentado ? hoje : (resultado.data_agendada as string),
    status: resultado.aposentado ? 'feita' : 'pendente',
    streak_facil: resultado.streak_facil,
    criado_em: now,
    atualizado_em: now,
  };

  const tx = db.transaction('itens_revisao', 'readwrite');
  await tx.store.put(itemConcluido);
  await tx.store.put(proximoItem);
  await tx.done;

  return resultado;
}

/** Move manualmente o(s) item(ns) pendente(s) de uma nota para 'consulta' (fora da fila). */
export async function stopReviewing(notaId: string): Promise<void> {
  const db = await getDB();
  const itens = (await db.getAllFromIndex('itens_revisao', 'nota_id', notaId)).filter(
    (i) => i.status === 'pendente',
  );
  if (itens.length === 0) return;

  const hoje = todayLondonISODate();
  const now = nowISO();
  const tx = db.transaction('itens_revisao', 'readwrite');
  for (const item of itens) {
    await tx.store.put({
      ...item,
      estagio: 'consulta',
      status: 'feita',
      data_concluida: hoje,
      atualizado_em: now,
    } satisfies ItemRevisao);
  }
  await tx.done;
}

/** Atalho de desenvolvimento: puxa o item pendente de uma nota para hoje, pra testar a fila. */
export async function devReviewNow(notaId: string): Promise<void> {
  const db = await getDB();
  const itens = (await db.getAllFromIndex('itens_revisao', 'nota_id', notaId)).filter(
    (i) => i.status === 'pendente',
  );
  if (itens.length === 0) return;

  const hoje = todayLondonISODate();
  const now = nowISO();
  const tx = db.transaction('itens_revisao', 'readwrite');
  for (const item of itens) {
    await tx.store.put({ ...item, data_agendada: hoje, atualizado_em: now } satisfies ItemRevisao);
  }
  await tx.done;
}
