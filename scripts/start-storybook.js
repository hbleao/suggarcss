#!/usr/bin/env node

// Script para iniciar o Storybook ignorando avisos de depreciação do Sass
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

// Obter o diretório atual usando ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configurar variáveis de ambiente para suprimir avisos
process.env.SASS_QUIET_DEPS = 'true';
process.env.SASS_QUIET_DEPRECATION_WARNINGS = 'true';
process.env.NODE_OPTIONS = '--no-warnings';

// Caminho para o binário do Storybook
const storybookBin = resolve(__dirname, '../node_modules/.bin/storybook');

// Iniciar o Storybook com as opções necessárias
const storybook = spawn(storybookBin, ['dev', '-p', '6006'], {
  stdio: 'inherit',
  env: process.env
});

// Lidar com eventos do processo
storybook.on('error', (err) => {
  console.error('Erro ao iniciar o Storybook:', err);
  process.exit(1);
});

storybook.on('exit', (code) => {
  process.exit(code);
});

// Lidar com sinais para encerrar corretamente
process.on('SIGINT', () => {
  storybook.kill('SIGINT');
});

process.on('SIGTERM', () => {
  storybook.kill('SIGTERM');
});
