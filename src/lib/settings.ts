// Preferências de interface (não são "dados" de estudo): tema, perfil selecionado e data do
// último export. Guardadas em localStorage de propósito — são configurações do dispositivo,
// não o armazenamento principal do app (que é o IndexedDB, ver db/schema.ts).

export type ThemePreference = 'system' | 'light' | 'dark';

const KEYS = {
  selectedProfileId: 'memoriza:selectedProfileId',
  theme: 'memoriza:theme',
  lastExportAt: 'memoriza:lastExportAt',
  storagePersistRequested: 'memoriza:storagePersistRequested',
} as const;

export function getSelectedProfileId(): string | null {
  return localStorage.getItem(KEYS.selectedProfileId);
}

export function setSelectedProfileId(id: string | null): void {
  if (id) localStorage.setItem(KEYS.selectedProfileId, id);
  else localStorage.removeItem(KEYS.selectedProfileId);
}

export function getThemePreference(): ThemePreference {
  const value = localStorage.getItem(KEYS.theme);
  return value === 'light' || value === 'dark' ? value : 'system';
}

export function setThemePreference(theme: ThemePreference): void {
  if (theme === 'system') localStorage.removeItem(KEYS.theme);
  else localStorage.setItem(KEYS.theme, theme);
}

export function getLastExportAt(): string | null {
  return localStorage.getItem(KEYS.lastExportAt);
}

export function setLastExportAt(iso: string): void {
  localStorage.setItem(KEYS.lastExportAt, iso);
}

export function wasStoragePersistRequested(): boolean {
  return localStorage.getItem(KEYS.storagePersistRequested) === '1';
}

export function markStoragePersistRequested(): void {
  localStorage.setItem(KEYS.storagePersistRequested, '1');
}

const DEFAULT_REMINDER_HOUR = '19:00';

/**
 * Horário do lembrete diário, por perfil. Fica em localStorage (não no IndexedDB dos
 * perfis) porque só serve pra gerar o .ics — é uma preferência deste aparelho, sem relação
 * com o resto do modelo de dados nem com a mesclagem do importar.
 */
export function getReminderHour(perfilId: string): string {
  return localStorage.getItem(`memoriza:reminderHour:${perfilId}`) ?? DEFAULT_REMINDER_HOUR;
}

export function setReminderHour(perfilId: string, horaHHMM: string): void {
  localStorage.setItem(`memoriza:reminderHour:${perfilId}`, horaHHMM);
}
