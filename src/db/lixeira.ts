// Lixeira (exclusão suave). Excluir um Espaço/Tema/Nota não apaga de verdade: marca
// `excluido: true` + `excluido_em`, some das telas, e fica recuperável até
// EXCLUSAO_RETENCAO_DIAS, quando o expurgo automático remove de vez. Como o registro
// marcado continua existindo (com `atualizado_em` novo), a exclusão também se propaga
// pelo sync/importar — não "ressuscita" num aparelho novo (ver db/merge.ts).

import { getDB } from './schema';
import { addDaysToISODate, nowISO, todayLondonISODate } from '../lib/time';
import { nomeTemaExibicao } from '../domain/rotulos';
import { resolverConflito, type ConflitoRestauro } from '../domain/restauro-lixeira';
import { gravarPurgas } from './purgas';
import type { LojaPurgavel, Nota, Tema } from '../types';

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

  // Índices uma vez só — antes a contagem era refeita dentro de laços (quadrático).
  const temasPorEspaco = new Map<string, Tema[]>();
  for (const tema of todosTemas) {
    const lista = temasPorEspaco.get(tema.espaco_id);
    if (lista) lista.push(tema);
    else temasPorEspaco.set(tema.espaco_id, [tema]);
  }
  const notasPorTema = new Map<string, Nota[]>();
  for (const nota of todasNotas) {
    const lista = notasPorTema.get(nota.tema_id);
    if (lista) lista.push(nota);
    else notasPorTema.set(nota.tema_id, [nota]);
  }

  const itens: LixeiraItem[] = [];

  for (const espaco of espacos) {
    if (!espaco.excluido) continue;
    const temasDoEspaco = temasPorEspaco.get(espaco.id) ?? [];
    let notasExcluidas = 0;
    for (const tema of temasDoEspaco) {
      notasExcluidas += (notasPorTema.get(tema.id) ?? []).filter((n) => n.excluido).length;
    }
    itens.push({
      tipo: 'espaco',
      id: espaco.id,
      nome: espaco.nome,
      contexto: espaco.categoria || 'Sem categoria',
      excluido_em: espaco.excluido_em,
      temas: temasDoEspaco.filter((t) => t.excluido).length,
      notas: notasExcluidas,
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
      notas: (notasPorTema.get(tema.id) ?? []).filter((n) => n.excluido).length,
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

/** Apaga de vez (com Itens de Revisão) — não tem volta.
 *
 *  Cada registro apagado deixa uma "lápide" (store `purgas`) com o horário da exclusão.
 *  Sem a lápide, o registro voltaria no próximo sync/importar: a mesclagem nunca apaga o
 *  que existe local, e o backup remoto ainda tinha a cópia antiga — o item reaparecia na
 *  Lixeira como se o "Excluir de vez" não tivesse acontecido. A lápide viaja no
 *  export/sync e vence qualquer cópia mais antiga do registro (ver src/domain/purga.ts). */
export async function expurgarItem(tipo: LixeiraTipo, id: string): Promise<void> {
  const db = await getDB();
  const agora = nowISO();

  if (tipo === 'nota') {
    const itens = await db.getAllFromIndex('itens_revisao', 'nota_id', id);
    const avaliacoes = await db.getAllFromIndex('avaliacoes', 'nota_id', id);
    const tx = db.transaction(['notas', 'itens_revisao', 'avaliacoes', 'purgas'], 'readwrite');
    await tx.objectStore('notas').delete(id);
    for (const item of itens) await tx.objectStore('itens_revisao').delete(item.id);
    for (const aval of avaliacoes) await tx.objectStore('avaliacoes').delete(aval.id);
    await gravarPurgas(tx, [
      { loja: 'notas', alvo: id },
      ...itens.map((item) => ({ loja: 'itens_revisao' as const, alvo: item.id })),
      ...avaliacoes.map((aval) => ({ loja: 'avaliacoes' as const, alvo: aval.id })),
    ], agora);
    await tx.done;
    return;
  }

  // Tudo é lido ANTES de abrir a transação: um `await` de uma leitura que não pertence
  // à transação deixa a transação inativa (regra do IndexedDB) e o "Excluir de vez"
  // falharia no meio do caminho, deixando o item na Lixeira.
  const temasDoEspaco =
    tipo === 'tema' ? [] : await db.getAllFromIndex('temas', 'espaco_id', id);

  const notas = tipo === 'tema'
    ? await db.getAllFromIndex('notas', 'tema_id', id)
    : (await Promise.all(temasDoEspaco.map((t) => db.getAllFromIndex('notas', 'tema_id', t.id)))).flat();

  const itens = (
    await Promise.all(notas.map((n) => db.getAllFromIndex('itens_revisao', 'nota_id', n.id)))
  ).flat();
  const avaliacoes = (
    await Promise.all(notas.map((n) => db.getAllFromIndex('avaliacoes', 'nota_id', n.id)))
  ).flat();

  const tx = db.transaction(
    ['espacos', 'temas', 'notas', 'itens_revisao', 'avaliacoes', 'purgas'],
    'readwrite',
  );
  const purgas: { loja: LojaPurgavel; alvo: string }[] = [];
  if (tipo === 'tema') {
    await tx.objectStore('temas').delete(id);
    purgas.push({ loja: 'temas', alvo: id });
  } else {
    await tx.objectStore('espacos').delete(id);
    for (const tema of temasDoEspaco) {
      await tx.objectStore('temas').delete(tema.id);
      purgas.push({ loja: 'temas', alvo: tema.id });
    }
    purgas.push({ loja: 'espacos', alvo: id });
  }
  for (const nota of notas) await tx.objectStore('notas').delete(nota.id);
  for (const item of itens) await tx.objectStore('itens_revisao').delete(item.id);
  for (const aval of avaliacoes) await tx.objectStore('avaliacoes').delete(aval.id);

  purgas.push(...notas.map((n) => ({ loja: 'notas' as const, alvo: n.id })));
  purgas.push(...itens.map((i) => ({ loja: 'itens_revisao' as const, alvo: i.id })));
  purgas.push(...avaliacoes.map((a) => ({ loja: 'avaliacoes' as const, alvo: a.id })));
  await gravarPurgas(tx, purgas, agora);
  await tx.done;
}

/** Expurgo em lote: apaga de vez tudo que está na Lixeira do perfil (cada item com sua
 *  cascata). Devolve quantos itens foram expurgados. */
export async function esvaziarLixeira(perfilId: string): Promise<number> {
  const itens = await listarLixeira(perfilId);
  for (const item of itens) {
    await expurgarItem(item.tipo, item.id);
  }
  return itens.length;
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
