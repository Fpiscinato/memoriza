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
