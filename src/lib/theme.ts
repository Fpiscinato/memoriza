import { getThemePreference, setThemePreference, type ThemePreference } from './settings';

const KEY_TEMA = 'memoriza:theme';

/**
 * Aplica o tema no <html>.
 *
 * O `data-theme` é SEMPRE o tema efetivo ("light" ou "dark") — nunca "system". Isso
 * deixa a paleta escora escrita uma única vez no CSS (`:root[data-theme='dark']`),
 * em vez de duas (media query + seletor manual), que é como a divergência entre os
 * dois blocos começou.
 *
 * Quando a preferência é "system", o tema efetivo vem de `prefers-color-scheme` — e
 * acompanha o sistema em tempo real (o app muda de tema sozinho se o celular/
 * computador alternar o tema enquanto o app estiver aberto).
 */
export function applyTheme(): void {
  const pref = getThemePreference();
  const efetivo = pref === 'system' ? temaDoSistema() : pref;
  document.documentElement.setAttribute('data-theme', efetivo);
  document.documentElement.style.colorScheme = efetivo;
}

/** Marca o tema efetivo no <html> antes do CSS aplicar (evita o "flash" de tema
 *  claro ao abrir o app com o sistema em dark). Roda inline no <head>. */
export function aplicarTemaImediato(): void {
  try {
    const pref = localStorage.getItem(KEY_TEMA);
    const escuro =
      pref === 'dark' ||
      (pref !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.setAttribute('data-theme', escuro ? 'dark' : 'light');
    document.documentElement.style.colorScheme = escuro ? 'dark' : 'light';
  } catch {
    // localStorage bloqueado (modo privado) — segue com o padrão do sistema.
  }
}

export function setTheme(theme: ThemePreference): void {
  setThemePreference(theme);
  applyTheme();
}

export function currentTheme(): ThemePreference {
  return getThemePreference();
}

/** Tema efetivo agora ("light"/"dark") — independente da preferência salva. */
export function currentEffectiveTheme(): 'light' | 'dark' {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

/** Acompanha a mudança de tema do sistema (só importa quando a prefs é "system"). */
export function watchSystemTheme(): void {
  if (typeof window.matchMedia !== 'function') return;
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const onChange = () => {
    if (getThemePreference() === 'system') applyTheme();
  };
  if (typeof mq.addEventListener === 'function') mq.addEventListener('change', onChange);
  else if (typeof mq.addListener === 'function') mq.addListener(onChange);
}

function temaDoSistema(): 'light' | 'dark' {
  if (typeof window.matchMedia !== 'function') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
