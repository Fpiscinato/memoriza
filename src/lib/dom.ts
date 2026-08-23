export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Remove o destaque visual de "valor sugerido" (ver .input--sugerido em components.css) —
 * chamado assim que o usuário edita o campo à mão, ou escolhe outro valor via chip/clique. */
export function clearInputSugestao(input: HTMLInputElement): void {
  input.classList.remove('input--sugerido');
  input.closest('.field')?.querySelector('.field__sugestao-hint')?.remove();
}
