#!/usr/bin/env node

// Script simples para iniciar o Storybook ignorando o cache
import { execSync } from 'node:child_process';

console.log('Iniciando Storybook com cache limpo...');

try {
  // Limpar o cache do Storybook
  execSync('rm -rf node_modules/.cache/storybook', { stdio: 'inherit' });
  
  // Executar o Storybook com opções para ignorar avisos
  execSync(
    'SASS_QUIET_DEPS=true SASS_QUIET_DEPRECATION_WARNINGS=true NODE_OPTIONS="--no-warnings" npx storybook dev -p 6006', 
    { stdio: 'inherit' }
  );
} catch (error) {
  console.error('Erro ao executar o Storybook:', error);
  process.exit(1);
}
