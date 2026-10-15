// Estado dos ícones de status no cabeçalho (nuvem = sync com o GitHub, banco = snapshot
// local, lixeira). Puro (sem DOM, sem IndexedDB) pra ser fácil de testar — quem chama busca
// os números crus (dias desde o último sync/snapshot, itens na lixeira) e monta daqui.

export type EstadoStatus = 'ok' | 'atencao' | 'off';

export interface StatusItem {
  estado: EstadoStatus;
  titulo: string;
  visivel: boolean;
  /** Só a lixeira usa: quantidade de itens (vira o "badge" no ícone). */
  contagem?: number;
}

export interface StatusHeader {
  sync: StatusItem;
  backup: StatusItem;
  lixeira: StatusItem;
}

export interface EntradaStatusHeader {
  syncConfigurado: boolean;
  /** Dias desde a última sincronização; `null` = nunca sincronizou neste aparelho. */
  diasDesdeSync: number | null;
  /** Dias desde o último snapshot local; `null` = nenhum ainda. */
  diasDesdeSnapshot: number | null;
  lixeiraContagem: number;
  avisarSyncDias?: number;
  avisarSnapshotDias?: number;
  retencaoDias?: number;
}

const AVISAR_SYNC_DIAS = 7;
const AVISAR_SNAPSHOT_DIAS = 7;
const RETENCAO_DIAS = 30;

/** "hoje" / "ontem" / "há N dias" — texto curto pra caber no title. */
function fraseDias(dias: number): string {
  if (dias <= 0) return 'hoje';
  if (dias === 1) return 'ontem';
  return `há ${dias} dias`;
}

export function montarStatusHeader(entrada: EntradaStatusHeader): StatusHeader {
  const avisarSync = entrada.avisarSyncDias ?? AVISAR_SYNC_DIAS;
  const avisarSnapshot = entrada.avisarSnapshotDias ?? AVISAR_SNAPSHOT_DIAS;
  const retencao = entrada.retencaoDias ?? RETENCAO_DIAS;

  let sync: StatusItem;
  if (!entrada.syncConfigurado) {
    sync = {
      estado: 'off',
      visivel: true,
      titulo: 'Sincronização em nuvem desligada. Toque pra configurar — assim seus dados ficam seguros e disponíveis em outros aparelhos.',
    };
  } else if (entrada.diasDesdeSync === null) {
    sync = {
      estado: 'atencao',
      visivel: true,
      titulo: 'Sincronização configurada, mas ainda não rodou neste aparelho. Toque pra sincronizar agora.',
    };
  } else if (entrada.diasDesdeSync <= avisarSync) {
    sync = {
      estado: 'ok',
      visivel: true,
      titulo: `Sincronizado com o GitHub ${fraseDias(entrada.diasDesdeSync)}. Toque pra abrir a sincronização.`,
    };
  } else {
    sync = {
      estado: 'atencao',
      visivel: true,
      titulo: `Faz ${entrada.diasDesdeSync} dias desde a última sincronização com o GitHub. Toque pra sincronizar.`,
    };
  }

  let backup: StatusItem;
  if (entrada.diasDesdeSnapshot === null) {
    backup = {
      estado: 'atencao',
      visivel: true,
      titulo: 'Nenhum snapshot local ainda. Toque pra criar uma cópia de segurança.',
    };
  } else if (entrada.diasDesdeSnapshot <= avisarSnapshot) {
    backup = {
      estado: 'ok',
      visivel: true,
      titulo: `Backup local em dia (snapshot ${fraseDias(entrada.diasDesdeSnapshot)}). Toque pra ver os snapshots.`,
    };
  } else {
    backup = {
      estado: 'atencao',
      visivel: true,
      titulo: `Faz ${entrada.diasDesdeSnapshot} dias desde o último snapshot local. Toque pra criar um novo.`,
    };
  }

  const lixeira: StatusItem =
    entrada.lixeiraContagem <= 0
      ? {
          estado: 'off',
          visivel: true,
          contagem: 0,
          titulo: 'Lixeira vazia. Toque pra abrir.',
        }
      : {
          estado: 'atencao',
          visivel: true,
          contagem: entrada.lixeiraContagem,
          titulo: `${entrada.lixeiraContagem} item(ns) na Lixeira. Eles somem em até ${retencao} dias — toque pra recuperar ou excluir de vez.`,
        };

  return { sync, backup, lixeira };
}
