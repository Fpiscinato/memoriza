// Leitura do backup no Gist. O caso que importa: gist GRANDE (arquivo acima de ~1MB)
// vem truncado na resposta da API — o conteúdo de verdade está no `raw_url`. Sem
// tratar isso, o sync ENVIava o backup pro GitHub mas nunca recebia nada de volta.

import { afterEach, describe, expect, it, vi } from 'vitest';
import { lerConteudoGist, GIST_FILENAME } from '../src/lib/github-sync';

const API_FAKE = async (payload: unknown): Promise<Response> =>
  new Response(JSON.stringify(payload), { headers: { 'Content-Type': 'application/json' } });

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('lerConteudoGist', () => {
  it('lê o conteúdo direto quando o gist é pequeno', async () => {
    const api = async () => API_FAKE({ files: { [GIST_FILENAME]: { content: '{"formato":"memoriza-export"}' } } });
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const conteudo = await lerConteudoGist(api, 'tok', 'gist1');

    expect(conteudo).toBe('{"formato":"memoriza-export"}');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('busca o conteúdo cru quando o gist vem truncado (gist grande)', async () => {
    const rawUrl = 'https://gist.githubusercontent.com/user/abc123/raw/memoriza-sync.json';
    const api = async () =>
      API_FAKE({ files: { [GIST_FILENAME]: { truncated: true, raw_url: rawUrl } } });
    const fetchMock = vi.fn(async (url: string) => {
      if (url === rawUrl) return new Response('{"formato":"memoriza-export","dados":{}}');
      return new Response('{}', { status: 404 });
    });
    vi.stubGlobal('fetch', fetchMock);

    const conteudo = await lerConteudoGist(api, 'tok', 'gist1');

    expect(conteudo).toBe('{"formato":"memoriza-export","dados":{}}');
    // O gist privado exige o token no acesso ao raw_url.
    expect(fetchMock).toHaveBeenCalledWith(rawUrl, {
      headers: { Authorization: 'Bearer tok' },
    });
  });

  it('devolve null quando o arquivo não existe no gist', async () => {
    const api = async () => API_FAKE({ files: { 'outro-arquivo.json': { content: 'x' } } });
    vi.stubGlobal('fetch', vi.fn());
    expect(await lerConteudoGist(api, 'tok', 'gist1')).toBeNull();
  });

  it('devolve null quando a API responde com erro', async () => {
    const api = async () => new Response('nope', { status: 404 });
    vi.stubGlobal('fetch', vi.fn());
    expect(await lerConteudoGist(api, 'tok', 'gist1')).toBeNull();
  });

  it('devolve null quando o raw_url não responde', async () => {
    const api = async () =>
      API_FAKE({ files: { [GIST_FILENAME]: { truncated: true, raw_url: 'https://exemplo/raw' } } });
    vi.stubGlobal('fetch', vi.fn(async () => new Response('erro', { status: 500 })));
    expect(await lerConteudoGist(api, 'tok', 'gist1')).toBeNull();
  });
});
