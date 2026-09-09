import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';

import { registerSW } from 'virtual:pwa-register';

import { applyTheme } from './lib/theme';
import { requestPersistentStorageOnce } from './lib/storage-persist';
import { ensureDefaultProfiles } from './db/profiles';
import { migrateNotasSemTitulo } from './db/notas';
import { mount } from './ui/app';
import { APP_VERSION_LABEL } from './version';
import * as formGuard from './lib/form-guard';

console.info(`%c${APP_VERSION_LABEL}%c rodando`, 'font-weight:bold;', '');

applyTheme();
registerSW({ immediate: true });

async function bootstrap() {
  formGuard.init();
  await ensureDefaultProfiles();
  await migrateNotasSemTitulo();
  await requestPersistentStorageOnce();

  const root = document.getElementById('app');
  if (!root) throw new Error('#app não encontrado');
  await mount(root);
}

bootstrap();
