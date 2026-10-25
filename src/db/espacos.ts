import { getDB } from './schema';
import type { Espaco } from '../types';
import { uuid } from '../lib/uuid';
import { nowISO } from '../lib/time';
import { marcarExcluido } from './lixeira';
import { ordenarPorNome } from '../lib/ordem';

export async function listEspacos(perfilId: string): Promise<Espaco[]> {
  const db = await getDB();
  const all = await db.getAllFromIndex('espacos', 'perfil_id', perfilId);
  return ordenarPorNome(all.filter((e) => !e.excluido), (e) => e.nome);
}

export async function getEspaco(id: string): Promise<Espaco | undefined> {
  const db = await getDB();
  return db.get('espacos', id);
}

/** Aparência opcional de um Espaço (ícone escolhido e cor da paleta). */
export interface EspacoVisual {
  icone?: string;
  cor?: number;
}

function aplicarVisual(espaco: Espaco, visual: EspacoVisual): void {
  if (visual.icone) espaco.icone = visual.icone;
  else delete espaco.icone;
  if (typeof visual.cor === 'number') espaco.cor = visual.cor;
  else delete espaco.cor;
}

export async function createEspaco(
  perfilId: string,
  nome: string,
  visual: EspacoVisual = {},
): Promise<Espaco> {
  const db = await getDB();
  const now = nowISO();
  const espaco: Espaco = {
    id: uuid(),
    perfil_id: perfilId,
    nome,
    // O nome já é o grupo principal; o campo antigo fica vazio nos registros novos.
    categoria: '',
    criado_em: now,
    atualizado_em: now,
    arquivado: false,
  };
  aplicarVisual(espaco, visual);
  await db.put('espacos', espaco);
  return espaco;
}

export async function updateEspaco(
  id: string,
  nome: string,
  visual?: EspacoVisual,
): Promise<void> {
  const db = await getDB();
  const espaco = await db.get('espacos', id);
  if (!espaco) return;
  espaco.nome = nome;
  if (visual) aplicarVisual(espaco, visual);
  espaco.atualizado_em = nowISO();
  await db.put('espacos', espaco);
}

export async function setEspacoArquivado(id: string, arquivado: boolean): Promise<void> {
  const db = await getDB();
  const espaco = await db.get('espacos', id);
  if (!espaco) return;
  espaco.arquivado = arquivado;
  espaco.arquivado_em = arquivado ? nowISO() : undefined;
  espaco.atualizado_em = nowISO();
  await db.put('espacos', espaco);
}

export interface EspacoCascadeCount {
  temas: number;
  notas: number;
}

/** Conta o que seria mandado pra Lixeira em cascata, pra mostrar no modal de confirmação. */
export async function countEspacoCascade(espacoId: string): Promise<EspacoCascadeCount> {
  const db = await getDB();
  const temas = (await db.getAllFromIndex('temas', 'espaco_id', espacoId)).filter((t) => !t.excluido);
  let notas = 0;
  for (const tema of temas) {
    notas += (await db.getAllFromIndex('notas', 'tema_id', tema.id)).filter((n) => !n.excluido).length;
  }
  return { temas: temas.length, notas };
}

/** Manda o Espaço e, em cascata, seus Temas e Notas pra Lixeira (exclusão suave — dá pra
 *  restaurar por EXCLUSAO_RETENCAO_DIAS; o expurgo definitivo é feito em db/lixeira.ts). */
export async function deleteEspacoCascade(espacoId: string): Promise<void> {
  const db = await getDB();
  const espaco = await db.get('espacos', espacoId);
  if (!espaco) return;

  const temas = (await db.getAllFromIndex('temas', 'espaco_id', espacoId)).filter((t) => !t.excluido);
  const notasPorTema = await Promise.all(
    temas.map((tema) => db.getAllFromIndex('notas', 'tema_id', tema.id)),
  );
  const notas = notasPorTema.flat().filter((n) => !n.excluido);

  const agora = nowISO();
  const tx = db.transaction(['espacos', 'temas', 'notas'], 'readwrite');
  await tx.objectStore('espacos').put(marcarExcluido(espaco, agora));
  for (const tema of temas) await tx.objectStore('temas').put(marcarExcluido(tema, agora));
  for (const nota of notas) await tx.objectStore('notas').put(marcarExcluido(nota, agora));
  await tx.done;
}
