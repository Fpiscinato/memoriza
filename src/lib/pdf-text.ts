// Versão em texto puro do mesmo conteúdo do PDF (Espaço ou só uma categoria) — pra copiar e
// colar em algo como WhatsApp, que não entende HTML mas usa uma sintaxe parecida com markdown
// (*negrito* com um asterisco só, _itálico_ com underscore).

import type { CategoriaPdf, EspacoPdfData } from '../db/pdf-data';
import { TEXT_COLOR_NAMES } from './markdown';

function inlineToPlain(text: string): string {
  let t = text;
  // Itálico markdown (*texto*, um asterisco só) primeiro, senão a conversão de negrito
  // abaixo geraria asteriscos simples que essa regex recapturaria por engano.
  t = t.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '_$1_');
  t = t.replace(/\*\*([^*]+)\*\*/g, '*$1*');
  t = t.replace(/`([^`]+)`/g, '$1');
  // Cor de texto ([texto]{cor}, ver src/lib/markdown.ts) não existe em texto puro — mantém só o texto.
  t = t.replace(new RegExp(`\\[([^\\]]+)\\]\\{(${TEXT_COLOR_NAMES.join('|')})\\}`, 'g'), '$1');
  t = t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '$1 ($2)');
  return t;
}

// Marcador por nível de indentação (2 espaços por nível, mesma convenção de
// src/lib/markdown.ts) — sem isso, um sub-item de lista (Tab pra indentar no editor) saía com
// a mesma bolinha "•" do item pai, perdendo a hierarquia no texto copiado.
const MARCADORES_LISTA = ['•', '◦', '▪'];

function blockToPlain(source: string): string {
  return source
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((raw) => {
      const line = raw.trim();
      if (line === '') return '';
      const heading = /^#{1,3}\s+(.*)$/.exec(line);
      if (heading) return `*${inlineToPlain(heading[1])}*`;
      const item = /^[-*]\s+(.*)$/.exec(line);
      if (item) {
        const nivel = Math.floor((raw.length - raw.trimStart().length) / 2);
        const marcador = MARCADORES_LISTA[Math.min(nivel, MARCADORES_LISTA.length - 1)];
        return `${'  '.repeat(nivel)}${marcador} ${inlineToPlain(item[1])}`;
      }
      return inlineToPlain(line);
    })
    .join('\n');
}

/** Monta o texto puro de uma Nota avulsa (título, fonte, conteúdo), pra compartilhar/copiar. */
export function buildNotaPlainText(nota: { titulo: string; fonte: string; conteudo: string }): string {
  const lines: string[] = [`*${nota.titulo || '(sem título)'}*`];
  if (nota.fonte) lines.push(`_${nota.fonte}_`);
  lines.push('', blockToPlain(nota.conteudo));
  return lines.join('\n').trim();
}

/**
 * Monta o texto puro de um ou mais grupos (categorias) de um Espaço, pra copiar pro
 * clipboard. Cada nível da hierarquia (Espaço/Categoria/Tema/Nota) tem sua própria marcação —
 * sem isso, tudo virava "*texto em negrito*" igual (categoria, tema e nota indistinguíveis à
 * primeira vista num documento longo).
 */
export function buildPlainText(espaco: EspacoPdfData['espaco'], grupos: CategoriaPdf[]): string {
  const lines: string[] = [`📚 *${espaco.nome.toUpperCase()}*`];

  for (const grupo of grupos) {
    if (grupo.temas.length === 0) continue;
    lines.push('', `▸ ${(grupo.categoria || 'Sem categoria').toUpperCase()}`);

    for (const temaPdf of grupo.temas) {
      lines.push('', `— ${temaPdf.tema.favorito ? '⭐ ' : ''}*${temaPdf.tema.nome}*`);

      if (temaPdf.notas.length === 0) {
        lines.push('(sem notas)');
        continue;
      }
      for (const notaPdf of temaPdf.notas) {
        const flags = `${notaPdf.nota.favorito ? '⭐ ' : ''}${notaPdf.fraca ? '⚠️ ' : ''}`;
        lines.push('', `${flags}*${notaPdf.nota.titulo || '(sem título)'}*`);
        if (notaPdf.nota.fonte) lines.push(`_${notaPdf.nota.fonte}_`);
        lines.push(blockToPlain(notaPdf.nota.conteudo));
      }
    }
  }

  return lines.join('\n').trim();
}
