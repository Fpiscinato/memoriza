// Modelo de dados do Memoriza. Todo registro tem `id` (UUID) e `atualizado_em`
// (timestamp ISO), base da mesclagem no importar/exportar (ver db/merge.ts).

export interface Perfil {
  id: string;
  nome: string;
  criado_em: string;
  atualizado_em: string;
}

export interface Espaco {
  id: string;
  perfil_id: string;
  nome: string;
  /** Texto livre (ex: "Cursos", "Livros") — agrupa os Espaços na listagem, igual Tema.categoria. */
  categoria: string;
  criado_em: string;
  atualizado_em: string;
  arquivado: boolean;
  /** Quando arquivado virou true da última vez — ausente em Espaços arquivados antes desse campo existir. */
  arquivado_em?: string;
}

export interface Tema {
  id: string;
  espaco_id: string;
  nome: string;
  categoria: string;
  favorito: boolean;
  criado_em: string;
  atualizado_em: string;
}

export interface Nota {
  id: string;
  tema_id: string;
  /** Curto, tipo pergunta/frase-chave — é o que aparece no recall ativo, antes de revelar. */
  titulo: string;
  conteudo: string;
  /** Citação/referência (ex: "Aula 4", "página 132") — só aparece depois de revelar. */
  fonte: string;
  /** "Esse conteúdo pode ficar desatualizado?" — habilita o aviso de validade na revisão. */
  pode_desatualizar: boolean;
  validade_ate?: string;
  favorito: boolean;
  /**
   * false só em notas migradas automaticamente da Fase 1d (título copiado da antiga
   * Fonte) — sinaliza "revise este título" até o usuário passar pelo formulário de edição.
   */
  titulo_revisado: boolean;
  criado_em: string;
  atualizado_em: string;
}

export type EstagioRevisao = '1' | '7' | '30' | '180' | 'consulta';
export type StatusRevisao = 'pendente' | 'feita' | 'atrasada';
export type Avaliacao = 'facil' | 'medio' | 'dificil';

export interface ItemRevisao {
  id: string;
  nota_id: string;
  perfil_id: string;
  estagio: EstagioRevisao;
  data_agendada: string;
  data_concluida?: string;
  status: StatusRevisao;
  avaliacao?: Avaliacao;
  streak_facil: number;
  /** Só definido quando concluída (status 'feita') — tempo com a tela em foco, entre ver o título e avaliar. */
  duracao_segundos?: number;
  criado_em: string;
  atualizado_em: string;
}

export const STORE_NAMES = ['perfis', 'espacos', 'temas', 'notas', 'itens_revisao'] as const;
export type StoreName = (typeof STORE_NAMES)[number];

export interface MemorizaData {
  perfis: Perfil[];
  espacos: Espaco[];
  temas: Tema[];
  notas: Nota[];
  itens_revisao: ItemRevisao[];
}

/** Envelope do arquivo exportado (.json). */
export interface ExportFile {
  formato: 'memoriza-export';
  versao: 1;
  exportado_em: string;
  escopo: 'perfil' | 'todos';
  perfil_id?: string;
  dados: MemorizaData;
}
