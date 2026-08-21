// Versão em texto puro do mesmo conteúdo do PDF (Espaço ou só uma categoria) — pra copiar e
// colar em algo como WhatsApp, que não entende HTML mas usa uma sintaxe parecida com markdown
// (*negrito* com um asterisco só, _itálico_ com underscore).

import type { CategoriaPdf, EspacoPdfData } from '../db/pdf-data';

function inlineToPlain(text: string): string {
  let t = text;
  // Itálico markdown (*texto*, um asterisco só) primeiro, senão a conversão de negrito
  // abaixo geraria asteriscos simples que essa regex recapturaria por engano.
  t = t.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '_$1_');
  t = t.replace(/\*\*([^*]+)\*\*/g, '*$1*');
  t = t.replace(/`([^`]+)`/g, '$1');
  t = t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '$1 ($2)');
  return t;
}

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
      if (item) return `• ${inlineToPlain(item[1])}`;
      return inlineToPlain(line);
    })
    .join('\n');
}

/** Monta o texto puro de um ou mais grupos (categorias) de um Espaço, pra copiar pro clipboard. */
export function buildPlainText(espaco: EspacoPdfData['espaco'], grupos: CategoriaPdf[]): string {
  const lines: string[] = [`📚 ${espaco.nome}`];

  for (const grupo of grupos) {
    if (grupo.temas.length === 0) continue;
    lines.push('', `— ${grupo.categoria || 'Sem categoria'} —`);

    for (const temaPdf of grupo.temas) {
      lines.push('', `${temaPdf.tema.favorito ? '⭐ ' : ''}*${temaPdf.tema.nome}*`);

      if (temaPdf.notas.length === 0) {
        lines.push('(sem notas)');
        continue;
      }
      for (const notaPdf of temaPdf.notas) {
        const flags = `${notaPdf.nota.favorito ? '⭐ ' : ''}${notaPdf.fraca ? '⚠️ ' : ''}`;
        lines.push('', `${flags}*${notaPdf.nota.titulo || '(sem título)'}*`);
        if (notaPdf.nota.fonte) lines.push(`(${notaPdf.nota.fonte})`);
        lines.push(blockToPlain(notaPdf.nota.conteudo));
      }
    }
  }

  return lines.join('\n').trim();
}
