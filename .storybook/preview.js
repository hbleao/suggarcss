import React from 'react';

// Desabilitar completamente os avisos de console durante a inicialização do Storybook
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

// Substituir console.warn para ignorar avisos relacionados ao Sass
console.warn = (message, ...args) => {
  if (typeof message === 'string' && (
    message.includes('Deprecation') ||
    message.includes('Sass') ||
    message.includes('sass') ||
    message.includes('map-get') ||
    message.includes('map-has-key') ||
    message.includes('webpack') ||
    message.includes('Module Warning')
  )) {
    // Ignora avisos de depreciação
    return;
  }
  originalConsoleWarn.call(console, message, ...args);
};

// Substituir console.error para ignorar erros relacionados ao Sass
console.error = (message, ...args) => {
  if (typeof message === 'string' && (
    message.includes('Sass') ||
    message.includes('sass') ||
    message.includes('webpack') ||
    message.includes('Module Error')
  )) {
    // Ignora erros relacionados ao Sass
    return;
  }
  originalConsoleError.call(console, message, ...args);
};

// Importar estilos globais depois de configurar a supressão de avisos
import '../src/styles/global.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  layout: 'padded',
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#FFFFFF' },
      { name: 'dark', value: '#333333' },
    ],
  },
  docs: {
    source: {
      state: 'open',
    },
  },
};

export const decorators = [
  (Story) => (
    <div style={{ margin: '2em' }}>
      <Story />
    </div>
  ),
];
