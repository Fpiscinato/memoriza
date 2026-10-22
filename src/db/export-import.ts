import { getDB } from './schema';
import { combineSummaries, mergeRecordsComPurga, type MergeSummary } from './merge';
import { migrateNotasSemTitulo } from './notas';
import { STORE_NAMES, type ExportFile, type MemorizaData, type StoreName } from '../types';
import { nowISO, formatFilenameDateTime } from '../lib/time';
import { filtrarPurgados, mergePurgas, purgasParaGravar } from '../domain/purga';
import type { Purga } from '../types';

const EXPORT_FORMAT = 'memoriza-export' as const;
const EXPORT_VERSION = 1 as const;

async function readAllData(): Promise<MemorizaData> {
  const db = await getDB();
  const [perfis, espacos, temas, notas, itens_revisao, avaliacoes, purgas] = await Promise.all([
    db.getAll('perfis'),
    db.getAll('espacos'),
    db.getAll('temas'),
    db.getAll('notas'),
    db.getAll('itens_revisao'),
    db.getAll('avaliacoes'),
    db.getAll('purgas'),
  ]);
  // Registros cobertos por uma lápide não saem no export: a exclusão definitiva é
  // definitiva — o backup em nuvem também perde o item (e a lápide viaja junto, pra
  // nenhum aparelho ressuscitar o registro antigo).
  return {
    perfis,
    espacos: filtrarPurgados(espacos, purgas, 'espacos'),
    temas: filtrarPurgados(temas, purgas, 'temas'),
    notas: filtrarPurgados(notas, purgas, 'notas'),
    itens_revisao: filtrarPurgados(itens_revisao, purgas, 'itens_revisao'),
    avaliacoes: filtrarPurgados(avaliacoes, purgas, 'avaliacoes'),
    purgas,
  };
}

/** Monta os dados de um único perfil, seguindo a cadeia perfil -> espaço -> tema -> nota. */
export async function buildProfileExportData(perfilId: string): Promise<MemorizaData> {
  const db = await getDB();

  const perfil = await db.get('perfis', perfilId);
  const espacos = await db.getAllFromIndex('espacos', 'perfil_id', perfilId);
  const espacoIds = new Set(espacos.map((e) => e.id));

  const allTemas = await db.getAll('temas');
  const temas = allTemas.filter((t) => espacoIds.has(t.espaco_id));
  const temaIds = new Set(temas.map((t) => t.id));

  const allNotas = await db.getAll('notas');
  const notas = allNotas.filter((n) => temaIds.has(n.tema_id));

  const itens_revisao = await db.getAllFromIndex('itens_revisao', 'perfil_id', perfilId);
  const avaliacoes = await db.getAllFromIndex('avaliacoes', 'perfil_id', perfilId);

  const purgas = await db.getAll('purgas');

  return {
    perfis: perfil ? [perfil] : [],
    espacos: filtrarPurgados(espacos, purgas, 'espacos'),
    temas: filtrarPurgados(temas, purgas, 'temas'),
    notas: filtrarPurgados(notas, purgas, 'notas'),
    itens_revisao: filtrarPurgados(itens_revisao, purgas, 'itens_revisao'),
    avaliacoes: filtrarPurgados(avaliacoes, purgas, 'avaliacoes'),
    purgas,
  };
}

export async function exportProfile(perfilId: string): Promise<ExportFile> {
  const dados = await buildProfileExportData(perfilId);
  return {
    formato: EXPORT_FORMAT,
    versao: EXPORT_VERSION,
    exportado_em: nowISO(),
    escopo: 'perfil',
    perfil_id: perfilId,
    dados,
  };
}

export async function exportAll(): Promise<ExportFile> {
  const dados = await readAllData();
  return {
    formato: EXPORT_FORMAT,
    versao: EXPORT_VERSION,
    exportado_em: nowISO(),
    escopo: 'todos',
    dados,
  };
}

/** Nome de arquivo simples: "Memoriza - <perfil ou 'todos os perfis'> - <data hora>.json". */
function buildExportFilename(file: ExportFile): string {
  const quem = file.escopo === 'perfil' ? file.dados.perfis[0]?.nome : undefined;
  const parte = (quem || (file.escopo === 'perfil' ? 'perfil' : 'todos os perfis')).replace(/[\\/:*?"<>|]/g, '-');
  return `Memoriza - ${parte} - ${formatFilenameDateTime(file.exportado_em)}.json`;
}

export function downloadExportFile(file: ExportFile): void {
  const filename = buildExportFilename(file);
  const blob = new Blob([JSON.stringify(file, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export interface ImportSummary extends MergeSummary {
  porLoja: Record<StoreName, MergeSummary>;
}

export function parseExportFile(raw: string): ExportFile {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('Arquivo inválido: não é um JSON válido.');
  }
  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    (parsed as Record<string, unknown>).formato !== EXPORT_FORMAT ||
    typeof (parsed as Record<string, unknown>).dados !== 'object'
  ) {
    throw new Error('Arquivo inválido: não parece ser um export do Memoriza.');
  }
  return parsed as ExportFile;
}

/** Importa com mesclagem: nunca apaga dados locais ausentes no arquivo.
 *
 *  Exceção: o que tem lápide de exclusão definitiva (`purgas`) é apagado localmente e
 *  ignorado quando vem no arquivo — senão o item "Excluir de vez" voltaria na Lixeira a
 *  cada sync (a mesclagem normal nunca apaga nada, e o backup remoto tinha a cópia). */
export async function importData(file: ExportFile): Promise<ImportSummary> {
  const db = await getDB();
  const porLoja = {} as Record<StoreName, MergeSummary>;

  // 1) Lápides: primeiro, porque é elas que decidem o destino dos registros das outras lojas.
  const purgasLocais = await db.getAll('purgas');
  const purgasEntrantes = (file.dados.purgas ?? []) as Purga[];
  const purgas = mergePurgas(purgasLocais, purgasEntrantes);
  const paraGravar = purgasParaGravar(purgasLocais, purgasEntrantes);
  if (paraGravar.length > 0) {
    const tx = db.transaction('purgas', 'readwrite');
    for (const purga of paraGravar) await tx.store.put(purga);
    await tx.done;
  }

  // 2) Demais lojas: mesclagem normal, mas com a regra da lápide acima.
  for (const store of STORE_NAMES) {
    if (store === 'purgas') {
      porLoja.purgas = {
        criados: paraGravar.length,
        atualizados: 0,
        mantidos: purgasLocais.length,
      };
      continue;
    }

    const local = await db.getAll(store);
    const incoming = (file.dados[store] ?? []) as Array<{ id: string; atualizado_em: string }>;

    // Mesclagem normal, mas com a regra da lápide: registro purgado (exclusão definitiva)
    // é apagado localmente e ignorado quando vem no arquivo — senão o item da Lixeira
    // voltaria a cada sync.
    const result = mergeRecordsComPurga(local, incoming, purgas, store);

    const tx = db.transaction(store, 'readwrite');
    for (const id of result.apagados) await tx.store.delete(id);
    for (const record of result.toWrite) {
      await tx.store.put(record as never);
    }
    await tx.done;

    porLoja[store] = {
      criados: result.criados,
      atualizados: result.atualizados,
      mantidos: result.mantidos,
    };
  }

  // Um .json exportado antes da Fase 1d traz notas sem `titulo` — corrige na hora, sem
  // esperar o próximo carregamento do app.
  await migrateNotasSemTitulo();

  // As lápides não entram na contagem mostrada ao usuário (elas não são conteúdo do
  // app — são o registro de uma exclusão), mas ficam visíveis em `porLoja`.
  const resumo = combineSummaries(
    Object.entries(porLoja)
      .filter(([loja]) => loja !== 'purgas')
      .map(([, valores]) => valores),
  );
  return { ...resumo, porLoja };
}
