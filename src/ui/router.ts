import { canNavigateAway, clearFormDirty } from '../lib/form-guard';

export type Route =
  | { name: 'perfil' }
  | { name: 'hoje' }
  | { name: 'espacos' }
  | { name: 'categoria-espacos'; categoria: string }
  | { name: 'espaco'; id: string }
  | { name: 'categoria-espaco'; espacoId: string; categoria: string }
  | { name: 'espaco-pdf'; id: string; categoria?: string }
  | { name: 'categoria-tema'; temaId: string; categoria: string }
  | { name: 'tema'; id: string }
  | { name: 'nota-nova'; temaId: string }
  | { name: 'nota-nova-pasta'; espacoId: string }
  | { name: 'nota'; id: string }
  | { name: 'painel' }
  | { name: 'favoritos' }
  | { name: 'ajuda' }
  | { name: 'config' };

export type TopLevelRoute = 'hoje' | 'espacos' | 'favoritos' | 'painel' | 'ajuda' | 'config';

/** Placeholder pra categoria vazia ("Sem categoria") — um segmento de rota vazio some no split. */
const CATEGORIA_VAZIA = '_sem-categoria_';

export function encodeCategoriaSegment(categoria: string): string {
  return categoria.trim() === '' ? CATEGORIA_VAZIA : encodeURIComponent(categoria);
}

function decodeCategoriaSegment(segmento: string): string {
  return segmento === CATEGORIA_VAZIA ? '' : decodeURIComponent(segmento);
}

/** Onde a categoria está sendo aplicada: no perfil (pastas de topo), num Espaço ou numa pasta. */
export type EscopoCategoria =
  | { tipo: 'perfil' }
  | { tipo: 'espaco'; id: string }
  | { tipo: 'tema'; id: string };

/**
 * Rota da visão de uma categoria — funciona como uma pasta virtual no caminho:
 * no topo do perfil lista as Pastas daquela categoria; dentro de um Espaço ou de uma pasta
 * lista as pastas daquele nível com aquela categoria. É o que torna cada categoria do
 * breadcrumb clicável.
 */
export function rotaCategoria(
  categoria: string,
  escopo: EscopoCategoria = { tipo: 'perfil' },
): string {
  const segmento = encodeCategoriaSegment(categoria);
  if (escopo.tipo === 'tema') return `temas/${escopo.id}/categoria/${segmento}`;
  if (escopo.tipo === 'espaco') return `espacos/${escopo.id}/categoria/${segmento}`;
  return `espacos/categoria/${segmento}`;
}

function segments(): string[] {
  return window.location.hash
    .replace(/^#\/?/, '')
    .split('/')
    .filter((s) => s.length > 0);
}

export function getCurrentRoute(): Route {
  const parts = segments();

  if (parts.length === 0) return { name: 'hoje' };
  if (parts[0] === 'perfil') return { name: 'perfil' };
  if (parts[0] === 'config') return { name: 'config' };
  if (parts[0] === 'painel') return { name: 'painel' };
  if (parts[0] === 'favoritos') return { name: 'favoritos' };
  if (parts[0] === 'ajuda') return { name: 'ajuda' };
  if (parts[0] === 'espacos') {
    if (parts.length === 1) return { name: 'espacos' };
    if (parts.length === 3 && parts[1] === 'categoria') {
      return { name: 'categoria-espacos', categoria: decodeCategoriaSegment(parts[2]) };
    }
    if (parts.length === 2) return { name: 'espaco', id: parts[1] };
    if (parts.length === 3 && parts[2] === 'nova-nota') {
      return { name: 'nota-nova-pasta', espacoId: parts[1] };
    }
    if (parts.length === 4 && parts[2] === 'categoria') {
      return {
        name: 'categoria-espaco',
        espacoId: parts[1],
        categoria: decodeCategoriaSegment(parts[3]),
      };
    }
    if (parts.length === 3 && parts[2] === 'pdf') return { name: 'espaco-pdf', id: parts[1] };
    if (parts.length === 4 && parts[2] === 'pdf') {
      return { name: 'espaco-pdf', id: parts[1], categoria: decodeCategoriaSegment(parts[3]) };
    }
  }
  if (parts[0] === 'temas' && parts.length === 2) return { name: 'tema', id: parts[1] };
  if (parts[0] === 'temas' && parts.length === 4 && parts[2] === 'categoria') {
    return {
      name: 'categoria-tema',
      temaId: parts[1],
      categoria: decodeCategoriaSegment(parts[3]),
    };
  }
  if (parts[0] === 'temas' && parts.length === 3 && parts[2] === 'nova-nota') {
    return { name: 'nota-nova', temaId: parts[1] };
  }
  if (parts[0] === 'notas' && parts.length === 2) return { name: 'nota', id: parts[1] };

  return { name: 'hoje' };
}

/** Aba de navegação que deve ficar destacada para a rota atual. */
export function topLevelFor(route: Route): TopLevelRoute {
  switch (route.name) {
    case 'config':
      return 'config';
    case 'painel':
      return 'painel';
    case 'favoritos':
      return 'favoritos';
    case 'ajuda':
      return 'ajuda';
    case 'espacos':
    case 'categoria-espacos':
    case 'espaco':
    case 'categoria-espaco':
    case 'espaco-pdf':
    case 'categoria-tema':
    case 'tema':
    case 'nota':
    case 'nota-nova':
    case 'nota-nova-pasta':
      return 'espacos';
    default:
      return 'hoje';
  }
}

/**
 * Toda navegação do app passa por aqui — inclusive o breadcrumb, os botões das telas e o
 * resultado da busca. Por isso a checagem de "há alterações não salvas?" fica centralizada
 * aqui: antes, só os botões da navegação principal perguntavam, e sair pelo breadcrumb
 * (o caminho de volta mais natural) perdia o que o usuário tinha digitado, sem aviso.
 */
export function navigate(path: string): void {
  if (!canNavigateAway()) return;
  clearFormDirty();
  window.location.hash = path.startsWith('/') ? path : `/${path}`;
}

export function navigateTop(route: TopLevelRoute): void {
  navigate(route);
}

export function onRouteChange(callback: () => void): void {
  window.addEventListener('hashchange', callback);
}
