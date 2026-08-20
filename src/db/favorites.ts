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

  const temasFavoritos: TemaFavorito[] = [];
  const notasFavoritas: NotaFavorita[] = [];

  for (const espaco of espacos) {
    const temas = await db.getAllFromIndex('temas', 'espaco_id', espaco.id);
    for (const tema of temas) {
      if (tema.favorito) temasFavoritos.push({ tema, espaco });

      const notas = await db.getAllFromIndex('notas', 'tema_id', tema.id);
      for (const nota of notas) {
        if (nota.favorito) notasFavoritas.push({ nota, tema, espaco });
      }
    }
  }

  return { temas: temasFavoritos, notas: notasFavoritas };
}
