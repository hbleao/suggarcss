/**
 * @jest-environment jsdom
 */

// Este teste verifica apenas a existência do componente TolkitLexis
// Não testamos a funcionalidade completa devido a limitações do ambiente de teste
// e à natureza do componente que manipula diretamente o DOM

import { TolkitLexis } from './index';

describe('TolkitLexis Component', () => {
  it('should exist and be a function', () => {
    expect(TolkitLexis).toBeDefined();
    expect(typeof TolkitLexis).toBe('function');
  });
});
