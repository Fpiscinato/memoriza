// "Mover" pastas e notas entre pastas já existentes — sem arrastar e soltar.
//
// Mover uma pasta é só trocar `pai_id` (e `espaco_id`, quando o destino é outra pasta de
// topo). Tudo que está dentro dela — subpastas e notas — vem junto, porque notas apontam
// para o `tema_id` e subpastas para o `pai_id`; nenhum registro é recriado. Mover uma nota
// troca apenas `tema_id`: o item de revisão aponta para a nota, então histórico e
// agendamento continuam intactos.
//
// As validações ficam aqui (e não só na interface) para que importação/sincronização e
// chamadas futuras não consigam criar ciclos ou duplicatas no destino.

import { getDB } from './schema';
import { nowISO } from '../lib/time';
import { descendentesDe, idsDaSubarvore } from '../domain/arvore';
import {
  chaveDestino,
  montarDestinosMover,
  type GrupoDestinosMover,
} from '../domain/mover-destinos';
import { garantirTemaRaiz } from './temas';
import { listEspacos } from './espacos';

export interface DestinoMoverRef {
  tipo: 'espaco' | 'tema';
  id: string;
}

export interface ResultadoDestinosMover {
  grupos: GrupoDestinosMover[];
  /** Chave do destino onde o item está agora (não aparece na lista). */
  atual: string | null;
}

function normalizar(valor: string): string {
  return valor.trim().toLowerCase();
}

/**
 * Destinos disponíveis para mover uma pasta (`temaId`) ou uma nota (`notaId`): só Espaços
 * ativos do perfil, com as pastas visíveis. A pasta em movimento e sua subárvore ficam
 * fora, assim como o lugar onde o item já está.
 */
export async function listarDestinosMover(
  perfilId: string,
  opcoes: { temaId?: string; notaId?: string },
): Promise<ResultadoDestinosMover> {
  const db = await getDB();
  const espacos = (await listEspacos(perfilId)).filter((espaco) => !espaco.arquivado);
  const listas = await Promise.all(
    espacos.map((espaco) =>
      db
        .getAllFromIndex('temas', 'espaco_id', espaco.id)
        .then((temas) => temas.filter((tema) => !tema.excluido && !tema.oculta)),
    ),
  );
  const temas = listas.flat();

  let atual: string | null = null;
  let excluirTemaId: string | undefined;

  if (opcoes.temaId) {
    const tema = await db.get('temas', opcoes.temaId);
    if (tema) {
      excluirTemaId = tema.id;
      atual = tema.pai_id
        ? chaveDestino('tema', tema.pai_id)
        : chaveDestino('espaco', tema.espaco_id);
    }
  } else if (opcoes.notaId) {
    const nota = await db.get('notas', opcoes.notaId);
    const tema = nota ? await db.get('temas', nota.tema_id) : undefined;
    if (tema) {
      atual = tema.oculta
        ? chaveDestino('espaco', tema.espaco_id)
        : chaveDestino('tema', tema.id);
    }
  }

  return {
    grupos: montarDestinosMover(espacos, temas, {
      excluirTemaId,
      destinoAtual: atual,
      rotuloRaiz: opcoes.temaId ? 'Raiz da pasta' : 'Pasta principal',
      descricaoRaiz: opcoes.temaId ? 'primeiro nível da pasta' : 'notas soltas nesta pasta',
    }),
    atual,
  };
}

/**
 * Move a pasta e toda a subárvore. Lança `Error` com mensagem pronta para a interface
 * quando o destino é inválido (ciclo, pasta arquivada, nome repetido, outro perfil).
 */
export async function moverTema(temaId: string, destino: DestinoMoverRef): Promise<void> {
  const db = await getDB();
  const tema = await db.get('temas', temaId);
  if (!tema || tema.excluido || tema.oculta) throw new Error('Pasta não encontrada.');

  const espacoOrigem = await db.get('espacos', tema.espaco_id);
  if (!espacoOrigem || espacoOrigem.excluido) throw new Error('Pasta não encontrada.');

  // Inclui itens na Lixeira: se uma subpasta excluída for restaurada depois, ela precisa
  // continuar dentro da pasta que se moveu (e no Espaço certo).
  const todos = await db.getAllFromIndex('temas', 'espaco_id', tema.espaco_id);
  const bloqueados = new Set([tema.id, ...descendentesDe(todos, tema.id).map((item) => item.id)]);

  let novoEspacoId: string;
  let novoPaiId: string | undefined;
  let destinoNome: string;

  if (destino.tipo === 'espaco') {
    const espaco = await db.get('espacos', destino.id);
    if (!espaco || espaco.excluido) throw new Error('Pasta de destino não encontrada.');
    if (espaco.perfil_id !== espacoOrigem.perfil_id) {
      throw new Error('Não dá para mover para outra conta.');
    }
    if (espaco.arquivado) {
      throw new Error(`A pasta "${espaco.nome}" está arquivada e não recebe itens.`);
    }
    novoEspacoId = espaco.id;
    destinoNome = espaco.nome;
  } else {
    if (bloqueados.has(destino.id)) {
      throw new Error('Não dá para mover uma pasta para dentro dela mesma.');
    }
    const pai = await db.get('temas', destino.id);
    if (!pai || pai.excluido || pai.oculta) throw new Error('Pasta de destino não encontrada.');
    const espacoDestino = await db.get('espacos', pai.espaco_id);
    if (!espacoDestino || espacoDestino.excluido) {
      throw new Error('Pasta de destino não encontrada.');
    }
    if (espacoDestino.perfil_id !== espacoOrigem.perfil_id) {
      throw new Error('Não dá para mover para outra conta.');
    }
    if (espacoDestino.arquivado) {
      throw new Error(`A pasta "${espacoDestino.nome}" está arquivada e não recebe itens.`);
    }
    novoEspacoId = pai.espaco_id;
    novoPaiId = pai.id;
    destinoNome = pai.nome;
  }

  if (novoEspacoId === tema.espaco_id && (novoPaiId ?? null) === (tema.pai_id ?? null)) {
    throw new Error('A pasta já está nesse lugar.');
  }

  // Nome repetido no destino: o agrupamento por categoria pode até separar, mas duas pastas
  // com o mesmo nome no mesmo nível são confusas na hora de abrir e de mover de novo.
  const doDestino = (await db.getAllFromIndex('temas', 'espaco_id', novoEspacoId)).filter(
    (item) => !item.excluido && !item.oculta && item.id !== tema.id,
  );
  const irmaos = doDestino.filter((item) => (item.pai_id ?? null) === (novoPaiId ?? null));
  if (irmaos.some((item) => normalizar(item.nome) === normalizar(tema.nome))) {
    throw new Error(`Já existe uma pasta com esse nome em "${destinoNome}".`);
  }

  const ids = new Set(idsDaSubarvore(todos, tema.id));
  const subarvore = todos.filter((item) => ids.has(item.id));
  const agora = nowISO();
  const tx = db.transaction('temas', 'readwrite');
  for (const item of subarvore) {
    if (item.id === tema.id) {
      if (novoPaiId) item.pai_id = novoPaiId;
      else delete item.pai_id;
    }
    item.espaco_id = novoEspacoId;
    item.atualizado_em = agora;
    await tx.store.put(item);
  }
  await tx.done;
}

/**
 * Move uma nota para outra pasta (ou para a pasta principal de um Espaço, criando a pasta
 * oculta se necessário). Só o vínculo `tema_id` muda — conteúdo e revisão ficam iguais.
 */
export async function moverNota(notaId: string, destino: DestinoMoverRef): Promise<void> {
  const db = await getDB();
  const nota = await db.get('notas', notaId);
  if (!nota || nota.excluido) throw new Error('Nota não encontrada.');

  const temaAtual = await db.get('temas', nota.tema_id);
  const espacoAtual = temaAtual ? await db.get('espacos', temaAtual.espaco_id) : undefined;
  if (!espacoAtual || espacoAtual.excluido) throw new Error('Nota não encontrada.');

  let novoTemaId: string;

  if (destino.tipo === 'espaco') {
    const espaco = await db.get('espacos', destino.id);
    if (!espaco || espaco.excluido) throw new Error('Pasta de destino não encontrada.');
    if (espaco.perfil_id !== espacoAtual.perfil_id) {
      throw new Error('Não dá para mover para outra conta.');
    }
    if (espaco.arquivado) {
      throw new Error(`A pasta "${espaco.nome}" está arquivada e não recebe itens.`);
    }
    novoTemaId = (await garantirTemaRaiz(espaco.id)).id;
  } else {
    const tema = await db.get('temas', destino.id);
    if (!tema || tema.excluido || tema.oculta) throw new Error('Pasta de destino não encontrada.');
    const espacoDestino = await db.get('espacos', tema.espaco_id);
    if (!espacoDestino || espacoDestino.excluido) {
      throw new Error('Pasta de destino não encontrada.');
    }
    if (espacoDestino.perfil_id !== espacoAtual.perfil_id) {
      throw new Error('Não dá para mover para outra conta.');
    }
    if (espacoDestino.arquivado) {
      throw new Error(`A pasta "${espacoDestino.nome}" está arquivada e não recebe itens.`);
    }
    novoTemaId = tema.id;
  }

  if (novoTemaId === nota.tema_id) throw new Error('A nota já está nessa pasta.');

  nota.tema_id = novoTemaId;
  nota.atualizado_em = nowISO();
  await db.put('notas', nota);
}
