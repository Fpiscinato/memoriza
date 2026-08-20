import { getDB } from './schema';
import type { ItemRevisao, Nota } from '../types';
import { uuid } from '../lib/uuid';
import { addDaysToISODate, nowISO, todayLondonISODate } from '../lib/time';

export async function listNotas(temaId: string): Promise<Nota[]> {
  const db = await getDB();
  const all = await db.getAllFromIndex('notas', 'tema_id', temaId);
  return all.sort((a, b) => a.criado_em.localeCompare(b.criado_em));
}

export async function getNota(id: string): Promise<Nota | undefined> {
  const db = await getDB();
  return db.get('notas', id);
}

export interface NotaInput {
  conteudo: string;
  fonte: string;
  pode_desatualizar: boolean;
  validade_ate?: string;
}

/** Cria a Nota e já gera o primeiro Item de Revisão (estágio 1, agendado para amanhã). */
export async function createNota(temaId: string, input: NotaInput): Promise<Nota> {
  const db = await getDB();
  const tema = await db.get('temas', temaId);
  if (!tema) throw new Error('Tema não encontrado.');
  const espaco = await db.get('espacos', tema.espaco_id);
  if (!espaco) throw new Error('Espaço não encontrado.');

  const now = nowISO();
  const nota: Nota = {
    id: uuid(),
    tema_id: temaId,
    conteudo: input.conteudo,
    fonte: input.fonte,
    pode_desatualizar: input.pode_desatualizar,
    validade_ate: input.pode_desatualizar ? input.validade_ate : undefined,
    criado_em: now,
    atualizado_em: now,
  };

  const item: ItemRevisao = {
    id: uuid(),
    nota_id: nota.id,
    perfil_id: espaco.perfil_id,
    estagio: '1',
    data_agendada: addDaysToISODate(todayLondonISODate(), 1),
    status: 'pendente',
    streak_facil: 0,
    criado_em: now,
    atualizado_em: now,
  };

  const tx = db.transaction(['notas', 'itens_revisao'], 'readwrite');
  await tx.objectStore('notas').put(nota);
  await tx.objectStore('itens_revisao').put(item);
  await tx.done;

  return nota;
}

/**
 * Atualiza só os campos de conteúdo da Nota — não mexe no(s) Item(ns) de Revisão, de
 * propósito: editar o texto de uma nota não deve resetar o agendamento em andamento.
 */
export async function updateNota(id: string, input: NotaInput): Promise<void> {
  const db = await getDB();
  const nota = await db.get('notas', id);
  if (!nota) return;
  nota.conteudo = input.conteudo;
  nota.fonte = input.fonte;
  nota.pode_desatualizar = input.pode_desatualizar;
  nota.validade_ate = input.pode_desatualizar ? input.validade_ate : undefined;
  nota.atualizado_em = nowISO();
  await db.put('notas', nota);
}

/** Apaga a Nota e, em cascata, todos os seus Itens de Revisão (histórico incluso). */
export async function deleteNota(id: string): Promise<void> {
  const db = await getDB();
  const itens = await db.getAllFromIndex('itens_revisao', 'nota_id', id);
  const tx = db.transaction(['notas', 'itens_revisao'], 'readwrite');
  await tx.objectStore('notas').delete(id);
  for (const item of itens) await tx.objectStore('itens_revisao').delete(item.id);
  await tx.done;
}
