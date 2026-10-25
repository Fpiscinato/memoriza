import { getDB } from './schema';
import type { Tema } from '../types';
import { uuid } from '../lib/uuid';
import { nowISO } from '../lib/time';
import { ordenarPorNome } from '../lib/ordem';
import { marcarExcluido } from './lixeira';
import { idsDaSubarvore } from '../domain/arvore';

/** Todas as pastas (subpastas) ativas de um Espaço — usadas para contagens, busca, PDF etc. */
export async function listTemas(espacoId: string): Promise<Tema[]> {
  const db = await getDB();
  const all = await db.getAllFromIndex('temas', 'espaco_id', espacoId);
  return ordenarPorNome(all.filter((t) => !t.excluido), (t) => t.nome);
}

export async function getTema(id: string): Promise<Tema | undefined> {
  const db = await getDB();
  return db.get('temas', id);
}

/** Aparência opcional de uma pasta (ícone escolhido e cor da paleta). */
export interface TemaVisual {
  icone?: string;
  cor?: number;
}

function aplicarVisual(tema: Tema, visual?: TemaVisual): void {
  if (!visual) return;
  if (visual.icone) tema.icone = visual.icone;
  else delete tema.icone;
  if (typeof visual.cor === 'number') tema.cor = visual.cor;
  else delete tema.cor;
}

export interface CriarTemaOpcoes {
  /** Pasta pai. Ausente/null = subpasta direta do Espaço. */
  paiId?: string | null;
  visual?: TemaVisual;
}

export async function createTema(
  espacoId: string,
  nome: string,
  opcoes: CriarTemaOpcoes = {},
): Promise<Tema> {
  const db = await getDB();
  const now = nowISO();
  const tema: Tema = {
    id: uuid(),
    espaco_id: espacoId,
    nome,
    categoria: '',
    favorito: false,
    criado_em: now,
    atualizado_em: now,
  };
  if (opcoes.paiId) tema.pai_id = opcoes.paiId;
  aplicarVisual(tema, opcoes.visual);
  await db.put('temas', tema);
  return tema;
}

export async function updateTema(id: string, nome: string, visual?: TemaVisual): Promise<void> {
  const db = await getDB();
  const tema = await db.get('temas', id);
  if (!tema) return;
  tema.nome = nome;
  aplicarVisual(tema, visual);
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

/** Conta pastas e notas que seriam mandadas pra Lixeira em cascata. */
export async function countTemaCascade(temaId: string): Promise<{ temas: number; notas: number }> {
  const db = await getDB();
  const tema = await db.get('temas', temaId);
  if (!tema) return { temas: 0, notas: 0 };

  const todos = (await db.getAllFromIndex('temas', 'espaco_id', tema.espaco_id)).filter(
    (t) => !t.excluido,
  );
  const ids = idsDaSubarvore(todos, temaId);
  const notas = (
    await Promise.all(ids.map((id) => db.getAllFromIndex('notas', 'tema_id', id)))
  )
    .flat()
    .filter((n) => !n.excluido);

  return { temas: ids.length, notas: notas.length };
}

/** Manda a pasta, suas subpastas e todas as notas pra Lixeira (exclusão suave). */
export async function deleteTemaCascade(temaId: string): Promise<void> {
  const db = await getDB();
  const tema = await db.get('temas', temaId);
  if (!tema) return;

  const todos = (await db.getAllFromIndex('temas', 'espaco_id', tema.espaco_id)).filter(
    (t) => !t.excluido,
  );
  const ids = idsDaSubarvore(todos, temaId);
  const temas = todos.filter((t) => ids.includes(t.id));
  const notas = (
    await Promise.all(ids.map((id) => db.getAllFromIndex('notas', 'tema_id', id)))
  )
    .flat()
    .filter((n) => !n.excluido);

  const agora = nowISO();
  const tx = db.transaction(['temas', 'notas'], 'readwrite');
  for (const item of temas) await tx.objectStore('temas').put(marcarExcluido(item, agora));
  for (const nota of notas) await tx.objectStore('notas').put(marcarExcluido(nota, agora));
  await tx.done;
}

/** Quantas pastas estão diretamente abaixo de cada pasta (para exibir na listagem). */
export function contarFilhosPorPasta(temas: Tema[]): Map<string, number> {
  const contagem = new Map<string, number>();
  for (const tema of temas) {
    if (!tema.pai_id) continue;
    contagem.set(tema.pai_id, (contagem.get(tema.pai_id) ?? 0) + 1);
  }
  return contagem;
}
