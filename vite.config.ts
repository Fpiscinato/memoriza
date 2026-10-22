import { defineConfig } from 'vitest/config';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
  },
  plugins: [
    VitePWA({
      // 'prompt': a nova versão fica esperando e o app avisa ("Nova versão
      // disponível") — o usuário escolhe quando recarregar. Com 'autoUpdate' a
      // página se recarregava sozinha, no susto.
      registerType: 'prompt',
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-512-maskable.png'],
      manifest: {
        id: '/',
        name: 'Memoriza',
        short_name: 'Memoriza',
        description: 'Revisão espaçada para anotações de estudo, 100% local.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#0b1220',
        theme_color: '#2563eb',
        lang: 'pt-BR',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico,webmanifest}'],
        navigateFallback: '/index.html',
        cleanupOutdatedCaches: true,
        // O novo service worker espera o usuário pedir a atualização (skipWaiting
        // false), mas assume as abas abertas assim que ativa (clientsClaim) — é o que
        // faz a página recarregar sozinha depois do clique em "Atualizar agora".
        skipWaiting: false,
        clientsClaim: true,
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
