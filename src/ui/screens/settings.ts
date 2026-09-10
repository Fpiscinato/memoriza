import { exportAll, exportProfile, downloadExportFile, parseExportFile, importData } from '../../db/export-import';
import { countProfileCascade, createProfile, deleteProfileCascade, listProfiles, renameProfile } from '../../db/profiles';
import { escapeHtml } from '../../lib/dom';
import {
  getGithubAutoSync,
  getGithubGistId,
  getGithubLastSyncAt,
  getGithubToken,
  getLastExportAt,
  getReminderHour,
  setGithubAutoSync,
  setGithubGistId,
  setGithubLastSyncAt,
  setGithubToken,
  setLastExportAt,
  setReminderHour,
  type ThemePreference,
} from '../../lib/settings';
import { currentTheme, setTheme } from '../../lib/theme';
import { formatDateTimeBR } from '../../lib/time';
import { downloadICS, generateDailyReminderICS } from '../../lib/ics';
import { confirmAction } from '../components/confirm-modal';
import { navigate } from '../router';
import { APP_VERSION_LABEL } from '../../version';
import { syncWithGithub } from '../../lib/github-sync';
import { ICONS } from '../icons';
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
  const token = getGithubToken();
  const autoSync = getGithubAutoSync();
  const lastSyncAt = getGithubLastSyncAt();
  const gistId = getGithubGistId();

  container.innerHTML = `
    <div class="stack content-narrow">
      <section class="settings-section">
        <div class="settings-section__title">${ICONS.user} Perfil</div>
        <div class="card">
          <div class="settings-list-row">
            <div>
              <div class="settings-row__label">${escapeHtml(ctx.perfil.nome)}</div>
              <div class="settings-row__desc">Perfil atual neste aparelho</div>
            </div>
            <button class="btn btn--secondary btn--sm" id="btn-switch-profile" type="button">Trocar de perfil</button>
          </div>
          <div class="settings-list-row">
            <div>
              <div class="settings-row__label">Como Usar</div>
              <div class="settings-row__desc">Exemplos reais de Espaço, Tema, Nota e o resto do app</div>
            </div>
            <button class="btn btn--secondary btn--sm" id="btn-como-usar" type="button">Abrir</button>
          </div>
        </div>
      </section>

      <section class="settings-section">
        <div class="settings-section__title">${ICONS.users} Gerenciar perfis</div>
        <div class="card stack">
          <div>
            ${perfis
              .map(
                (p) => `
              <div class="settings-list-row" data-perfil-id="${escapeHtml(p.id)}">
                <span data-view-nome>
                  <span class="settings-row__label">${escapeHtml(p.nome)}</span>
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
        <div class="settings-section__title">${ICONS.moon} Aparência</div>
        <div class="card">
          <div class="settings-list-row">
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
        </div>
      </section>

      <section class="settings-section">
        <div class="settings-section__title">${ICONS.database} Dados</div>
        <div class="card stack">
          <div class="settings-list-row">
            <div>
              <div class="settings-row__label">Exportar backup</div>
              <p class="settings-row__desc">
                Gera um arquivo .json para guardar em outro lugar (Drive, e-mail, etc).
                ${lastExport ? `Último export: ${escapeHtml(formatDateTimeBR(lastExport))}.` : 'Nenhum export feito ainda.'}
              </p>
            </div>
          </div>
          <div class="stack" style="flex-direction: row; flex-wrap: wrap; gap: var(--space-3);">
            <button class="btn btn--primary btn--sm" id="btn-export-profile" type="button">
              Exportar meu perfil (${escapeHtml(ctx.perfil.nome)})
            </button>
            <button class="btn btn--secondary btn--sm" id="btn-export-all" type="button">
              Exportar todos os perfis
            </button>
          </div>

          <div class="settings-list-row">
            <div>
              <div class="settings-row__label">Importar backup</div>
              <p class="settings-row__desc">
                Mescla um arquivo .json exportado antes. Dados locais mais recentes nunca são
                substituídos, e nada local é apagado.
              </p>
            </div>
          </div>
          <div>
            <button class="btn btn--secondary btn--sm" id="btn-import" type="button">Escolher arquivo…</button>
            <input type="file" accept="application/json" id="import-file" class="visually-hidden" />
          </div>
          <div id="import-summary" role="status"></div>
        </div>
      </section>

      <section class="settings-section">
        <div class="settings-section__title">${ICONS.sync} Sincronização em nuvem</div>
        <div class="card stack">
          <p class="text-muted" style="margin:0;">
            Um canto seguro do GitHub só seu (Gist privado) guarda uma cópia sincronizada do
            app — sem servidores intermediários, direto do seu navegador. O backup é mesclado:
            dados mais novos vencem e nada local é apagado.
          </p>
          <div class="field">
            <label class="field__label" for="input-github-token">Personal Access Token (GitHub)</label>
            <div style="display:flex; gap: var(--space-2); flex-wrap:wrap;">
              <input
                class="input" id="input-github-token" type="password" autocomplete="off"
                placeholder="ghp_…  (permissão só de Gist)"
                value="${escapeHtml(token)}"
                style="max-width: 340px;"
              />
              <button class="btn btn--secondary btn--sm" id="btn-limpar-token" type="button" title="Remove o token deste navegador">Limpar</button>
            </div>
            <p class="settings-row__desc" style="margin-top: var(--space-1);">
              Como criar: github.com → Settings → Developer settings → Personal access tokens →
              “Tokens (classic)” → Generate new token → marque só <b>gist</b> → Generate.
              O token fica salvo <b>apenas neste navegador</b>, nunca é enviado a mais ninguém.
            </p>
          </div>

          <div>
            <button class="btn btn--primary btn--sm" id="btn-sync-now" type="button" style="align-self:flex-start;">
              ${ICONS.sync} Sincronizar agora
            </button>
          </div>
          <div id="sync-status" role="status">
            ${
              lastSyncAt
                ? `<div class="banner banner--success" style="margin-bottom:0;">${ICONS.check} Última sincronização: ${escapeHtml(formatDateTimeBR(lastSyncAt))}${gistId ? '.' : ''}</div>`
                : token
                  ? `<div class="banner banner--muted" style="margin-bottom:0;">Token salvo — ainda não sincronizou neste aparelho.</div>`
                  : ''
            }
          </div>

          <div class="settings-list-row">
            <div>
              <div class="settings-row__label">Sincronização automática</div>
              <p class="settings-row__desc">Ao abrir o app, se a última sincronização tiver mais de 30 min, roda sozinha em segundo plano.</p>
            </div>
            <input type="checkbox" id="sync-auto" class="toggle-checkbox" ${autoSync ? 'checked' : ''} aria-label="Sincronização automática" />
          </div>
        </div>
      </section>

      <section class="settings-section">
        <div class="settings-section__title">${ICONS.clock} Lembretes</div>
        <div class="card stack">
          <p class="text-muted" style="margin:0;">
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
          <p class="settings-row__desc" style="margin:0;">
            Depois de adicionado, esse lembrete passa a ser gerenciado direto no app de
            Calendário/Lembretes do celular — editar horário ou cancelar se faz por lá, sem
            conexão contínua com o Memoriza. Se trocar o horário aqui depois, baixe um novo
            arquivo e apague o antigo manualmente no Calendário.
          </p>
        </div>
      </section>
    </div>

    <footer class="app-footer">
      <span>${escapeHtml(APP_VERSION_LABEL)}</span>
    </footer>
  `;

  container.querySelector('#btn-switch-profile')?.addEventListener('click', () => {
    ctx.onSwitchProfile();
  });

  container.querySelector('#btn-como-usar')?.addEventListener('click', () => navigate('ajuda'));

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

  const syncStatus = container.querySelector<HTMLElement>('#sync-status');
  const syncButton = container.querySelector<HTMLButtonElement>('#btn-sync-now');
  syncButton?.addEventListener('click', async () => {
    const input = container.querySelector<HTMLInputElement>('#input-github-token')!;
    const tokenAtual = input.value.trim();
    if (!tokenAtual) {
      if (syncStatus) {
        syncStatus.innerHTML = `<div class="banner banner--warning" role="alert">Cole seu Personal Access Token do GitHub primeiro.</div>`;
      }
      return;
    }

    setGithubToken(tokenAtual);
    syncButton.disabled = true;
    if (syncStatus) {
      syncStatus.innerHTML = `<div class="banner banner--muted" role="status">${ICONS.sync} Sincronizando…</div>`;
    }

    try {
      const resultado = await syncWithGithub(tokenAtual);
      if (syncStatus) {
        const partes = [
          resultado.criados > 0 ? `${resultado.criados} novo(s)` : null,
          resultado.atualizados > 0 ? `${resultado.atualizados} atualizado(s)` : null,
        ].filter(Boolean);
        syncStatus.innerHTML = `
          <div class="banner banner--success" role="status">
            ${ICONS.check} Sincronizado!${partes.length > 0 ? ` ${partes.join(', ')} baixado(s).` : ''}
            ${resultado.mesclouRemoto ? '' : ' (backup remoto não existia ainda — o local foi enviado.)'}
          </div>
        `;
      }
      renderSettings(container, ctx);
    } catch (err) {
      syncButton.disabled = false;
      if (syncStatus) {
        syncStatus.innerHTML = `
          <div class="banner banner--warning" role="alert">
            ${escapeHtml(err instanceof Error ? err.message : 'Não foi possível sincronizar.')}
          </div>
        `;
      }
    }
  });

  container.querySelector('#btn-limpar-token')?.addEventListener('click', async () => {
    const ok = await confirmAction({
      title: 'Remover token do GitHub?',
      message: 'O backup já sincronizado continua no GitHub — esta ação só apaga o token salvos neste navegador.',
    });
    if (!ok) return;
    setGithubToken('');
    setGithubGistId('');
    setGithubLastSyncAt('');
    renderSettings(container, ctx);
  });

  container.querySelector<HTMLInputElement>('#sync-auto')?.addEventListener('change', (e) => {
    setGithubAutoSync((e.target as HTMLInputElement).checked);
  });
}
