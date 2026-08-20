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
