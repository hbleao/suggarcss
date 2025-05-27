/**
 * Script para compilar componentes individualmente e corrigir a CLI
 * 
 * Este script realiza duas funções principais:
 * 1. Compila cada componente separadamente, o que permite:
 *    - Ignorar componentes problemáticos sem afetar os demais
 *    - Personalizar as configurações de build para cada componente se necessário
 *    - Melhorar a performance do processo de build
 * 2. Corrige o arquivo CLI compilado adicionando o shebang necessário
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

// Lista de componentes a serem ignorados (que têm problemas de compilação)
const IGNORED_COMPONENTS = [
  'Header',
  'HeaderAcquisitionFlow',
  'FaqLink'
];

// Diretório de componentes
const COMPONENTS_DIR = path.resolve(process.cwd(), 'src/components');

// Opções comuns para todos os componentes
const COMMON_OPTIONS = [
  '--format esm',
  '--dts',
  '--minify',
  '--external react',
  '--external react-dom',
  '--external sanitize-html',
  '--external aes-js',
  '--external crypto-js',
  '--external @/assets/icons/ic-logo-porto.svg'
].join(' ');

// Função principal
async function buildComponents() {
  console.log('🔍 Identificando componentes...');
  
  // Obter a lista de diretórios de componentes
  const componentDirs = fs.readdirSync(COMPONENTS_DIR)
    .filter(dir => {
      // Verificar se é um diretório
      const stats = fs.statSync(path.join(COMPONENTS_DIR, dir));
      return stats.isDirectory();
    })
    .filter(dir => !IGNORED_COMPONENTS.includes(dir));
  
  console.log(`📋 Encontrados ${componentDirs.length} componentes para compilar`);
  
  // Compilar cada componente individualmente
  let successCount = 0;
  let failCount = 0;
  
  for (const component of componentDirs) {
    const componentPath = path.join(COMPONENTS_DIR, component);
    const indexFile = fs.existsSync(path.join(componentPath, 'index.tsx')) 
      ? 'index.tsx' 
      : fs.existsSync(path.join(componentPath, 'index.ts'))
        ? 'index.ts'
        : null;
    
    if (!indexFile) {
      console.log(`⚠️ Componente ${component} não possui arquivo index.ts/tsx, ignorando...`);
      continue;
    }
    
    const entryPoint = path.join(componentPath, indexFile);
    const outDir = path.join(process.cwd(), 'dist/components', component);
    
    console.log(`\n🔨 Compilando componente: ${component}...`);
    
    try {
      execSync(`npx tsup ${entryPoint} ${COMMON_OPTIONS} --out-dir ${outDir}`, {
        stdio: 'inherit'
      });
      console.log(`✅ Componente ${component} compilado com sucesso!`);
      successCount++;
    } catch (error) {
      console.error(`❌ Erro ao compilar componente ${component}:`);
      failCount++;
    }
  }
  
  console.log('\n📊 Resumo da compilação:');
  console.log(`✅ ${successCount} componentes compilados com sucesso`);
  console.log(`❌ ${failCount} componentes falharam na compilação`);
  console.log(`⚠️ ${IGNORED_COMPONENTS.length} componentes ignorados`);
}

/**
 * Função para corrigir o arquivo CLI compilado
 * Adiciona o shebang no início do arquivo para permitir execução como comando
 */
function fixCliFile() {
  console.log('\n🔧 Corrigindo arquivo CLI...');
  
  const cliPath = path.join(process.cwd(), 'dist', 'cli.cjs');
  
  try {
    // Verifica se o arquivo existe
    if (!fs.existsSync(cliPath)) {
      console.log('⚠️ Arquivo CLI não encontrado em:', cliPath);
      return;
    }
    
    // Lê o conteúdo atual do arquivo CLI
    let content = fs.readFileSync(cliPath, 'utf8');
    
    // Verifica se o shebang já existe
    if (!content.startsWith('#!/usr/bin/env node')) {
      // Adiciona o shebang no início do arquivo
      content = '#!/usr/bin/env node\n' + content;
      
      // Escreve o conteúdo modificado de volta ao arquivo
      fs.writeFileSync(cliPath, content, 'utf8');
      
      // Torna o arquivo executável (chmod +x)
      try {
        fs.chmodSync(cliPath, '755');
      } catch (err) {
        console.log('⚠️ Aviso: Não foi possível tornar o arquivo executável. Você pode precisar fazer isso manualmente.');
      }
      
      console.log('✅ CLI corrigida com sucesso!');
    } else {
      console.log('ℹ️ CLI já está corrigida.');
    }
  } catch (err) {
    console.error('❌ Erro ao corrigir a CLI:', err);
  }
}

// Executar as funções principais
async function main() {
  try {
    await buildComponents();
    fixCliFile();
  } catch (error) {
    console.error('Erro durante o processo de build:', error);
    process.exit(1);
  }
}

main();
