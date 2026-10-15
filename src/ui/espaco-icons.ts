// Conjunto curado de ícones de linha (SVG inline) para personalizar cada Espaço — sem
// dependência externa nem emoji (que muda de estilo por aparelho). A chave escolhida é
// guardada no campo opcional `Espaco.icone` (ver types.ts). Espaços antigos sem ícone caem
// numa sugestão automática (nome + categoria) ou no ícone padrão.

export interface EspacoIcone {
  chave: string;
  label: string;
  svg: string;
}

function svg(inner: string): string {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
}

export const ESPACO_ICONE_FALLBACK = 'livro';

export const ESPACO_ICONES: EspacoIcone[] = [
  { chave: 'pasta', label: 'Categoria', svg: svg('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>') },
  { chave: 'livro', label: 'Livro', svg: svg('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>') },
  { chave: 'livros', label: 'Pilha de livros', svg: svg('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 6h8M8 10h8"/>') },
  { chave: 'capelo', label: 'Formatura', svg: svg('<path d="M22 9.5L12 5 2 9.5l10 4.5 10-4.5z"/><path d="M6 11.5V16c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.5"/>') },
  { chave: 'igreja', label: 'Igreja', svg: svg('<path d="M12 2v5"/><path d="M9.5 4.5h5"/><path d="M5 21v-8l7-4.5 7 4.5v8"/><path d="M10 21v-4h4v4"/>') },
  { chave: 'cruz', label: 'Cruz', svg: svg('<path d="M12 3v18"/><path d="M7 8h10"/>') },
  { chave: 'lampada', label: 'Ideia', svg: svg('<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.3 1 2.5h6c0-1.2.3-1.8 1-2.5A6 6 0 0 0 12 3z"/>') },
  { chave: 'caderno', label: 'Caderno', svg: svg('<path d="M7 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7"/><path d="M7 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"/><path d="M11 3v18"/>') },
  { chave: 'alvo', label: 'Objetivo', svg: svg('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>') },
  { chave: 'trofeu', label: 'Conquista', svg: svg('<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 5H4v1a4 4 0 0 0 4 4M17 5h3v1a4 4 0 0 1-4 4"/><path d="M12 14v4"/><path d="M8 21h8"/>') },
  { chave: 'halter', label: 'Treino', svg: svg('<path d="M3 8.5v7M6.5 6.5v11M17.5 6.5v11M21 8.5v7M6.5 12h11"/>') },
  { chave: 'grafico', label: 'Finanças', svg: svg('<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>') },
  { chave: 'moeda', label: 'Dinheiro', svg: svg('<circle cx="9" cy="9" r="6"/><path d="M15.5 4.2A6 6 0 0 1 15.5 15.8"/><path d="M9 6.5v5M7.5 8h3"/>') },
  { chave: 'coracao', label: 'Saúde', svg: svg('<path d="M20.8 6.6a5 5 0 0 0-7.1 0L12 8.3l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 22l8.8-8.3a5 5 0 0 0 0-7.1z"/>') },
  { chave: 'balanca', label: 'Direito', svg: svg('<path d="M12 3v18"/><path d="M7 21h10"/><path d="M5 7h14"/><path d="M5 7l-2.5 6h5z"/><path d="M19 7l-2.5 6h5z"/>') },
  { chave: 'codigo', label: 'Programação', svg: svg('<path d="M8.5 6.5L3 12l5.5 5.5"/><path d="M15.5 6.5L21 12l-5.5 5.5"/>') },
  { chave: 'notaMusical', label: 'Música', svg: svg('<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>') },
  { chave: 'globo', label: 'Idiomas', svg: svg('<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z"/>') },
  { chave: 'puzzle', label: 'Raciocínio', svg: svg('<path d="M10 4a2 2 0 1 1 4 0v1h3a1 1 0 0 1 1 1v3h1a2 2 0 1 1 0 4h-1v3a1 1 0 0 1-1 1h-3v1a2 2 0 1 1-4 0v-1H6a1 1 0 0 1-1-1v-3H4a2 2 0 1 1 0-4h1V6a1 1 0 0 1 1-1h4z"/>') },
  { chave: 'ampulheta', label: 'História', svg: svg('<path d="M6 3h12"/><path d="M6 21h12"/><path d="M7 3c0 5 5 6 5 9s-5 4-5 9"/><path d="M17 3c0 5-5 6-5 9s5 4 5 9"/>') },
  { chave: 'frasco', label: 'Ciências', svg: svg('<path d="M9 3h6"/><path d="M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/>') },
  { chave: 'paleta', label: 'Arte', svg: svg('<path d="M12 3a9 9 0 1 0 0 18h1.3a2.4 2.4 0 0 0 1.7-4.1 1.9 1.9 0 0 1 1.4-3.2H19a2 2 0 0 0 2-2A8.9 8.9 0 0 0 12 3z"/><circle cx="7.5" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="10" cy="7" r="1" fill="currentColor" stroke="none"/><circle cx="14.5" cy="7" r="1" fill="currentColor" stroke="none"/>') },
  { chave: 'aviao', label: 'Viagem', svg: svg('<path d="M10.5 13.5L3 11l18-8-8 18-2.5-7.5z"/><path d="M21 3l-10.5 10.5"/>') },
  { chave: 'utensilios', label: 'Culinária', svg: svg('<path d="M4 3v6a3 3 0 0 0 6 0V3"/><path d="M7 9v12"/><path d="M17 3c-1.6 0-2.6 1.6-2.6 4.5S15.4 12 17 12v9"/>') },
  { chave: 'maleta', label: 'Negócios', svg: svg('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/>') },
  { chave: 'edificio', label: 'Arquitetura', svg: svg('<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>') },
  { chave: 'folha', label: 'Natureza', svg: svg('<path d="M20 4C10 4 4 8 4 15a5 5 0 0 0 5 5c7 0 11-6 11-16z"/><path d="M4 20c2-5 6-9 12-11"/>') },
  { chave: 'microfone', label: 'Podcast', svg: svg('<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v4"/>') },
  { chave: 'bandeira', label: 'Meta', svg: svg('<path d="M5 3v18"/><path d="M5 4h12l-2.5 4L17 12H5"/>') },
];

const POR_CHAVE = new Map(ESPACO_ICONES.map((i) => [i.chave, i]));

export function getEspacoIcone(chave?: string): EspacoIcone {
  return (chave && POR_CHAVE.get(chave)) || POR_CHAVE.get(ESPACO_ICONE_FALLBACK)!;
}

/** Palavras-chave (sem acento, minúsculas) → chave de ícone, para sugerir a partir do nome ou
 *  da categoria. A ordem importa: a primeira que casar vence. */
const PALAVRAS_SUGERIDAS: { termos: string[]; chave: string }[] = [
  { termos: ['biblia', 'igreja', 'crist', 'evangelh', 'gospel', 'teolog'], chave: 'igreja' },
  { termos: ['curso', 'aula', 'formacao', 'treinamento', 'certific', 'faculdade', 'gradua'], chave: 'capelo' },
  { termos: ['livro', 'leitura', 'biblioteca', 'literatura'], chave: 'livros' },
  { termos: ['idioma', 'ingles', 'espanhol', 'lingua', 'alemao', 'frances', 'japones'], chave: 'globo' },
  { termos: ['financ', 'invest', 'econom', 'dinheiro', 'mercado', 'renda'], chave: 'grafico' },
  { termos: ['direito', 'jurid', 'lei ', 'processo', 'constituic', 'advoc'], chave: 'balanca' },
  { termos: ['saude', 'medic', 'anatomia', 'nutric', 'enferm'], chave: 'coracao' },
  { termos: ['programa', 'codigo', 'tech', 'computa', 'software', 'python', 'javascript', 'dados'], chave: 'codigo' },
  { termos: ['musica', 'violao', 'piano', 'guitarra', 'canto'], chave: 'notaMusical' },
  { termos: ['psicolog', 'mente', 'comportament', 'filosof', 'logica'], chave: 'puzzle' },
  { termos: ['historia', 'histori'], chave: 'ampulheta' },
  { termos: ['ciencia', 'fisica', 'quimica', 'biolog', 'matemat'], chave: 'frasco' },
  { termos: ['arte', 'desenho', 'pintura', 'design', 'fotograf'], chave: 'paleta' },
  { termos: ['viagem', 'geografia', 'turismo', 'pais'], chave: 'aviao' },
  { termos: ['culinaria', 'receita', 'cozinha', 'gastronom'], chave: 'utensilios' },
  { termos: ['negocio', 'empresa', 'empreend', 'gestao', 'administra'], chave: 'maleta' },
  { termos: ['arquitet', 'engenharia', 'construc', 'obra'], chave: 'edificio' },
  { termos: ['natureza', 'ecolog', 'ambient', 'planta', 'agricultur', 'jardin'], chave: 'folha' },
  { termos: ['podcast', 'entrevista', 'audio', 'oratoria'], chave: 'microfone' },
  { termos: ['estudo', 'estud', 'aprend', 'teoria', 'conheciment'], chave: 'lampada' },
  { termos: ['treino', 'esporte', 'academia', 'fitness', 'exercic'], chave: 'halter' },
  { termos: ['meta', 'objetivo', 'projeto', 'planejament', 'produtiv'], chave: 'alvo' },
];

function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/** Sugere uma chave de ícone a partir de nome/categoria (ex: "Bíblia" → 'igreja'), ou
 *  undefined quando nada casa. */
export function sugerirEspacoIcone(texto: string): string | undefined {
  const t = normalizar(texto);
  if (!t.trim()) return undefined;
  return PALAVRAS_SUGERIDAS.find((s) => s.termos.some((termo) => t.includes(termo)))?.chave;
}

/** Chave efetiva de um Espaço: a escolhida, senão a sugerida por nome/categoria, senão o padrão. */
export function espacoIconeChave(espaco: { icone?: string; nome?: string; categoria?: string }): string {
  if (espaco.icone && POR_CHAVE.has(espaco.icone)) return espaco.icone;
  const sugerida = sugerirEspacoIcone(`${espaco.nome ?? ''} ${espaco.categoria ?? ''}`);
  return sugerida ?? ESPACO_ICONE_FALLBACK;
}

/** Ícone de um cabeçalho de categoria: sugestão pelo nome, senão a pasta. */
export const ESPACO_ICONE_CATEGORIA_FALLBACK = 'pasta';

export function categoriaIconeChave(categoria: string): string {
  return sugerirEspacoIcone(categoria) ?? ESPACO_ICONE_CATEGORIA_FALLBACK;
}
