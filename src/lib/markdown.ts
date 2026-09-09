// Editor markdown simples: só o suficiente para anotações de estudo (títulos, negrito,
// itálico, código inline, listas, links, parágrafos). Sem dependência externa — nada disso
// precisa de um parser completo de CommonMark.

import { escapeHtml } from './dom';

// Cores fixas pra destacar trechos do texto — de propósito poucas (não a paleta de 8 de
// Espaço/Categoria): são cores universais, fáceis de reconhecer numa bolinha pequena sem
// precisar de legenda.
export const TEXT_COLOR_NAMES = ['azul', 'vermelho', 'verde', 'rosa'] as const;
export type TextColorName = (typeof TEXT_COLOR_NAMES)[number];

export const TEXT_COLOR_LABELS: Record<TextColorName, string> = {
  azul: 'Azul',
  vermelho: 'Vermelho',
  verde: 'Verde',
  rosa: 'Rosa',
};

const COLOR_SPAN_RE = new RegExp(`\\[([^\\]]+)\\]\\{(${TEXT_COLOR_NAMES.join('|')})\\}`, 'g');

function renderInline(text: string): string {
  let html = escapeHtml(text);
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');
  html = html.replace(COLOR_SPAN_RE, '<span class="text-color text-color--$2">$1</span>');
  html = html.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );
  return html;
}

// Lista com sub-itens (Tab pra indentar no editor, ver nota-form.ts) — 2 espaços de
// indentação por nível na hora de guardar como texto. Constrói uma árvore a partir da lista
// achatada de {nível, texto} pra poder gerar <ul><li>texto<ul>...</ul></li></ul> aninhado.
interface ListNode {
  text: string;
  children: ListNode[];
}

function buildListTree(items: { level: number; text: string }[]): ListNode[] {
  const root: ListNode[] = [];
  const stack: { level: number; nodes: ListNode[] }[] = [{ level: -1, nodes: root }];

  for (const item of items) {
    while (stack.length > 1 && stack[stack.length - 1].level > item.level) stack.pop();

    if (stack[stack.length - 1].level < item.level) {
      const parentNodes = stack[stack.length - 1].nodes;
      const parentNode = parentNodes[parentNodes.length - 1];
      // Item mais indentado que o anterior sem um "pai" pra aninhar (ex: primeira linha já
      // vem indentada) — trata como se fosse do mesmo nível, pra não perder o conteúdo.
      stack.push({ level: item.level, nodes: parentNode ? parentNode.children : parentNodes });
    }

    stack[stack.length - 1].nodes.push({ text: item.text, children: [] });
  }
  return root;
}

function renderListTree(nodes: ListNode[]): string {
  return `<ul>${nodes
    .map((n) => `<li>${renderInline(n.text)}${n.children.length > 0 ? renderListTree(n.children) : ''}</li>`)
    .join('')}</ul>`;
}

export function renderMarkdown(source: string): string {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const blocks: string[] = [];
  let listItems: { level: number; text: string }[] = [];

  function flushList() {
    if (listItems.length > 0) {
      blocks.push(renderListTree(buildListTree(listItems)));
      listItems = [];
    }
  }

  let paragraphBuffer: string[] = [];
  function flushParagraph() {
    if (paragraphBuffer.length > 0) {
      // Renderiza o parágrafo inteiro de uma vez (não linha a linha) — senão um trecho
      // colorido/negrito/itálico selecionado atravessando uma quebra de linha (comum,
      // já que Enter simples não separa parágrafos) fica com a marcação partida ao meio,
      // ex: "[" numa linha e "]{cor}" na seguinte, e nenhuma das duas casa com a regex.
      blocks.push(`<p>${renderInline(paragraphBuffer.join('\n')).replace(/\n/g, '<br>')}</p>`);
      paragraphBuffer = [];
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line === '') {
      flushParagraph();
      flushList();
      continue;
    }

    const headingMatch = /^(#{1,3})\s+(.*)$/.exec(line);
    if (headingMatch) {
      flushParagraph();
      flushList();
      const level = headingMatch[1].length;
      blocks.push(`<h${level}>${renderInline(headingMatch[2])}</h${level}>`);
      continue;
    }

    // Nível de indentação vem do espaço em branco ANTES do trim (rawLine), não da linha já
    // cortada — senão a informação de sub-item se perde antes mesmo de chegar aqui.
    const listMatch = /^[-*]\s+(.*)$/.exec(line);
    if (listMatch) {
      flushParagraph();
      const indentacao = rawLine.length - rawLine.trimStart().length;
      listItems.push({ level: Math.floor(indentacao / 2), text: listMatch[1] });
      continue;
    }

    flushList();
    paragraphBuffer.push(line);
  }
  flushParagraph();
  flushList();

  return blocks.join('\n');
}

// Caminho inverso de renderMarkdown: serializa o HTML produzido pelo editor rich-text
// (contenteditable, ver src/ui/screens/nota-form.ts) de volta pro texto com marcação simples
// que a gente guarda no banco. Mantém as duas funções em par — qualquer tag que renderMarkdown
// sabe produzir, esta função precisa saber ler de volta.
function inlineNodeToText(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? '';
  if (node.nodeType !== Node.ELEMENT_NODE) return '';
  const el = node as HTMLElement;
  const inner = Array.from(el.childNodes).map(inlineNodeToText).join('');
  switch (el.tagName) {
    case 'BR':
      return '\n';
    case 'B':
    case 'STRONG':
      return inner.trim() ? `**${inner}**` : inner;
    case 'I':
    case 'EM':
      return inner.trim() ? `*${inner}*` : inner;
    case 'CODE':
      return inner.trim() ? `\`${inner}\`` : inner;
    case 'A': {
      const href = el.getAttribute('href');
      return href ? `[${inner}](${href})` : inner;
    }
    case 'SPAN': {
      const cor = TEXT_COLOR_NAMES.find((c) => el.classList.contains(`text-color--${c}`));
      return cor && inner.trim() ? `[${inner}]{${cor}}` : inner;
    }
    default:
      return inner;
  }
}

// Serializa um <ul> de volta pra linhas "- item" com 2 espaços de indentação por nível —
// espelha buildListTree/renderMarkdown no sentido contrário. A sub-lista de um item indentado
// (Tab, ver nota-form.ts) pode vir de duas formas, dependendo do navegador: ANINHADA dentro do
// próprio <li> (`<li>texto<ul>...</ul></li>`) ou como <ul> IRMÃO do <li> anterior dentro do
// mesmo pai (`<li>texto</li><ul>...</ul>`, o que o Chrome produz com execCommand('indent')) —
// as duas precisam ser entendidas como "sub-lista do item anterior".
function ulToLines(ul: HTMLElement, level: number): string[] {
  const lines: string[] = [];
  let itemAnterior: HTMLElement | null = null;

  for (const child of Array.from(ul.children)) {
    if (child.tagName === 'UL') {
      if (itemAnterior) lines.push(...ulToLines(child as HTMLElement, level + 1));
      continue;
    }
    if (child.tagName !== 'LI') continue;
    const li = child as HTMLElement;
    const nestedULs = Array.from(li.children).filter((c): c is HTMLElement => c.tagName === 'UL');

    // Serializa só o texto do próprio item — sem isso, o texto de uma sub-lista aninhada
    // entraria misturado no meio do texto do item pai.
    const clone = li.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('ul').forEach((nested) => nested.remove());
    const text = inlineNodeToText(clone).trim();
    if (text) lines.push(`${'  '.repeat(level)}- ${text}`);

    for (const nested of nestedULs) lines.push(...ulToLines(nested, level + 1));
    itemAnterior = li;
  }
  return lines;
}

function blockElementToLines(el: HTMLElement): string[] {
  if (el.tagName === 'UL') return ulToLines(el, 0);
  const headingMatch = /^H([1-3])$/.exec(el.tagName);
  const text = inlineNodeToText(el).trim();
  if (!text) return [];
  return headingMatch ? [`${'#'.repeat(Number(headingMatch[1]))} ${text}`] : [text];
}

/** Converte o conteúdo HTML do editor de volta pro texto armazenado (markdown simples). */
export function htmlToStoredText(root: HTMLElement): string {
  const blocks: string[] = [];
  for (const child of Array.from(root.childNodes)) {
    if (child.nodeType === Node.TEXT_NODE) {
      const text = (child.textContent ?? '').trim();
      if (text) blocks.push(text);
      continue;
    }
    if (child.nodeType !== Node.ELEMENT_NODE) continue;
    const el = child as HTMLElement;
    if (el.tagName === 'UL') {
      const lines = blockElementToLines(el);
      if (lines.length > 0) blocks.push(lines.join('\n'));
    } else {
      blocks.push(...blockElementToLines(el));
    }
  }
  return blocks.filter(Boolean).join('\n\n');
}
