#!/bin/bash

# Script para iniciar o Storybook com configurações otimizadas
echo "Limpando cache do Storybook..."
rm -rf node_modules/.cache/storybook

echo "Configurando variáveis de ambiente para suprimir avisos..."
export NODE_ENV=development
export STORYBOOK_DISABLE_WARNINGS=true
export SASS_QUIET_DEPS=true
export SASS_QUIET_DEPRECATION_WARNINGS=true
export NODE_OPTIONS="--no-warnings"

echo "Iniciando Storybook..."
npx storybook dev -p 6009 --no-open
