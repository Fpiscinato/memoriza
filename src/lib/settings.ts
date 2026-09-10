// Preferências de interface (não são "dados" de estudo): tema, perfil selecionado e data do
// último export. Guardadas em localStorage de propósito — são configurações do dispositivo,
// não o armazenamento principal do app (que é o IndexedDB, ver db/schema.ts).

export type ThemePreference = 'system' | 'light' | 'dark';

const KEYS = {
  selectedProfileId: 'memoriza:selectedProfileId',
  theme: 'memoriza:theme',
  lastExportAt: 'memoriza:lastExportAt',
  storagePersistRequested: 'memoriza:storagePersistRequested',
  backupBannerSnoozedUntil: 'memoriza:backupBannerSnoozedUntil',
  githubToken: 'memoriza:githubToken',
  githubGistId: 'memoriza:githubGistId',
  githubLastSyncAt: 'memoriza:githubLastSyncAt',
  githubAutoSync: 'memoriza:githubAutoSync',
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

/** ISO da data até quando o aviso de backup foi adiado — não tem mais como criar esse adiamento
 * pela UI (o aviso virou um ícone pequeno no cabeçalho, sem botão de dispensar), mas ainda
 * respeita um adiamento já salvo de antes dessa mudança. */
export function getBackupBannerSnoozedUntil(): string | null {
  return localStorage.getItem(KEYS.backupBannerSnoozedUntil);
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

// --- Sincronização em nuvem (GitHub Gist privado) ---------------------------
// O token e o id do Gist ficam no localStorage (config de dispositivo, como as demais
// preferências). O token nunca sai do navegador — as chamadas à API do GitHub são feitas
// direto daqui, via HTTPS.

export function getGithubToken(): string {
  return localStorage.getItem(KEYS.githubToken) ?? '';
}

export function setGithubToken(token: string): void {
  if (token.trim()) localStorage.setItem(KEYS.githubToken, token.trim());
  else localStorage.removeItem(KEYS.githubToken);
}

export function getGithubGistId(): string {
  return localStorage.getItem(KEYS.githubGistId) ?? '';
}

export function setGithubGistId(gistId: string): void {
  if (gistId) localStorage.setItem(KEYS.githubGistId, gistId);
  else localStorage.removeItem(KEYS.githubGistId);
}

/** ISO de quando a última sincronização com o GitHub terminou com sucesso. */
export function getGithubLastSyncAt(): string | null {
  return localStorage.getItem(KEYS.githubLastSyncAt);
}

export function setGithubLastSyncAt(iso: string): void {
  if (iso) localStorage.setItem(KEYS.githubLastSyncAt, iso);
  else localStorage.removeItem(KEYS.githubLastSyncAt);
}

export function getGithubAutoSync(): boolean {
  return localStorage.getItem(KEYS.githubAutoSync) === '1';
}

export function setGithubAutoSync(ativo: boolean): void {
  if (ativo) localStorage.setItem(KEYS.githubAutoSync, '1');
  else localStorage.removeItem(KEYS.githubAutoSync);
}
