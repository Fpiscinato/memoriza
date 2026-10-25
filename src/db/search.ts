// Busca global do perfil ativo: procura em Espaços, Temas e Notas (título, conteúdo e
// fonte) e devolve resultados prontos pra navegação, com o caminho hierárquico de cada um.

import { getDB } from './schema';
import type { Espaco, Tema } from '../types';
import { compararTextos } from '../lib/ordem';
import { nomeTemaExibicao } from '../domain/rotulos';
import { caminhoDe } from '../domain/arvore';

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
  // Item na Lixeira (excluído) não aparece na busca — nem ele, nem o que está dentro dele.
  const espacos = (await db.getAllFromIndex('espacos', 'perfil_id', perfilId)).filter(
    (e) => !e.arquivado && !e.excluido,
  );

  const temasPorEspaco = await Promise.all(
    espacos.map((e) => db.getAllFromIndex('temas', 'espaco_id', e.id)),
  );
  const temas = temasPorEspaco.flat().filter((t) => !t.excluido);

  const espacoPorId = new Map(espacos.map((e: Espaco) => [e.id, e]));
  const notasPorTema = await Promise.all(
    temas.map((t) => db.getAllFromIndex('notas', 'tema_id', t.id)),
  );
  const notas = notasPorTema.flat().filter((n) => !n.excluido);

  const resultados: ResultadoBusca[] = [];

  for (const espaco of espacos) {
    if (temMatch([espaco.nome, espaco.categoria], q)) {
      resultados.push({
        kind: 'espaco',
        id: espaco.id,
        titulo: espaco.nome,
        meta: espaco.categoria ? `Pasta · ${espaco.categoria}` : 'Pasta',
      });
      if (resultados.length >= LIMITE_TOTAL) return resultados;
    }
  }

  // A pasta oculta não é um resultado de busca (não tem nome próprio), mas as notas dela
  // continuam sendo — por isso ela fica no mapa de notas e só sai da lista de pastas.
  const temasVisiveis = temas.filter((t) => !t.oculta);
  const temaPorId = new Map(temas.map((t: Tema) => [t.id, t]));
  const caminhoPorTema = new Map<string, Tema[]>(
    temasVisiveis.map((tema) => [tema.id, caminhoDe(temasVisiveis, tema)]),
  );
  const trilhaDe = (tema: Tema): string =>
    [
      ...(espacoPorId.get(tema.espaco_id) ? [espacoPorId.get(tema.espaco_id)!.nome] : []),
      ...(caminhoPorTema.get(tema.id) ?? []).map((a) => nomeTemaExibicao(a.nome)),
      ...(tema.oculta ? [] : [nomeTemaExibicao(tema.nome)]),
    ].join(' · ');

  for (const tema of temasVisiveis) {
    if (temMatch([tema.nome, tema.categoria], q)) {
      const espaco = espacoPorId.get(tema.espaco_id);
      const ancestrais = (caminhoPorTema.get(tema.id) ?? []).map((a) => nomeTemaExibicao(a.nome));
      const trilha = [
        ...(espaco ? [espaco.nome] : []),
        ...(tema.categoria ? [tema.categoria] : []),
        ...ancestrais,
      ];
      resultados.push({
        kind: 'tema',
        id: tema.id,
        titulo: nomeTemaExibicao(tema.nome),
        meta: `Pasta${trilha.length > 0 ? ` · ${trilha.join(' › ')}` : ''}`,
      });
      if (resultados.length >= LIMITE_TOTAL) return resultados;
    }
  }

  for (const nota of notas) {
    if (!temMatch([nota.titulo, nota.fonte, nota.conteudo], q)) continue;
    const tema = temaPorId.get(nota.tema_id);
    const trilha = tema ? trilhaDe(tema) : '';
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
  // "começando com" a busca naturalmente sobem sem precisar de heurística extra. A comparação
  // é alfanumérica (ver lib/ordem.ts), então "Aula 2" vem antes de "Aula 10".
  resultados.sort((a, b) => {
    const aChave = `${a.titulo.toLowerCase()} ${a.meta.toLowerCase()}`;
    const bChave = `${b.titulo.toLowerCase()} ${b.meta.toLowerCase()}`;
    return compararTextos(aChave, bChave);
  });

  return resultados.slice(0, LIMITE_TOTAL);
}