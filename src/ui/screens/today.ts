export function renderToday(container: HTMLElement): void {
  container.innerHTML = `
    <div class="empty-state">
      <div class="empty-state__icon" aria-hidden="true">🗓️</div>
      <div class="empty-state__title">Nenhuma revisão por enquanto</div>
      <p class="empty-state__hint">
        A Fase 1b vai trazer a captura de notas e a fila de revisões agendadas para hoje.
      </p>
    </div>
  `;
}
