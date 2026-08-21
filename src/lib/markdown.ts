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
      blocks.push(`<p>${paragraphBuffer.map(renderInline).join('<br>')}</p>`);
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
