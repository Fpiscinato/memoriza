export type Route =
  | { name: 'perfil' }
  | { name: 'hoje' }
  | { name: 'espacos' }
  | { name: 'espaco'; id: string }
  | { name: 'espaco-pdf'; id: string }
  | { name: 'tema'; id: string }
  | { name: 'nota-nova'; temaId: string }
  | { name: 'nota'; id: string }
  | { name: 'painel' }
  | { name: 'config' };

export type TopLevelRoute = 'hoje' | 'espacos' | 'painel' | 'config';

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
  if (parts[0] === 'espacos') {
    if (parts.length === 1) return { name: 'espacos' };
    if (parts.length === 2) return { name: 'espaco', id: parts[1] };
    if (parts.length === 3 && parts[2] === 'pdf') return { name: 'espaco-pdf', id: parts[1] };
  }
  if (parts[0] === 'temas' && parts.length === 2) return { name: 'tema', id: parts[1] };
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
    case 'espacos':
    case 'espaco':
    case 'espaco-pdf':
    case 'tema':
    case 'nota':
    case 'nota-nova':
      return 'espacos';
    default:
      return 'hoje';
  }
}

export function navigate(path: string): void {
  window.location.hash = path.startsWith('/') ? path : `/${path}`;
}

export function navigateTop(route: TopLevelRoute): void {
  navigate(route);
}

export function onRouteChange(callback: () => void): void {
  window.addEventListener('hashchange', callback);
}
