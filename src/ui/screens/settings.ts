import { exportAll, exportProfile, downloadExportFile, parseExportFile, importData } from '../../db/export-import';
import { countProfileCascade, createProfile, deleteProfileCascade, listProfiles, renameProfile } from '../../db/profiles';
import { escapeHtml } from '../../lib/dom';
import {
  getLastExportAt,
  getReminderHour,
  setLastExportAt,
  setReminderHour,
  type ThemePreference,
} from '../../lib/settings';
import { currentTheme, setTheme } from '../../lib/theme';
import { downloadICS, generateDailyReminderICS } from '../../lib/ics';
import { confirmAction } from '../components/confirm-modal';
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

export async function renderSettings(container: HTMLElement, ctx: SettingsContext): Promise<void> {
  const theme = currentTheme();
  const lastExport = getLastExportAt();
  const perfis = await listProfiles();
  const horaLembrete = getReminderHour(ctx.perfil.id);

  container.innerHTML = `
    <div class="stack content-narrow">
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
        <div class="settings-section__title">Gerenciar perfis</div>
        <div class="card stack">
          <div class="item-list">
            ${perfis
              .map(
                (p) => `
              <div class="item-row" data-perfil-id="${escapeHtml(p.id)}">
                <span class="item-row__main" data-view-nome>
                  <span class="item-row__title">${escapeHtml(p.nome)}</span>
                </span>
                <div class="item-row__actions">
                  <button class="btn btn--secondary btn--sm" data-renomear="${escapeHtml(p.id)}" type="button">Renomear</button>
                  ${
                    perfis.length > 1
                      ? `
                    <details class="item-menu">
                      <summary aria-label="Mais opções">⋯</summary>
                      <div class="item-menu__panel">
                        <button data-excluir-perfil="${escapeHtml(p.id)}" data-nome="${escapeHtml(p.nome)}" class="danger" type="button">Excluir perfil</button>
                      </div>
                    </details>
                  `
                      : ''
                  }
                </div>
              </div>
            `,
              )
              .join('')}
          </div>
          <div id="form-novo-perfil" style="display:none;">
            <div class="field">
              <label class="field__label" for="input-novo-perfil">Nome do novo perfil</label>
              <input class="input" id="input-novo-perfil" type="text" maxlength="60" />
            </div>
            <div class="form-actions" style="margin-top: var(--space-3);">
              <button class="btn btn--primary btn--sm" id="btn-salvar-perfil" type="button">Adicionar</button>
              <button class="btn btn--secondary btn--sm" id="btn-cancelar-perfil" type="button">Cancelar</button>
            </div>
          </div>
          <button class="btn btn--secondary btn--sm" id="btn-novo-perfil" type="button" style="align-self: flex-start;">+ Adicionar perfil</button>
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
        <div class="card stack">
          <p class="text-muted">
            O Memoriza não envia notificações. Escolha um horário e baixe um lembrete diário
            para o app de Calendário/Lembretes do seu celular.
          </p>
          <div class="field" style="max-width: 160px;">
            <label class="field__label" for="input-hora-lembrete">Horário</label>
            <input class="input" id="input-hora-lembrete" type="time" value="${escapeHtml(horaLembrete)}" />
          </div>
          <button class="btn btn--primary btn--sm" id="btn-baixar-lembrete" type="button" style="align-self:flex-start;">
            Baixar lembrete para o celular
          </button>
          <p class="settings-row__desc">
            Depois de adicionado, esse lembrete passa a ser gerenciado direto no app de
            Calendário/Lembretes do celular — editar horário ou cancelar se faz por lá, sem
            conexão contínua com o Memoriza. Se trocar o horário aqui depois, baixe um novo
            arquivo e apague o antigo manualmente no Calendário.
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

  const formNovoPerfil = container.querySelector<HTMLElement>('#form-novo-perfil')!;
  container.querySelector('#btn-novo-perfil')?.addEventListener('click', () => {
    formNovoPerfil.style.display = 'block';
    container.querySelector<HTMLInputElement>('#input-novo-perfil')?.focus();
  });
  container.querySelector('#btn-cancelar-perfil')?.addEventListener('click', () => {
    formNovoPerfil.style.display = 'none';
  });
  container.querySelector('#btn-salvar-perfil')?.addEventListener('click', async () => {
    const input = container.querySelector<HTMLInputElement>('#input-novo-perfil')!;
    const nome = input.value.trim();
    if (!nome) return;
    await createProfile(nome);
    renderSettings(container, ctx);
  });

  container.querySelectorAll<HTMLButtonElement>('[data-renomear]').forEach((btn) => {
    btn.onclick = () => {
      const perfilId = btn.dataset.renomear!;
      const row = container.querySelector<HTMLElement>(`[data-perfil-id="${perfilId}"]`);
      const view = row?.querySelector<HTMLElement>('[data-view-nome]');
      if (!row || !view) return;
      const nomeAtual = view.textContent?.trim() ?? '';
      view.innerHTML = `
        <input class="input" type="text" value="${escapeHtml(nomeAtual)}" maxlength="60" style="max-width:200px;" />
      `;
      const input = view.querySelector<HTMLInputElement>('input')!;
      input.focus();
      input.select();
      btn.textContent = 'Salvar';

      const onSalvar = async () => {
        const novoNome = input.value.trim();
        if (novoNome) {
          await renameProfile(perfilId, novoNome);
          if (perfilId === ctx.perfil.id) ctx.perfil = { ...ctx.perfil, nome: novoNome };
        }
        renderSettings(container, ctx);
      };
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') onSalvar();
      });
      btn.onclick = onSalvar;
    };
  });

  container.querySelectorAll<HTMLButtonElement>('[data-excluir-perfil]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const perfilId = btn.dataset.excluirPerfil!;
      const nome = btn.dataset.nome ?? '';
      const contagem = await countProfileCascade(perfilId);
      const ok = await confirmAction({
        title: `Excluir o perfil "${nome}"?`,
        message: `Isso vai apagar ${contagem.espacos} espaço(s), ${contagem.temas} tema(s) e ${contagem.notas} nota(s) — todo o conteúdo desse perfil.\nNão pode ser desfeito — mas dá pra restaurar de um backup exportado, se tiver um.`,
      });
      if (!ok) return;
      await deleteProfileCascade(perfilId);
      if (perfilId === ctx.perfil.id) {
        ctx.onSwitchProfile();
      } else {
        renderSettings(container, ctx);
      }
    });
  });

  container.querySelector('#btn-baixar-lembrete')?.addEventListener('click', () => {
    const hora = container.querySelector<HTMLInputElement>('#input-hora-lembrete')!.value || '19:00';
    setReminderHour(ctx.perfil.id, hora);
    downloadICS(generateDailyReminderICS(hora));
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
