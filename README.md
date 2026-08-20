# Memoriza

App pessoal de revisão espaçada para anotações de estudo. 100% local: os dados
ficam no navegador (IndexedDB), sem backend, sem login, sem conta de usuário
no servidor.

**Fase 1a** (este estado do projeto) entrega só a fundação: estrutura do
projeto, armazenamento local, seletor de perfil, exportar/importar, esqueleto
visual e deploy. Ainda não há captura de notas nem fila de revisão — isso é a
Fase 1b.

## Stack e decisões de arquitetura

- **Vite + TypeScript, sem framework de UI.** A Fase 1a não tem estado
  complexo o suficiente (seletor de perfil, 3 telas, export/import) para
  justificar React/Vue/Svelte. Vite dá dev server rápido, build estático
  simples e um plugin de PWA maduro. Se a Fase 1b trouxer telas com mais
  interação (fila de revisão, formulários de notas), reavaliar então — nada
  aqui impede migrar depois, já que a lógica de dados (`src/db`) é
  independente da camada de UI (`src/ui`).
- **IndexedDB via [`idb`](https://github.com/jakearchibald/idb)** — wrapper
  fino baseado em Promises sobre a API nativa, evita a verbosidade de
  `IDBRequest`/callbacks sem esconder o modelo de dados. `localStorage` só é
  usado para preferências de interface (tema, perfil selecionado, data do
  último export) — nunca para os dados de estudo em si.
- **Um único banco IndexedDB (`memoriza`) com isolamento por `perfil_id`**, em
  vez de um banco por perfil. Isso simplifica o "exportar todos os perfis" (é
  só ler todas as stores) e a mesclagem no importar (é uma função pura por
  store, ver `src/db/merge.ts`). O isolamento entre perfis segue a cadeia do
  modelo de dados: `espacos.perfil_id` → `temas.espaco_id` → `notas.tema_id`;
  `itens_revisao` guarda `perfil_id` diretamente.
- **IDs de perfil fixos para os 2 perfis padrão** (não gerados com
  `crypto.randomUUID()`). Se o app for reinstalado ou os dados do navegador
  forem apagados, os perfis "Fernando" e "Esposa" são recriados automaticamente
  no primeiro uso — com o *mesmo* id de sempre. Isso é o que permite que
  importar um backup antigo depois de uma reinstalação **atualize** o perfil
  existente em vez de criar um duplicado. Veja `src/db/profiles.ts`.
- **`Perfil` tem `atualizado_em`** mesmo o enunciado original do modelo de
  dados não listando esse campo para `perfis` — mantido consistente com a
  regra geral ("todo registro precisa de id e atualizado_em") porque é a base
  da mesclagem no importar, e perfis também podem ser importados.
- **Fuso de referência Europe/London** centralizado em `src/lib/time.ts`
  (`toLondonISODate`, `daysBetweenISODates`), usado hoje só no aviso de
  backup de 14 dias. A Fase 1b deve reusar essas mesmas funções para calcular
  D+1/D+7/D+30/D+180, em vez de `new Date()` cru.
- **Sem infraestrutura de tradução.** Todo texto está direto em português nos
  arquivos de UI — não há camada de i18n nesta fase, por instrução explícita
  do escopo.

## Estrutura do projeto

```
src/
  types.ts              modelo de dados (Perfil, Espaco, Tema, Nota, ItemRevisao)
  db/
    schema.ts            abertura do IndexedDB e definição das object stores/índices
    profiles.ts           perfis padrão, listagem, isolamento
    merge.ts               lógica pura de mesclagem (testada em tests/merge.test.ts)
    export-import.ts    monta o .json de export, dispara download, aplica import
  lib/
    time.ts                utilidades de data no fuso Europe/London
    settings.ts           preferências em localStorage (tema, perfil, último export)
    theme.ts                aplica/alterna claro-escuro-sistema
    storage-persist.ts   pede armazenamento persistente ao navegador
    uuid.ts                  geração de UUID (usado pela Fase 1b)
    dom.ts                    escape de HTML para templates
  ui/
    app.ts                   shell (cabeçalho, navegação, aviso de backup) e roteamento
    router.ts               router baseado em hash (#/hoje, #/espacos, #/config)
    screens/                 profile-select, today, spaces, settings
  styles/
    tokens.css              variáveis de design (cores, tipografia, espaçamento, tema)
    base.css                  reset e estilos globais
    components.css        botões, cartões, navegação, seletor de perfil, etc.
scripts/
  generate-icons.mjs   gera os ícones PNG do PWA (sem dependências externas)
tests/
  merge.test.ts           testes da lógica de mesclagem do importar
```

## Rodando localmente

Requer Node 20+.

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`. Não há variáveis de ambiente — o app não
fala com nenhum backend.

Outros comandos:

```bash
npm run typecheck   # tsc --noEmit
npm run test        # testes unitários (vitest)
npm run build       # build de produção em dist/
npm run preview     # serve o build de dist/ localmente, para testar o PWA/offline
npm run icons       # regera os ícones do PWA em public/icons/
```

Para testar o comportamento de PWA (instalação, funcionamento offline) é
preciso usar `npm run build && npm run preview` — o service worker não é
ativado no servidor de desenvolvimento.

## Deploy (Cloudflare Pages)

O projeto é 100% estático (`dist/`), sem Workers, sem D1, sem função de
backend.

1. Crie o repositório `memoriza` no GitHub e faça push deste código na branch
   `main`.
2. No painel da Cloudflare, crie um projeto **Cloudflare Pages** chamado
   `memoriza` conectado a esse repositório (Settings → Build):
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Framework preset: nenhum (ou "Vite", se disponível)
   - Sem variáveis de ambiente necessárias.
3. Cada push na branch `main` publica automaticamente em
   `https://memoriza.pages.dev` (integração nativa do Cloudflare Pages —
   não precisa de GitHub Actions separado).

Alternativa via CLI (`wrangler`), se preferir não usar a integração nativa:

```bash
npm run build
npx wrangler pages deploy dist --project-name=memoriza
```

## Modelo de dados

Todo registro tem `id` (UUID) e `atualizado_em` (timestamp ISO) — é a base da
mesclagem no importar/exportar.

- `perfis`: `{ id, nome, criado_em, atualizado_em }`
- `espacos`: `{ id, perfil_id, nome, criado_em, atualizado_em, arquivado }`
- `temas`: `{ id, espaco_id, nome, categoria, criado_em, atualizado_em }`
- `notas`: `{ id, tema_id, conteudo, fonte, tipo, validade_ate?, criado_em, atualizado_em }`
- `itens_revisao`: `{ id, nota_id, perfil_id, estagio, data_agendada, data_concluida?, status, avaliacao?, streak_facil, criado_em, atualizado_em }`

Nenhuma dessas stores tem conteúdo real ainda nesta fase — a Fase 1b traz a
criação de Espaços, Temas, Notas e a fila de revisão.

## Exportar / Importar

Em Configurações → Dados:

- **Exportar meu perfil**: baixa um `.json` só com os dados do perfil atual
  (seguindo a cadeia perfil → espaço → tema → nota → item de revisão).
- **Exportar todos os perfis**: baixa um `.json` com todas as stores
  completas, de todos os perfis do aparelho.
- **Importar**: lê um `.json` exportado antes e mescla registro por registro
  (comparando por `id`):
  - só existe no arquivo → cria;
  - existe nos dois e o do arquivo é mais recente → substitui;
  - existe nos dois e o local é mais recente (ou igual) → mantém o local;
  - só existe localmente → nunca é apagado.

  Depois de importar, a tela mostra quantos registros foram criados,
  atualizados e mantidos como estavam.

## Backup

No primeiro carregamento o app pede armazenamento persistente ao navegador
(`navigator.storage.persist()`) para reduzir o risco do IndexedDB ser
descartado sob pressão de espaço. Ainda assim, os dados só existem neste
aparelho — se passarem 14 dias desde o último export (ou nunca tiver sido
feito um) e já houver dados de estudo, aparece um aviso discreto sugerindo
exportar um backup.

O Memoriza não envia notificações push. Um lembrete diário para revisar deve
ser configurado no app de Calendário/Lembretes do próprio celular.

## Testes

```bash
npm run test
```

Cobre a lógica de mesclagem do importar (`src/db/merge.ts`): registro só
local, registro só no arquivo, local mais recente, arquivo mais recente, e
IDs conflitantes dentro do mesmo lote.

## Critérios de pronto verificados nesta fase

- [x] `npm run build` gera um `dist/` estático que funciona offline (PWA com
      manifest + service worker via `vite-plugin-pwa`).
- [x] Seletor de perfil funciona com dados isolados por `perfil_id`.
- [x] Exportar gera um `.json` válido; importar numa sessão limpa recria os
      dados corretamente (testado manualmente com dois contextos de
      navegador isolados, incluindo o caso de restaurar backup após
      reinstalar).
- [x] Layout responsivo (navegação inferior no celular, lateral no desktop;
      testado em 375×667 e 1280×800).
- [x] Tema claro/escuro respeitando `prefers-color-scheme`, com alternância
      manual persistida.
- [ ] Deploy em `memoriza.pages.dev` — depende de criar o repositório no
      GitHub e o projeto no Cloudflare Pages (contas do usuário, fora do
      alcance deste ambiente). Veja a seção "Deploy" acima para o passo a
      passo.
