import { getDB } from './schema';
import type { Espaco, Nota, Tema } from '../types';

export interface TemaFavorito {
  tema: Tema;
  espaco: Espaco;
}

export interface NotaFavorita {
  nota: Nota;
  tema: Tema;
  espaco: Espaco;
}

/** Temas e Notas favoritados do perfil, cada um já com o Espaço (e Tema, no caso da Nota) pai. */
export async function getFavoritos(
  perfilId: string,
): Promise<{ temas: TemaFavorito[]; notas: NotaFavorita[] }> {
  const db = await getDB();
  const espacos = await db.getAllFromIndex('espacos', 'perfil_id', perfilId);

  const temasPorEspaco = await Promise.all(
    espacos.map((espaco) => db.getAllFromIndex('temas', 'espaco_id', espaco.id)),
  );

  const temasFavoritos: TemaFavorito[] = [];
  const notasFavoritas: NotaFavorita[] = [];
  const espacoPorTema = new Map<string, Espaco>();

  for (let i = 0; i < espacos.length; i++) {
    const espaco = espacos[i];
    const temas = temasPorEspaco[i];
    for (const tema of temas) {
      espacoPorTema.set(tema.id, espaco);
      if (tema.favorito) temasFavoritos.push({ tema, espaco });
    }
  }

  const todosTemas = temasPorEspaco.flat();
  const notasPorTema = await Promise.all(
    todosTemas.map((tema) => db.getAllFromIndex('notas', 'tema_id', tema.id)),
  );

  for (let i = 0; i < todosTemas.length; i++) {
    const tema = todosTemas[i];
    const notas = notasPorTema[i];
    const espaco = espacoPorTema.get(tema.id);
    if (!espaco) continue;
    for (const nota of notas) {
      if (nota.favorito) notasFavoritas.push({ nota, tema, espaco });
    }
  }

  return { temas: temasFavoritos, notas: notasFavoritas };
}
