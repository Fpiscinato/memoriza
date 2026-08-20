export type Route = 'perfil' | 'hoje' | 'espacos' | 'config';

const VALID_ROUTES: Route[] = ['perfil', 'hoje', 'espacos', 'config'];
const DEFAULT_ROUTE: Route = 'hoje';

export function getCurrentRoute(): Route {
  const hash = window.location.hash.replace(/^#\/?/, '');
  return (VALID_ROUTES as string[]).includes(hash) ? (hash as Route) : DEFAULT_ROUTE;
}

export function navigate(route: Route): void {
  window.location.hash = `/${route}`;
}

export function onRouteChange(callback: () => void): void {
  window.addEventListener('hashchange', callback);
}
