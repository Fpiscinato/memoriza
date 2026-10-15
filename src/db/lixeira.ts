// Lixeira (exclusão suave). Excluir um Espaço/Tema/Nota não apaga de verdade: marca
// `excluido: true` + `excluido_em`, some das telas, e fica recuperável até
// EXCLUSAO_RETENCAO_DIAS, quando o expurgo automático remove de vez. Como o registro
// marcado continua existindo (com `atualizado_em` novo), a exclusão também se propaga
// pelo sync/importar — não "ressuscita" num aparelho novo (ver db/merge.ts).

import { getDB } from './schema';
import { addDaysToISODate, nowISO, todayLondonISODate } from '../lib/time';
import { nomeTemaExibicao } from '../domain/rotulos';
import { resolverConflito, type ConflitoRestauro } from '../domain/restauro-lixeira';

export const EXCLUSAO_RETENCAO_DIAS = 30;

interface ComExclusao {
  excluido?: boolean;
  excluido_em?: string;
  atualizado_em: string;
}

/** Marca um registro como excluído (vai pra Lixeira). */
export function marcarExcluido<T extends ComExclusao>(registro: T, agora: string = nowISO()): T {
  return { ...registro, excluido: true, excluido_em: agora, atualizado_em: agora };
}

/** Tira um registro da Lixeira (volta a aparecer normalmente). */
export function marcarRestaurado<T extends ComExclusao>(registro: T, agora: string = nowISO()): T {
  const copia = { ...registro } as T;
  delete copia.excluido;
  delete copia.excluido_em;
  copia.atualizado_em = agora;
  return copia;
}

export type LixeiraTipo = 'espaco' | 'tema' | 'nota';

export interface LixeiraItem {
  tipo: LixeiraTipo;
  id: string;
  nome: string;
  contexto: string;
  excluido_em?: string;
  /** Quantos Temas/Notas foram junto (cascata) — só para exibir. */
  temas?: number;
  notas?: number;
}

/** Itens na Lixeira do perfil, "raízes" apenas (um Tema dentro de um Espaço excluído não
 *  aparece duas vezes), mais recentes primeiro. */
export async function listarLixeira(perfilId: string): Promise<LixeiraItem[]> {
  const db = await getDB();
  const espacos = await db.getAllFromIndex('espacos', 'perfil_id', perfilId);
  const espacoById = new Map(espacos.map((e) => [e.id, e]));

  const todosTemas = (
    await Promise.all(espacos.map((e) => db.getAllFromIndex('temas', 'espaco_id', e.id)))
  ).flat();
  const temaById = new Map(todosTemas.map((t) => [t.id, t]));

  const todasNotas = (
    await Promise.all(todosTemas.map((t) => db.getAllFromIndex('notas', 'tema_id', t.id)))
  ).flat();

  const itens: LixeiraItem[] = [];

  for (const espaco of espacos) {
    if (!espaco.excluido) continue;
    const temasDoEspaco = todosTemas.filter((t) => t.espaco_id === espaco.id);
    const temaIds = new Set(temasDoEspaco.map((t) => t.id));
    itens.push({
      tipo: 'espaco',
      id: espaco.id,
      nome: espaco.nome,
      contexto: espaco.categoria || 'Sem categoria',
      excluido_em: espaco.excluido_em,
      temas: temasDoEspaco.filter((t) => t.excluido).length,
      notas: todasNotas.filter((n) => temaIds.has(n.tema_id) && n.excluido).length,
    });
  }

  for (const tema of todosTemas) {
    if (!tema.excluido) continue;
    const espaco = espacoById.get(tema.espaco_id);
    if (!espaco || espaco.excluido) continue;
    itens.push({
      tipo: 'tema',
      id: tema.id,
      nome: nomeTemaExibicao(tema.nome),
      contexto: espaco.nome,
      excluido_em: tema.excluido_em,
      notas: todasNotas.filter((n) => n.tema_id === tema.id && n.excluido).length,
    });
  }

  for (const nota of todasNotas) {
    if (!nota.excluido) continue;
    const tema = temaById.get(nota.tema_id);
    if (!tema || tema.excluido) continue;
    const espaco = espacoById.get(tema.espaco_id);
    if (!espaco || espaco.excluido) continue;
    itens.push({
      tipo: 'nota',
      id: nota.id,
      nome: nota.titulo || '(sem título)',
      contexto: nomeTemaExibicao(tema.nome),
      excluido_em: nota.excluido_em,
    });
  }

  return itens.sort((a, b) => (b.excluido_em ?? '').localeCompare(a.excluido_em ?? ''));
}

/** Verifica se restaurar este item colidiria com algo ativo (mesmo nome no perfil, mesma
 *  categoria+nome no Espaço, ou mesmo título no Tema). Se colidir, sugere um nome livre. */
export async function verificarConflitoRestauro(
  tipo: LixeiraTipo,
  id: string,
): Promise<ConflitoRestauro> {
  const db = await getDB();

  if (tipo === 'nota') {
    const nota = await db.get('notas', id);
    if (!nota) return { conflito: false, nomeSugerido: '' };
    const ativas = (await db.getAllFromIndex('notas', 'tema_id', nota.tema_id)).filter(
      (n) => !n.excluido,
    );
    return resolverConflito(
      nota.titulo || '',
      ativas.map((n) => ({ nome: n.titulo || '' })),
    );
  }

  if (tipo === 'tema') {
    const tema = await db.get('temas', id);
    if (!tema) return { conflito: false, nomeSugerido: '' };
    const ativos = (await db.getAllFromIndex('temas', 'espaco_id', tema.espaco_id)).filter(
      (t) => !t.excluido,
    );
    return resolverConflito(
      tema.nome || '',
      ativos.map((t) => ({ nome: t.nome || '', categoria: t.categoria })),
      tema.categoria,
    );
  }

  const espaco = await db.get('espacos', id);
  if (!espaco) return { conflito: false, nomeSugerido: '' };
  const ativos = (await db.getAllFromIndex('espacos', 'perfil_id', espaco.perfil_id)).filter(
    (e) => !e.excluido,
  );
  return resolverConflito(
    espaco.nome,
    ativos.map((e) => ({ nome: e.nome })),
  );
}

/** Restaura um item da Lixeira junto com o que foi pra lá em cascata com ele. `opcoes.nome`
 *  permite restaurar com um nome diferente (usado pra evitar duplicar — ver
 *  `verificarConflitoRestauro`). */
export async function restaurarItem(
  tipo: LixeiraTipo,
  id: string,
  opcoes?: { nome?: string },
): Promise<void> {
  const db = await getDB();
  const agora = nowISO();

  if (tipo === 'nota') {
    const nota = await db.get('notas', id);
    if (!nota) return;
    if (opcoes?.nome !== undefined) nota.titulo = opcoes.nome;
    await db.put('notas', marcarRestaurado(nota, agora));
    return;
  }

  if (tipo === 'tema') {
    const tema = await db.get('temas', id);
    if (!tema) return;
    if (opcoes?.nome !== undefined) tema.nome = opcoes.nome;
    const notas = (await db.getAllFromIndex('notas', 'tema_id', id)).filter((n) => n.excluido);
    const tx = db.transaction(['temas', 'notas'], 'readwrite');
    await tx.objectStore('temas').put(marcarRestaurado(tema, agora));
    for (const nota of notas) await tx.objectStore('notas').put(marcarRestaurado(nota, agora));
    await tx.done;
    return;
  }

  const espaco = await db.get('espacos', id);
  if (!espaco) return;
  if (opcoes?.nome !== undefined) espaco.nome = opcoes.nome;
  const temas = (await db.getAllFromIndex('temas', 'espaco_id', id)).filter((t) => t.excluido);
  const notas = (
    await Promise.all(temas.map((t) => db.getAllFromIndex('notas', 'tema_id', t.id)))
  )
    .flat()
    .filter((n) => n.excluido);

  const tx = db.transaction(['espacos', 'temas', 'notas'], 'readwrite');
  await tx.objectStore('espacos').put(marcarRestaurado(espaco, agora));
  for (const tema of temas) await tx.objectStore('temas').put(marcarRestaurado(tema, agora));
  for (const nota of notas) await tx.objectStore('notas').put(marcarRestaurado(nota, agora));
  await tx.done;
}

/** Apaga de vez (com Itens de Revisão) — não tem volta. */
export async function expurgarItem(tipo: LixeiraTipo, id: string): Promise<void> {
  const db = await getDB();

  if (tipo === 'nota') {
    const itens = await db.getAllFromIndex('itens_revisao', 'nota_id', id);
    const tx = db.transaction(['notas', 'itens_revisao'], 'readwrite');
    await tx.objectStore('notas').delete(id);
    for (const item of itens) await tx.objectStore('itens_revisao').delete(item.id);
    await tx.done;
    return;
  }

  let notas: { id: string }[];
  if (tipo === 'tema') {
    notas = await db.getAllFromIndex('notas', 'tema_id', id);
  } else {
    const temas = await db.getAllFromIndex('temas', 'espaco_id', id);
    notas = (await Promise.all(temas.map((t) => db.getAllFromIndex('notas', 'tema_id', t.id)))).flat();
  }

  const itens = (
    await Promise.all(notas.map((n) => db.getAllFromIndex('itens_revisao', 'nota_id', n.id)))
  ).flat();

  const tx = db.transaction(['espacos', 'temas', 'notas', 'itens_revisao'], 'readwrite');
  if (tipo === 'tema') {
    await tx.objectStore('temas').delete(id);
  } else {
    const temas = await db.getAllFromIndex('temas', 'espaco_id', id);
    await tx.objectStore('espacos').delete(id);
    for (const tema of temas) await tx.objectStore('temas').delete(tema.id);
  }
  for (const nota of notas) await tx.objectStore('notas').delete(nota.id);
  for (const item of itens) await tx.objectStore('itens_revisao').delete(item.id);
  await tx.done;
}

/** Expurgo automático: remove definitivamente o que está na Lixeira há mais de
 *  EXCLUSAO_RETENCAO_DIAS. Roda ao abrir o app. */
export async function limparLixeiraAntiga(): Promise<void> {
  const db = await getDB();
  const cutoff = addDaysToISODate(todayLondonISODate(), -EXCLUSAO_RETENCAO_DIAS);
  const expirado = (registro: ComExclusao) =>
    !!registro.excluido && !!registro.excluido_em && registro.excluido_em.slice(0, 10) < cutoff;

  const espacos = (await db.getAll('espacos')).filter(expirado);
  const temas = (await db.getAll('temas')).filter(expirado);
  const notas = (await db.getAll('notas')).filter(expirado);

  for (const espaco of espacos) await expurgarItem('espaco', espaco.id);
  for (const tema of temas) await expurgarItem('tema', tema.id);
  for (const nota of notas) await expurgarItem('nota', nota.id);
}
