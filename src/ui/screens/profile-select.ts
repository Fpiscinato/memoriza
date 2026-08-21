import { createProfile, listProfiles } from '../../db/profiles';
import { escapeHtml } from '../../lib/dom';
import type { Perfil } from '../../types';

export async function renderProfileSelect(
  container: HTMLElement,
  onSelect: (perfil: Perfil) => void,
): Promise<void> {
  const perfis = await listProfiles();
  const semPerfis = perfis.length === 0;

  container.innerHTML = `
    <div class="profile-picker">
      <div>
        <div class="profile-picker__title">Quem é você?</div>
        <p class="profile-picker__subtitle">
          ${
            semPerfis
              ? 'Primeiro uso neste aparelho — crie seu perfil pra começar. Cada pessoa que usar o app aqui cria o próprio depois.'
              : 'Escolha seu perfil para ver suas próprias revisões.'
          }
        </p>
      </div>
      ${
        perfis.length > 0
          ? `
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
      `
          : ''
      }
      <div id="form-novo-perfil-picker" class="card content-narrow" style="text-align:left; width:100%; ${semPerfis ? '' : 'display:none;'}">
        <div class="field">
          <label class="field__label" for="input-novo-perfil-picker">${semPerfis ? 'Seu nome' : 'Nome do novo perfil'}</label>
          <input class="input" id="input-novo-perfil-picker" type="text" maxlength="60" />
        </div>
        <div class="form-actions" style="margin-top: var(--space-3);">
          <button class="btn btn--primary btn--sm" id="btn-salvar-perfil-picker" type="button">Criar perfil</button>
          ${!semPerfis ? '<button class="btn btn--secondary btn--sm" id="btn-cancelar-perfil-picker" type="button">Cancelar</button>' : ''}
        </div>
      </div>
      ${!semPerfis ? '<button class="btn btn--secondary btn--sm" id="btn-novo-perfil-picker" type="button" style="align-self:center;">+ Sou outra pessoa, criar meu perfil</button>' : ''}
    </div>
  `;

  container.querySelectorAll<HTMLButtonElement>('.profile-card').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const perfil = perfis.find((p) => p.id === id);
      if (perfil) onSelect(perfil);
    });
  });

  const form = container.querySelector<HTMLElement>('#form-novo-perfil-picker')!;
  const input = container.querySelector<HTMLInputElement>('#input-novo-perfil-picker')!;
  if (semPerfis) input.focus();

  container.querySelector('#btn-novo-perfil-picker')?.addEventListener('click', () => {
    form.style.display = 'block';
    input.focus();
  });
  container.querySelector('#btn-cancelar-perfil-picker')?.addEventListener('click', () => {
    form.style.display = 'none';
  });

  const salvar = async () => {
    const nome = input.value.trim();
    if (!nome) return;
    const perfil = await createProfile(nome);
    onSelect(perfil);
  };
  container.querySelector('#btn-salvar-perfil-picker')?.addEventListener('click', salvar);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') salvar();
  });
}

function initials(name: string): string {
  return name.trim().slice(0, 1).toUpperCase();
}
