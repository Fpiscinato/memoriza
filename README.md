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

**Fase 1c** entregou editar/excluir em todos os níveis (com exclusão em
cascata e confirmação explícita), agrupamento por categoria também nos
Espaços, o Painel com estatísticas simples, e exportar um Espaço como PDF.

**Fase 1d** corrigiu uso real da Fase 1c e fechou o backlog: separou Título
(gatilho de recall) de Fonte (citação, só pós-reveal) — a correção mais
importante, porque muda o que a fila "Hoje" mostra antes de revelar —,
adicionou autocomplete e agrupamento case-insensitive de categoria, grupos
recolhíveis, cor fixa por Espaço/Categoria, layout responsivo em colunas na
largura de desktop, excluir perfil, e Favoritos (Temas e Notas) com tela
própria.

**Fase 1e** (este estado do projeto) é só clareza, sem mudar nenhuma
funcionalidade: uma tela "Como Usar" com exemplos reais (não genéricos) pra
cada conceito do app, acessível de qualquer lugar por um ícone "?" no
cabeçalho, e rótulos/placeholders/textos de apoio melhores em toda a
interface — reduz a confusão que apareceu nos testes reais da Fase 1d
(ex: Título × Fonte). Ainda não há nada relacionado à Fase 2 (Google Drive,
multiusuário público).

**v1.20** chegou a trocar a organização por um sistema só de pastas (raiz e
subpastas aninhadas, sem categoria). **v1.21** volta ao layout agrupado do
v1.19 e mantém as subpastas como recurso opcional: na raiz, os Espaços voltam a
aparecer agrupados por categoria (ex: Bíblia, Cursos, Livros); dentro de cada
Espaço, os Temas também são agrupados por categoria. Além disso, um Tema pode
ter subpastas aninhadas quantos níveis forem necessários, e as notas podem
ficar no próprio Tema ou em qualquer subpasta dele. Os formulários voltam a
pedir **Categoria + Nome** (nome opcional no Tema), com ícone e cor opcionais.

**v1.22** unifica a linguagem e a navegação em **pastas dentro de pastas**:
categoria → pasta → categoria → pasta → notas, uma tela por pasta, com os
grupos de categoria recolhidos em todos os níveis. "Espaço", "Tema" e
"Subpasta" passam a se chamar só **Pasta**, e toda pasta pode receber notas —
inclusive a pasta principal. Pra isso, cada pasta de topo ganhou uma pasta
interna oculta (criada sob demanda, id determinístico), que guarda essas notas
sem mudar o modelo `notas.tema_id` e sem migração destrutiva dos dados.

**v1.23** adiciona **Mover** no menu `⋯` de pastas e notas, com um seletor da
árvore de pastas (funciona entre pastas de topo diferentes, sem arrastar e
soltar). Mover uma pasta leva junto subpastas e notas; mover uma nota preserva
histórico e agendamento de revisão. A criação de pasta passa a pedir **só o
nome**, herdando a categoria do grupo/pasta onde foi clicada — categoria,
ícone e cor continuam editáveis depois. Os botões **+ Nova pasta** (contorno,
ícone de pasta) e **+ Nova nota** (preenchido, ícone de caderno) ficaram
visualmente distintos.

**v1.24** corrige a criação de pastas dentro de pastas: a pasta nova nasce
**só dentro da pasta atual**, sem herdar nem repetir a categoria de cima (como
pastas no Windows). O formulário voltou a oferecer **ícone e cor**, e a
listagem só mostra cabeçalhos de categoria quando há mais de uma categoria na
mesma pasta. O **Mover** ganhou confirmação antes de executar, mostra o
**caminho atual** do item no topo e exibe ícone/cor de cada destino, com os
grupos recolhidos e a busca abrindo só o que encontrou.

**v1.25** corrige a criação de pasta dentro de outra pasta: a pasta nova usa a
**categoria das pastas irmãs** (a mais comum, se houver mais de uma), então nasce
junto delas em vez de cair em "Sem categoria". Quando o usuário toca no **+ Pasta**
de um grupo, a categoria daquele grupo continua mandando. Os botões **Nova pasta** e
**Nova nota** ficam no mesmo lugar — no topo da pasta, à direita — em todas as telas
de pasta.

**v1.26** transforma o caminho do topo num **endereço navegável de verdade**: cada
categoria e cada pasta do breadcrumb agora abre a lista daquele nível, como no Windows
Explorer (inclusive "Cursos" e "Faixa Branca"). A categoria também aparece no
cabeçalho das telas de pasta e de nota, em vez de só no caminho. O seletor de **Mover**
passa a mostrar o **caminho completo com as categorias** em cada destino e no caminho
atual. **Nova nota** usa o mesmo estilo de contorno das demais ações (sem cor primária
induzindo ao clique), e **Editar** e **Nova pasta** não ficam mais abertos ao mesmo
tempo.

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
- **`Nota.titulo` substitui `Fonte` como gatilho de recall — correção de
  especificação da Fase 1d.** `Fonte` sempre foi pensada como
  citação/referência, não como o texto mostrado antes de revelar a
  resposta; faltava um campo próprio pra isso. Notas gravadas antes dessa
  mudança não têm `titulo` no IndexedDB — `migrateNotasSemTitulo`
  (`src/db/notas.ts`) faz a migração lazy (na primeira leitura de cada nota
  antiga, não uma migração de schema formal): copia `fonte` pra `titulo` e
  marca `titulo_revisado: false`, o que acende um aviso sutil na tela de
  edição até o usuário salvar aquela nota de novo. Roda no bootstrap
  (`main.ts`) e de novo depois de cada `importData`, pra cobrir tanto dados
  locais antigos quanto um `.json` exportado por uma versão anterior.
- **Categoria compara ignorando maiúsculas/minúsculas e espaços nas
  pontas**, tanto pra agrupar (`agruparPorCategoria`) quanto pra sugerir no
  autocomplete (`distinctCategorias`, `src/lib/group.ts`) — "Livros" e
  "livros " não viram grupos diferentes por acidente de digitação. O rótulo
  exibido do grupo é a primeira grafia encontrada; o autocomplete usa
  `<input list>` + `<datalist>` nativos (sem componente customizado) — dá
  sugestão e continua aceitando texto novo de graça.
- **Grupos por categoria são `<details>/<summary>` nativos**, não um
  componente de "collapse" próprio — recolhe/expande de graça, sem estado
  em JS pra gerenciar (o estado não persiste entre re-renders da tela, o
  que é aceitável: o pedido era só funcionar durante o uso, não persistir
  entre sessões).
- **Cor por Espaço/Categoria é hash determinístico sobre uma paleta fixa de
  8 cores** (`accentIndexFor`, `src/lib/color.ts`), nunca gerada
  aleatoriamente — a mesma chave (id do Espaço, ou categoria já normalizada
  pra minúsculo/sem espaços) sempre cai na mesma cor, em qualquer tela. As
  8 cores têm variantes claro/escuro em `tokens.css`, igual todo o resto da
  paleta.
- **A marca tem dois tokens**: `--color-brand` (fundo de botão, precisa
  contrastar com texto branco) e `--color-brand-strong` (texto/ícone/borda
  sobre a superfície). No tema escuro só o segundo muda de valor (azul claro)
  — com um só token, o item ativo da navegação ficava azul-escuro sobre
  fundo escuro (2,6:1, ilegível).
- **A paleta escura existe em UM lugar só.** O app resolve a preferência
  ("system"/"light"/"dark") em JS e sempre escreve o **tema efetivo** no
  atributo `data-theme` (`src/lib/theme.ts`) — por isso o CSS tem só o bloco
  `:root[data-theme='dark']`, sem repetir os mesmos 20 valores numa media
  query (as duas listas já tinham começado a divergir). Um script inline no
  `<head>` (`index.html`) escreve o tema antes do CSS aplicar, pra não piscar
  claro na abertura; e o app acompanha a mudança de tema do sistema em
  tempo real.
- **Contraste verificado contra WCAG AA**: `--color-text-faint` (metadados,
  legendas) é `#6b7280` no claro e `#8b91a4` no escuro (4,5:1+); o anel de
  foco é `#2563eb` no claro (antes era `#93b4fb`, 2:1 — indicador de foco
  precisa de 3:1); o gradiente do "streak" no Painel escureceu
  (`#c2410c` → `#a16207`) pra o texto branco passar de 4,5:1.
- **Botão desabilitado tem estado visual** (`:disabled`): antes um botão
  desabilitado durante um sync continuava com cara de clicável.
- **Poucos `style=""` nos templates**: o que era repetido virou classe
  (`.sem-margem`, `.sem-margem-topo`, `.sem-margem-baixo`, `.com-margem`,
  `.card--separado`, `.input--curto`, `.stat-tile__value--compacto`,
  `.is-hidden`), então o valor do espaçamento vive uma vez no CSS.
- **`.app-main` ganhou um teto de largura bem mais generoso (1100px) e as
  listas (`.item-list`) viram grid multi-coluna a partir de 720px** — o
  problema apontado foi a interface parecer "mobile esticado" em telas
  largas. Telas de formulário/foco único (editar Nota, cartão de revisão,
  Configurações) usam a classe `.content-narrow` pra manter a coluna
  estreita de sempre — largura maior só ajuda listas, não texto longo pra
  ler/editar.
- **Favorito existe em `Tema` e `Nota`, não em `Espaço`** (por instrução
  explícita). A tela "Favoritos" (`src/ui/screens/favoritos.ts`,
  `src/db/favorites.ts`) é uma aba própria, separada da fila "Hoje" —
  mostra Temas favoritos agrupados por Espaço e Notas favoritas agrupadas
  por Tema, reusando o mesmo padrão visual de agrupamento do resto do app.
  No PDF, favorito vira só uma marcação (⭐) ao lado do título — igual o
  indicador de nota fraca —, nunca uma seção separada.
- **Bugs 0.1 ("criar Espaço sumindo"), 0.4 ("Hoje abre em modo de edição")
  e 0.5 ("Preview trava o Salvar") não reproduziram** em teste ponta a
  ponta (Chromium via Playwright, várias vezes, incluindo os cenários
  exatos descritos). O código já criava o Espaço fora do estado vazio, já
  tinha uma tela de revisão sem relação com a de edição, e o textarea do
  editor mantém o valor normalmente estando oculto atrás da aba Preview.
  Não alterei esse comportamento — só documentei que não encontrei a causa,
  pra não mascarar um bug real com uma "correção" de algo que não estava
  quebrado. Se acontecer de novo, o mais provável é cache do Service Worker
  mostrando uma versão antiga — vale conferir a versão do app antes de
  reportar de novo.
- **"Como Usar" (`src/ui/screens/ajuda.ts`) é conteúdo estático fixo**, sem
  consulta ao banco — os exemplos são texto literal do usuário (não
  genéricos), então não fazia sentido gerar a partir de dados reais do
  perfil. Acessível de dois jeitos: ícone "?" no cabeçalho (sempre visível,
  qualquer tela) e uma linha em Configurações — o pedido dizia "ou", os dois
  juntos custam pouco e cobrem tanto "preciso de ajuda agora, sem sair da
  tela" quanto "onde é que acho a ajuda".
- **Os dois exemplos em árvore ficam sempre empilhados, nunca lado a
  lado.** O pedido permitia as duas formas ("lado a lado ou um embaixo do
  outro"); tentei lado a lado primeiro, mas as linhas mais longas dos
  exemplos cortavam dentro de `.content-narrow` (640px) dividido em duas
  colunas — sem espaço sobrando pra um texto monoespaçado desse tamanho.
  Empilhado mantém tudo legível em qualquer largura de tela.
- **`.screen-hint` é uma classe nova, reaproveitada em todas as telas
  principais** (Espaços, criar Tema, criar Nota, Hoje, Painel, Favoritos)
  pra manter a mesma voz/estilo visual em vez de cada tela inventar o
  próprio jeito de mostrar uma dica de uma linha.

## Estrutura do projeto

```
src/
  types.ts              modelo de dados (Perfil, Espaco, Tema, Nota, ItemRevisao)
  domain/
    algorithm.ts          computeNextReview — algoritmo híbrido, função pura
    validade.ts             precisaAvisoDeValidade (nota "pode desatualizar")
    stats.ts                  computeStreak e isNotaFraca — cálculos puros do Painel/PDF
    purga.ts                  lápides de exclusão definitiva (funções puras, testadas)
  db/
    schema.ts            abertura do IndexedDB e definição das object stores/índices
    profiles.ts           perfis: padrão, listar, criar, renomear, excluir em cascata
    espacos.ts             CRUD de Espaços (criar, editar, arquivar/reativar,
                              excluir em cascata, contar cascata, categorias distintas)
    temas.ts                 CRUD de Temas (idem, sem arquivar; + favoritar)
    notas.ts                  CRUD de Notas (criar já agenda o 1º Item de Revisão;
                              editar não mexe no agendamento; excluir em cascata;
                              favoritar; migrateNotasSemTitulo)
    reviews.ts              fila de "Hoje", concluir revisão, parar de revisar
    dashboard.ts          agrega os números do Painel (getDashboardStats)
    pdf-data.ts             monta os dados agrupados pro export em PDF
    favorites.ts             Temas/Notas favoritados do perfil, com Espaço/Tema pai
    lixeira.ts               exclusão suave, listagem da Lixeira, restaurar e expurgar
    purgas.ts                grava as lápides de exclusão definitiva (na mesma transação)
    merge.ts               lógica pura de mesclagem (testada em tests/merge.test.ts)
    export-import.ts    monta o .json de export, dispara download, aplica import
  lib/
    time.ts                utilidades de data no fuso Europe/London
    settings.ts           preferências em localStorage (tema, perfil, lembrete, export)
    theme.ts                aplica/alterna claro-escuro-sistema
    storage-persist.ts   pede armazenamento persistente ao navegador
    markdown.ts          parser markdown minimalista (sem dependência)
    ics.ts                    gera o .ics do lembrete diário, no navegador
    group.ts                 agruparPorCategoria, distinctCategorias (Espaços, Temas, PDF)
    ordem.ts                 ordenarTextos/ordenarPorNome/compararTextos — ordem única de
                              listagem (meses no calendário, números como números)
    github-sync.ts         sincronização em nuvem via Gist privado do GitHub
    color.ts                 accentIndexFor/accentVar — cor fixa por Espaço/Categoria
    uuid.ts                  geração de UUID
    dom.ts                    escape de HTML para templates
  ui/
    app.ts                   shell (cabeçalho, navegação, aviso de backup) e roteamento
    router.ts               router baseado em hash, com rotas aninhadas
                              (#/hoje, #/espacos/:id[/pdf], #/temas/:id, #/notas/:id,
                              #/painel, #/favoritos, #/config)
    global-search.ts      busca global em overlay (Ctrl+K)
    components/
      confirm-modal.ts    modal de confirmação genérico (usado antes de excluir)
      modal-foco.ts       foco dos modais (entra, fica preso dentro e volta ao fechar)
      roving-tabindex.ts  roving tabindex (toolbar do editor e abas do Painel)
    screens/                 profile-select, today, espacos, espaco-detail, espaco-pdf,
                              tema-detail, nota-form, painel, favoritos, ajuda, settings
  styles/
    tokens.css              variáveis de design (cores, tipografia, espaçamento, tema)
    base.css                  reset e estilos globais
    components.css        botões, cartões, navegação, formulários, fila de revisão,
                              modal, painel, folha de impressão do PDF, etc.
scripts/
  generate-icons.mjs   gera os ícones PNG do PWA (sem dependências externas)
tests/
  merge.test.ts           testes da lógica de mesclagem do importar
  purga.test.ts           testes das lápides de exclusão definitiva
  lixeira-sync.test.ts    teste de integração (IndexedDB) do ciclo excluir -> Lixeira ->
                           "Excluir de vez" -> sync (com fake-indexeddb)
  guard-navegacao.test.ts  testes da guarda de "alterações não salvas" e da navegação
                           central (nenhum caminho de saída perde a edição)
  gist-leitura.test.ts     testes da leitura do backup no Gist (inclusive o caso
                           "gist grande", que vem truncado)
  algorithm.test.ts    testes da tabela de transição do algoritmo de repetição
  stats.test.ts             testes de computeStreak, isNotaFraca, agruparPorCategoria
  ordem.test.ts             testes da ordenação (meses, números, casos mistos)
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

> **No dia a dia o deploy é automático: basta `git push` em `main`.** A Cloudflare
> builda e publica sozinha (em ~1 minuto). Não é preciso rodar `wrangler deploy`,
> nem configurar nada no GitHub.

O projeto é 100% estático (`dist/`) — sem D1, sem função de backend, sem
código de servidor nenhum. A hospedagem usa **Cloudflare Workers com Static
Assets** (`wrangler.jsonc`, sem `main` script) em vez de Cloudflare Pages: o
dashboard desta conta não oferece mais o botão de criar projeto Pages
diretamente (só o fluxo de "Workers"), e a Cloudflare já trata Static Assets
como o substituto oficial de Pages — para um site 100% estático como este,
o resultado é o mesmo (nenhuma lógica de servidor roda, só arquivos
servidos), só muda o domínio final: `https://memoriza.f-piscinato.workers.dev`
em vez de `memoriza.pages.dev`.

### Como o automático funciona

O deploy automático usa a **integração nativa de Git da Cloudflare**: o
próprio Worker fica conectado ao repositório GitHub pelo GitHub App da
Cloudflare (sem token nenhum guardado do lado do GitHub — a autenticação é
toda do lado da Cloudflare).

```
git push origin main
        │
        └─> Cloudflare builda (npm run build) e publica no workers.dev
```

**Conferir se saiu:** o `sw.js` publicado tem que apontar pro bundle novo
(`grep index- assets/index-*.js` no `sw.js` do site). Se o `sw.js` do site ainda
tiver o hash antigo, o build não rodou.

### Configuração (só na primeira vez, ou se a integração cair)

1. No dashboard, abra **Workers & Pages → memoriza → Settings** e procure a
   seção de integração com Git (dependendo da conta aparece como **"Connect
   to Git"** ou **"Build"**).
2. Conecte ao repositório `Fpiscinato/memoriza`, branch `main`.
3. Build command: `npm run build`. Deploy command: deixe o padrão (a
   Cloudflare detecta o `wrangler.jsonc` do repo e roda `wrangler deploy`
   sozinha).

### Deploy manual (emergência)

Se a integração com o Git não estiver disponível (ou quiser publicar sem
esperar), roda localmente com `wrangler login`:

```bash
npm run build
npx wrangler deploy
```

### Quem já tem o app instalado

O `service worker` novo só substitui o antigo quando o navegador checa por
atualização — isso acontece na navegação (ao abrir o app). Como a atualização é
`registerType: 'prompt'`, quem já tinha o app aberto vê o aviso **"Nova versão
do Memoriza disponível → Atualizar agora"** e escolhe quando recarregar (se
houver edição não salva, o app pergunta antes). Quem não reabrir o app continua
na versão antiga, funcionando offline, sem erro nenhum.

## Modelo de dados

Todo registro tem `id` (UUID) e `atualizado_em` (timestamp ISO) — é a base da
mesclagem no importar/exportar.

- `perfis`: `{ id, nome, criado_em, atualizado_em }`
- `espacos`: `{ id, perfil_id, nome, categoria, criado_em, atualizado_em, arquivado, icone?, cor? }`
- `temas`: `{ id, espaco_id, nome, categoria, pai_id?, favorito, oculta?, criado_em, atualizado_em, icone?, cor? }`
  (`categoria` agrupa as pastas na tela; `pai_id` ausente = pasta direta da pasta
  de topo; presente = pasta aninhada dentro de outra, quantos níveis forem
  necessários; `oculta` marca a pasta interna que guarda as notas soltas da pasta
  principal — ela não aparece na navegação, na busca nem na Lixeira)
- `notas`: `{ id, tema_id, titulo, conteudo, fonte, pode_desatualizar, validade_ate?, favorito, titulo_revisado, criado_em, atualizado_em }`
- `itens_revisao`: `{ id, nota_id, perfil_id, estagio, data_agendada, data_concluida?, status, avaliacao?, streak_facil, criado_em, atualizado_em }`
- `avaliacoes`: `{ id, perfil_id, espaco_id, tema_id, nota_id, avaliacao, escopo, categoria?, sessao_id, criado_em, atualizado_em }`
- `purgas`: `{ id, loja, alvo_id, purgado_em }` — lápides das exclusões definitivas (ver "Lixeira")
- `snapshots`: backups locais (fora do export/sync)

Espaço, Tema e Nota também carregam `excluido?` / `excluido_em?` — a marca da
Lixeira (ver abaixo).

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
`data_agendada <= hoje`, agrupados por pasta (com o nome da pasta de topo como
cabeçalho só quando a fila tem mais de uma pasta principal ativa misturada).
Itens atrasados aparecem misturados normalmente — sem badge de "atrasado" — de
propósito, pra não criar uma sensação de dívida acumulada.

Abrir um item mostra primeiro só o Título/fonte da nota (recall ativo — tentar
lembrar antes de ver a resposta); só depois de "Mostrar resposta" o conteúdo
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

Pasta e Nota têm "Editar" visível (categoria/nome/ícone/cor, ou
conteúdo/fonte/validade no caso da Nota) e "Excluir" atrás de um menu "⋯" — de
propósito mais escondido que "Arquivar", pra reduzir o risco de apagar algo sem
querer. Exclusão é sempre em cascata (Pasta → pastas internas → Notas →
Itens de Revisão) e sempre passa por um modal de confirmação que mostra a
contagem real do que vai sumir antes de executar.

Editar o conteúdo de uma Nota nunca mexe no Item de Revisão em andamento —
só atualiza os campos da própria Nota. O agendamento (estágio, próxima
data) continua exatamente onde estava.

## Editor de nota: não perde o que foi digitado

O editor é o lugar onde mais se digita, então tudo que envolve "sair" foi
cuidado:

- **Toda navegação passa pela mesma guarda.** O "há alterações não salvas?"
  mora no `navigate()` (`src/ui/router.ts`) — ou seja, vale pro breadcrumb,
  pros botões, pra busca e pro menu. Antes a checagem ficava só nos botões da
  navegação principal, e sair pelo breadcrumb (o caminho de volta mais natural)
  perdia o texto digitado sem nenhum aviso.
- **O estado "sujo" é global e some junto.** Sair do editor por qualquer
  caminho (inclusive o botão "voltar" do navegador) limpa a guarda — senão a
  navegação seguinte perguntava de novo sobre uma edição que já não estava na
  tela.
- **"Favoritar" e "Parar de revisar" não re-renderizam a tela.** Eles
  atualizam só o botão/cartão afetado — recarregar a tela inteira apagaria o
  título e o conteúdo que o usuário tinha digitado.
- **Marcar "pode desatualizar" e a data "válido até" também marcam a tela como
  alterada** (esses campos não disparam evento de `input`).
- **Enter no Título/Fonte salva a nota** — o que se espera de um formulário, e
  no celular é o botão "Ir" do teclado virtual.
- **O editor de conteúdo é acessível**: `role="textbox"`,
  `aria-multiline="true"` e `aria-labelledby` apontando pro rótulo — antes o
  leitor de tela anunciava um grupo sem nome.
- **O anel de foco do editor não é cancelado** (o `outline: none` do editor
  vencia o anel global de `base.css`).

## Acessibilidade dos modais e da busca

- **Modais**: o foco entra no diálogo ao abrir (e começa em "Cancelar" nos de
  confirmação, pra o Enter acidental não confirmar uma exclusão), fica preso
  dentro dele (Tab/Shift+Tab não escorrem pra página de trás) e volta pro
  elemento que estava focado quando fecha (`src/ui/components/modal-foco.ts`).
- **Busca global**: o campo é um `combobox` e cada resultado é um `option` de
  verdade (antes era `role="option"` num `<button>`, papel inválido), com
  `aria-activedescendant` apontando pro item selecionado — o leitor de tela
  anuncia a navegação pelas setas. Ao fechar, o foco volta pro botão da busca.
- **Ctrl+K não abre a busca dentro do editor**: lá o atalho cria link (senão o
  usuário ganhava o prompt de URL e a paleta de busca ao mesmo tempo).

## Teclado: menos paradas de Tab

O padrão de "roving tabindex" (ARIA APG) vale tanto pra toolbar quanto pra
tablist (`src/ui/components/roving-tabindex.ts`): só o item selecionado fica
no tab order, e as **setas** movem o foco entre eles.

- **Toolbar do editor**: eram **18 paradas de Tab** entre o campo "Fonte" e o
  campo de conteúdo. Agora são **2** (um grupo pra comandos de formatação, um
  pras cores) — as setas percorrem os botões.
- **Abas do Painel**: as 4 abas eram 4 paradas de Tab; agora é **1**, com as
  setas trocando de aba. As abas também ganharam a semântica completa
  (`aria-controls`, `aria-labelledby` no painel, `tabindex` no painel).

## Favoritar nota nova

O botão "Favoritar" existia só na edição da nota — não dava pra criar uma nota
já marcada como favorita. Agora o botão aparece nos dois modos: na criação ele
marca a nota pra nascer como favorita, na edição ele alterna o favorito já
salvo.

## Lixeira (exclusão suave)

"Excluir" **não apaga na hora**: marca o registro com `excluido: true` +
`excluido_em` e o item some das telas (listas, fila de revisão, busca global,
estatísticas, PDF). Ele fica recuperável em **Configurações → Lixeira** por
até **30 dias** (`EXCLUSAO_RETENCAO_DIAS`); depois disso o expurgo automático
(apertado ao abrir o app e depois de cada sync) apaga de vez.

- **Restaurar** traz o item de volta. Se já existir algo com o mesmo nome no
  mesmo lugar, o item restaurado ganha "(restaurado)" no nome, pra não
  duplicar (`src/domain/restauro-lixeira.ts`).
- **Excluir de vez** (ou **Esvaziar lixeira**) apaga o item e tudo que foi
  junto com ele em cascata, sem volta.

### A lápide de exclusão (`purgas`)

Sem mais nada, "Excluir de vez" era desfeito pelo próximo sync: a mesclagem
do importar/sync **nunca apaga o que existe local**, e o backup remoto ainda
tinha a cópia antiga do item — então o item era "recriado" (com `excluido:
true`) e voltava a aparecer na Lixeira, como se o botão não tivesse
funcionado.

A correção é a store `purgas` (`src/domain/purga.ts`): cada exclusão
definitiva grava uma **lápide** `{ id, loja, alvo_id, purgado_em }`. A lápide
viaja no export/sync e vale mais do que qualquer cópia do registro anterior a
ela:

- registro **local** coberto por lápide → é **apagado** localmente;
- registro **do arquivo** coberto por lápide → é **ignorado** (não entra);
- registro mexido **depois** da lápide → volta a valer (a regra geral continua
  sendo "mais recente vence");
- o export **não leva** o registro coberto — o backup em nuvem perde o item
  de vez também.

Como a lápide é mais recente que o registro, ela também sobrevive a
"restaurar + editar" (nesse caso o registro fica mais novo e volta a valer).
Excluir um Perfil inteiro segue a mesma regra — sem isso, o perfil inteiro
voltaria no próximo sync.

## Painel

Números simples pro perfil atual, sem gráfico:

- Revisões feitas nos últimos 7 dias, e a sequência de dias seguidos com
  pelo menos uma revisão feita (streak).
- Ranking das Pastas com mais avaliações "Difícil" no histórico — os pontos
  fracos reais, agregados por pasta a partir dos Itens de Revisão.
- Contagem de Pastas (de todos os níveis, sem contar a pasta interna oculta),
  Notas, e Itens de Revisão em `'consulta'` (aposentados).

## Exportar como PDF

Em cada pasta, o botão "PDF" abre uma tela de impressão
(`#/espacos/:id/pdf`) com o conteúdo agrupado por categoria → pasta → Notas
(ordem cronológica de criação). Pastas aninhadas mostram o caminho, ex:
"Faixa Branca › Aula 5 — Risco"; as notas soltas da pasta principal aparecem
como a seção "Notas da pasta". Cada nota cujo histórico
de avaliações tem mais "Difícil" do que "Fácil" ganha um indicador "⚠️
Reforçar". O botão
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
  - só existe localmente → nunca é apagado;
  - **exceção**: o que tem lápide de exclusão definitiva é apagado localmente
    e ignorado quando vem no arquivo (ver "Lixeira").

  Depois de importar, a tela mostra quantos registros foram criados,
  atualizados e mantidos como estavam.

## Nova versão do app (PWA)

O Memoriza é um PWA: o service worker guarda a versão instalada em cache. Quando
publica uma versão nova, ela **não se aplica sozinha** — o app mostra um aviso
no topo da tela:

> **Nova versão do Memoriza disponível.**  [Atualizar agora] [Depois]

- **Atualizar agora** ativa a nova versão e recarrega a página. Se houver uma
  edição de nota **não salva**, o app pergunta antes (a recarga levaria a
  edição junto).
- **Depois** dispensa o aviso — a nova versão entra na próxima vez que o app for
  aberto.

Isso é o `registerType: 'prompt'` do `vite-plugin-pwa` (antes era
`'autoUpdate'`, que recarregava a página no susto, sem avisar e no meio de uma
edição). O aviso é o componente `src/ui/components/toast.ts`.

## Sincronização em nuvem (Gist do GitHub)

O backup fica num **Gist privado** da conta do usuário (o app não tem servidor
próprio): um *Personal Access Token* com permissão `gist` é guardado **só
neste navegador** e nunca é enviado a mais ninguém.

O sync é uma **mesclagem** nos dois sentidos: registros mais novos vencem,
nada local é apagado, e o que está só no Gist é trazido pra baixo (e vice-versa).

- **Gists grandes** (o arquivo de backup acima de ~1MB) vêm **truncados** na
  resposta da API — o conteúdo de verdade vem no `raw_url`. O app trata isso
  (`lerConteudoGist`, `src/lib/github-sync.ts`): sem esse cuidado, o app
  **enviava** o backup mas **não recebia** nada de volta, e ainda sobrescrevia
  o backup remoto com o estado local (perdendo o que estava lá).
- **Backup remoto ilegível não é sobrescrito**: se o arquivo do Gist não puder
  ser lido, o sync avisa e não mexe em nada — o conteúdo remoto pode ser a
  única cópia (ex: aparelho novo).
- **Histórico do backup**: toda edição do Gist fica no histórico do GitHub, e
  o app lista as versões pra restaurar uma antiga.

## Backup

No primeiro carregamento o app pede armazenamento persistente ao navegador
(`navigator.storage.persist()`) para reduzir o risco do IndexedDB ser
descartado sob pressão de espaço. Ainda assim, os dados só existem neste
aparelho — se passarem 14 dias desde o último export (ou nunca tiver sido
feito um) e já houver dados de estudo, aparece um aviso discreto sugerindo
exportar um backup.

O Memoriza não envia notificações push. Um lembrete diário para revisar deve
ser configurado no app de Calendário/Lembretes do próprio celular.

## Ordenação das listagens

Toda listagem por nome (Pastas, grupos/categorias, chips de sugestão,
Favoritos, busca global e a ordem das pastas no PDF) passa por um único lugar,
`src/lib/ordem.ts`. Antes cada tela chamava `localeCompare` do seu jeito, e isso
quebrava em dois casos:

- **Números**: comparação alfabética vê "1" < "2", então "Aula 10" aparecia
  antes de "Aula 2". Resolvido com `numeric: true` no `Intl.Collator`.
- **Meses do ano**: em português a ordem alfabética dos nomes não é a do
  calendário — "Abril" < "Agosto" < "Dezembro" < "Fevereiro". `numeric` não
  resolve, então os meses são reconhecidos pelo nome (por extenso e abreviado,
  em pt-BR e em inglês) e ordenados pelo número do mês.

Reconhecer mês por nome tem um risco: "Mar", em português, é o mar, não março.
Por isso **a ordem por mês só entra quando todos os nomes da lista são meses**.
Uma lista com "Janeiro", "Mar" e "Aula 1" continua alfabética, e "Mar" sozinho
nunca é reordenado.

A aplicação é **por grupo**, não só sobre a lista inteira: um grupo de meses sai
no calendário mesmo que a pasta tenha outras categorias ao lado dele.

As **Notas** são a exceção — por padrão continuam em ordem de criação (mais
antigas primeiro), porque é o que faz sentido ao revisar uma pasta. Em
Configurações › Ordenação dá para trocar por "Título (A–Z)", que aí passa a valer
a mesma ordem de meses e números. O PDF segue a escolha, para não sair diferente
da tela.

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
nota fraca por contagem de avaliações, e agrupamento/sugestão de categoria
ignorando maiúsculas/minúsculas e espaços nas pontas. E a ordenação das
listagens (`src/lib/ordem.ts`): os doze meses do ano na ordem do calendário (e
não na alfabética), números acima de 9 (`Aula 2` antes de `Aula 10`, incluindo
uma lista de 40 itens), "Mar" **não** virando março quando a lista tem itens que
não são meses, ordem por calendário dentro de cada grupo isolado, desempate
entre meses repetidos, e "Sem categoria" continuando por último.

As funções que dependem de IndexedDB (CRUD, cascata de exclusão,
agregações do Painel, migração de notas antigas) não têm teste
automatizado — foram validadas manualmente, ponta a ponta, num navegador
real (Chromium via Playwright), incluindo injetar um registro no formato
pré-Fase-1d direto no IndexedDB e recarregar o app pra confirmar a
migração (`migrateNotasSemTitulo`) rodando de verdade no bootstrap.

A exceção é o ciclo da Lixeira: `tests/lixeira-sync.test.ts` roda contra um
IndexedDB de verdade (`fake-indexeddb`) e cobre o caminho completo —
excluir (vai pra Lixeira) → sync → "Excluir de vez" → sync de novo —
garantindo que o item **não volta** (era o bug do "eu limpo e ele sempre
volta"), que a cascata some junto, que o item expurgado em outro aparelho
é apagado localmente e que o item na Lixeira não aparece na busca global.
As lápides em si (`src/domain/purga.ts`) têm testes puros em
`tests/purga.test.ts`, e a guarda de "alterações não salvas" +
navegação central têm testes em `tests/guard-navegacao.test.ts`.

Também cobre, das fases anteriores: criar/editar/excluir em cascata com
contagem correta no modal, Painel refletindo os dados certos antes e
depois de excluir, e o indicador de nota fraca aparecendo certo no PDF.

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
- [x] Criar Espaço funciona com a lista já populada e agrupada por
      categoria (não reproduziu o bug reportado, testado várias vezes).
- [x] Categoria digitada antes sugere via autocomplete em Espaço e Tema;
      "Livros"/"livros "/" LIVROS" caem no mesmo grupo.
- [x] Grupos por categoria recolhem/expandem ao clicar no cabeçalho, em
      Espaços e em Temas dentro de um Espaço.
- [x] Fila "Hoje": Título aparece antes de revelar, Fonte só depois, junto
      do conteúdo — nunca abre a tela de edição por engano (não reproduziu
      o bug reportado); "Editar nota" existe como ação separada e
      deliberada dentro da tela de revisão.
- [x] Salvar uma Nota funciona estando no modo Preview do editor (não
      reproduziu o bug reportado).
- [x] Nota gravada antes da Fase 1d (sem `titulo`) é migrada
      automaticamente — testado injetando um registro no formato antigo
      direto no IndexedDB, recarregando o app, e confirmando que o título
      veio da Fonte antiga, o aviso "revisar título" apareceu, e sumiu
      depois de editar e salvar.
- [x] Espaço/Categoria têm cor fixa e consistente (hash determinístico
      sobre paleta de 8 cores) em listas, cabeçalhos de grupo e Favoritos.
- [x] `.item-list` vira grid multi-coluna a partir de 720px de largura;
      formulários/cartão de revisão mantêm coluna estreita (`.content-narrow`)
      mesmo em telas largas — testado em 375×667 e 1280×800.
- [x] Dá pra excluir um perfil, com modal mostrando quantos
      Espaços/Temas/Notas serão apagados antes de confirmar.
- [x] Dá pra favoritar um Tema e uma Nota; a tela "Favoritos" mostra os
      dois organizados (Temas por Espaço, Notas por Tema), numa aba própria
      separada de "Hoje".
- [x] PDF de um Espaço com itens favoritados mostra a marcação ⭐ ao lado
      do título, sem seção separada de favoritos.
- [x] Tela "Como Usar" existe, acessível pelo ícone "?" no cabeçalho (em
      qualquer tela) e por Configurações; mostra os dois exemplos em árvore
      (curso e livro) e as 12 seções, com os textos exatos pedidos.
- [x] Placeholders/textos de apoio aparecem nos campos e botões
      correspondentes: Título, Fonte, checkbox "pode desatualizar",
      categoria (Espaço e Tema), tooltip de Arquivar, tooltip de Favoritar,
      legenda Fácil/Médio/Difícil na revisão, caminho completo
      (Espaço › Tema) ao criar/editar Nota, dica de uma linha no topo de
      Espaços, criar Tema, criar Nota, Hoje, Painel e Favoritos.
- [x] Nenhuma funcionalidade mudou de comportamento — só rótulos, textos
      de apoio e a tela nova; confirmado rodando a mesma bateria de testes
      ponta a ponta das fases anteriores (criar/editar/excluir, revisão,
      favoritos, PDF) sem nenhuma regressão.
- [x] Temas (e as categorias que os agrupam) batem na ordem do calendário
      quando são meses do ano, e na ordem do número quando têm número no
      nome — em todas as telas que listam por nome, incluindo Favoritos
      (que antes não tinha ordenação nenhuma) e a ordem dos Temas no PDF.
- [x] A ordem por mês não é acionada por engano: uma lista com "Janeiro",
      "Mar" e "Aula 1" continua alfabética (o "Mar" do mar não virou março).
- [x] Listas com mais de 10 itens numéricos saem certainas (verificado com 40
      capítulos) — "Aula 2" antes de "Aula 10", "Capítulo 9" antes de
      "Capítulo 10".
- [x] Notas continuam por data de criação por padrão, e a troca por título
      (Configurações › Ordenação) fica salva e é respeitada pelo PDF.
