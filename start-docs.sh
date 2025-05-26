#!/bin/bash

# Script para iniciar o Storybook com foco na documentação Markdown
echo "Iniciando o Ocean Design System Documentation"
echo "=============================================="

# Limpar cache do Storybook para evitar problemas
echo "Limpando cache do Storybook..."
rm -rf node_modules/.cache/storybook

# Configurar variáveis de ambiente para suprimir avisos
echo "Configurando variáveis de ambiente..."
export NODE_ENV=development
export STORYBOOK_DISABLE_WARNINGS=true
export SASS_QUIET_DEPS=true
export SASS_QUIET_DEPRECATION_WARNINGS=true
export NODE_OPTIONS="--no-warnings"

# Iniciar o Storybook na porta 6009
echo "Iniciando Storybook na porta 6009..."
echo "Acesse http://localhost:6009 para visualizar a documentação"
npx storybook dev -p 6009

# Nota: Se a porta 6009 estiver em uso, o Storybook solicitará automaticamente
# para usar outra porta. Basta confirmar com 'Y'.
