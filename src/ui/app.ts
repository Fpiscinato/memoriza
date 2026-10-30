import { getDB } from '../db/schema';
import { getProfile } from '../db/profiles';
import { escapeHtml } from '../lib/dom';
import { getGithubAutoSync, getGithubLastSyncAt, getGithubToken, getSelectedProfileId, setSelectedProfileId } from '../lib/settings';
import { daysBetweenISODates, formatDateWeekdayShortBR, toLondonISODate } from '../lib/time';
import { getCurrentRoute, navigate, navigateTop, onRouteChange, topLevelFor, type TopLevelRoute } from './router';
import { NAV_ICONS, ICONS } from './icons';
import { renderProfileSelect } from './screens/profile-select';
import { renderToday } from './screens/today';
import { renderEspacos } from './screens/espacos';
import {
  renderCategoriaEspaco,
  renderCategoriaEspacos,
  renderCategoriaTema,
} from './screens/categoria';
import { renderEspacoDetail } from './screens/espaco-detail';
import { renderEspacoPdf } from './screens/espaco-pdf';
import { renderTemaDetail } from './screens/tema-detail';
import { renderNotaForm } from './screens/nota-form';
import { renderPainel } from './screens/painel';
import { renderFavoritos } from './screens/favoritos';
import { renderAjuda } from './screens/ajuda';
import { renderSettings, agendarScrollSettings } from './screens/settings';
import { listarSnapshots } from '../db/snapshots';
import { listarLixeira } from '../db/lixeira';
import { montarStatusHeader, type StatusHeader, type StatusItem } from '../domain/header-status';
import { initWakeLock } from '../lib/wakelock';
import { APP_VERSION, APP_VERSION_LABEL } from '../version';
import { canNavigateAway, clearFormDirty } from '../lib/form-guard';
import { shouldAutoSync, syncWithGithub } from '../lib/github-sync';
import { openGlobalSearch } from './global-search';
import type { Perfil } from '../types';

const AUTO_SYNC_INTERVAL_MINUTOS = 30;

const NAV_ITEMS: { route: TopLevelRoute; label: string }[] = [
  { route: 'hoje', label: 'Hoje' },
  { route: 'espacos', label: 'Pastas' },
  { route: 'favoritos', label: 'Favoritos' },
  { route: 'painel', label: 'Painel' },
  { route: 'config', label: 'Configurações' },
];

const TOP_LEVEL_TITLES: Record<TopLevelRoute, string> = {
  hoje: 'Hoje',
  espacos: 'Pastas',
  favoritos: 'Favoritos',
  painel: 'Painel',
  ajuda: 'Como Usar',
  config: 'Configurações',
};


export async function mount(root: HTMLElement): Promise<void> {
  onRouteChange(() => render(root));
  await render(root);
  bindGlobalPopoverClose();
  initWakeLock();
  bindGlobalSearchShortcut();
  void autoSyncIfEnabled();
}

/** Ctrl+K / ⌘K abre a busca global — padrão conhecido de desktop, seguro no mobile também.
 *  Exceção: dentro do editor de nota o Ctrl+K cria link (ver nota-form.ts), então a busca
 *  não abre de cima do editor — senão o usuário ganhava o prompt de URL e a paleta de
 *  busca ao mesmo tempo. */
function bindGlobalSearchShortcut(): void {
  document.addEventListener('keydown', (e) => {
    if (!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== 'k') return;
    if (e.defaultPrevented) return;
    const alvo = e.target as HTMLElement | null;
    if (alvo?.closest?.('.editor-conteudo, .editor-toolbar')) return;
    e.preventDefault();
    const perfilId = getSelectedProfileId();
    if (perfilId) void openGlobalSearch(perfilId);
  });
}

/** Sincronização silenciosa (auto-sync) ao abrir o app, quando configurada — nunca bloqueia
 *  o carregamento e nunca chama a rede em silêncio se já sincronizou há pouco. */
async function autoSyncIfEnabled(): Promise<void> {
  const token = getGithubToken();
  if (!token || !getGithubAutoSync()) return;
  if (!shouldAutoSync(AUTO_SYNC_INTERVAL_MINUTOS)) return;
  try {
    await syncWithGithub(token);
  } catch (err) {
    console.warn('Auto-sync falhou:', err);
  }
}

/** Fecha qualquer menu "⋯" ou balão de ajuda (ⓘ) aberto ao clicar fora dele — <details>
 * nativo não faz isso sozinho. Um único listener no documento, montado uma vez só. */
function bindGlobalPopoverClose(): void {
  document.addEventListener('click', (e) => {
    document.querySelectorAll<HTMLDetailsElement>('.item-menu[open], .field-hint[open]').forEach((el) => {
      if (!el.contains(e.target as Node)) el.open = false;
    });
  });
}

async function render(root: HTMLElement): Promise<void> {
  const profileId = getSelectedProfileId();
  const perfil = profileId ? await getProfile(profileId) : undefined;

  if (!perfil) {
    setSelectedProfileId(null);
    root.innerHTML = '<div id="profile-screen"></div>';
    const container = root.querySelector<HTMLElement>('#profile-screen')!;
    await renderProfileSelect(container, async (selected) => {
      setSelectedProfileId(selected.id);
      navigate('hoje');
      await render(root);
    });
    return;
  }

  const route = getCurrentRoute();
  const topLevel = topLevelFor(route);
  // A guarda de "alterações não salvas" só vale dentro do editor de nota. Sair dele por
  // qualquer caminho (inclusive o "voltar" do navegador) limpa o estado — senão a
  // próxima navegação de qualquer tela perguntaria de novo sobre uma edição que já
  // não está mais na tela.
  if (route.name !== 'nota' && route.name !== 'nota-nova') clearFormDirty();
  const status = await getStatusHeader(perfil);

  root.innerHTML = `
    <div class="app-shell">
      <nav class="app-nav" aria-label="Navegação principal">
        ${NAV_ITEMS.map(
          (item) => `
          <button
            class="app-nav__item"
            data-route="${item.route}"
            ${item.route === topLevel ? 'aria-current="page"' : ''}
            type="button"
          >
            <span class="app-nav__icon">${NAV_ICONS[item.route]}</span>
            <span>${item.label}</span>
          </button>
        `,
        ).join('')}
      </nav>
      <div class="app-content">
        <header class="app-header">
          <span class="app-header__title">${TOP_LEVEL_TITLES[topLevel]}</span>
          <span style="display:flex; align-items:center; gap: var(--space-3);">
            <button class="app-header__search" id="btn-busca" type="button" aria-label="Buscar (Ctrl+K)" title="Buscar (Ctrl+K)">${ICONS.search}</button>
            ${
              status.sync.visivel
                ? botaoStatus('section-sync', ICONS.cloud, status.sync)
                : ''
            }
            ${
              status.backup.visivel
                ? botaoStatus('section-snapshots', ICONS.database, status.backup)
                : ''
            }
            ${
              status.lixeira.visivel
                ? botaoStatus('section-lixeira', ICONS.trash, status.lixeira, status.lixeira.contagem)
                : ''
            }
            <span class="app-header__date" title="Data de hoje">${escapeHtml(formatDateWeekdayShortBR(toLondonISODate()))}</span>
            <button class="app-header__help" id="btn-ajuda" type="button" aria-label="Como usar">${ICONS.help}</button>
            <span class="app-header__profile" title="Memoriza ${APP_VERSION}">${escapeHtml(perfil.nome)}</span>
          </span>
        </header>
        <main class="app-main" id="screen-content"></main>
        <footer class="app-footer"><span>${escapeHtml(APP_VERSION_LABEL)}</span></footer>
      </div>
    </div>
  `;

  root.querySelectorAll<HTMLButtonElement>('.app-nav__item').forEach((btn) => {
    btn.addEventListener('click', () => {
      navigateTop(btn.dataset.route as TopLevelRoute);
    });
  });
  root.querySelector('#btn-ajuda')?.addEventListener('click', () => {
    if (location.hash === '#/ajuda') {
      // Sai pelo histórico do navegador — não passa pelo navigate(), então a guarda
      // de "alterações não salvas" é checada aqui.
      if (!canNavigateAway()) return;
      clearFormDirty();
      history.back();
    } else {
      navigate('ajuda');
    }
  });
  root.querySelector('#btn-busca')?.addEventListener('click', () => {
    void openGlobalSearch(perfil.id);
  });
  root.querySelectorAll<HTMLButtonElement>('[data-settings-secao]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const secao = btn.dataset.settingsSecao!;
      if (getCurrentRoute().name === 'config') {
        document
          .querySelector<HTMLElement>(`#${secao}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        agendarScrollSettings(secao);
        navigate('config');
      }
    });
  });

  const content = root.querySelector<HTMLElement>('#screen-content')!;

  const screenContainer = document.createElement('div');
  screenContainer.className = 'screen-container';
  content.appendChild(screenContainer);

  screenContainer.innerHTML = '<div class="screen-loading" aria-hidden="true"><div class="spinner"></div></div>';

  try {
    await renderScreen(screenContainer, route, perfil);
    // Re-dispara a animação suave de entrada a cada navegação (a classe sozinha não reinicia
    // quando o mesmo container re-renderiza o conteúdo — o reflow forçado "zera" a animação).
    screenContainer.classList.remove('screen-enter');
    void screenContainer.offsetWidth;
    screenContainer.classList.add('screen-enter');
  } catch (err) {
    console.error('Erro ao renderizar tela:', err);
    screenContainer.innerHTML =
      '<div class="banner banner--warning" role="alert">Algo deu errado ao carregar esta tela. Tente novamente.</div>';
  }
}

async function renderScreen(
  screenContainer: HTMLElement,
  route: ReturnType<typeof getCurrentRoute>,
  perfil: Perfil,
): Promise<void> {
  switch (route.name) {
    case 'hoje':
      await renderToday(screenContainer, { perfilId: perfil.id });
      break;
    case 'espacos':
      await renderEspacos(screenContainer, { perfilId: perfil.id });
      break;
    case 'categoria-espacos':
      await renderCategoriaEspacos(screenContainer, perfil.id, route.categoria);
      break;
    case 'espaco':
      await renderEspacoDetail(screenContainer, route.id);
      break;
    case 'categoria-espaco':
      await renderCategoriaEspaco(screenContainer, route.espacoId, route.categoria);
      break;
    case 'espaco-pdf':
      await renderEspacoPdf(screenContainer, route.id, route.categoria);
      break;
    case 'painel':
      await renderPainel(screenContainer, { perfilId: perfil.id });
      break;
    case 'favoritos':
      await renderFavoritos(screenContainer, { perfilId: perfil.id });
      break;
    case 'ajuda':
      renderAjuda(screenContainer);
      break;
    case 'categoria-tema':
      await renderCategoriaTema(screenContainer, route.temaId, route.categoria);
      break;
    case 'tema':
      await renderTemaDetail(screenContainer, route.id);
      break;
    case 'nota-nova':
      await renderNotaForm(screenContainer, { mode: 'nova', temaId: route.temaId });
      break;
    case 'nota-nova-pasta':
      await renderNotaForm(screenContainer, { mode: 'nova-na-pasta', espacoId: route.espacoId });
      break;
    case 'nota':
      await renderNotaForm(screenContainer, { mode: 'editar', notaId: route.id });
      break;
    case 'config':
      await renderSettings(screenContainer, {
        perfil,
        onSwitchProfile: () => {
          setSelectedProfileId(null);
          navigate('perfil');
        },
      });
      break;
    default:
      await renderToday(screenContainer, { perfilId: perfil.id });
  }
}

/** Ícones de status no cabeçalho: nuvem (sync com o GitHub), banco (snapshot local) e lixeira.
 *  Sempre visíveis perto da data; clicar leva pra seção correspondente em Configurações. */
async function getStatusHeader(perfil: Perfil): Promise<StatusHeader> {
  if (!(await hasAnyDataForProfile(perfil.id))) {
    return {
      sync: { estado: 'off', visivel: false, titulo: '' },
      backup: { estado: 'ok', visivel: false, titulo: '' },
      lixeira: { estado: 'ok', visivel: false, titulo: 'Lixeira vazia.' },
    };
  }

  const token = getGithubToken();
  const lastSyncAt = getGithubLastSyncAt();
  const today = toLondonISODate();

  const diasDesdeSync = lastSyncAt
    ? daysBetweenISODates(toLondonISODate(new Date(lastSyncAt)), today)
    : null;

  const snapshots = await listarSnapshots();
  const ultimoSnapshot = snapshots[0];
  const diasDesdeSnapshot = ultimoSnapshot
    ? daysBetweenISODates(toLondonISODate(new Date(ultimoSnapshot.criado_em)), today)
    : null;

  const lixeira = await listarLixeira(perfil.id);

  return montarStatusHeader({
    syncConfigurado: Boolean(token),
    diasDesdeSync,
    diasDesdeSnapshot,
    lixeiraContagem: lixeira.length,
  });
}

/** Botão de status do cabeçalho (nuvem/banco/lixeira) — a cor vem do estado calculado, e o
 *  clique leva pra seção certa em Configurações (`data-settings-secao`). */
function botaoStatus(secao: string, icone: string, item: StatusItem, badge?: number): string {
  const titulo = escapeHtml(item.titulo);
  return `<button class="app-header__status is-${item.estado}" data-settings-secao="${secao}" type="button" title="${titulo}" aria-label="${titulo}">${icone}${
    badge ? `<span class="app-header__status__badge">${badge}</span>` : ''
  }</button>`;
}

async function hasAnyDataForProfile(perfilId: string): Promise<boolean> {
  const db = await getDB();
  const espacos = await db.getAllFromIndex('espacos', 'perfil_id', perfilId);
  if (espacos.length > 0) return true;
  const itens = await db.getAllFromIndex('itens_revisao', 'perfil_id', perfilId);
  return itens.length > 0;
}
