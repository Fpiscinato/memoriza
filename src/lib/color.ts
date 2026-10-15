// Paleta fixa e acessível (8 cores, com variantes claro/escuro em tokens.css) — nunca cor
// aleatória. A mesma chave (id de Espaço, ou categoria normalizada) sempre cai na mesma cor,
// via hash determinístico — dá pra "bater o olho" e diferenciar sem precisar ler o texto.

export const ACCENT_COUNT = 8;

function hash(chave: string): number {
  let h = 0;
  for (let i = 0; i < chave.length; i++) {
    h = (h * 31 + chave.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function accentIndexFor(chave: string): number {
  return hash(chave) % ACCENT_COUNT;
}

/** Valor CSS pronto pra usar em `style="--dot-color: ..."`. */
export function accentVar(chave: string): string {
  return `var(--accent-${accentIndexFor(chave)})`;
}

/**
 * Distribui cores para uma lista de chaves evitando repetição dentro do mesmo conjunto
 * (até o limite de ACCENT_COUNT). O hash sozinho pode colidir — com poucos itens é comum
 * dois caírem na mesma cor. Aqui, se a cor sorteada já estiver em uso, avança para a
 * próxima livre, mantendo o resultado determinístico pela ordem de entrada.
 */
/** Cor efetiva de um Espaço: a escolhida manualmente (`cor`), senão o fallback informado
 *  (a cor automática distribuída sem repetir). */
export function espacoCorVar(cor: number | undefined, fallback: string): string {
  return typeof cor === 'number' ? `var(--accent-${cor})` : fallback;
}

export function assignAccentVars(chaves: string[]): Map<string, string> {
  const usados = new Set<number>();
  const mapa = new Map<string, string>();
  for (const chave of chaves) {
    let idx = accentIndexFor(chave);
    for (let passo = 0; passo < ACCENT_COUNT && usados.has(idx); passo++) {
      idx = (idx + 1) % ACCENT_COUNT;
    }
    usados.add(idx);
    mapa.set(chave, `var(--accent-${idx})`);
  }
  return mapa;
}

/**
 * Cores efetivas de uma lista de Espaços: usa a cor escolhida (`cor`) quando existir e, para
 * os demais, distribui as cores restantes sem repetir (respeitando as já escolhidas). Assim
 * nenhum Espaço fica com a mesma cor de outro, mesmo com escolha manual.
 */
export function assignEspacoCores(espacos: { id: string; cor?: number }[]): Map<string, string> {
  const usados = new Set<number>();
  for (const e of espacos) {
    if (typeof e.cor === 'number') usados.add(e.cor);
  }

  const mapa = new Map<string, string>();
  for (const e of espacos) {
    if (typeof e.cor === 'number') {
      mapa.set(e.id, `var(--accent-${e.cor})`);
      continue;
    }
    let idx = accentIndexFor(e.id);
    for (let passo = 0; passo < ACCENT_COUNT && usados.has(idx); passo++) {
      idx = (idx + 1) % ACCENT_COUNT;
    }
    usados.add(idx);
    mapa.set(e.id, `var(--accent-${idx})`);
  }
  return mapa;
}
