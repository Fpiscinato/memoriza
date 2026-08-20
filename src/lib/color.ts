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
