import { exportAll, exportProfile, downloadExportFile, parseExportFile, importData } from '../../db/export-import';
import { escapeHtml } from '../../lib/dom';
import { getLastExportAt, setLastExportAt, type ThemePreference } from '../../lib/settings';
import { currentTheme, setTheme } from '../../lib/theme';
import type { Perfil } from '../../types';

export interface SettingsContext {
  perfil: Perfil;
  onSwitchProfile: () => void;
}

const THEME_OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: 'system', label: 'Sistema' },
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Escuro' },
];

export function renderSettings(container: HTMLElement, ctx: SettingsContext): void {
  const theme = currentTheme();
  const lastExport = getLastExportAt();

  container.innerHTML = `
    <div class="stack">
      <section class="settings-section">
        <div class="settings-section__title">Perfil</div>
        <div class="settings-row">
          <div>
            <div class="settings-row__label">${escapeHtml(ctx.perfil.nome)}</div>
            <div class="settings-row__desc">Perfil atual neste aparelho</div>
          </div>
          <button class="btn btn--secondary btn--sm" id="btn-switch-profile" type="button">Trocar de perfil</button>
        </div>
      </section>

      <section class="settings-section">
        <div class="settings-section__title">Aparência</div>
        <div class="settings-row">
          <div class="settings-row__label">Tema</div>
          <div class="segmented" role="group" aria-label="Tema">
            ${THEME_OPTIONS.map(
              (opt) => `
              <button
                class="segmented__option"
                type="button"
                data-theme="${opt.value}"
                aria-pressed="${opt.value === theme}"
              >${opt.label}</button>
            `,
            ).join('')}
          </div>
        </div>
      </section>

      <section class="settings-section">
        <div class="settings-section__title">Dados</div>
        <div class="card stack">
          <div>
            <div class="settings-row__label">Exportar backup</div>
            <p class="settings-row__desc">
              Gera um arquivo .json para guardar em outro lugar (Drive, e-mail, etc).
              ${lastExport ? `Último export: ${escapeHtml(formatDate(lastExport))}.` : 'Nenhum export feito ainda.'}
            </p>
          </div>
          <div class="stack" style="flex-direction: row; flex-wrap: wrap; gap: var(--space-3);">
            <button class="btn btn--primary btn--sm" id="btn-export-profile" type="button">
              Exportar meu perfil (${escapeHtml(ctx.perfil.nome)})
            </button>
            <button class="btn btn--secondary btn--sm" id="btn-export-all" type="button">
              Exportar todos os perfis
            </button>
          </div>

          <div>
            <div class="settings-row__label">Importar backup</div>
            <p class="settings-row__desc">
              Mescla um arquivo .json exportado antes. Dados locais mais recentes nunca são
              substituídos, e nada local é apagado.
            </p>
          </div>
          <div>
            <button class="btn btn--secondary btn--sm" id="btn-import" type="button">Escolher arquivo…</button>
            <input type="file" accept="application/json" id="import-file" class="visually-hidden" />
          </div>
          <div id="import-summary" role="status"></div>
        </div>
      </section>

      <section class="settings-section">
        <div class="settings-section__title">Lembretes</div>
        <div class="card">
          <p class="text-muted">
            O Memoriza não envia notificações. Para lembrar de revisar todos os dias,
            configure um lembrete recorrente no app de Calendário ou Lembretes do seu
            celular — é mais confiável do que depender do navegador.
          </p>
        </div>
      </section>
    </div>
  `;

  container.querySelector('#btn-switch-profile')?.addEventListener('click', () => {
    ctx.onSwitchProfile();
  });

  container.querySelectorAll<HTMLButtonElement>('.segmented__option').forEach((btn) => {
    btn.addEventListener('click', () => {
      const value = btn.dataset.theme as ThemePreference;
      setTheme(value);
      container.querySelectorAll('.segmented__option').forEach((b) => {
        b.setAttribute('aria-pressed', String(b === btn));
      });
    });
  });

  container.querySelector('#btn-export-profile')?.addEventListener('click', async () => {
    const file = await exportProfile(ctx.perfil.id);
    downloadExportFile(file);
    setLastExportAt(file.exportado_em);
    renderSettings(container, ctx);
  });

  container.querySelector('#btn-export-all')?.addEventListener('click', async () => {
    const file = await exportAll();
    downloadExportFile(file);
    setLastExportAt(file.exportado_em);
    renderSettings(container, ctx);
  });

  const fileInput = container.querySelector<HTMLInputElement>('#import-file');
  container.querySelector('#btn-import')?.addEventListener('click', () => {
    fileInput?.click();
  });

  fileInput?.addEventListener('change', async () => {
    const summaryEl = container.querySelector('#import-summary');
    const [file] = fileInput.files ?? [];
    if (!file || !summaryEl) return;

    try {
      const text = await file.text();
      const exportFile = parseExportFile(text);
      const summary = await importData(exportFile);
      summaryEl.innerHTML = `
        <div class="banner banner--success" role="status">
          Importado: ${summary.criados} criados, ${summary.atualizados} atualizados,
          ${summary.mantidos} mantidos como estavam.
        </div>
      `;
    } catch (err) {
      summaryEl.innerHTML = `
        <div class="banner banner--warning" role="alert">
          ${escapeHtml(err instanceof Error ? err.message : 'Não foi possível importar o arquivo.')}
        </div>
      `;
    } finally {
      fileInput.value = '';
    }
  });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
