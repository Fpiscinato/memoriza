import { buildEspacoPdfData } from '../../db/pdf-data';
import { escapeHtml } from '../../lib/dom';
import { renderMarkdown } from '../../lib/markdown';
import { navigate } from '../router';

export async function renderEspacoPdf(container: HTMLElement, espacoId: string): Promise<void> {
  const data = await buildEspacoPdfData(espacoId);
  if (!data) {
    container.innerHTML = `<p class="text-muted">Espaço não encontrado.</p>`;
    return;
  }
  const { espaco, grupos } = data;

  container.innerHTML = `
    <div class="pdf-toolbar no-print">
      <button class="btn btn--secondary btn--sm" data-back type="button">← Voltar</button>
      <button class="btn btn--primary btn--sm" id="btn-imprimir" type="button">Imprimir / Salvar como PDF</button>
      <span class="text-muted" style="font-size: var(--font-size-sm);">
        Na caixa de impressão, escolha "Salvar como PDF" (ou similar) como destino.
      </span>
    </div>

    <article class="pdf-page">
      <h1>${escapeHtml(espaco.nome)}</h1>

      ${
        grupos.every((g) => g.temas.length === 0)
          ? `<p class="text-muted">Este espaço ainda não tem temas ou notas.</p>`
          : grupos
              .map(
                (grupo) => `
        <section class="pdf-category">
          <div class="pdf-category__title">${escapeHtml(grupo.categoria || 'Sem categoria')}</div>
          ${grupo.temas
            .map(
              (temaPdf) => `
            <section class="pdf-tema">
              <div class="pdf-tema__title">${temaPdf.tema.favorito ? '⭐ ' : ''}${escapeHtml(temaPdf.tema.nome)}</div>
              ${
                temaPdf.notas.length === 0
                  ? `<p class="text-muted">Sem notas.</p>`
                  : temaPdf.notas
                      .map(
                        (notaPdf) => `
                <div class="pdf-nota">
                  <div class="pdf-nota__titulo">
                    ${notaPdf.nota.favorito ? '⭐ ' : ''}${notaPdf.fraca ? '⚠️ Reforçar — ' : ''}${escapeHtml(notaPdf.nota.titulo || '(sem título)')}
                  </div>
                  ${notaPdf.nota.fonte ? `<div class="pdf-nota__meta">${escapeHtml(notaPdf.nota.fonte)}</div>` : ''}
                  <div class="markdown-preview">${renderMarkdown(notaPdf.nota.conteudo)}</div>
                </div>
              `,
                      )
                      .join('')
              }
            </section>
          `,
            )
            .join('')}
        </section>
      `,
              )
              .join('')
      }
    </article>
  `;

  container.querySelector('[data-back]')?.addEventListener('click', () => navigate(`espacos/${espacoId}`));
  container.querySelector('#btn-imprimir')?.addEventListener('click', () => window.print());
}
