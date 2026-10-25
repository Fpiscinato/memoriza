import { getDB } from './schema';
import type { Espaco } from '../types';
import { uuid } from '../lib/uuid';
import { nowISO } from '../lib/time';
import { marcarExcluido } from './lixeira';
import { distinctCategorias } from '../lib/group';
import { ordenarPorNome } from '../lib/ordem';
import { idPastaPrincipal } from '../domain/arvore';

export async function listEspacos(perfilId: string): Promise<Espaco[]> {
  const db = await getDB();
  const all = await db.getAllFromIndex('espacos', 'perfil_id', perfilId);
  return ordenarPorNome(all.filter((e) => !e.excluido), (e) => e.nome);
}

/** Sugestões sempre disponíveis, mesmo num perfil novo sem nenhum Espaço ainda criado. */
const CATEGORIAS_ESPACO_SUGERIDAS = ['Cursos', 'Livros', 'Bíblia'];

/** Categorias já usadas em Espaços deste perfil, mais as sugestões padrão — pra sugerir como chips. */
export async function listCategoriasEspacos(perfilId: string): Promise<string[]> {
  const espacos = await listEspacos(perfilId);
  return distinctCategorias([...CATEGORIAS_ESPACO_SUGERIDAS, ...espacos.map((e) => e.categoria)]);
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
  categoria = '',
  visual: EspacoVisual = {},
): Promise<Espaco> {
  const db = await getDB();
  const now = nowISO();
  const espaco: Espaco = {
    id: uuid(),
    perfil_id: perfilId,
    nome,
    categoria,
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
  categoria: string,
  visual?: EspacoVisual,
): Promise<void> {
  const db = await getDB();
  const espaco = await db.get('espacos', id);
  if (!espaco) return;
  espaco.nome = nome;
  espaco.categoria = categoria;
  if (visual) aplicarVisual(espaco, visual);
  espaco.atualizado_em = nowISO();
  await db.put('espacos', espaco);

  // A pasta oculta que guarda as notas soltas acompanha o nome/categoria da pasta principal
  // — é ela que aparece como “contexto” da nota na fila de hoje, na busca e na Lixeira.
  const raiz = await db.get('temas', idPastaPrincipal(id));
  if (raiz) {
    raiz.nome = nome;
    raiz.categoria = categoria;
    raiz.atualizado_em = espaco.atualizado_em;
    await db.put('temas', raiz);
  }
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

/** Conta o que seria mandado pra Lixeira em cascata, pra mostrar no modal de confirmação.
 *  A pasta oculta não entra na contagem de pastas, mas as notas dela entram na de notas. */
export async function countEspacoCascade(espacoId: string): Promise<EspacoCascadeCount> {
  const db = await getDB();
  const todas = (await db.getAllFromIndex('temas', 'espaco_id', espacoId)).filter((t) => !t.excluido);
  let notas = 0;
  for (const tema of todas) {
    notas += (await db.getAllFromIndex('notas', 'tema_id', tema.id)).filter((n) => !n.excluido).length;
  }
  return { temas: todas.filter((t) => !t.oculta).length, notas };
}

/** Manda o Espaço e, em cascata, seus Temas e Notas pra Lixeira (exclusão suave — dá pra
 *  restaurar por EXCLUSAO_RETENCAO_DIAS; o expurgo definitivo é feito em db/lixeira.ts). */
export async function deleteEspacoCascade(espacoId: string): Promise<void> {
  const db = await getDB();
  const espaco = await db.get('espacos', espacoId);
  if (!espaco) return;

  // Inclui a pasta oculta aqui: as notas soltas da pasta principal também vão pra Lixeira.
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
