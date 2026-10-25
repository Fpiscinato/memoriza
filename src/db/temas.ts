import { getDB } from './schema';
import type { Tema } from '../types';
import { uuid } from '../lib/uuid';
import { nowISO } from '../lib/time';
import { ordenarPorNome } from '../lib/ordem';
import { marcarExcluido } from './lixeira';
import { idPastaPrincipal, idsDaSubarvore } from '../domain/arvore';

/** Pastas visíveis de um Espaço — a pasta oculta que guarda as notas da pasta principal
 *  fica de fora (ela não é navegável; as notas dela aparecem na tela da própria pasta). */
export async function listTemas(espacoId: string): Promise<Tema[]> {
  const db = await getDB();
  const all = await db.getAllFromIndex('temas', 'espaco_id', espacoId);
  return ordenarPorNome(all.filter((t) => !t.excluido && !t.oculta), (t) => t.nome);
}

/** A pasta oculta que guarda as notas da pasta principal, se ela já existir. */
export async function getTemaRaiz(espacoId: string): Promise<Tema | undefined> {
  const db = await getDB();
  const tema = await db.get('temas', idPastaPrincipal(espacoId));
  return tema && !tema.excluido ? tema : undefined;
}

/**
 * Garante a pasta oculta da pasta principal (criada na primeira nota solta). O id é
 * determinístico (`pasta-principal:<id da pasta>`), então sync/importar em aparelhos
 * diferentes convergem para o mesmo registro em vez de duplicar.
 */
export async function garantirTemaRaiz(espacoId: string): Promise<Tema> {
  const db = await getDB();
  const id = idPastaPrincipal(espacoId);
  const espaco = await db.get('espacos', espacoId);
  if (!espaco) throw new Error('Pasta não encontrada.');

  const existente = await db.get('temas', id);
  if (existente) {
    let mudou = false;
    if (existente.excluido) {
      delete existente.excluido;
      delete existente.excluido_em;
      mudou = true;
    }
    if (existente.nome !== espaco.nome || existente.categoria !== espaco.categoria) {
      existente.nome = espaco.nome;
      existente.categoria = espaco.categoria;
      mudou = true;
    }
    if (mudou) {
      existente.atualizado_em = nowISO();
      await db.put('temas', existente);
    }
    return existente;
  }

  const now = nowISO();
  const tema: Tema = {
    id,
    espaco_id: espacoId,
    nome: espaco.nome,
    categoria: espaco.categoria,
    oculta: true,
    favorito: false,
    criado_em: now,
    atualizado_em: now,
  };
  await db.put('temas', tema);
  return tema;
}

export async function getTema(id: string): Promise<Tema | undefined> {
  const db = await getDB();
  return db.get('temas', id);
}

/** Aparência opcional de um tema (ícone escolhido e cor da paleta). */
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
  categoria?: string;
  /** Pasta pai. Ausente/null = Tema/subpasta direta do Espaço. */
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
    categoria: opcoes.categoria ?? '',
    favorito: false,
    criado_em: now,
    atualizado_em: now,
  };
  if (opcoes.paiId) tema.pai_id = opcoes.paiId;
  aplicarVisual(tema, opcoes.visual);
  await db.put('temas', tema);
  return tema;
}

export async function updateTema(
  id: string,
  nome: string,
  categoria: string,
  visual?: TemaVisual,
): Promise<void> {
  const db = await getDB();
  const tema = await db.get('temas', id);
  if (!tema) return;
  tema.nome = nome;
  tema.categoria = categoria;
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

/** Conta temas/subpastas e notas que seriam mandados pra Lixeira em cascata. */
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

/** Quantas subpastas estão diretamente abaixo de cada tema (para exibir na listagem). */
export function contarFilhosPorPasta(temas: Tema[]): Map<string, number> {
  const contagem = new Map<string, number>();
  for (const tema of temas) {
    if (!tema.pai_id) continue;
    contagem.set(tema.pai_id, (contagem.get(tema.pai_id) ?? 0) + 1);
  }
  return contagem;
}
