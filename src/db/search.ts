// Busca global do perfil ativo: procura em Espaços, Temas e Notas (título, conteúdo e
// fonte) e devolve resultados prontos pra navegação, com o caminho hierárquico de cada um.

import { getDB } from './schema';
import type { Espaco, Tema } from '../types';

export type ResultadoBusca =
  | { kind: 'espaco'; id: string; titulo: string; meta: string; snippet?: string }
  | { kind: 'tema'; id: string; titulo: string; meta: string; snippet?: string }
  | { kind: 'nota'; id: string; titulo: string; meta: string; snippet?: string };

const LIMITE_TOTAL = 24;

/** Normaliza a consulta pra comparação sem acentos/caixa — mais útil em português. */
function normalizar(valor: string): string {
  return valor
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function temMatch(vetor: string[], query: string): boolean {
  const q = normalizar(query);
  return vetor.some((v) => normalizar(v).includes(q));
}

/** Trecho curto do conteúdo ao redor do primeiro match (pra dar contexto no resultado). */
function fazerSnippet(conteudo: string, query: string, raio = 60): string {
  const texto = conteudo.replace(/\s+/g, ' ').trim();
  if (!texto) return '';
  const alvo = texto.toLowerCase();
  const q = query.toLowerCase();
  let idx = alvo.indexOf(q);
  if (idx === -1) {
    // Query sem acento num conteúdo acentuado: pega o começo mesmo (caso raro, semântica de
    // exibição só — não afeta o match, que a busca normalizada já fez).
    idx = 0;
  }
  const start = Math.max(0, idx - raio);
  const end = Math.min(texto.length, idx + q.length + raio);
  return (start > 0 ? '…' : '') + texto.slice(start, end) + (end < texto.length ? '…' : '');
}

export async function searchAll(perfilId: string, consulta: string): Promise<ResultadoBusca[]> {
  const query = consulta.trim();
  if (!query) return [];
  const q = normalizar(query);
  if (!q) return [];

  const db = await getDB();
  const espacos = (await db.getAllFromIndex('espacos', 'perfil_id', perfilId)).filter(
    (e) => !e.arquivado,
  );

  const temasPorEspaco = await Promise.all(
    espacos.map((e) => db.getAllFromIndex('temas', 'espaco_id', e.id)),
  );
  const temas = temasPorEspaco.flat();

  const espacoPorId = new Map(espacos.map((e: Espaco) => [e.id, e]));
  const notasPorTema = await Promise.all(
    temas.map((t) => db.getAllFromIndex('notas', 'tema_id', t.id)),
  );
  const notas = notasPorTema.flat();

  const resultados: ResultadoBusca[] = [];

  for (const espaco of espacos) {
    if (temMatch([espaco.nome, espaco.categoria], q)) {
      resultados.push({
        kind: 'espaco',
        id: espaco.id,
        titulo: espaco.nome,
        meta: espaco.categoria ? `Espaço · ${espaco.categoria}` : 'Espaço',
      });
      if (resultados.length >= LIMITE_TOTAL) return resultados;
    }
  }

  const temaPorId = new Map(temas.map((t: Tema) => [t.id, t]));

  for (const tema of temas) {
    if (temMatch([tema.nome, tema.categoria], q)) {
      const espaco = espacoPorId.get(tema.espaco_id);
      resultados.push({
        kind: 'tema',
        id: tema.id,
        titulo: tema.nome,
        meta: `Tema${espaco ? ` · ${espaco.nome}` : ''}`,
      });
      if (resultados.length >= LIMITE_TOTAL) return resultados;
    }
  }

  for (const nota of notas) {
    if (!temMatch([nota.titulo, nota.fonte, nota.conteudo], q)) continue;
    const tema = temaPorId.get(nota.tema_id);
    const espaco = tema && espacoPorId.get(tema.espaco_id);
    const trilha = [
      ...(espaco ? [espaco.nome] : []),
      ...(tema ? [tema.nome] : []),
    ].join(' · ');
    resultados.push({
      kind: 'nota',
      id: nota.id,
      titulo: nota.titulo || '(sem título)',
      meta: trilha ? `Nota · ${trilha}` : 'Nota',
      snippet: nota.conteudo ? fazerSnippet(nota.conteudo, q) : undefined,
    });
    if (resultados.length >= LIMITE_TOTAL) return resultados;
  }

  // Ordena alfabeticamente pelo título (e, em caso de empate, pelo caminho) — resultados
  // "começando com" a busca naturalmente sobem sem precisar de heurística extra.
  resultados.sort((a, b) => {
    const aChave = `${a.titulo.toLowerCase()} ${a.meta.toLowerCase()}`;
    const bChave = `${b.titulo.toLowerCase()} ${b.meta.toLowerCase()}`;
    return aChave.localeCompare(bChave, 'pt-BR');
  });

  return resultados.slice(0, LIMITE_TOTAL);
}