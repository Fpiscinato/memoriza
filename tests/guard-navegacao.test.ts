// Guard de "alterações não salvas" + a navegação central (src/ui/router.ts).
//
// O que trava aqui: nenhuma saída do editor de nota pode descartar o que o usuário
// digitou sem perguntar. Antes a checagem ficava só nos botões da navegação principal —
// sair pelo breadcrumb (o caminho de volta mais natural) perdia a edição em silêncio.

import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  canNavigateAway,
  clearFormDirty,
  isFormDirty,
  setFormDirty,
  setFormDirtyPrompt,
} from '../src/lib/form-guard';
import { navigate } from '../src/ui/router';

interface JanelaFake {
  confirm: (mensagem?: string) => boolean;
  addEventListener: (tipo: string, fn: () => void) => void;
  removeEventListener: (tipo: string, fn: () => void) => void;
  location: { hash: string };
}

let janela: JanelaFake;

beforeEach(() => {
  janela = {
    confirm: () => true,
    addEventListener: () => {},
    removeEventListener: () => {},
    location: { hash: '' },
  };
  (globalThis as unknown as { window: JanelaFake }).window = janela;
  clearFormDirty();
  setFormDirtyPrompt(null);
});

afterEach(() => {
  setFormDirtyPrompt(null);
  clearFormDirty();
});

describe('canNavigateAway', () => {
  it('deixa passar quando não há nada alterado (e nem pergunta)', () => {
    let perguntou = false;
    janela.confirm = () => {
      perguntou = true;
      return true;
    };
    expect(canNavigateAway()).toBe(true);
    expect(perguntou).toBe(false);
  });

  it('pergunta quando há alteração e respeita a recusa', () => {
    let perguntou = false;
    janela.confirm = () => {
      perguntou = true;
      return false;
    };
    setFormDirty(true);
    expect(canNavigateAway()).toBe(false);
    expect(perguntou).toBe(true);
  });

  it('usa a pergunta customizada da tela quando existe', () => {
    setFormDirty(true);
    let usada = false;
    setFormDirtyPrompt(() => {
      usada = true;
      return true;
    });
    expect(canNavigateAway()).toBe(true);
    expect(usada).toBe(true);
  });
});

describe('navigate', () => {
  it('não sai da tela quando o usuário recusa descartar a edição', () => {
    setFormDirty(true);
    janela.confirm = () => false;
    navigate('espacos');
    expect(janela.location.hash).toBe('');
    expect(isFormDirty()).toBe(true);
  });

  it('sai e limpa o guard quando o usuário aceita', () => {
    setFormDirty(true);
    janela.confirm = () => true;
    navigate('espacos');
    expect(janela.location.hash).toBe('/espacos');
    expect(isFormDirty()).toBe(false);
  });

  it('navega direto quando não há nada alterado', () => {
    navigate('hoje');
    expect(janela.location.hash).toBe('/hoje');
  });

  it('aceita caminho já com barra', () => {
    navigate('/painel');
    expect(janela.location.hash).toBe('/painel');
  });
});
