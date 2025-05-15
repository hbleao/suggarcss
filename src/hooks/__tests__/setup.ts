// Configuração do ambiente de testes para os hooks
import '@testing-library/jest-dom';

// Silenciar warnings de console durante os testes
global.console = {
  ...console,
  // Manter o console.error para debugging, mas silenciar warnings
  warn: jest.fn(),
  // Manter o console.log para debugging
  log: console.log,
  // Manter o console.error para debugging
  error: console.error,
  // Manter o console.info para debugging
  info: console.info,
};
