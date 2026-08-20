import { getDB } from './schema';
import { combineSummaries, mergeRecords, type MergeSummary } from './merge';
import { STORE_NAMES, type ExportFile, type MemorizaData, type StoreName } from '../types';
import { nowISO } from '../lib/time';

const EXPORT_FORMAT = 'memoriza-export' as const;
const EXPORT_VERSION = 1 as const;

async function readAllData(): Promise<MemorizaData> {
  const db = await getDB();
  const [perfis, espacos, temas, notas, itens_revisao] = await Promise.all([
    db.getAll('perfis'),
    db.getAll('espacos'),
    db.getAll('temas'),
    db.getAll('notas'),
    db.getAll('itens_revisao'),
  ]);
  return { perfis, espacos, temas, notas, itens_revisao };
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

  return {
    perfis: perfil ? [perfil] : [],
    espacos,
    temas,
    notas,
    itens_revisao,
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

export function downloadExportFile(file: ExportFile): void {
  const suffix = file.escopo === 'perfil' ? `perfil-${file.perfil_id}` : 'todos';
  const filename = `memoriza-export-${suffix}-${file.exportado_em.slice(0, 10)}.json`;
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

/** Importa com mesclagem: nunca apaga dados locais ausentes no arquivo. */
export async function importData(file: ExportFile): Promise<ImportSummary> {
  const db = await getDB();
  const porLoja = {} as Record<StoreName, MergeSummary>;

  for (const store of STORE_NAMES) {
    const local = await db.getAll(store);
    const incoming = file.dados[store] as Array<{ id: string; atualizado_em: string }>;
    const result = mergeRecords(local, incoming ?? []);

    if (result.toWrite.length > 0) {
      const tx = db.transaction(store, 'readwrite');
      for (const record of result.toWrite) {
        await tx.store.put(record as never);
      }
      await tx.done;
    }

    porLoja[store] = {
      criados: result.criados,
      atualizados: result.atualizados,
      mantidos: result.mantidos,
    };
  }

  return { ...combineSummaries(Object.values(porLoja)), porLoja };
}
