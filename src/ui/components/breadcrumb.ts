import { escapeHtml } from '../../lib/dom';
import { accentVar } from '../../lib/color';
import { navigate } from '../router';

export interface BreadcrumbCrumb {
  label: string;
  /** Rota (sem #/) pra navegar ao clicar — ausente, ou no último item, vira texto simples. */
  route?: string;
  /** Chave de cor (id do Espaço, ou categoria em minúsculas) — mostra o color-dot de src/lib/color.ts. */
  colorKey?: string;
}

/** Estrutura completa (Espaço › Categoria › Tema › Categoria › ...) no topo das telas de detalhe. */
export function renderBreadcrumb(crumbs: BreadcrumbCrumb[]): string {
  return `
    <div class="breadcrumb">
      ${crumbs
        .map((crumb, i) => {
          const dot = crumb.colorKey
            ? `<span class="color-dot" style="--dot-color:${accentVar(crumb.colorKey)}"></span>`
            : '';
          const label = `${dot}${escapeHtml(crumb.label)}`;
          const isLast = i === crumbs.length - 1;
          const node =
            crumb.route && !isLast
              ? `<button class="link" data-crumb="${escapeHtml(crumb.route)}" type="button">${label}</button>`
              : `<span class="breadcrumb__current">${label}</span>`;
          return i === 0 ? node : `<span class="breadcrumb__sep" aria-hidden="true">›</span>${node}`;
        })
        .join('')}
    </div>
  `;
}

export function bindBreadcrumb(container: HTMLElement): void {
  container.querySelectorAll<HTMLButtonElement>('[data-crumb]').forEach((btn) => {
    btn.addEventListener('click', () => navigate(btn.dataset.crumb!));
  });
}
