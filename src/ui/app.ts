import { getDB } from '../db/schema';
import { getProfile } from '../db/profiles';
import { escapeHtml } from '../lib/dom';
import {
  getBackupBannerSnoozedUntil,
  getLastExportAt,
  getSelectedProfileId,
  setSelectedProfileId,
  snoozeBackupBannerUntil,
} from '../lib/settings';
import { addDaysToISODate, daysBetweenISODates, toLondonISODate } from '../lib/time';
import { getCurrentRoute, navigate, navigateTop, onRouteChange, topLevelFor, type TopLevelRoute } from './router';
import { NAV_ICONS } from './icons';
import { renderProfileSelect } from './screens/profile-select';
import { renderToday } from './screens/today';
import { renderEspacos } from './screens/espacos';
import { renderEspacoDetail } from './screens/espaco-detail';
import { renderEspacoPdf } from './screens/espaco-pdf';
import { renderTemaDetail } from './screens/tema-detail';
import { renderNotaForm } from './screens/nota-form';
import { renderPainel } from './screens/painel';
import { renderFavoritos } from './screens/favoritos';
import { renderAjuda } from './screens/ajuda';
import { renderSettings } from './screens/settings';
import type { Perfil } from '../types';

const BACKUP_REMINDER_DAYS = 14;
const BACKUP_REMINDER_URGENT_DAYS = 30;
const BACKUP_BANNER_SNOOZE_DAYS = 3;

const NAV_ITEMS: { route: TopLevelRoute; label: string }[] = [
  { route: 'hoje', label: 'Hoje' },
  { route: 'espacos', label: 'Espaços' },
  { route: 'favoritos', label: 'Favoritos' },
  { route: 'painel', label: 'Painel' },
  { route: 'config', label: 'Configurações' },
];

const TOP_LEVEL_TITLES: Record<TopLevelRoute, string> = {
  hoje: 'Hoje',
  espacos: 'Espaços',
  favoritos: 'Favoritos',
  painel: 'Painel',
  ajuda: 'Como Usar',
  config: 'Configurações',
};


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
            <button class="app-header__help" id="btn-ajuda" type="button" aria-label="Como usar">?</button>
            <span class="app-header__profile">${escapeHtml(perfil.nome)}</span>
          </span>
        </header>
        <main class="app-main" id="screen-content"></main>
      </div>
    </div>
  `;

  root.querySelectorAll<HTMLButtonElement>('.app-nav__item').forEach((btn) => {
    btn.addEventListener('click', () => navigateTop(btn.dataset.route as TopLevelRoute));
  });
  root.querySelector('#btn-ajuda')?.addEventListener('click', () => navigate('ajuda'));

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
  const today = toLondonISODate();

  const snoozedUntil = getBackupBannerSnoozedUntil();
  if (snoozedUntil && today < snoozedUntil) return;

  if (!(await hasAnyDataForProfile(perfil.id))) return;

  const lastExportAt = getLastExportAt();
  const daysSinceExport = lastExportAt
    ? daysBetweenISODates(toLondonISODate(new Date(lastExportAt)), today)
    : Infinity;

  if (daysSinceExport <= BACKUP_REMINDER_DAYS) return;

  // Só vira um aviso "de verdade" (laranja) quando o backup está realmente muito velho —
  // antes disso é só um lembrete discreto, sem competir visualmente com o resto da tela.
  const urgente = lastExportAt !== null && daysSinceExport > BACKUP_REMINDER_URGENT_DAYS;

  const banner = document.createElement('div');
  banner.className = `banner ${urgente ? 'banner--warning' : 'banner--muted'}`;
  banner.setAttribute('role', 'status');
  banner.innerHTML = `
    <span>
      ${lastExportAt ? `Faz mais de ${BACKUP_REMINDER_DAYS} dias desde o último backup.` : 'Você ainda não exportou um backup.'}
      Considere exportar em Configurações — os dados só existem neste aparelho.
    </span>
    <button class="banner__dismiss" type="button" aria-label="Adiar aviso por alguns dias">×</button>
  `;
  banner.querySelector('.banner__dismiss')?.addEventListener('click', () => {
    snoozeBackupBannerUntil(addDaysToISODate(today, BACKUP_BANNER_SNOOZE_DAYS));
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
