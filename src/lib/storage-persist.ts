import { markStoragePersistRequested, wasStoragePersistRequested } from './settings';

/**
 * Pede ao navegador para não descartar o IndexedDB sob pressão de espaço (evita perda
 * silenciosa de dados). Só falamos com o usuário disso via o aviso de backup — o resultado
 * da API em si é best-effort e não é bloqueante.
 */
export async function requestPersistentStorageOnce(): Promise<void> {
  if (wasStoragePersistRequested()) return;
  markStoragePersistRequested();

  if (!navigator.storage?.persist) return;
  try {
    await navigator.storage.persist();
  } catch {
    // Best-effort: alguns navegadores/contextos negam ou não suportam a API.
  }
}
