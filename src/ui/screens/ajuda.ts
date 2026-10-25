// Tela de ajuda estática — texto fixo, sem consulta ao banco. Os exemplos usados aqui são
// reais (do próprio usuário), de propósito: exemplo genérico não deixa claro o suficiente
// a diferença entre Título/Fonte, como agrupar por categoria, como aninhar pastas, etc.

const EXEMPLO_CURSO = `Categoria: Cursos
  Pasta: Curso de Investimentos
    Categoria: Faixa Branca
      Pasta: Aula 5 — Risco
        Nota → Título: "O que é Value at Risk?"
               Conteúdo: explicação completa
               Fonte: "Aula 5, slide 20"
        Nota → Título: "O que é viés de confirmação?"
               Conteúdo: explicação completa
               Fonte: "Aula 6"
    Nota → Título: "Como calcular o VaR de uma carteira?"
           Conteúdo: passo a passo
           Fonte: "Lista 3"`;

const EXEMPLO_LIVRO = `Categoria: Livros
  Pasta: Quem Pensa Enriquece
    Categoria: Capítulos
      Pasta: Capítulo 1 — Desejo
        Nota → Título: "Qual o primeiro passo pra transformar desejo em riqueza?"
               Conteúdo: explicação/resumo do que o capítulo ensina
               Fonte: "Capítulo 1, página 20"
      Pasta: Capítulo 8 — Persistência
        Nota → Título: "Por que persistência é descrita como um estado de espírito?"
               Conteúdo: explicação completa
               Fonte: "Capítulo 8"`;

const EXEMPLO_MODULOS = `Categoria: Bíblia
  Pasta: Estudo da Bíblia
    Categoria: Antigo Testamento
      Pasta: Gênesis
        Nota → Título: "Quem Deus chamou em Gênesis 12?"
               Conteúdo: Abraão, e a promessa de uma grande nação
               Fonte: "Gênesis 12:1-3"
      Pasta: Êxodo
        Nota → Título: "Qual é o significado da Páscoa em Êxodo 12?"
               Conteúdo: resumo do capítulo
               Fonte: "Êxodo 12"`;

interface Secao {
  titulo: string;
  corpoHtml: string;
}

const SECOES: Secao[] = [
  {
    titulo: 'Perfis',
    corpoHtml: `<p>Cada pessoa que usa o Memoriza no mesmo aparelho tem seu próprio perfil — suas
      anotações e sua fila de revisão não se misturam com a de outra pessoa. Exemplo: no
      laptop de casa, Fernando e a esposa têm perfis separados; no celular de cada um, só
      existe o próprio perfil.</p>`,
  },
  {
    titulo: 'Pastas e categorias — a estrutura',
    corpoHtml: `<p>Na raiz ficam as <strong>pastas</strong> (ex: "Curso de Investimentos",
      "Quem Pensa Enriquece"), agrupadas por <strong>categoria</strong> — o agrupamento mais
      amplo de tudo que você quer aprender. Exemplos reais:</p>
      <ul>
        <li><strong>Cursos</strong> — tudo que vem de um curso.</li>
        <li><strong>Livros</strong> — tudo que vem de leituras.</li>
        <li><strong>Bíblia</strong> — um estudo que nunca termina, sempre vai existir.</li>
      </ul>
      <p>A tela inicial mostra as categorias recolhidas (Bíblia, Cursos, Livros...) e, ao
      abrir uma, as pastas daquela categoria. Para criar, você preenche a
      <strong>categoria</strong> e o <strong>nome da pasta</strong>; se quiser, escolhe também
      um <strong>ícone</strong> e uma <strong>cor</strong>. Conforme digita, o app sugere
      ícones prováveis (ex: "Bíblia" → igreja, "Curso" → capa de formatura, "Livro" → pilha de
      livros) e as categorias que você já usou.</p>`,
  },
  {
    titulo: 'Pastas dentro de pastas',
    corpoHtml: `<p>Toda pasta pode ter <strong>outras pastas dentro</strong>, quantos níveis você
      quiser — como pastas no computador. Elas também são agrupadas por <strong>categoria</strong>
      (ex: o módulo do curso), então a tela da pasta mostra Categoria → Pasta → Categoria →
      Pasta, até chegar nas notas:</p>
      <ul>
        <li><strong>Cursos</strong> → "Curso de Investimentos" → "Faixa Branca" → "Aula 5 — Risco".</li>
        <li><strong>Livros</strong> → "Quem Pensa Enriquece" → "Capítulos" → "Capítulo 1 — Desejo".</li>
        <li><strong>Bíblia</strong> → "Estudo da Bíblia" → "Antigo Testamento" → "Gênesis".</li>
      </ul>
      <p>O formulário pede a <strong>categoria</strong> e o <strong>nome da pasta</strong>. A
      categoria vem preenchida com a da pasta atual — útil quando o padrão se repete — e você
      troca ou usa uma das sugestões. Cada pasta também pode ter ícone e cor próprios.</p>
      <p>Os grupos de categoria ficam <strong>recolhidos</strong> em todos os níveis; toque no
      título do grupo pra abrir. O caminho completo aparece no topo da tela (breadcrumb), então
      dá pra voltar pra qualquer nível com um clique.</p>`,
  },
  {
    titulo: 'Notas — o que você anota',
    corpoHtml: `<p><strong>Toda pasta pode ter notas</strong>, inclusive a pasta principal. Onde
      estiver, use <strong>+ Nova nota</strong>; se precisar organizar mais, use
      <strong>+ Nova pasta</strong> no mesmo nível. Cada Nota tem três partes, e a diferença
      entre elas importa:</p>
      <ul>
        <li><strong>Título</strong>: uma frase curta ou pergunta que puxa sua memória, antes
        de você ver a resposta. Exemplo: "O que é Duration e Convexity?" — não escreva algo
        vago aqui, tipo só "Aula 4", porque é isso que aparece primeiro na hora de revisar,
        pra você tentar lembrar antes de ver a resposta.</li>
        <li><strong>Conteúdo</strong>: a explicação completa, o que você realmente aprendeu.
        Exemplo: "Duration mede a sensibilidade do preço de um título à mudança na taxa de
        juros; Convexity mede como essa sensibilidade muda..." (aparece só depois que você
        tenta lembrar).</li>
        <li><strong>Fonte</strong>: de onde veio, pra referência. Exemplo: "Aula 4, slide 12"
        ou "Livro, página 87". Aparece junto com o conteúdo, não antes.</li>
      </ul>
      <p>Ao criar uma Nota nova, Título e Fonte já vêm preenchidos (em <strong>laranja</strong>)
      com o que foi usado na última Nota desta mesma pasta — útil quando o padrão se repete,
      tipo "Aula 1", "Aula 2"... Edite antes de salvar; assim que você digitar algo, a cor
      laranja some.</p>
      <p>O campo <strong>Conteúdo</strong> é um editor de texto simples: selecione um trecho
      e use os botões acima dele — <strong>N</strong> para negrito, <em>I</em> para itálico,
      ☰ pra transformar a linha numa lista com marcadores, ou uma das bolinhas de cor
      (azul, vermelho, verde, rosa, amarelo, laranja, roxo, cinza) pra colorir. O ✕ remove
      a cor de um trecho já colorido. O corretor
      ortográfico do navegador/celular funciona normalmente aí.</p>
      <p>Enter simples só quebra a linha (pra continuar escrevendo sem abrir um parágrafo
      novo); apertar Enter de novo, sem escrever nada no meio, cria um parágrafo de verdade
      (com mais espaço acima). Dentro de uma lista, Enter cria um novo item, e <strong>Tab</strong>
      indenta o item atual como sub-item da lista (Shift+Tab volta pro nível anterior).</p>`,
  },
  {
    titulo: '"Esse conteúdo pode ficar desatualizado?"',
    corpoHtml: `<p>Marque isso em notas sobre coisas que mudam com o tempo — taxas, leis,
      limites. Exemplo: uma nota sobre "teto de isenção do Imposto de Renda em 2026" deveria
      ter isso marcado, com a data de validade preenchida. Assim, quando essa nota voltar
      pra revisão depois que a data passar, o app avisa "isso pode estar desatualizado —
      confirme antes de confiar", em vez de você reforçar uma informação que já mudou.</p>`,
  },
  {
    titulo: 'Revisão (tela Hoje)',
    corpoHtml: `<p>Todo dia, a fila "Hoje" mostra as notas que estão programadas pra revisão.
      Primeiro aparece só o Título — tente lembrar da resposta de cabeça antes de revelar.
      Depois de revelar o conteúdo, avalie: <strong>Fácil</strong> (lembrou na hora — vai
      demorar mais pra essa nota voltar), <strong>Médio</strong> (lembrou com esforço —
      segue o ritmo normal), <strong>Difícil</strong> (não lembrou ou lembrou errado — essa
      nota volta mais cedo pra reforçar).</p>
      <p>Enquanto você revisa, o app mede quanto tempo a tela ficou em foco em cada nota (pausa
      se você trocar de aba/app no meio) — isso alimenta o "Tempo hoje" no Painel e o "Tempo
      revisando" nos Detalhes de cada pasta. Não precisa fazer nada pra isso funcionar.</p>`,
  },
  {
    titulo: 'Favoritos',
    corpoHtml: `<p>Marque como favorita uma Pasta ou uma Nota que for especialmente importante
      pra você — algo que quer conseguir achar rápido sem precisar navegar por tudo.
      Exemplo: a fórmula de Yield to Maturity que você usa toda hora, ou a pasta inteira
      sobre "Vieses" porque foi o que mais te marcou no curso.</p>`,
  },
  {
    titulo: 'Arquivar × Excluir uma pasta',
    corpoHtml: `<p><strong>Arquivar</strong> é para quando você termina um curso ou um livro,
      mas ainda quer ser cobrado a revisar o que aprendeu no longo prazo (D+180 continua
      funcionando) — só some da lista principal e não permite criar pastas ou notas novas
      nela. Pede confirmação antes, pra evitar clique sem querer, mas dá pra reativar
      quando quiser. <strong>Excluir</strong> manda a pasta (com as pastas internas e notas)
      pra Lixeira por 30 dias; depois disso é apagado de vez.</p>
      <p>O botão <strong>Detalhes</strong> (no menu "⋯") mostra um resumo: quantas notas e
      pastas, quanto tempo total você já passou revisando notas daquela pasta, e há quantos
      dias ela está ativa (ou quanto tempo levou até ser arquivada).</p>`,
  },
  {
    titulo: 'Painel',
    corpoHtml: `<p>O Painel é dividido em quatro abas:</p>
      <ul>
        <li><strong>Visão geral</strong>: sua sequência de dias estudando (streak), quanto tempo
        você estudou hoje e o tamanho da coleção (pastas e notas).</li>
        <li><strong>Revisão</strong>: como a revisão espaçada está indo — quantas notas estão
        em cada estágio da escada (1/7/30/180 dias; quanto mais em 30/180, melhor sua retenção),
        a carga dos próximos 7 dias e o ranking das pastas onde você mais marcou "Difícil" —
        geralmente esses são os pontos fracos reais, que a sensação de "acho que já sei" não
        mostra sozinha.</li>
        <li><strong>Avaliações</strong>: o resultado dos seus autotestes (Fácil/Médio/Difícil),
        à parte da fila de revisão.</li>
        <li><strong>Evolução</strong>: quanto você estuda e o ritmo de inclusão de notas ao
        longo do tempo, num mapa de atividade de 365 dias.</li>
      </ul>`,
  },
  {
    titulo: 'Exportar em PDF',
    corpoHtml: `<p>Bom momento pra usar: quando terminar um módulo do curso, terminar o
      livro, ou só quiser um resumo pra imprimir/consultar sem abrir o app. Gera um
      documento organizado por categoria → pastas → notas, na ordem que você aprendeu. Cada
      pasta mostra o caminho completo (ex: "Faixa Branca › Aula 5 — Risco") pra hierarquia
      continuar legível.</p>
      <p>Cada nível tem seu <strong>número</strong> — Categoria <code>1</code>, Pasta
      <code>1.1</code>, Nota <code>1.1.1</code> — e cada categoria tem uma
      <strong>cor</strong> própria (a mesma nas pastas e notas dela), então dá pra "bater
      o olho" e saber onde você está. No começo sai um <strong>índice</strong> com tudo e
      quantas notas cada parte tem.</p>
      <p>Na barra de ferramentas dá pra ligar/desligar o <strong>Índice</strong> e o
      <strong>Nova página por categoria</strong> (útil pra imprimir um módulo por folha). O
      app lembra da sua escolha. No celular, o caminho é o mesmo: "Imprimir" e depois "Salvar
      como PDF".</p>`,
  },
  {
    titulo: 'Lembrete no celular',
    corpoHtml: `<p>Em Configurações, escolha o horário que você quer ser lembrado, e baixe o
      lembrete — ele vira um evento recorrente no seu Calendário/Lembretes nativo. Se
      quiser mudar o horário depois, baixe de novo e apague o antigo lá no Calendário.</p>`,
  },
  {
    titulo: 'Exportar / Importar dados',
    corpoHtml: `<p>Use pra levar seus dados de um aparelho pro outro (ex: do celular pro
      laptop), ou como backup. Exportar gera um arquivo; importar esse arquivo mescla com o
      que já existe no aparelho, sem apagar nada — o mais recente de cada item é o que
      vale.</p>`,
  },
  {
    titulo: 'Lixeira',
    corpoHtml: `<p>Quando você exclui uma pasta ou uma Nota, o item não
      some de vez: vai pra Lixeira, em Configurações. Lá dá pra <b>restaurar</b> a qualquer
      momento — se excluiu uma pasta, volta com as pastas internas e notas junto. Depois de
      30 dias o item é apagado sozinho, ou você pode <b>Excluir de vez</b> na hora, se quiser
      (dá pra esvaziar tudo de uma vez também).</p><p>Enquanto está na Lixeira, o item não
      aparece em nenhuma tela — nem na busca, nem na fila de revisão, nem no Painel. E
      <b>Excluir de vez</b> é definitivo de verdade: o item também some do backup sincronizado,
      então ele não volta em nenhum aparelho.</p>`,
  },
  {
    titulo: 'Snapshots locais',
    corpoHtml: `<p>Além do backup exportado e da nuvem, o Memoriza guarda uma cópia própria
      aqui neste aparelho, sozinho, uma vez por dia. Em Configurações → Snapshots locais dá pra
      criar uma na hora e <b>restaurar</b> uma versão anterior (mesclando com os dados atuais,
      sem apagar nada). As cópias mais antigas são descartadas com o tempo pra não ocupar
      espaço.</p>`,
  },
  {
    titulo: 'Histórico do backup na nuvem',
    corpoHtml: `<p>Se você usa a sincronização com o GitHub, todo backup já gravado fica no
      histórico do Gist. Em Configurações → Sincronização, abra <b>Histórico do backup na
      nuvem</b> para ver as versões e trazer uma de volta, se precisar.</p>`,
  },
  {
    titulo: 'Avaliar notas (Fácil / Médio / Difícil)',
    corpoHtml: `<p>No menu "⋯" de qualquer pasta, toque em <b>Avaliar notas</b> para fazer um
      autoteste. Na pasta principal, o autoteste usa todas as notas dela; numa pasta interna,
      usa as notas daquele nível e das pastas que estiverem dentro. Depois escolhe quantas
      notas (Básico, Médio ou Longo).</p>
      <p>Em cada nota: tente lembrar, revele a resposta e marque <b>Fácil</b>, <b>Médio</b> ou
      <b>Difícil</b>. Tudo fica registrado no app — diferente da revisão espaçada, nada aqui
      muda sua fila nem os seus prazos.</p>
      <p>O resultado aparece no <b>Painel → aba Avaliações</b>: quanto você já avaliou, a
      distribuição entre Fácil/Médio/Difícil e o histórico de sessões recentes.</p>`,
  },
];

export function renderAjuda(container: HTMLElement): void {
  container.innerHTML = `
    <div class="content-narrow content-wide">
      <div class="card" style="margin-bottom: var(--space-6);">
        <p class="settings-row__desc sem-margem-topo">
          Três exemplos completos, de ponta a ponta, pra deixar a estrutura
          <strong>Categoria → Pasta → Categoria → Pasta → Nota</strong> clara antes
          de qualquer outra explicação. As pastas podem ter quantos níveis você quiser.
        </p>
        <div class="help-tree-grid">
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 1 — um curso</div>
            <pre class="help-tree">${EXEMPLO_CURSO}</pre>
          </div>
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 2 — um livro</div>
            <pre class="help-tree">${EXEMPLO_LIVRO}</pre>
          </div>
          <div>
            <div class="settings-row__label" style="margin-bottom: var(--space-2);">Exemplo 3 — estudo contínuo</div>
            <pre class="help-tree">${EXEMPLO_MODULOS}</pre>
          </div>
        </div>
        <p class="settings-row__desc sem-margem-baixo">
          Repare: na raiz aparecem as categorias (Bíblia, Cursos, Livros...) e, dentro de cada
          uma, as pastas. Cada pasta pode ter notas e outras pastas, também agrupadas por
          categoria. A nota fica na pasta onde o assunto se encaixa, e o caminho completo
          aparece no topo da tela.
        </p>
      </div>

      ${SECOES.map(
        (secao) => `
        <section class="settings-section">
          <div class="settings-section__title">${secao.titulo}</div>
          <div class="card help-section-body">${secao.corpoHtml}</div>
        </section>
      `,
      ).join('')}
    </div>
  `;
}
