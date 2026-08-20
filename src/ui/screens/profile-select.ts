import { listProfiles } from '../../db/profiles';
import { escapeHtml } from '../../lib/dom';
import type { Perfil } from '../../types';

export async function renderProfileSelect(
  container: HTMLElement,
  onSelect: (perfil: Perfil) => void,
): Promise<void> {
  const perfis = await listProfiles();

  container.innerHTML = `
    <div class="profile-picker">
      <div>
        <div class="profile-picker__title">Quem é você?</div>
        <p class="profile-picker__subtitle">Escolha seu perfil para ver suas próprias revisões.</p>
      </div>
      <div class="profile-grid" role="list">
        ${perfis
          .map(
            (p) => `
          <button class="profile-card" role="listitem" data-id="${escapeHtml(p.id)}">
            <span class="profile-avatar" aria-hidden="true">${escapeHtml(initials(p.nome))}</span>
            <span class="profile-card__name">${escapeHtml(p.nome)}</span>
          </button>
        `,
          )
          .join('')}
      </div>
    </div>
  `;

  container.querySelectorAll<HTMLButtonElement>('.profile-card').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const perfil = perfis.find((p) => p.id === id);
      if (perfil) onSelect(perfil);
    });
  });
}

function initials(name: string): string {
  return name.trim().slice(0, 1).toUpperCase();
}
