#!/usr/bin/env node

/**
 * Script para converter os arquivos MD restantes para MDX
 * Este script converte todos os arquivos MD da pasta .storybook/docs para MDX
 * e os move para a estrutura centralizada em .storybook/stories/docs/components
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Diretórios
const sourceDir = path.join(__dirname, '../.storybook/docs');
const targetDir = path.join(__dirname, '../.storybook/stories/docs/components');

// Função para converter o nome do arquivo de kebab-case para PascalCase
function kebabToPascalCase(str) {
  return str
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

// Função para verificar se um arquivo já foi convertido
function isAlreadyConverted(fileName) {
  const pascalCaseName = kebabToPascalCase(path.basename(fileName, '.md'));
  const targetFile = path.join(targetDir, `${pascalCaseName}.mdx`);
  return fs.existsSync(targetFile);
}

// Função para converter o conteúdo MD para MDX
function convertMdToMdx(content, componentName) {
  // Adicionar imports e Meta
  let mdxContent = `import { Meta } from '@storybook/blocks';\n\n\n<Meta title="Components/${componentName}" />\n\n`;
  
  // Adicionar o conteúdo original
  mdxContent += content;
  
  // Adicionar seção de exemplos se não existir
  if (!content.includes('## Exemplos')) {
    mdxContent += `\n\n## Exemplos\n\n### Exemplo Básico\n\n\`\`\`jsx\n<${componentName} />\n\`\`\`\n\n### Exemplo com Props\n\n\`\`\`jsx\n<${componentName} \n  // Adicione props específicas do componente aqui\n/>\n\`\`\``;
  }
  
  // Adicionar seção de importação se não existir
  if (!content.includes('## Importação') && !content.includes('```jsx\nimport')) {
    mdxContent += `\n\n## Importação\n\n\`\`\`jsx\nimport { ${componentName} } from '@porto/js-library-corp-hubv-porto-ocean';\n\`\`\``;
  }
  
  return mdxContent;
}

// Função para processar recursivamente os diretórios
function processDirectory(dir) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      // Processar subdiretórios
      processDirectory(itemPath);
    } else if (item.endsWith('.md')) {
      // Verificar se o arquivo já foi convertido
      if (isAlreadyConverted(item)) {
        console.log(`Pulando ${item} (já convertido)`);
        continue;
      }
      
      // Ler o conteúdo do arquivo MD
      const content = fs.readFileSync(itemPath, 'utf8');
      
      // Obter o nome do componente em PascalCase
      const componentName = kebabToPascalCase(path.basename(item, '.md'));
      
      // Converter o conteúdo para MDX
      const mdxContent = convertMdToMdx(content, componentName);
      
      // Escrever o arquivo MDX
      const targetFile = path.join(targetDir, `${componentName}.mdx`);
      fs.writeFileSync(targetFile, mdxContent);
      
      console.log(`Convertido: ${item} -> ${componentName}.mdx`);
    }
  }
}

// Criar o diretório de destino se não existir
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Iniciar o processamento
processDirectory(sourceDir);

console.log('Conversão dos arquivos MD restantes concluída!');
