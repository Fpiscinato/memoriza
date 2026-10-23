# Memoriza — AGENTS.md

> Leia `README.md` e `docs/MANUAL.md` antes de alterar o projeto.

## Arquitetura (resumo)

- PWA **100% local**: dados no navegador via IndexedDB/Dexie, sem backend, sem login.
- Vite + TypeScript, **sem framework de UI**.
- Sync opcional por GitHub Gist: o token é do usuário, digitado em runtime e guardado
  apenas no `localStorage` do dispositivo.
- Exportações/backups JSON são locais e **não** são criptografados.

## Comandos

```bash
npm run dev        # Vite dev server
npm run build      # tsc --noEmit && vite build
npm run test       # vitest run
npm run typecheck  # tsc --noEmit
npm run icons      # regenera os ícones
```

## Segurança (não negociável)

- Nunca commitar `.env`, `.env.*`, `opencode.json`, `.dev.vars`, `*.key`, `*.pem` ou
  qualquer token. O `.gitignore` já bloqueia; nunca usar `git add -f` nesses ficheiros.
- Nunca hardcodar/logar o token do Gist nem incluí-lo em snapshots, exports ou issues.
- Antes de cada push: `git status --short` + `git diff --cached`. Se um segredo vazar,
  revogue primeiro (GitHub) e só depois limpe o histórico.
