// Guard de navegação para formulários com alterações não salvas. O nota-form marca o guard
// como sujo ("dirty") a cada tecla/clique; antes de qualquer navegação os handlers do app
// perguntam se o usuário quer mesmo sair. `beforeunload` também é registrado aqui pra
// proteger contra fechar/recarregar a página no meio de uma edição.

let dirty = false;
let confirmHandler: (() => boolean) | null = null;

export function setFormDirty(value: boolean): void {
  dirty = value;
}

/** Atalho para setFormDirty(false) — limpa o guard. */
export function clearFormDirty(): void {
  dirty = false;
}

export function isFormDirty(): boolean {
  return dirty;
}

/** Permite que a tela customize a pergunta (ex: mensagem mais específica). */
export function setFormDirtyPrompt(handler: (() => boolean) | null): void {
  confirmHandler = handler;
}

/** Retorna true se a navegação pode prosseguir (não há nada não salvo, ou o usuário confirmou). */
export function canNavigateAway(): boolean {
  if (!dirty) return true;
  if (confirmHandler) return confirmHandler();
  return window.confirm('Há alterações não salvas. Deseja sair mesmo assim?');
}

/** Registra o beforeunload — chamado uma vez, nunca remove o handler (o formulário fica o
 * único que marca dirty; as outras telas nunca setam o guard). */
export function init(): void {
  window.addEventListener('beforeunload', (e) => {
    if (!dirty) return;
    e.preventDefault();
    e.returnValue = '';
  });
}