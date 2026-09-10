// Sincronização em nuvem via GitHub Gist privado. O app não tem servidor próprio:
// o backup é guardado como um arquivo secreto num Gist da própria conta do usuário
// (permite nada além do escopo "gist" do token). A mesclagem é a mesma do Importar
// (db/merge.ts): registros mais novos vencem e nada local é apagado.

import { exportAll, importData, parseExportFile, type ImportSummary } from '../db/export-import';
import {
  getGithubGistId,
  getGithubLastSyncAt,
  setGithubGistId,
  setGithubLastSyncAt,
} from './settings';
import { nowISO } from './time';

const GITHUB_API = 'https://api.github.com';
const GIST_DESCRIPTION = 'Memoriza — sincronização de anotações';
export const GIST_FILENAME = 'memoriza-sync.json';

export interface GitHubSyncResult extends ImportSummary {
  /** true quando o conteúdo do Gist foi criado ou reescrito nesta rodada. */
  push: boolean;
  /** false quando o backup remoto foi ignorado (ex: arquivo inválido) e só o local subiu. */
  mesclouRemoto: boolean;
}

function ghApi(token: string): (path: string, init?: RequestInit) => Promise<Response> {
  return (path, init = {}) =>
    fetch(`${GITHUB_API}${path}`, {
      ...init,
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
        ...(init.body ? { 'Content-Type': 'application/json' } : {}),
        ...init.headers,
      },
    });
}

/** Procura entre os Gists da conta o que tem o arquivo do Memoriza (caso o id local tenha
 *  sido perdido, ou a primeira conexão seja num aparelho novo). */
async function findMemorizaGist(api: (path: string, init?: RequestInit) => Promise<Response>): Promise<string | null> {
  const res = await api('/gists?per_page=100');
  if (!res.ok) throw new Error('Não foi possível listar seus Gists. Confira o token.');
  const gists = (await res.json()) as { id: string; files: Record<string, unknown> }[];
  return gists.find((g) => g.files && GIST_FILENAME in g.files)?.id ?? null;
}

async function createGist(api: (path: string, init?: RequestInit) => Promise<Response>, content: string): Promise<string> {
  const res = await api('/gists', {
    method: 'POST',
    body: JSON.stringify({
      description: GIST_DESCRIPTION,
      public: false,
      files: { [GIST_FILENAME]: { content } },
    }),
  });
  if (!res.ok) throw new Error('Não foi possível criar o Gist de backup.');
  const gist = (await res.json()) as { id: string };
  return gist.id;
}

async function readGistContent(
  api: (path: string, init?: RequestInit) => Promise<Response>,
  gistId: string,
): Promise<string | null> {
  const res = await api(`/gists/${gistId}`);
  if (!res.ok) return null;
  const gist = (await res.json()) as {
    files: Record<string, { content?: string } | undefined>;
  };
  return gist.files?.[GIST_FILENAME]?.content ?? null;
}

async function updateGist(
  api: (path: string, init?: RequestInit) => Promise<Response>,
  gistId: string,
  content: string,
): Promise<void> {
  const res = await api(`/gists/${gistId}`, {
    method: 'PATCH',
    body: JSON.stringify({ files: { [GIST_FILENAME]: { content } } }),
  });
  if (!res.ok) throw new Error('Não foi possível gravar o backup no GitHub.');
}

/**
 * Roda uma sincronização completa:
 * 1. Busca o Gist remoto (cria o id se preciso e o encontrar na conta).
 * 2. Se houver backup remoto válido, mescla com os dados locais (mais novo vence,
 *    nunca apaga local).
 * 3. Re-exporta o resultado unificado e grava de volta no Gist.
 */
export async function syncWithGithub(token: string): Promise<GitHubSyncResult> {
  const api = ghApi(token);

  let gistId = getGithubGistId();
  if (!gistId) {
    const encontrado = await findMemorizaGist(api);
    if (encontrado) {
      gistId = encontrado;
      setGithubGistId(encontrado);
    }
  }

  let summary: ImportSummary | null = null;
  let mesclouRemoto = false;
  let merged: Awaited<ReturnType<typeof exportAll>> = await exportAll();

  if (gistId) {
    const remoteContent = await readGistContent(api, gistId);
    if (remoteContent) {
      try {
        const remoto = parseExportFile(remoteContent);
        summary = await importData(remoto);
        merged = await exportAll();
        mesclouRemoto = true;
      } catch {
        // Backup remoto ilegível/inválido — não arrisca desperdiçar dados locais: apenas
        // sobrescreve o Gist com o estado local na sequência.
      }
    }
  }

  if (!gistId) {
    gistId = await createGist(api, JSON.stringify(merged));
    setGithubGistId(gistId);
  } else {
    await updateGist(api, gistId, JSON.stringify(merged));
  }

  setGithubLastSyncAt(nowISO());

  return {
    criados: summary?.criados ?? 0,
    atualizados: summary?.atualizados ?? 0,
    mantidos: summary?.mantidos ?? 0,
    porLoja: summary?.porLoja ?? createEmptyPorLoja(),
    push: true,
    mesclouRemoto,
  };
}

function createEmptyPorLoja(): Record<string, { criados: number; atualizados: number; mantidos: number }> {
  const inicial = { criados: 0, atualizados: 0, mantidos: 0 };
  return {
    perfis: inicial,
    espacos: inicial,
    temas: inicial,
    notas: inicial,
    itens_revisao: inicial,
  };
}

/** Guarda de segurança das chamadas não solicitadas (auto-sync ao abrir): se já tiver
 *  sincronizado há menos de X minutos, pula. */
export function shouldAutoSync(intervaloMinutos: number): boolean {
  const ultimo = getGithubLastSyncAt();
  if (!ultimo) return true;
  const diffMs = Date.now() - new Date(ultimo).getTime();
  return diffMs > intervaloMinutos * 60 * 1000;
}