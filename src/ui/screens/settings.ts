import { exportAll, exportProfile, downloadExportFile, parseExportFile, importData } from '../../db/export-import';
import { countProfileCascade, createProfile, deleteProfileCascade, listProfiles, renameProfile } from '../../db/profiles';
import { escapeHtml } from '../../lib/dom';
import {
  getGithubAutoSync,
  getGithubGistId,
  getGithubLastSyncAt,
  getGithubToken,
  getLastExportAt,
  getNotasOrdem,
  getReminderHour,
  setGithubAutoSync,
  setGithubGistId,
  setGithubLastSyncAt,
  setGithubToken,
  setLastExportAt,
  setNotasOrdem,
  setReminderHour,
  type NotasOrdem,
  type ThemePreference,
} from '../../lib/settings';
import { currentTheme, setTheme } from '../../lib/theme';
import { formatDateTimeBR } from '../../lib/time';
import { downloadICS, generateDailyReminderICS } from '../../lib/ics';
import { confirmAction } from '../components/confirm-modal';
import { navigate } from '../router';
import { listGistRevisions, restoreGistRevision, syncWithGithub, type GistRevision } from '../../lib/github-sync';
import {
  criarSnapshot,
  listarSnapshots,
  removerSnapshot,
  restaurarSnapshot,
} from '../../db/snapshots';
import {
  EXCLUSAO_RETENCAO_DIAS,
  expurgarItem,
  listarLixeira,
  restaurarItem,
  type LixeiraItem,
  type LixeiraTipo,
} from '../../db/lixeira';
import { ICONS } from '../icons';
import type { Perfil, Snapshot } from '../../types';

export interface SettingsContext {
  perfil: Perfil;
  onSwitchProfile: () => void;
}

/** Âncora de seção pra rolar até ela na próxima renderização de Configurações — usada pelos
 *  ícones de status do cabeçalho (nuvem/snapshot/lixeira) pra cair direto na seção certa. */
let ancoraPendente: string | null = null;

export function agendarScrollSettings(secaoId: string): void {
  ancoraPendente = secaoId;
}

const THEME_OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: 'system', label: 'Sistema' },
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Escuro' },
];

const NOTAS_ORDEM_OPTIONS: { value: NotasOrdem; label: string }[] = [
  { value: 'data', label: 'Mais antigas' },
  { value: 'titulo', label: 'Título (A–Z)' },
];

const LIXEIRA_TIPO_LABEL: Record<LixeiraTipo, string> = {
  espaco: 'Espaço',
  tema: 'Tema',
  nota: 'Nota',
};

function rotuloLixeira(item: LixeiraItem): string {
  const partes = [`${LIXEIRA_TIPO_LABEL[item.tipo]} em ${item.contexto}`];
  if (item.temas) partes.push(`${item.temas} tema(s)`);
  if (item.notas) partes.push(`${item.notas} nota(s)`);
  if (item.excluido_em) partes.push(`excluído em ${formatDateTimeBR(item.excluido_em)}`);
  return partes.join(' · ');
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function rotuloSnapshot(snap: Snapshot): string {
  const quando = `${formatDateTimeBR(snap.criado_em)} · ${formatBytes(snap.bytes)}`;
  return `${snap.automatico ? 'Automático' : 'Manual'} · ${quando}`;
}

function rotuloRevisao(rev: GistRevision): string {
  return formatDateTimeBR(rev.committed_at);
}

export async function renderSettings(container: HTMLElement, ctx: SettingsContext): Promise<void> {
  const theme = currentTheme();
  const lastExport = getLastExportAt();
  const perfis = await listProfiles();
  const horaLembrete = getReminderHour(ctx.perfil.id);
  const token = getGithubToken();
  const autoSync = getGithubAutoSync();
  const lastSyncAt = getGithubLastSyncAt();
  const gistId = getGithubGistId();
  const notasOrdem = getNotasOrdem();
  const lixeira = await listarLixeira(ctx.perfil.id);
  const snapshots = await listarSnapshots();

  container.innerHTML = `
    <div class="stack content-narrow content-wide">
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
            <div class="segmented" id="tema-opcoes" role="group" aria-label="Tema">
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
        <div class="settings-section__title">${ICONS.ordenar} Ordenação</div>
        <div class="card">
          <div class="settings-list-row">
            <div>
              <div class="settings-row__label">Notas dentro do Tema</div>
              <p class="settings-row__desc">
                Como as Notas são listadas. Espaços, Temas e categorias já seguem sempre o
                nome — em ordem do calendário quando são meses, e com os números como números
                ("Aula 2" antes de "Aula 10"). A exportação em PDF segue esta escolha.
              </p>
            </div>
            <div class="segmented" id="notas-ordem" role="group" aria-label="Ordenação das notas">
              ${NOTAS_ORDEM_OPTIONS.map(
                (opt) => `
                <button
                  class="segmented__option"
                  type="button"
                  data-notas-ordem="${opt.value}"
                  aria-pressed="${opt.value === notasOrdem}"
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

      <section class="settings-section" id="section-snapshots">
        <div class="settings-section__title">${ICONS.clock} Snapshots locais</div>
        <div class="card stack">
          <p class="text-muted" style="margin:0;">
            Cópias de segurança guardadas neste aparelho, sem depender da nuvem. Uma é criada
            sozinha ao abrir o app (uma por dia) e fica disponível por aqui. Restaurar
            <b>mescla</b> com os dados atuais — nunca apaga nada.
          </p>
          <div style="display:flex; gap: var(--space-3); flex-wrap:wrap;">
            <button class="btn btn--secondary btn--sm" id="btn-snapshot-criar" type="button">Criar snapshot agora</button>
          </div>
          <div id="snapshot-status" role="status"></div>
          ${
            snapshots.length === 0
              ? `<p class="text-muted" style="margin:0;">Nenhum snapshot ainda.</p>`
              : `<div>
                  ${snapshots
                    .map(
                      (snap) => `
                    <div class="settings-list-row">
                      <div>
                        <div class="settings-row__label">${escapeHtml(rotuloSnapshot(snap))}</div>
                      </div>
                      <div class="item-row__actions">
                        <button class="btn btn--secondary btn--sm" data-snapshot-restaurar="${escapeHtml(snap.id)}" type="button">Restaurar</button>
                        <button class="btn btn--secondary btn--sm" data-snapshot-remover="${escapeHtml(snap.id)}" type="button">Apagar</button>
                      </div>
                    </div>
                  `,
                    )
                    .join('')}
                </div>`
          }
        </div>
      </section>

      <section class="settings-section" id="section-lixeira">
        <div class="settings-section__title">${ICONS.trash} Lixeira</div>
        <div class="card stack">
          <p class="text-muted" style="margin:0;">
            Excluir um Espaço, Tema ou Nota manda pra cá em vez de apagar na hora. Dá pra
            restaurar a qualquer momento; depois de ${EXCLUSAO_RETENCAO_DIAS} dias o item é
            removido de vez, sozinho.
          </p>
          ${
            lixeira.length === 0
              ? `<p class="text-muted" style="margin:0;">A lixeira está vazia.</p>`
              : `<div>
                  ${lixeira
                    .map(
                      (item) => `
                    <div class="settings-list-row">
                      <div>
                        <div class="settings-row__label">${escapeHtml(item.nome)}</div>
                        <p class="settings-row__desc">${escapeHtml(rotuloLixeira(item))}</p>
                      </div>
                      <div class="item-row__actions">
                        <button class="btn btn--secondary btn--sm" data-restaurar="${escapeHtml(item.id)}" data-tipo="${item.tipo}" type="button">${ICONS.undo} Restaurar</button>
                        <button class="btn btn--secondary btn--sm" data-expurgar="${escapeHtml(item.id)}" data-tipo="${item.tipo}" data-nome="${escapeHtml(item.nome)}" type="button">Excluir de vez</button>
                      </div>
                    </div>
                  `,
                    )
                    .join('')}
                </div>`
          }
        </div>
      </section>

      <section class="settings-section" id="section-sync">
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

          <details id="gist-historico">
            <summary class="settings-row__label" style="cursor:pointer;">Histórico do backup na nuvem</summary>
            <div class="stack" style="margin-top: var(--space-3);">
              <p class="settings-row__desc" style="margin:0;">
                O GitHub guarda todas as versões já gravadas no Gist. Dá pra trazer uma antiga
                de volta — a restauração <b>mescla</b> com o que já existe local.
              </p>
              <div>
                <button class="btn btn--secondary btn--sm" id="btn-gist-revisoes" type="button">${ICONS.sync} Carregar histórico</button>
              </div>
              <div id="gist-revisoes" role="status"></div>
            </div>
          </details>

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

  `;

  container.querySelector('#btn-switch-profile')?.addEventListener('click', () => {
    ctx.onSwitchProfile();
  });

  container.querySelector('#btn-como-usar')?.addEventListener('click', () => navigate('ajuda'));

  container.querySelectorAll<HTMLButtonElement>('#tema-opcoes .segmented__option').forEach((btn) => {
    btn.addEventListener('click', () => {
      const value = btn.dataset.theme as ThemePreference;
      setTheme(value);
      container.querySelectorAll('#tema-opcoes .segmented__option').forEach((b) => {
        b.setAttribute('aria-pressed', String(b === btn));
      });
    });
  });

  container.querySelectorAll<HTMLButtonElement>('#notas-ordem .segmented__option').forEach((btn) => {
    btn.addEventListener('click', () => {
      setNotasOrdem(btn.dataset.notasOrdem as NotasOrdem);
      container.querySelectorAll('#notas-ordem .segmented__option').forEach((b) => {
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
      // Guarda um snapshot local antes de mexer nos dados — dá pra voltar atrás em Configurações.
      await criarSnapshot({ titulo: 'Antes de importar' });
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

  container.querySelectorAll<HTMLButtonElement>('[data-restaurar]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      btn.disabled = true;
      await restaurarItem(btn.dataset.tipo as LixeiraTipo, btn.dataset.restaurar!);
      renderSettings(container, ctx);
    });
  });

  container.querySelectorAll<HTMLButtonElement>('[data-expurgar]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const nome = btn.dataset.nome ?? '';
      const ok = await confirmAction({
        title: `Excluir "${nome}" de vez?`,
        message:
          'O item e tudo que foi junto com ele (temas e notas) serão apagados deste aparelho, sem volta. Um eventual backup no GitHub ainda guarda uma cópia.',
      });
      if (!ok) return;
      btn.disabled = true;
      await expurgarItem(btn.dataset.tipo as LixeiraTipo, btn.dataset.expurgar!);
      renderSettings(container, ctx);
    });
  });

  container.querySelector('#btn-snapshot-criar')?.addEventListener('click', async () => {
    const btn = container.querySelector<HTMLButtonElement>('#btn-snapshot-criar')!;
    btn.disabled = true;
    await criarSnapshot({});
    renderSettings(container, ctx);
    const status = container.querySelector('#snapshot-status');
    if (status) {
      status.innerHTML = `<div class="banner banner--success" role="status">${ICONS.check} Snapshot criado.</div>`;
    }
  });

  container.querySelectorAll<HTMLButtonElement>('[data-snapshot-restaurar]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const ok = await confirmAction({
        title: 'Restaurar este snapshot?',
        message: 'Os dados do snapshot serão mesclados com os atuais. Nada local é apagado.',
      });
      if (!ok) return;
      btn.disabled = true;
      await restaurarSnapshot(btn.dataset.snapshotRestaurar!);
      const status = container.querySelector('#snapshot-status');
      if (status) {
        status.innerHTML = `<div class="banner banner--success" role="status">${ICONS.check} Snapshot restaurado (mesclado).</div>`;
      }
    });
  });

  container.querySelectorAll<HTMLButtonElement>('[data-snapshot-remover]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      await removerSnapshot(btn.dataset.snapshotRemover!);
      renderSettings(container, ctx);
    });
  });

  const btnGistRevisoes = container.querySelector<HTMLButtonElement>('#btn-gist-revisoes');
  btnGistRevisoes?.addEventListener('click', async () => {
    const lista = container.querySelector<HTMLElement>('#gist-revisoes');
    const input = container.querySelector<HTMLInputElement>('#input-github-token')!;
    const tokenAtual = input.value.trim() || token;
    if (!tokenAtual || !lista) return;
    btnGistRevisoes.disabled = true;
    lista.innerHTML = `<div class="banner banner--muted" role="status">${ICONS.sync} Carregando…</div>`;
    try {
      const revisoes = await listGistRevisions(tokenAtual);
      if (revisoes.length === 0) {
        lista.innerHTML = `<div class="banner banner--muted" role="status">Ainda não há versões anteriores.</div>`;
        return;
      }
      lista.innerHTML = `
        <div>
          ${revisoes
            .map(
              (rev) => `
            <div class="settings-list-row">
              <div class="settings-row__label">${escapeHtml(rotuloRevisao(rev))}</div>
              <div class="item-row__actions">
                <button class="btn btn--secondary btn--sm" data-gist-restaurar="${escapeHtml(rev.version)}" type="button">Restaurar</button>
              </div>
            </div>
          `,
            )
            .join('')}
        </div>
      `;
      ligarRestauroGist(container, tokenAtual, lista);
    } catch (err) {
      lista.innerHTML = `<div class="banner banner--warning" role="alert">${escapeHtml(err instanceof Error ? err.message : 'Não foi possível carregar o histórico.')}</div>`;
    } finally {
      btnGistRevisoes.disabled = false;
    }
  });

  if (ancoraPendente) {
    const alvo = container.querySelector<HTMLElement>(`#${ancoraPendente}`);
    ancoraPendente = null;
    if (alvo) {
      requestAnimationFrame(() =>
        alvo.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      );
    }
  }
}

function ligarRestauroGist(container: HTMLElement, token: string, lista: HTMLElement): void {
  container.querySelectorAll<HTMLButtonElement>('[data-gist-restaurar]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const ok = await confirmAction({
        title: 'Restaurar esta versão do backup?',
        message:
          'A versão escolhida será mesclada com os dados atuais e o backup na nuvem será atualizado. Nada local é apagado.',
      });
      if (!ok) return;
      btn.disabled = true;
      lista.innerHTML = `<div class="banner banner--muted" role="status">${ICONS.sync} Restaurando…</div>`;
      try {
        const resultado = await restoreGistRevision(token, btn.dataset.gistRestaurar!);
        lista.innerHTML = `<div class="banner banner--success" role="status">${ICONS.check} Backup restaurado: ${resultado.criados} criado(s), ${resultado.atualizados} atualizado(s).</div>`;
      } catch (err) {
        lista.innerHTML = `<div class="banner banner--warning" role="alert">${escapeHtml(err instanceof Error ? err.message : 'Não foi possível restaurar.')}</div>`;
      }
    });
  });
}
