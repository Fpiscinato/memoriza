# Memoriza

App pessoal de revisão espaçada para anotações de estudo. 100% local: os dados
ficam no navegador (IndexedDB), sem backend, sem login, sem conta de usuário
no servidor.

**Fase 1a** entregou a fundação: estrutura do projeto, armazenamento local,
seletor de perfil, exportar/importar, esqueleto visual e deploy.

**Fase 1b** entregou a funcionalidade real de estudo: CRUD de
Espaços/Temas/Notas, a fila de revisão diária com recall ativo, o algoritmo
híbrido de repetição espaçada (marco fixo + auto-avaliação) e o lembrete
diário via `.ics`.

**Fase 1c** (este estado do projeto) entrega editar/excluir em todos os
níveis (com exclusão em cascata e confirmação explícita), agrupamento por
categoria também nos Espaços, o Painel com estatísticas simples, e exportar
um Espaço como PDF. Ainda não há nada relacionado à Fase 2 (Google Drive,
multiusuário público).

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
  (`toLondonISODate`, `daysBetweenISODates`, `addDaysToISODate`). O
  algoritmo de repetição (`src/domain/algorithm.ts`) e o agendamento da
  primeira revisão (`src/db/notas.ts`) usam essas mesmas funções — nunca
  `new Date()` cru — pra manter o cálculo de D+1/D+7/D+30/D+180 consistente
  com o aviso de backup e evitar bugs de fuso perto da meia-noite.
- **`data_agendada`/`data_concluida`/`validade_ate` são datas-calendário
  (`YYYY-MM-DD`), não instantes.** Uma vez convertida de um instante real
  para o dia de Londres (via `toLondonISODate`), toda aritmética de dias
  (`addDaysToISODate`) roda em UTC puro sobre essa string — sem reintroduzir
  fuso horário ou DST na soma. Isso também deixa comparação de datas ser só
  comparação de string (usado no aviso de validade).
- **`computeNextReview` é uma função pura** (`src/domain/algorithm.ts`,
  sem IndexedDB) que recebe estágio atual + avaliação + streak_facil + data
  de conclusão, e devolve o próximo estado. Toda a tabela de transição da
  Fase 1b está coberta em `tests/algorithm.test.ts`, incluindo o caso em que
  a regra "streak_facil chegou a 2" e o estouro da escada (dois marcos além
  de 180) coincidem — e o caso em que só uma delas dispararia, testado
  isoladamente para não depender dessa coincidência.
- **Estágio `'consulta'` é tratado como já concluído (`status: 'feita'`),
  não como mais um item pendente.** Tanto quando o algoritmo aposenta uma
  nota (duas fáceis seguidas) quanto quando o usuário aposenta manualmente
  ("Parar de revisar"), o item correspondente nasce/vira `status: 'feita'`
  — assim ele nunca aparece na fila de "Hoje" (que filtra só `pendente`),
  sem precisar de um valor de status novo.
- **Sem UI de "atrasado".** A fila de "Hoje" busca `status = 'pendente' AND
  data_agendada <= hoje` e mistura itens atrasados com os do dia, de
  propósito — o enum `StatusRevisao` ainda tem o valor `'atrasada'` (herdado
  do modelo de dados da Fase 1a), mas nada nesta fase escreve esse valor.
- **Editor markdown com parser próprio, sem dependência.** `src/lib/markdown.ts`
  cobre só o que anotação de estudo precisa (títulos, negrito, itálico,
  código inline, listas, links) — não é CommonMark completo, é
  deliberadamente pequeno pra não puxar uma lib de markdown inteira pra um
  app 100% offline.
- **Lembrete `.ics` com horário "flutuante"** (sem `Z`, sem `TZID`, ver
  `src/lib/ics.ts`) — é a forma padrão do RFC 5545 de dizer "nesse horário,
  no fuso que o calendário do aparelho já usa", o comportamento certo pra um
  lembrete pessoal de celular (em vez de fixar Europe/London num evento que
  seria adicionado no fuso local do usuário).
- **Horário do lembrete fica em localStorage por perfil**, não no registro
  do `Perfil` no IndexedDB — é uma preferência deste aparelho/navegador (só
  serve pra gerar o `.ics`), sem relação com a mesclagem do importar.
- **Sem infraestrutura de tradução.** Todo texto está direto em português nos
  arquivos de UI — não há camada de i18n, por instrução explícita do escopo.
- **Espaço ganhou `categoria` (texto livre), igual Tema já tinha.** A Fase 1b
  tinha o campo em Tema mas só o exibia como texto — não agrupava de fato a
  listagem por ele. A Fase 1c corrige os dois: `agruparPorCategoria`
  (`src/lib/group.ts`) é a mesma função pura usada para agrupar Espaços,
  Temas dentro de um Espaço, e as seções do PDF — categoria em branco vira
  o grupo "Sem categoria", sempre por último.
- **Exclusão é sempre em cascata e sempre pede confirmação contando o
  estrago antes** (`confirmAction`, `src/ui/components/confirm-modal.ts`):
  excluir um Espaço apaga Temas → Notas → Itens de Revisão numa única
  transação IndexedDB por nível (`deleteEspacoCascade`, `deleteTemaCascade`,
  `deleteNota`). O modal mostra a contagem real (consultada antes de
  executar), não um aviso genérico.
- **Ações destrutivas ficam atrás de um menu "⋯"** (`<details>/<summary>`
  nativos, sem JS de posicionamento) em vez de um botão ao lado de
  "Arquivar" — de propósito, pra não ficar fácil demais clicar sem querer.
  Editar continua com botão visível (não é destrutivo).
- **Editar o conteúdo de uma Nota não toca no Item de Revisão.**
  `updateNota` (`src/db/notas.ts`) só grava campos da própria Nota — o
  estágio e a `data_agendada` do item pendente continuam intocados,
  intencionalmente, desde a Fase 1b (a Fase 1c só formaliza isso como
  requisito e confirma via teste manual).
- **PDF via CSS de impressão (`@media print`) + `window.print()`, não uma
  biblioteca de geração de PDF.** Mais simples de manter, sem dependência
  nova, sem gerenciar layout/paginação manualmente — o navegador já faz
  isso bem. A tela `#/espacos/:id/pdf` (`src/ui/screens/espaco-pdf.ts`)
  renderiza o conteúdo normalmente; a folha de estilo esconde nav/cabeçalho
  e ajusta cores só na hora de imprimir/exportar.
- **"Nota fraca" (`isNotaFraca`, `src/domain/stats.ts`) é pura**: conta
  quantas vezes o histórico de Itens de Revisão daquela nota tem avaliação
  `'dificil'` vs `'facil'` — mais difícil que fácil marca a nota. Reusada
  tanto no PDF (ícone ⚠️) quanto no ranking do Painel (agregado por Tema).
- **Streak de dias seguidos (`computeStreak`, `src/domain/stats.ts`) não
  quebra só porque hoje ainda não teve revisão** — só conta como quebrada
  na primeira lacuna real (um dia inteiro sem nenhuma revisão feita),
  senão bastaria abrir o app de manhã pra "perder" a sequência do dia
  anterior antes mesmo de revisar.

## Estrutura do projeto

```
src/
  types.ts              modelo de dados (Perfil, Espaco, Tema, Nota, ItemRevisao)
  domain/
    algorithm.ts          computeNextReview — algoritmo híbrido, função pura
    validade.ts             precisaAvisoDeValidade (nota "pode desatualizar")
    stats.ts                  computeStreak e isNotaFraca — cálculos puros do Painel/PDF
  db/
    schema.ts            abertura do IndexedDB e definição das object stores/índices
    profiles.ts           perfis: padrão, listar, criar, renomear
    espacos.ts             CRUD de Espaços (criar, editar, arquivar/reativar,
                              excluir em cascata, contar cascata)
    temas.ts                 CRUD de Temas (idem, sem arquivar)
    notas.ts                  CRUD de Notas (criar já agenda o 1º Item de Revisão;
                              editar não mexe no agendamento; excluir em cascata)
    reviews.ts              fila de "Hoje", concluir revisão, parar de revisar
    dashboard.ts          agrega os números do Painel (getDashboardStats)
    pdf-data.ts             monta os dados agrupados pro export em PDF
    merge.ts               lógica pura de mesclagem (testada em tests/merge.test.ts)
    export-import.ts    monta o .json de export, dispara download, aplica import
  lib/
    time.ts                utilidades de data no fuso Europe/London
    settings.ts           preferências em localStorage (tema, perfil, lembrete, export)
    theme.ts                aplica/alterna claro-escuro-sistema
    storage-persist.ts   pede armazenamento persistente ao navegador
    markdown.ts          parser markdown minimalista (sem dependência)
    ics.ts                    gera o .ics do lembrete diário, no navegador
    group.ts                 agruparPorCategoria — usado por Espaços, Temas e PDF
    uuid.ts                  geração de UUID
    dom.ts                    escape de HTML para templates
  ui/
    app.ts                   shell (cabeçalho, navegação, aviso de backup) e roteamento
    router.ts               router baseado em hash, com rotas aninhadas
                              (#/hoje, #/espacos/:id[/pdf], #/temas/:id, #/notas/:id,
                              #/painel, #/config)
    components/
      confirm-modal.ts    modal de confirmação genérico (usado antes de excluir)
    screens/                 profile-select, today, espacos, espaco-detail, espaco-pdf,
                              tema-detail, nota-form, painel, settings
  styles/
    tokens.css              variáveis de design (cores, tipografia, espaçamento, tema)
    base.css                  reset e estilos globais
    components.css        botões, cartões, navegação, formulários, fila de revisão,
                              modal, painel, folha de impressão do PDF, etc.
scripts/
  generate-icons.mjs   gera os ícones PNG do PWA (sem dependências externas)
tests/
  merge.test.ts           testes da lógica de mesclagem do importar
  algorithm.test.ts    testes da tabela de transição do algoritmo de repetição
  stats.test.ts             testes de computeStreak, isNotaFraca, agruparPorCategoria
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

## Deploy (Cloudflare Workers, assets estáticos)

O projeto é 100% estático (`dist/`) — sem D1, sem função de backend, sem
código de servidor nenhum. A hospedagem usa **Cloudflare Workers com Static
Assets** (`wrangler.jsonc`, sem `main` script) em vez de Cloudflare Pages: o
dashboard desta conta não oferece mais o botão de criar projeto Pages
diretamente (só o fluxo de "Workers"), e a Cloudflare já trata Static Assets
como o substituto oficial de Pages — para um site 100% estático como este,
o resultado é o mesmo (nenhuma lógica de servidor roda, só arquivos
servidos), só muda o domínio final: `https://memoriza.<sua-conta>.workers.dev`
em vez de `memoriza.pages.dev`.

O deploy automático usa a **integração nativa de Git da Cloudflare**: o
próprio Worker fica conectado ao repositório GitHub pelo GitHub App da
Cloudflare (sem token nenhum guardado no lado do GitHub — a autenticação é
toda do lado da Cloudflare).

1. No dashboard, abra **Workers & Pages → memoriza → Settings** e procure a
   seção de integração com Git (dependendo da conta aparece como **"Connect
   to Git"** ou **"Build"**).
2. Conecte ao repositório `Fpiscinato/memoriza`, branch `main`.
3. Build command: `npm run build`. Deploy command: deixe o padrão (a
   Cloudflare detecta o `wrangler.jsonc` do repo e roda `wrangler deploy`
   sozinha).
4. Cada push em `main` builda e publica automaticamente em
   `https://memoriza.<sua-conta>.workers.dev`.

Deploy manual único, se precisar (roda localmente, com `wrangler login`):

```bash
npm run build
npx wrangler deploy
```

## Modelo de dados

Todo registro tem `id` (UUID) e `atualizado_em` (timestamp ISO) — é a base da
mesclagem no importar/exportar.

- `perfis`: `{ id, nome, criado_em, atualizado_em }`
- `espacos`: `{ id, perfil_id, nome, categoria, criado_em, atualizado_em, arquivado }`
- `temas`: `{ id, espaco_id, nome, categoria, criado_em, atualizado_em }`
- `notas`: `{ id, tema_id, conteudo, fonte, pode_desatualizar, validade_ate?, criado_em, atualizado_em }`
- `itens_revisao`: `{ id, nota_id, perfil_id, estagio, data_agendada, data_concluida?, status, avaliacao?, streak_facil, criado_em, atualizado_em }`

`pode_desatualizar` substitui o campo `tipo` do desenho original da Fase 1a
(`'conceito' | 'formula' | 'fato_com_validade'`) — na prática só a distinção
"pode ficar desatualizado" tinha efeito real no app (o aviso de validade), e
não existia dado real ainda pra migrar, então o campo foi trocado direto por
um booleano em vez de mantido sem uso.

## Algoritmo de repetição espaçada

Ao criar uma Nota, o primeiro Item de Revisão nasce no estágio `'1'`,
agendado para `hoje + 1 dia` (fuso Londres). Ao concluir uma revisão com uma
avaliação, `computeNextReview` (`src/domain/algorithm.ts`) calcula o próximo
estágio:

| Estágio atual | Difícil | Médio | Fácil |
|---|---|---|---|
| `1` | `1` (já é o mínimo) | `7` | `30` |
| `7` | `1` | `30` | `180` |
| `30` | `7` | `180` | `consulta` |
| `180` | `30` | `180` (já é o máximo) | `consulta` |

- **Difícil/Médio** sempre zeram `streak_facil`.
- **Fácil** incrementa `streak_facil`; se ele chegar a 2 (duas fáceis
  seguidas nessa nota), o item vai para `'consulta'` mesmo que a escada por
  si só não tivesse estourado ainda.
- O reagendamento sempre soma os dias a partir de `data_concluida` (o dia
  em que a revisão foi de fato feita), nunca da `data_agendada` original —
  evita o efeito bola de neve quando uma revisão atrasa.
- Concluir uma revisão nunca reaproveita o registro antigo: fecha o item
  atual (`status: 'feita'`) e cria um novo Item de Revisão para o próximo
  estágio, preservando o histórico completo.
- `'consulta'` é terminal — o novo item já nasce `status: 'feita'` (não
  entra mais na fila). O mesmo vale pro botão manual "Parar de revisar" na
  tela da Nota, que move o item pendente pra `'consulta'` direto, sem
  esperar duas fáceis.

## Fila de "Hoje"

Lista os Itens de Revisão do perfil atual com `status = 'pendente'` e
`data_agendada <= hoje`, agrupados por Tema (com o Espaço como cabeçalho só
quando a fila tem mais de um Espaço ativo misturado). Itens atrasados
aparecem misturados normalmente — sem badge de "atrasado" — de propósito,
pra não criar uma sensação de dívida acumulada.

Abrir um item mostra primeiro só o Tema/fonte (recall ativo — tentar lembrar
antes de ver a resposta); só depois de "Mostrar resposta" o conteúdo
completo e os botões Fácil/Médio/Difícil aparecem. Notas com
`pode_desatualizar` e `validade_ate` vencida (ou a menos de 30 dias de
vencer) mostram o aviso "isso pode estar desatualizado" antes de revelar.

Durante o desenvolvimento, o botão "Revisar agora (teste)" na tela da Nota
(fora da fila) puxa o item pendente daquela nota pra hoje, sem esperar o
D+1 real — não é um atalho de produção, só facilita testar o fluxo.

## Lembrete diário (.ics)

Em Configurações → Lembretes: escolha um horário e baixe um `.ics` com um
evento recorrente diário (`RRULE:FREQ=DAILY`), gerado 100% no navegador
(sem chamada de rede). O celular abre o app de Calendário/Lembretes nativo
pra confirmar a adição. Depois de adicionado, o lembrete é gerenciado
direto por lá — o Memoriza não tem conexão contínua com ele; trocar o
horário aqui exige baixar um novo arquivo e apagar o antigo manualmente no
Calendário.

## Editar e excluir

Espaço, Tema e Nota têm "Editar" visível (nome/categoria, ou conteúdo/fonte/
validade no caso da Nota) e "Excluir" atrás de um menu "⋯" — de propósito
mais escondido que "Arquivar", pra reduzir o risco de apagar algo sem
querer. Exclusão é sempre em cascata (Espaço → Temas → Notas → Itens de
Revisão) e sempre passa por um modal de confirmação que mostra a contagem
real do que vai sumir antes de executar.

Editar o conteúdo de uma Nota nunca mexe no Item de Revisão em andamento —
só atualiza os campos da própria Nota. O agendamento (estágio, próxima
data) continua exatamente onde estava.

## Painel

Números simples pro perfil atual, sem gráfico:

- Revisões feitas nos últimos 7 dias, e a sequência de dias seguidos com
  pelo menos uma revisão feita (streak).
- Ranking dos Temas com mais avaliações "Difícil" no histórico — os pontos
  fracos reais, agregados por Tema a partir dos Itens de Revisão.
- Contagem de Espaços ativos, Temas, Notas, e Itens de Revisão em
  `'consulta'` (aposentados).

## Exportar como PDF

Em cada Espaço, o botão "PDF" abre uma tela de impressão
(`#/espacos/:id/pdf`) com o conteúdo agrupado por categoria → Tema → Notas
(ordem cronológica de criação). Cada nota cujo histórico de avaliações tem
mais "Difícil" do que "Fácil" ganha um indicador "⚠️ Reforçar". O botão
"Imprimir / Salvar como PDF" chama `window.print()` — sem biblioteca de PDF,
sem chamada de rede; a folha de estilo (`@media print` em
`components.css`) esconde a navegação e ajusta o layout só na hora de
imprimir/exportar. Funciona igual num celular (o menu de compartilhar/
imprimir do navegador também oferece "Salvar como PDF").

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
IDs conflitantes dentro do mesmo lote. A tabela de transição completa do
algoritmo de repetição (`src/domain/algorithm.ts`): todos os pares
estágio × avaliação, os casos de borda em `1` e `180`, e o `streak_facil`
chegando a 2 (testado tanto isolado quanto no fluxo real de duas fáceis
seguidas). E os cálculos puros do Painel/PDF (`src/domain/stats.ts`,
`src/lib/group.ts`): sequência de dias sem quebrar por causa do dia atual,
nota fraca por contagem de avaliações, e agrupamento por categoria com
ordenação e "Sem categoria" por último.

As funções que dependem de IndexedDB (CRUD, cascata de exclusão,
agregações do Painel) não têm teste automatizado — foram validadas
manualmente, ponta a ponta, num navegador real (Chromium via Playwright)
durante o desenvolvimento desta fase, cobrindo criar/editar/excluir em
cascata com contagem correta no modal, Painel refletindo os dados certos
antes e depois de excluir, e o indicador de nota fraca aparecendo certo no
PDF.

## Critérios de pronto verificados nesta fase

- [x] `npm run build` gera um `dist/` estático que funciona offline (PWA com
      manifest + service worker via `vite-plugin-pwa`).
- [x] Seletor de perfil funciona com dados isolados por `perfil_id`; gerenciar
      perfis (adicionar/renomear) funciona em Configurações.
- [x] Exportar gera um `.json` válido; importar numa sessão limpa recria os
      dados corretamente — testado manualmente com dois contextos de
      navegador isolados, incluindo o caso de restaurar backup após
      reinstalar, e com dados reais de Espaço/Tema/Nota/Item de Revisão.
- [x] Criar Espaço → Tema → Nota funciona; a nota gera um Item de Revisão
      agendado para D+1, confirmado com o atalho de teste "Revisar agora".
- [x] Avaliar uma revisão como Fácil, Médio e Difícil produz o próximo
      agendamento correto (verificado manualmente e coberto pelos testes de
      `algorithm.test.ts`).
- [x] Aviso de "pode estar desatualizado" aparece corretamente pra uma nota
      de teste com `validade_ate` vencida, tanto na fila quanto durante a
      revisão.
- [x] Layout responsivo (navegação inferior no celular, lateral no desktop;
      testado em 375×667 e 1280×800).
- [x] Tema claro/escuro respeitando `prefers-color-scheme`, com alternância
      manual persistida.
- [x] Deploy publicado em `https://memoriza.f-piscinato.workers.dev`
      (Cloudflare Workers com Static Assets, conectado ao Git nativamente —
      ver seção "Deploy" acima e a troca de domínio em relação ao
      `pages.dev` original).
- [x] Editar o nome de um Espaço/Tema e o conteúdo de uma Nota persiste
      (confirmado ponta a ponta num navegador real).
- [x] Excluir um Tema com Notas mostra a contagem correta no modal
      (verificado com um Tema de 0 notas e um Espaço com 2 temas/1 nota) e,
      ao confirmar, remove tudo em cascata — confirmado no Painel antes e
      depois (contagens de Temas/Notas e revisões/streak zerando junto).
- [x] O Painel mostra números corretos comparados com dados de teste reais
      (revisões dos últimos 7 dias, streak, ranking de "Difícil" por Tema,
      contagens de Espaços/Temas/Notas/aposentadas).
- [x] Exportar como PDF de um Espaço com 2 categorias e notas avaliadas
      gera uma página agrupada corretamente (categoria → Tema → Notas em
      ordem cronológica), com o indicador "⚠️ Reforçar" aparecendo só na
      nota com mais avaliações Difícil do que Fácil.
