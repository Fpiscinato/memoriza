// Avaliações (autoteste) — independentes da revisão espaçada. Cada nota avaliada vira um
// AvaliacaoRegistro; todos os registros de um mesmo repasse compartilham o `sessao_id`.

import { getDB } from './schema';
import { uuid } from '../lib/uuid';
import { nowISO } from '../lib/time';
import type { Avaliacao, AvaliacaoRegistro } from '../types';

export interface RegistrarAvaliacaoInput {
  perfilId: string;
  espacoId: string;
  temaId: string;
  notaId: string;
  avaliacao: Avaliacao;
  escopo: 'espaco' | 'tema';
  sessaoId: string;
}

export async function registrarAvaliacao(input: RegistrarAvaliacaoInput): Promise<void> {
  const db = await getDB();
  const agora = nowISO();
  const registro: AvaliacaoRegistro = {
    id: uuid(),
    perfil_id: input.perfilId,
    espaco_id: input.espacoId,
    tema_id: input.temaId,
    nota_id: input.notaId,
    avaliacao: input.avaliacao,
    escopo: input.escopo,
    sessao_id: input.sessaoId,
    criado_em: agora,
    atualizado_em: agora,
  };
  await db.put('avaliacoes', registro);
}

export interface SessaoAvaliacao {
  sessao_id: string;
  criado_em: string;
  total: number;
  facil: number;
  medio: number;
  dificil: number;
  escopo: 'espaco' | 'tema';
  contexto: string;
}

export interface ResumoAvaliacoes {
  total: number;
  facil: number;
  medio: number;
  dificil: number;
  ultimaEm?: string;
  /** Total de sessões do perfil (a lista `sessoes` é só o recorte mais recente). */
  sessoesTotal: number;
  sessoes: SessaoAvaliacao[];
}

/** Resumo das avaliações do perfil, com a lista de sessões (repasse mais recente primeiro). */
export async function resumoAvaliacoes(perfilId: string, limiteSessoes = 20): Promise<ResumoAvaliacoes> {
  const db = await getDB();
  const registros = await db.getAllFromIndex('avaliacoes', 'perfil_id', perfilId);

  const espacos = new Map((await db.getAll('espacos')).map((e) => [e.id, e.nome]));
  const temas = new Map((await db.getAll('temas')).map((t) => [t.id, t.nome]));

  const resumo: ResumoAvaliacoes = {
    total: 0,
    facil: 0,
    medio: 0,
    dificil: 0,
    sessoesTotal: 0,
    sessoes: [],
  };
  const porSessao = new Map<string, SessaoAvaliacao>();

  for (const r of registros) {
    resumo.total++;
    resumo[r.avaliacao]++;
    if (!resumo.ultimaEm || r.criado_em > resumo.ultimaEm) resumo.ultimaEm = r.criado_em;

    let sessao = porSessao.get(r.sessao_id);
    if (!sessao) {
      sessao = {
        sessao_id: r.sessao_id,
        criado_em: r.criado_em,
        total: 0,
        facil: 0,
        medio: 0,
        dificil: 0,
        escopo: r.escopo,
        contexto:
          (r.escopo === 'tema' ? temas.get(r.tema_id) : espacos.get(r.espaco_id)) ??
          'Conteúdo excluído',
      };
      porSessao.set(r.sessao_id, sessao);
    }
    sessao.total++;
    sessao[r.avaliacao]++;
    if (r.criado_em > sessao.criado_em) sessao.criado_em = r.criado_em;
  }

  resumo.sessoesTotal = porSessao.size;
  resumo.sessoes = [...porSessao.values()]
    .sort((a, b) => b.criado_em.localeCompare(a.criado_em))
    .slice(0, limiteSessoes);

  return resumo;
}
