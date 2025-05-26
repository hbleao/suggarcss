/**
 * Configuração personalizada para carregar arquivos Markdown no Storybook
 * Este arquivo ajuda a transformar arquivos .md em histórias do Storybook
 */

module.exports = (source) => {
  // Transforma o conteúdo Markdown em um componente React
  return `
    import React from 'react';
    import { Markdown } from '@storybook/blocks';
    
    export default {
      title: 'Documentation',
      parameters: {
        viewMode: 'docs',
        previewTabs: { 
          canvas: { hidden: true } 
        },
        docs: {
          page: () => <Markdown>{${JSON.stringify(source)}}</Markdown>
        }
      }
    };
    
    export const Documentation = () => <div />;
  `;
};
