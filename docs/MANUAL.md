# Manual do Memoriza

O Memoriza é um app de repetição espaçada simples, 100% local (IndexedDB), com opção de sincronização em nuvem via GitHub Gist.

## Visão geral

- Repetição espaçada (SM-2 simplificado): notas vão de "Hoje" para revisões posteriores conforme avaliação (Difícil/Médio/Fácil).
- Organização: categoria → Pasta → categoria → Pasta → notas. Toda pasta pode ter notas e outras pastas, aninhadas quantos níveis forem necessários; não há mais "Espaço", "Tema" nem "Subpasta" como níveis distintos.
- Lixeira: excluir é reversível por 30 dias ("Excluir de vez" é definitivo, e vale também pro backup na nuvem).
- PWA: funciona offline, pode ser instalado no celular.
- Atualização: quando sai uma versão nova, aparece um aviso no topo da tela ("Nova versão do Memoriza disponível") — é só tocar em **Atualizar agora**. Se você estiver com uma nota em edição sem salvar, o app pergunta antes de recarregar.
- Sincronização: exporta/importa todos os perfis via GitHub Gist (merge por `id` + `atualizado_em`).

## Telas principais

### Hoje
Lista de itens agendados para revisar hoje, agrupados por pasta. Clique num item para iniciar a revisão (mostra pergunta, revela resposta).

### Pastas
Mostra primeiro as categorias (ex: Bíblia, Cursos, Livros) e, dentro de cada uma, as pastas daquela categoria. Os grupos ficam recolhidos; toque no título pra abrir. Para criar, informe a **categoria** e o **nome da pasta**; ícone e cor são opcionais. Ao abrir uma pasta, você vê Categoria → Pasta de novo (as pastas internas também são agrupadas por categoria) e, abaixo, as notas daquela pasta. Em qualquer nível há **+ Nova pasta** e **+ Nova nota**, inclusive na pasta principal.

### Configurações
Perfis, aparência (claro/escuro/sistema), ordenação de listas, backup local, lixeira, sincronização GitHub Gist, atividade, exportar/importar JSON, zera dados.

### Lixeira
Excluir uma Pasta ou uma Nota **não apaga na hora**: o item vai pra Lixeira (Configurações → Lixeira) e some de todas as telas (listas, "Hoje", busca, painel, PDF). Dá pra restaurar a qualquer momento durante 30 dias; depois disso ele é apagado sozinho ao abrir o app.

- **Restaurar** — devolve o item. Se já existir outro com o mesmo nome, o restaurado ganha "(restaurado)" no final, pra não duplicar.
- **Excluir de vez** — apaga sem volta, e apaga também do backup sincronizado (o item não volta em nenhum aparelho).
- **Esvaziar lixeira** — faz o mesmo com tudo que está na lixeira de uma vez.

Detalhe importante: "Excluir de vez" é definitivo de verdade. Se o item voltar a aparecer depois de sincronizar, é sinal de que a versão do app está desatualizada — atualize o app (a correção é da v1.16 em diante).

### Painel
Estatísticas gerais, streak, retenção por estágio, gráficos de carga e evolução (heatmap anual).

### Revisão
Tela de flashcard: mostra título/conteúdo da nota. Avalie como Difícil/Médio/Fácil.

## Editor de Notas

O editor suporta formatação markdown-lite:
- Negrito (`**` ou Ctrl+B), Itálico (`*` ou Ctrl+I), Tachado (`~~` ou Ctrl+S)
- Lista com marcadores (Tab indenta, Shift+Tab volta)
- Links ([texto](url), Ctrl+K)
- Cores de texto (bolinhas), "Limpar formatação"
- Desfazer/Refazer (Ctrl+Z / Ctrl+Y)

## Sincronização GitHub Gist

Configurar em Configurações > Sincronização em nuvem:
1. Gere um Personal Access Token no GitHub (scope `gist`).
2. Cole o token e clique "Conectar".
3. Se já tiver um Gist, o app tenta localizá-lo. Caso contrário, cria um Gist `memoriza-sync.json`.
4. Exportar/Importar manualmente. O merge mantém itens mais recentes por `atualizado_em`.

## Ordenação

As listas seguem ordem numérica (começando com dígitos) e, para nomes só com meses ("Janeiro", etc.), agrupam por mês. Em Configurações você pode definir ordem de Notas (por data ou por título).

## Atividade

O painel mostra um heatmap dos últimos 365 dias (intensidade verde = dias com atividade). Métricas: dias estudados, atividade total, hoje, este mês.

