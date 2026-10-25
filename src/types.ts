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
  /** Chave de um ícone do conjunto curado (src/ui/espaco-icons.ts). Ausente = sugestão automática. */
  icone?: string;
  /** Índice da paleta de acento (0..ACCENT_COUNT-1). Ausente = cor automática (sem repetir). */
  cor?: number;
  /** Exclusão suave (Lixeira): fica oculto nas telas mas recuperável por EXCLUSAO_RETENCAO_DIAS. */
  excluido?: boolean;
  /** Quando foi mandado pra Lixeira — base do expurgo automático. */
  excluido_em?: string;
}

export interface Tema {
  id: string;
  espaco_id: string;
  nome: string;
  /** Categoria/módulo que agrupa os Temas na listagem do Espaço. */
  categoria: string;
  /** Subpasta opcional (outro Tema). Ausente = Tema direto do Espaço. */
  pai_id?: string;
  /** Chave de um ícone do conjunto curado (src/ui/espaco-icons.ts). Ausente = sugestão automática. */
  icone?: string;
  /** Índice da paleta de acento (0..ACCENT_COUNT-1). Ausente = cor automática (sem repetir). */
  cor?: number;
  favorito: boolean;
  criado_em: string;
  atualizado_em: string;
  excluido?: boolean;
  excluido_em?: string;
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
  excluido?: boolean;
  excluido_em?: string;
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

/** Uma nota avaliada numa sessão de "Avaliação" (autoteste com Fácil/Médio/Difícil), separada
 *  da revisão espaçada — não mexe em itens_revisao. Vários registros compartilham o mesmo
 *  `sessao_id` (uma sessão = um repasse inteiro). */
export interface AvaliacaoRegistro {
  id: string;
  perfil_id: string;
  espaco_id: string;
  tema_id: string;
  nota_id: string;
  avaliacao: Avaliacao;
  /** De onde a sessão partiu: do Espaço inteiro (todos os Temas), de uma categoria específica
   *  ou de um Tema específico. `categoria` (texto) só é preenchida no escopo 'categoria'. */
  escopo: 'espaco' | 'categoria' | 'tema';
  categoria?: string;
  sessao_id: string;
  criado_em: string;
  atualizado_em: string;
}

/** Lojas que podem ser "expurgadas" (apagadas de vez) e portanto gerar um "lápide". */
export const PURGAVEIS = [
  'perfis',
  'espacos',
  'temas',
  'notas',
  'itens_revisao',
  'avaliacoes',
] as const;
export type LojaPurgavel = (typeof PURGAVEIS)[number];

/**
 * Lápide de uma exclusão definitiva ("Excluir de vez" na Lixeira). Sem ela, o registro
 * apagado localmente voltaria no próximo sync/importar — porque a mesclagem nunca apaga
 * o que existe local, e o backup remoto ainda tinha o registro. A lápide viaja no
 * export/sync e vence qualquer cópia mais antiga do registro (ver src/domain/purga.ts).
 */
export interface Purga {
  id: string;
  /** Loja do registro apagado ("espacos", "notas", ...). */
  loja: LojaPurgavel;
  /** Id do registro apagado. */
  alvo_id: string;
  /** Quando a exclusão definitiva aconteceu (timestamp ISO). */
  purgado_em: string;
}

export const STORE_NAMES = [
  'perfis',
  'espacos',
  'temas',
  'notas',
  'itens_revisao',
  'avaliacoes',
  'purgas',
] as const;
export type StoreName = (typeof STORE_NAMES)[number];

/** Cópia de segurança local (IndexedDB), fora do export/sync. `conteudo` é o ExportFile
 *  inteiro serializado — dá pra restaurar (mesclando) ou baixar como .json. */
export interface Snapshot {
  id: string;
  criado_em: string;
  automatico: boolean;
  titulo: string;
  /** Tamanho do conteúdo serializado, em bytes (só para exibir). */
  bytes: number;
  conteudo: string;
}

export interface MemorizaData {
  perfis: Perfil[];
  espacos: Espaco[];
  temas: Tema[];
  notas: Nota[];
  itens_revisao: ItemRevisao[];
  avaliacoes: AvaliacaoRegistro[];
  /** Lápides das exclusões definitivas — impedem que o registro "ressuscite" no sync. */
  purgas: Purga[];
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
