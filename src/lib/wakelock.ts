// Mantém a tela acesa enquanto o app está aberto em primeiro plano. O navegador libera o
// Wake Lock sozinho quando a aba fica oculta (troca de app, tela bloqueada), então
// reconquistamos automaticamente ao voltar — sem isso o usuário via a tela apagar no meio
// de uma revisão.
let sentinel: WakeLockSentinel | null = null;

async function requestWakeLock(): Promise<void> {
  if (!('wakeLock' in navigator) || document.hidden) return;
  try {
    sentinel = await navigator.wakeLock.request('screen');
    sentinel.addEventListener('release', () => {
      sentinel = null;
    });
  } catch {
    // Sem suporte no navegador, sem permissão, ou pedido recusado (ex: bateria baixa) —
    // degrada silenciosamente pro comportamento normal de apagar a tela.
  }
}

export function initWakeLock(): void {
  void requestWakeLock();
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) void requestWakeLock();
  });
}
