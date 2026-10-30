// Monta o caminho (breadcrumb) de uma pasta ou nota com as categorias no meio — o mesmo
// formato mostrado no topo das telas de detalhe. Fica fora das telas pra que pasta, nota e
// a visão de categoria usem exatamente a mesma regra, inclusive nas rotas clicáveis.

import type { Espaco, Tema } from '../types';
import { caminhoDe } from '../domain/arvore';
import { nomeTemaExibicao } from '../domain/rotulos';
import { accentVar, espacoCorVar } from '../lib/color';
import { espacoIconeChave } from './espaco-icons';
import { rotaCategoria, type EscopoCategoria } from './router';
import type { BreadcrumbCrumb } from './components/breadcrumb';

/** Crumb de categoria: clicável, apontando pra lista de pastas daquela categoria. */
export function crumbCategoria(
  categoria: string,
  escopo: EscopoCategoria = { tipo: 'perfil' },
): BreadcrumbCrumb | null {
  const limpa = categoria.trim();
  if (!limpa) return null;
  return {
    label: limpa,
    route: rotaCategoria(limpa, escopo),
    colorKey: limpa.toLowerCase(),
  };
}

/**
 * Categoria de uma pasta: no topo do Espaço (pai ausente) a lista é a das subpastas do
 * próprio Espaço; abaixo disso, a das subpastas do pai. Não é o mesmo que a categoria das
 * Pastas de topo, que fica no nível do perfil.
 */
function escopoDaPasta(espaco: Espaco, pasta: Tema, ids: Set<string>): EscopoCategoria {
  return pasta.pai_id && ids.has(pasta.pai_id)
    ? { tipo: 'tema', id: pasta.pai_id }
    : { tipo: 'espaco', id: espaco.id };
}

export function crumbEspaco(espaco: Espaco): BreadcrumbCrumb {
  return {
    label: espaco.nome,
    route: `espacos/${espaco.id}`,
    iconKey: espacoIconeChave(espaco),
    iconColor: espacoCorVar(espaco.cor, accentVar(espaco.id)),
  };
}

export function crumbPasta(pasta: Tema): BreadcrumbCrumb {
  return {
    label: nomeTemaExibicao(pasta.nome),
    route: `temas/${pasta.id}`,
    iconKey: espacoIconeChave(pasta),
    iconColor: espacoCorVar(pasta.cor, accentVar(pasta.id)),
  };
}

/**
 * Caminho completo: Pastas › Categoria do Espaço › Espaço › Categoria › Pasta … até `tema`
 * (quando informado). Categorias iguais ao rótulo anterior são omitidas — o Tema de topo
 * costuma repetir a categoria do Espaço, e repetir "Cursos › Cursos" não ajuda em nada.
 */
export function crumbsCaminho(
  espaco: Espaco,
  todosTemas: Tema[],
  tema?: Tema | null,
): BreadcrumbCrumb[] {
  const crumbs: BreadcrumbCrumb[] = [{ label: 'Pastas', route: 'espacos' }];
  const adicionar = (crumb: BreadcrumbCrumb | null): void => {
    if (!crumb) return;
    const ultimo = crumbs[crumbs.length - 1];
    if (ultimo?.label === crumb.label) return;
    crumbs.push(crumb);
  };

  adicionar(crumbCategoria(espaco.categoria));
  adicionar(crumbEspaco(espaco));
  if (tema) {
    const ids = new Set(todosTemas.map((pasta) => pasta.id));
    for (const pasta of [...caminhoDe(todosTemas, tema), tema]) {
      adicionar(crumbCategoria(pasta.categoria, escopoDaPasta(espaco, pasta, ids)));
      adicionar(crumbPasta(pasta));
    }
  }
  return crumbs;
}
