import { describe, expect, it } from 'vitest';
import { computeNextReview } from '../src/domain/algorithm';

const HOJE = '2026-03-10';

describe('computeNextReview — tabela de transição', () => {
  describe('estágio 1', () => {
    it('difícil permanece em 1 (já é o marco mais curto)', () => {
      const r = computeNextReview('1', 'dificil', 0, HOJE);
      expect(r).toMatchObject({ estagio: '1', streak_facil: 0, aposentado: false });
      expect(r.data_agendada).toBe('2026-03-11');
    });

    it('médio avança para 7', () => {
      const r = computeNextReview('1', 'medio', 0, HOJE);
      expect(r).toMatchObject({ estagio: '7', streak_facil: 0, aposentado: false });
      expect(r.data_agendada).toBe('2026-03-17');
    });

    it('fácil avança dois marcos, para 30, incrementa streak_facil', () => {
      const r = computeNextReview('1', 'facil', 0, HOJE);
      expect(r).toMatchObject({ estagio: '30', streak_facil: 1, aposentado: false });
      expect(r.data_agendada).toBe('2026-04-09');
    });
  });

  describe('estágio 7', () => {
    it('difícil recua para 1', () => {
      const r = computeNextReview('7', 'dificil', 0, HOJE);
      expect(r).toMatchObject({ estagio: '1', streak_facil: 0, aposentado: false });
    });

    it('médio avança para 30', () => {
      const r = computeNextReview('7', 'medio', 0, HOJE);
      expect(r).toMatchObject({ estagio: '30', streak_facil: 0, aposentado: false });
    });

    it('fácil avança dois marcos, para 180, incrementa streak_facil', () => {
      const r = computeNextReview('7', 'facil', 0, HOJE);
      expect(r).toMatchObject({ estagio: '180', streak_facil: 1, aposentado: false });
    });
  });

  describe('estágio 30', () => {
    it('difícil recua para 7', () => {
      const r = computeNextReview('30', 'dificil', 0, HOJE);
      expect(r).toMatchObject({ estagio: '7', streak_facil: 0, aposentado: false });
    });

    it('médio avança para 180', () => {
      const r = computeNextReview('30', 'medio', 0, HOJE);
      expect(r).toMatchObject({ estagio: '180', streak_facil: 0, aposentado: false });
    });

    it('fácil estoura a escada (dois marcos além de 30) e aposenta direto em consulta', () => {
      const r = computeNextReview('30', 'facil', 0, HOJE);
      expect(r).toMatchObject({ estagio: 'consulta', streak_facil: 1, aposentado: true });
      expect(r.data_agendada).toBeUndefined();
    });
  });

  describe('estágio 180', () => {
    it('difícil recua para 30', () => {
      const r = computeNextReview('180', 'dificil', 0, HOJE);
      expect(r).toMatchObject({ estagio: '30', streak_facil: 0, aposentado: false });
    });

    it('médio permanece em 180 (já é o marco mais longo)', () => {
      const r = computeNextReview('180', 'medio', 0, HOJE);
      expect(r).toMatchObject({ estagio: '180', streak_facil: 0, aposentado: false });
    });

    it('fácil estoura a escada e aposenta direto em consulta', () => {
      const r = computeNextReview('180', 'facil', 0, HOJE);
      expect(r).toMatchObject({ estagio: 'consulta', streak_facil: 1, aposentado: true });
    });
  });

  describe('streak_facil chegando a 2 (duas fáceis seguidas)', () => {
    it('segunda fácil consecutiva aposenta mesmo quando a escada por si só não estourou', () => {
      // Regra do streak_facil testada isoladamente do estouro de escada: partindo de um
      // streak_facil já em 1 (fácil anterior), uma nova fácil a partir de 7 chegaria a 180
      // pela escada normal, mas duas fáceis seguidas força 'consulta' de qualquer forma.
      const r = computeNextReview('7', 'facil', 1, HOJE);
      expect(r).toMatchObject({ estagio: 'consulta', streak_facil: 2, aposentado: true });
    });

    it('no fluxo real, a segunda fácil consecutiva também aposenta via estouro da escada', () => {
      // 1 --fácil--> 30 (streak 1) --fácil--> estoura a escada e aposenta (streak 2)
      const primeira = computeNextReview('1', 'facil', 0, HOJE);
      expect(primeira.estagio).toBe('30');
      const segunda = computeNextReview(primeira.estagio, 'facil', primeira.streak_facil, '2026-04-09');
      expect(segunda).toMatchObject({ estagio: 'consulta', streak_facil: 2, aposentado: true });
    });
  });

  it('difícil e médio sempre zeram o streak_facil, mesmo vindo de um streak alto', () => {
    expect(computeNextReview('30', 'dificil', 1, HOJE).streak_facil).toBe(0);
    expect(computeNextReview('30', 'medio', 1, HOJE).streak_facil).toBe(0);
  });

  it('reagendamento conta a partir de data_concluida, não de uma data_agendada original', () => {
    // Mesmo que a revisão estivesse atrasada e a data_agendada original fosse outra, o
    // próximo agendamento soma os dias a partir do dia em que a revisão foi concluída.
    const concluidaComAtraso = '2026-05-01';
    const r = computeNextReview('1', 'medio', 0, concluidaComAtraso);
    expect(r.data_agendada).toBe('2026-05-08');
  });

  it('estágio consulta é terminal e não recalcula nada', () => {
    const r = computeNextReview('consulta', 'facil', 0, HOJE);
    expect(r).toMatchObject({ estagio: 'consulta', aposentado: true });
  });
});
