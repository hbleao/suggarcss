#!/usr/bin/env node

/**
 * Script para gerar arquivos de stories interativos para todos os componentes
 * e atualizar os arquivos MDX correspondentes com links para os stories
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Diretórios
const mdxDir = path.join(__dirname, '../.storybook/stories/docs/components');
const storiesDir = path.join(__dirname, '../.storybook/stories/components');

// Criar o diretório de stories se não existir
if (!fs.existsSync(storiesDir)) {
  fs.mkdirSync(storiesDir, { recursive: true });
}

// Componentes que já têm stories interativos
const existingStories = [
  'Accordion',
  'Button'
];

// Obter todos os arquivos MDX
const mdxFiles = fs.readdirSync(mdxDir)
  .filter(file => file.endsWith('.mdx'));

// Modelo para o arquivo de stories
const getStoryTemplate = (componentName) => {
  return `import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from '../../../src/components/${componentName}';

const meta = {
  title: 'Components/${componentName}/Examples',
  component: ${componentName},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Adicione props padrão aqui
  },
};

export const WithCustomProps: Story = {
  args: {
    // Adicione props personalizadas aqui
  },
};

// Exemplo com renderização personalizada
export const CustomExample: Story = {
  render: () => (
    <div style={{ padding: '16px' }}>
      <${componentName} />
    </div>
  ),
};`;
};

// Modelo para atualizar o arquivo MDX
const getExamplesLinks = (componentName) => {
  return `## Exemplos Interativos

Você pode ver exemplos interativos do componente ${componentName} nas seguintes páginas:

- [Exemplo Básico](/story/components-${componentName.toLowerCase()}-examples--default)
- [Com Props Personalizadas](/story/components-${componentName.toLowerCase()}-examples--with-custom-props)
- [Exemplo Personalizado](/story/components-${componentName.toLowerCase()}-examples--custom-example)`;
};

// Processar cada arquivo MDX
for (const mdxFile of mdxFiles) {
  const componentName = path.basename(mdxFile, '.mdx');
  
  // Pular componentes que já têm stories
  if (existingStories.includes(componentName)) {
    console.log(`Pulando ${componentName} (já tem stories)`);
    continue;
  }
  
  // Caminho para o arquivo de stories
  const storyPath = path.join(storiesDir, `${componentName}.stories.tsx`);
  
  // Verificar se o arquivo de stories já existe
  if (fs.existsSync(storyPath)) {
    console.log(`Pulando ${componentName} (arquivo de stories já existe)`);
    continue;
  }
  
  // Gerar o arquivo de stories
  const storyContent = getStoryTemplate(componentName);
  fs.writeFileSync(storyPath, storyContent);
  
  console.log(`Gerado arquivo de stories para ${componentName}`);
  
  // Atualizar o arquivo MDX
  const mdxPath = path.join(mdxDir, mdxFile);
  let mdxContent = fs.readFileSync(mdxPath, 'utf8');
  
  // Verificar se o arquivo MDX já tem links para exemplos interativos
  if (mdxContent.includes('Exemplos Interativos') && mdxContent.includes('/story/components-')) {
    console.log(`Pulando atualização do MDX para ${componentName} (já tem links para exemplos)`);
    continue;
  }
  
  // Encontrar a posição para inserir os links para exemplos
  const examplesMatch = mdxContent.match(/## Exemplos/);
  
  if (examplesMatch) {
    // Substituir a seção de exemplos
    const examplesPos = mdxContent.indexOf(examplesMatch[0]);
    const nextSectionMatch = mdxContent.substring(examplesPos + 10).match(/\n## /);
    
    if (nextSectionMatch) {
      const nextSectionPos = examplesPos + 10 + mdxContent.substring(examplesPos + 10).indexOf('\n## ');
      const before = mdxContent.substring(0, examplesPos);
      const after = mdxContent.substring(nextSectionPos);
      
      mdxContent = before + getExamplesLinks(componentName) + after;
    } else {
      // Se não houver próxima seção, substituir até o final
      const before = mdxContent.substring(0, examplesPos);
      mdxContent = before + getExamplesLinks(componentName) + '\n';
    }
  } else {
    // Se não encontrar "## Exemplos", adicionar antes de "## Importação" ou ao final
    const importMatch = mdxContent.match(/## Importação/);
    
    if (importMatch) {
      const importPos = mdxContent.indexOf(importMatch[0]);
      const before = mdxContent.substring(0, importPos);
      const after = mdxContent.substring(importPos);
      
      mdxContent = before + getExamplesLinks(componentName) + '\n\n' + after;
    } else {
      // Adicionar ao final
      mdxContent += '\n\n' + getExamplesLinks(componentName);
    }
  }
  
  // Escrever o conteúdo atualizado
  fs.writeFileSync(mdxPath, mdxContent);
  
  console.log(`Atualizado arquivo MDX para ${componentName}`);
}

console.log('Geração de stories e atualização de MDX concluídas!');
