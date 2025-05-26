import React from 'react';
import { Markdown } from '@storybook/blocks';
import type { Meta } from '@storybook/react';
import { useEffect, useState } from 'react';

// Função para carregar arquivos Markdown dinamicamente
const useMarkdownContent = (path: string) => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    fetch(path)
      .then(response => response.text())
      .then(text => setContent(text))
      .catch(error => console.error(`Erro ao carregar ${path}:`, error));
  }, [path]);

  return content;
};

const meta = {
  title: 'Documentation',
  parameters: {
    viewMode: 'docs',
    previewTabs: { 
      canvas: { hidden: true } 
    },
    docs: {
      page: null
    }
  }
} satisfies Meta;

export default meta;

// Páginas principais de documentação
export const Overview = () => {
  const content = useMarkdownContent('../docs/index.md');
  return <Markdown>{content}</Markdown>;
};

export const Introduction = () => {
  const content = useMarkdownContent('../docs/introduction.md');
  return <Markdown>{content}</Markdown>;
};

export const GettingStarted = () => {
  const content = useMarkdownContent('../docs/getting-started.md');
  return <Markdown>{content}</Markdown>;
};

export const TechnicalPatterns = () => {
  const content = useMarkdownContent('../docs/technical-patterns.md');
  return <Markdown>{content}</Markdown>;
};

export const Contributing = () => {
  const content = useMarkdownContent('../docs/contributing.md');
  return <Markdown>{content}</Markdown>;
};
