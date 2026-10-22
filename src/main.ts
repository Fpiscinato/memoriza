import '@fontsource-variable/inter';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';

import { registerSW } from 'virtual:pwa-register';

import { applyTheme, watchSystemTheme } from './lib/theme';
import { requestPersistentStorageOnce } from './lib/storage-persist';
import { ensureDefaultProfiles } from './db/profiles';
import { migrateNotasSemTitulo } from './db/notas';
import { limparLixeiraAntiga } from './db/lixeira';
import { snapshotAutomaticoSePreciso } from './db/snapshots';
import { mount } from './ui/app';
import { APP_VERSION_LABEL } from './version';
import { mostrarToast } from './ui/components/toast';
import { ICONS } from './ui/icons';
import { canNavigateAway } from './lib/form-guard';
import * as formGuard from './lib/form-guard';

console.info(`%c${APP_VERSION_LABEL}%c rodando`, 'font-weight:bold;', '');

applyTheme();
watchSystemTheme();

// Service worker: a nova versão NÃO é aplicada sozinha — ela fica esperando e o app
// avisa ("Nova versão disponível"), pro usuário decidir quando recarregar. Antes
// (registerType: 'autoUpdate') a página se recarregava no susto, o que podia
// derrubar uma edição de nota em andamento.
const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    mostrarToast({
      icone: ICONS.sync,
      texto: 'Nova versão do Memoriza disponível.',
      acao: {
        rotulo: 'Atualizar agora',
        aoClicar: () => {
          // Se houver edição não salva, confirma antes (a recarga levaria junto).
          if (!canNavigateAway()) return;
          void updateSW(true);
        },
      },
      dispensar: { rotulo: 'Depois' },
    });
  },
  onOfflineReady() {
    mostrarToast({
      icone: ICONS.check,
      tom: 'sucesso',
      texto: 'Memoriza pronto para usar offline.',
      ms: 4000,
    });
  },
});
async function bootstrap() {
  formGuard.init();
  await ensureDefaultProfiles();
  await migrateNotasSemTitulo();
  await limparLixeiraAntiga();
  await snapshotAutomaticoSePreciso().catch(() => undefined);
  await requestPersistentStorageOnce();

  const root = document.getElementById('app');
  if (!root) throw new Error('#app não encontrado');
  await mount(root);
}

bootstrap();
