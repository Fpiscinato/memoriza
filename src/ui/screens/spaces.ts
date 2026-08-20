export function renderSpaces(container: HTMLElement): void {
  container.innerHTML = `
    <div class="empty-state">
      <div class="empty-state__icon" aria-hidden="true">📚</div>
      <div class="empty-state__title">Nenhum espaço de estudo ainda</div>
      <p class="empty-state__hint">
        A Fase 1b vai trazer a criação de Espaços, Temas e Notas — por exemplo, o seu curso de investimentos.
      </p>
    </div>
  `;
}
