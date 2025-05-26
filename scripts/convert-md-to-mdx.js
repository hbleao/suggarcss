#!/usr/bin/env node

/**
 * Script para converter arquivos MD para MDX
 * Este script cria arquivos MDX básicos a partir dos arquivos MD existentes
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Diretórios
const sourceDir = path.join(__dirname, '../.storybook/docs/components');
const targetDir = path.join(__dirname, '../.storybook/stories/docs/components');

// Certifique-se de que o diretório de destino existe
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Obter todos os arquivos MD
const mdFiles = fs.readdirSync(sourceDir)
  .filter(file => file.endsWith('.md'));

// Componentes já convertidos (para pular)
const alreadyConverted = [
  'banner-double.md',
  'button.md',
  'column.md',
  'dialog.md',
  'footer.md',
  'header.md',
  'header-acquisition-flow.md'
];

// Converter cada arquivo
mdFiles.forEach(mdFile => {
  // Pular arquivos já convertidos
  if (alreadyConverted.includes(mdFile)) {
    console.log(`Pulando ${mdFile} (já convertido)`);
    return;
  }

  // Ler o conteúdo do arquivo MD
  const mdContent = fs.readFileSync(path.join(sourceDir, mdFile), 'utf8');
  
  // Extrair o título (primeira linha começando com #)
  const titleMatch = mdContent.match(/^# (.+)$/m);
  const title = titleMatch ? titleMatch[1] : path.basename(mdFile, '.md');
  
  // Converter kebab-case para PascalCase para o nome do arquivo
  const componentName = title
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
  
  // Criar o conteúdo MDX
  const mdxContent = `import { Meta } from '@storybook/blocks';

<Meta title="Components/${componentName}" />

${mdContent}`;

  // Caminho do arquivo MDX de destino
  const mdxFile = path.join(targetDir, `${componentName}.mdx`);
  
  // Escrever o arquivo MDX
  fs.writeFileSync(mdxFile, mdxContent);
  
  console.log(`Convertido: ${mdFile} -> ${componentName}.mdx`);
});

console.log('Conversão concluída!');
