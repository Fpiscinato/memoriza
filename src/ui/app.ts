import { getDB } from '../db/schema';
import { getProfile } from '../db/profiles';
import { escapeHtml } from '../lib/dom';
import { getLastExportAt, getSelectedProfileId, setSelectedProfileId } from '../lib/settings';
import { daysBetweenISODates, toLondonISODate } from '../lib/time';
import { getCurrentRoute, navigate, navigateTop, onRouteChange, topLevelFor, type TopLevelRoute } from './router';
import { renderProfileSelect } from './screens/profile-select';
import { renderToday } from './screens/today';
import { renderEspacos } from './screens/espacos';
import { renderEspacoDetail } from './screens/espaco-detail';
import { renderTemaDetail } from './screens/tema-detail';
import { renderNotaForm } from './screens/nota-form';
import { renderSettings } from './screens/settings';
import type { Perfil } from '../types';

const BACKUP_REMINDER_DAYS = 14;

const NAV_ITEMS: { route: TopLevelRoute; label: string; icon: string }[] = [
  { route: 'hoje', label: 'Hoje', icon: '🗓️' },
  { route: 'espacos', label: 'Espaços', icon: '📚' },
  { route: 'config', label: 'Configurações', icon: '⚙️' },
];

const TOP_LEVEL_TITLES: Record<TopLevelRoute, string> = {
  hoje: 'Hoje',
  espacos: 'Espaços',
  config: 'Configurações',
};

let bannerDismissedThisSession = false;

export async function mount(root: HTMLElement): Promise<void> {
  onRouteChange(() => render(root));
  await render(root);
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
            <span class="app-nav__icon" aria-hidden="true">${item.icon}</span>
            <span>${item.label}</span>
          </button>
        `,
        ).join('')}
      </nav>
      <div class="app-content">
        <header class="app-header">
          <span class="app-header__title">${TOP_LEVEL_TITLES[topLevel]}</span>
          <span class="app-header__profile">${escapeHtml(perfil.nome)}</span>
        </header>
        <main class="app-main" id="screen-content"></main>
      </div>
    </div>
  `;

  root.querySelectorAll<HTMLButtonElement>('.app-nav__item').forEach((btn) => {
    btn.addEventListener('click', () => navigateTop(btn.dataset.route as TopLevelRoute));
  });

  const content = root.querySelector<HTMLElement>('#screen-content')!;
  await renderBackupBanner(content, perfil);

  const screenContainer = document.createElement('div');
  content.appendChild(screenContainer);

  switch (route.name) {
    case 'hoje':
      await renderToday(screenContainer, { perfilId: perfil.id });
      break;
    case 'espacos':
      await renderEspacos(screenContainer, { perfilId: perfil.id });
      break;
    case 'espaco':
      await renderEspacoDetail(screenContainer, route.id);
      break;
    case 'tema':
      await renderTemaDetail(screenContainer, route.id);
      break;
    case 'nota-nova':
      await renderNotaForm(screenContainer, { mode: 'nova', temaId: route.temaId });
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
          render(root);
        },
      });
      break;
    default:
      await renderToday(screenContainer, { perfilId: perfil.id });
  }
}

async function renderBackupBanner(content: HTMLElement, perfil: Perfil): Promise<void> {
  if (bannerDismissedThisSession) return;
  if (!(await hasAnyDataForProfile(perfil.id))) return;

  const lastExportAt = getLastExportAt();
  const today = toLondonISODate();
  const daysSinceExport = lastExportAt
    ? daysBetweenISODates(toLondonISODate(new Date(lastExportAt)), today)
    : Infinity;

  if (daysSinceExport <= BACKUP_REMINDER_DAYS) return;

  const banner = document.createElement('div');
  banner.className = 'banner banner--warning';
  banner.setAttribute('role', 'status');
  banner.innerHTML = `
    <span>
      ${lastExportAt ? `Faz mais de ${BACKUP_REMINDER_DAYS} dias desde o último backup.` : 'Você ainda não exportou um backup.'}
      Considere exportar em Configurações — os dados só existem neste aparelho.
    </span>
    <button class="banner__dismiss" type="button" aria-label="Dispensar aviso">×</button>
  `;
  banner.querySelector('.banner__dismiss')?.addEventListener('click', () => {
    bannerDismissedThisSession = true;
    banner.remove();
  });
  content.appendChild(banner);
}

async function hasAnyDataForProfile(perfilId: string): Promise<boolean> {
  const db = await getDB();
  const espacos = await db.getAllFromIndex('espacos', 'perfil_id', perfilId);
  if (espacos.length > 0) return true;
  const itens = await db.getAllFromIndex('itens_revisao', 'perfil_id', perfilId);
  return itens.length > 0;
}
