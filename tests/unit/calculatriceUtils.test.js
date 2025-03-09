import { describe, it, expect } from 'vitest';
import {
  calculate,
  getHistory,
  clearHistory,
} from '../../src/utils/calculatriceUtils';

describe('calculate function', () => {
  it('addition de 1 + 2 pour donner 3', () => {
    expect(calculate('1+2')).toBe(3);
  });

  it('addition de 0 + 0 pour donner 0', () => {
    expect(calculate('0+0')).toBe(0);
  });

  it('addition de -1 + 1 pour donner 0', () => {
    expect(calculate('-1+1')).toBe(0);
  });

  it('soustraction de 5 - 3 pour donner 2', () => {
    expect(calculate('5-3')).toBe(2);
  });

  it('soustraction de -1 - 1 pour donner -2', () => {
    expect(calculate('-1-1')).toBe(-2);
  });

  it('soustraction de 0 - 0 pour donner 0', () => {
    expect(calculate('0-0')).toBe(0);
  });

  it('multiplication de 4 * 6 pour donner 24', () => {
    expect(calculate('4*6')).toBe(24);
  });

  it('multiplication de 0 * 5 pour donner 0', () => {
    expect(calculate('0*5')).toBe(0);
  });

  it('multiplication de -1 * 5 pour donner -5', () => {
    expect(calculate('-1*5')).toBe(-5);
  });

  it("respect de l'ordre des opérations pour 1 + 2 * 3", () => {
    expect(calculate('1+2*3')).toBe(7);
  });

  it('gestion des erreurs pour expression invalide', () => {
    expect(() => calculate('1 + ')).toThrow();
  });
});

describe('History function', () => {
  it('should record calculations in history', () => {
    clearHistory();
    calculate('1+2');
    calculate('3*4');
    calculate('5-6');
    const history = getHistory();
    expect(history.length).toBe(3);
    expect(history[0].expression).toBe('1+2');
    expect(history[0].result).toBe(3);
    expect(history[1].expression).toBe('3*4');
    expect(history[1].result).toBe(12);
    expect(history[2].expression).toBe('5-6');
    expect(history[2].result).toBe(-1);
  });

  it('should clear history', () => {
    calculate('1+2');
    clearHistory();
    const history = getHistory();
    expect(history.length).toBe(0);
  });
});
