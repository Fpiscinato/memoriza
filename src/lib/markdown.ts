// Editor markdown simples: só o suficiente para anotações de estudo (títulos, negrito,
// itálico, código inline, listas, links, parágrafos). Sem dependência externa — nada disso
// precisa de um parser completo de CommonMark.

import { escapeHtml } from './dom';

// 3 cores fixas pra destacar trechos do texto — de propósito só 3 (não a paleta de 8 de
// Espaço/Categoria): são cores universais (azul/vermelho/verde), fáceis de reconhecer numa
// bolinha pequena sem precisar de legenda.
export const TEXT_COLOR_NAMES = ['azul', 'vermelho', 'verde'] as const;
export type TextColorName = (typeof TEXT_COLOR_NAMES)[number];

export const TEXT_COLOR_LABELS: Record<TextColorName, string> = {
  azul: 'Azul',
  vermelho: 'Vermelho',
  verde: 'Verde',
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

export function renderMarkdown(source: string): string {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const blocks: string[] = [];
  let listBuffer: string[] = [];

  function flushList() {
    if (listBuffer.length > 0) {
      blocks.push(`<ul>${listBuffer.join('')}</ul>`);
      listBuffer = [];
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

    const listMatch = /^[-*]\s+(.*)$/.exec(line);
    if (listMatch) {
      flushParagraph();
      listBuffer.push(`<li>${renderInline(listMatch[1])}</li>`);
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

function blockElementToLines(el: HTMLElement): string[] {
  if (el.tagName === 'UL') {
    return Array.from(el.children)
      .filter((child): child is HTMLElement => child.tagName === 'LI')
      .map((li) => `- ${inlineNodeToText(li).trim()}`)
      .filter((line) => line !== '-');
  }
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
