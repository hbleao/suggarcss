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
  title: 'Components/Documentation',
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

// Documentação dos componentes
export const BannerDouble = () => {
  const content = useMarkdownContent('../docs/components/banner-double.md');
  return <Markdown>{content}</Markdown>;
};

export const Column = () => {
  const content = useMarkdownContent('../docs/components/column.md');
  return <Markdown>{content}</Markdown>;
};

export const HeaderAcquisitionFlow = () => {
  const content = useMarkdownContent('../docs/components/header-acquisition-flow.md');
  return <Markdown>{content}</Markdown>;
};

export const Button = () => {
  const content = useMarkdownContent('../docs/components/button.md');
  return <Markdown>{content}</Markdown>;
};

export const Dialog = () => {
  const content = useMarkdownContent('../docs/components/dialog.md');
  return <Markdown>{content}</Markdown>;
};

export const Footer = () => {
  const content = useMarkdownContent('../docs/components/footer.md');
  return <Markdown>{content}</Markdown>;
};

export const Header = () => {
  const content = useMarkdownContent('../docs/components/header.md');
  return <Markdown>{content}</Markdown>;
};
