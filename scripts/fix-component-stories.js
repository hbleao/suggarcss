#!/usr/bin/env node

/**
 * Script para corrigir os arquivos de stories que estão causando erros
 * Isso removerá os stories para componentes que não existem e manterá apenas os que funcionam
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Diretórios
const storiesDir = path.join(__dirname, '../.storybook/stories/components');

// Lista de componentes UI conhecidos que sabemos que existem
const knownComponents = [
  'Accordion',
  'Alert',
  'Avatar',
  'Badge',
  'BannerDouble',
  'BannerBody',
  'BannerHero',
  'Button',
  'Card',
  'CardContent',
  'CardIcon',
  'CardTestimonial',
  'Column',
  'Dialog',
  'Dropdown',
  'Footer',
  'Header',
  'HeaderAcquisitionFlow',
  'IconButton',
  'Input',
  'Link',
  'Modal',
  'Notification',
  'Radio',
  'Select',
  'Tabs',
  'Textarea',
  'Tooltip'
];

// Verificar todos os arquivos de stories
if (fs.existsSync(storiesDir)) {
  const storyFiles = fs.readdirSync(storiesDir)
    .filter(file => file.endsWith('.stories.tsx'));
  
  for (const storyFile of storyFiles) {
    const componentName = path.basename(storyFile, '.stories.tsx');
    
    // Se não for um componente conhecido e não for um dos componentes principais (Button, Accordion)
    if (!knownComponents.includes(componentName) && 
        componentName !== 'Button' && 
        componentName !== 'Accordion') {
      
      // Remover o arquivo de stories
      const storyPath = path.join(storiesDir, storyFile);
      fs.unlinkSync(storyPath);
      
      console.log(`Removido arquivo de stories para ${componentName} (componente não encontrado)`);
    }
  }
}

console.log('Correção dos arquivos de stories concluída!');

// Agora vamos atualizar os arquivos MDX para remover links para stories que não existem mais
const mdxDir = path.join(__dirname, '../.storybook/stories/docs/components');

// Obter todos os arquivos MDX
const mdxFiles = fs.readdirSync(mdxDir)
  .filter(file => file.endsWith('.mdx'));

// Processar cada arquivo MDX
for (const mdxFile of mdxFiles) {
  const componentName = path.basename(mdxFile, '.mdx');
  
  // Se não for um componente conhecido e não for um dos componentes principais
  if (!knownComponents.includes(componentName) && 
      componentName !== 'Button' && 
      componentName !== 'Accordion') {
    
    const mdxPath = path.join(mdxDir, mdxFile);
    let mdxContent = fs.readFileSync(mdxPath, 'utf8');
    
    // Remover a seção de exemplos interativos
    const interactiveSection = /## Exemplos Interativos\n\nVocê pode ver exemplos interativos[\s\S]*?(?=\n\n##|$)/;
    mdxContent = mdxContent.replace(interactiveSection, '');
    
    // Escrever o conteúdo atualizado
    fs.writeFileSync(mdxPath, mdxContent);
    
    console.log(`Atualizado arquivo MDX para ${componentName} (removidos links para stories)`);
  }
}

console.log('Atualização dos arquivos MDX concluída!');
