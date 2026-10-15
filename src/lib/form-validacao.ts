// Validação de campos obrigatórios de formulário — borda vermelha + mensagem abaixo do campo
// (mesmo padrão visual e classes usados no editor de notas, ver src/ui/screens/nota-form.ts).

export interface CampoValidacao {
  input: HTMLInputElement;
  /** true = campo válido (só então some a mensagem de erro). */
  ok: boolean;
  mensagem: string;
}

export function marcarErroCampo(input: HTMLElement, mensagem: string): void {
  input.classList.add('input--error');
  input.setAttribute('aria-invalid', 'true');
  const hint = input.closest('.field')?.querySelector<HTMLElement>('.field__error');
  if (hint) {
    hint.textContent = mensagem;
    hint.style.display = 'block';
  }
}

export function limparErroCampo(input: HTMLElement): void {
  input.classList.remove('input--error');
  input.removeAttribute('aria-invalid');
  const hint = input.closest('.field')?.querySelector<HTMLElement>('.field__error');
  if (hint) hint.style.display = '';
}

/** Marca cada campo inválido, foca o primeiro deles e devolve true só se todos passaram. */
export function validarCampos(campos: CampoValidacao[]): boolean {
  let primeiroInvalido: HTMLInputElement | null = null;
  for (const campo of campos) {
    if (campo.ok) {
      limparErroCampo(campo.input);
      continue;
    }
    marcarErroCampo(campo.input, campo.mensagem);
    if (!primeiroInvalido) primeiroInvalido = campo.input;
  }
  if (primeiroInvalido) {
    primeiroInvalido.focus();
    return false;
  }
  return true;
}
