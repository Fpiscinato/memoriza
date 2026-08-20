import { getThemePreference, setThemePreference, type ThemePreference } from './settings';

export function applyTheme(): void {
  const pref = getThemePreference();
  if (pref === 'system') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', pref);
  }
}

export function setTheme(theme: ThemePreference): void {
  setThemePreference(theme);
  applyTheme();
}

export function currentTheme(): ThemePreference {
  return getThemePreference();
}
