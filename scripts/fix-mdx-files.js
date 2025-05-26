#!/usr/bin/env node

/**
 * Script para corrigir os arquivos MDX removendo os exemplos interativos
 * que estão causando erros de compilação
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Diretórios
const mdxDir = path.join(__dirname, '../.storybook/stories/docs/components');

// Obter todos os arquivos MDX
const mdxFiles = fs.readdirSync(mdxDir)
  .filter(file => file.endsWith('.mdx'));

// Processar cada arquivo MDX
for (const mdxFile of mdxFiles) {
  const mdxPath = path.join(mdxDir, mdxFile);
  
  // Ler o conteúdo atual
  let content = fs.readFileSync(mdxPath, 'utf8');
  
  // Remover a seção de exemplos interativos
  const examplesSection = /## Exemplos Interativos[\s\S]*?(?=##|$)/;
  content = content.replace(examplesSection, '');
  
  // Simplificar os imports
  const importRegex = /import \{ Meta, Story, Canvas \} from '@storybook\/blocks';\nimport \{ [^}]+ \} from '[^']+';\n/;
  content = content.replace(importRegex, "import { Meta } from '@storybook/blocks';\n\n");
  
  // Escrever o conteúdo atualizado
  fs.writeFileSync(mdxPath, content);
  
  console.log(`Corrigido: ${mdxFile}`);
}

console.log('Correção dos arquivos MDX concluída!');
