import { buildEspacoPdfData } from '../../db/pdf-data';
import { buildPlainText } from '../../lib/pdf-text';
import { escapeHtml } from '../../lib/dom';
import { renderMarkdown } from '../../lib/markdown';
import { navigate } from '../router';

export async function renderEspacoPdf(container: HTMLElement, espacoId: string, categoria?: string): Promise<void> {
  const data = await buildEspacoPdfData(espacoId);
  if (!data) {
    container.innerHTML = `<p class="text-muted">Espaço não encontrado.</p>`;
    return;
  }
  const { espaco } = data;
  const grupos = categoria === undefined ? data.grupos : data.grupos.filter((g) => g.categoria === categoria);
  const textoPlano = buildPlainText(espaco, grupos);

  container.innerHTML = `
    <div class="pdf-toolbar no-print">
      <button class="btn btn--secondary btn--sm" data-back type="button">← Voltar</button>
      <button class="btn btn--primary btn--sm" id="btn-imprimir" type="button">Imprimir / Salvar como PDF</button>
      <button class="btn btn--secondary btn--sm" id="btn-copiar" type="button">Copiar texto</button>
      <span class="text-muted" style="font-size: var(--font-size-sm);">
        "Imprimir" e depois "Salvar como PDF" (ou similar) gera o arquivo. "Copiar texto" é pra colar direto numa conversa, ex: WhatsApp.
      </span>
    </div>

    <article class="pdf-page">
      <h1>${escapeHtml(espaco.nome)}</h1>
      ${categoria !== undefined ? `<p class="text-muted" style="margin-top: calc(-1 * var(--space-4));">Categoria: ${escapeHtml(categoria || 'Sem categoria')}</p>` : ''}

      ${
        grupos.every((g) => g.temas.length === 0)
          ? `<p class="text-muted">${categoria !== undefined ? 'Esta categoria ainda não tem temas ou notas.' : 'Este espaço ainda não tem temas ou notas.'}</p>`
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

  const btnCopiar = container.querySelector<HTMLButtonElement>('#btn-copiar');
  btnCopiar?.addEventListener('click', async () => {
    const original = btnCopiar.textContent;
    try {
      await navigator.clipboard.writeText(textoPlano);
      btnCopiar.textContent = 'Copiado!';
    } catch {
      btnCopiar.textContent = 'Não foi possível copiar';
    }
    setTimeout(() => {
      btnCopiar.textContent = original;
    }, 1800);
  });
}
