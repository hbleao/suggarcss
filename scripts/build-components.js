/**
 * Script para compilar componentes individualmente
 * 
 * Este script compila cada componente separadamente, o que permite:
 * 1. Ignorar componentes problemáticos sem afetar os demais
 * 2. Personalizar as configurações de build para cada componente se necessário
 * 3. Melhorar a performance do processo de build
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

// Executar a função principal
buildComponents().catch(error => {
  console.error('Erro durante o processo de build:', error);
  process.exit(1);
});
