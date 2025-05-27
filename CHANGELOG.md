# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [1.0.1] - 2025-05-26

### ✨ Novos recursos

#### Documentação com Storybook

- Adicionado Storybook para documentação interativa de componentes
- Configurados add-ons para Controls, Actions, Accessibility, Viewport e Docs
- Implementada documentação MDX para componentes, hooks e fundamentos do design system
- Adicionadas stories para visualização e teste interativo de componentes
- Configurada construção de versão estática do Storybook para hospedagem

### 🐛 Correções de Bugs

#### Correções de Testes de Componentes

##### Column Component
- Atualizado para verificar nomes de classes em vez de estilos diretos
- Corrigido o teste para corresponder à implementação real do componente

##### Card Component
- Corrigida a lógica de aplicação de nomes de classe para garantir que as classes corretas sejam aplicadas nos testes
- Ajustada a implementação para corresponder às expectativas dos testes

##### Footer Component
- Substituídas tags `<a>` por componentes `<Link>` para evitar problemas com elementos HTML sendo usados como filhos React
- Corrigido o acesso a arrays potencialmente indefinidos com verificações adequadas
- Adicionados mocks para os componentes Link, Button, Grid, Flex e Modal nos testes
- Adicionado mock para o componente Column e ícones para garantir renderização adequada

##### Header Component
- Corrigido o tipo de `selectedCategory` para usar `Category` em vez de `Ca`
- Ajustada a inicialização de subcategoria para evitar erros de tipo
- Atualizado para usar `getAllByTestId` com um padrão regex para encontrar componentes ShowOnDevice

##### HeaderAcquisitionFlow Component
- Adicionada importação do Jest DOM para fornecer matchers personalizados
- Corrigidos os testes para simular corretamente cliques nos elementos de imagem dentro dos botões
- Usado encadeamento opcional para acessar elementos com segurança e evitar erros de TypeScript

##### HeaderToolbar Component
- Corrigido o mapeamento de categorias e subcategorias para especificar tipos adequados
- Resolvidos erros de tipo implícito 'any'

##### Configuração de Testes
- Adicionados mocks para arquivos SVG para evitar erros de token inesperado
- Configurados mocks adequados para next/navigation e useSearchParams

##### Resultado
- Todos os 499 testes agora passam com sucesso
- Melhorada a cobertura de testes em vários componentes
- Resolvidos problemas de tipagem TypeScript
- Corrigidos erros de lint relacionados a acessibilidade e práticas recomendadas

## [1.0.0] - 2025-05-22

### Atualização na API de todos os componentes - BREAKING CHANGE

Todos os componentes sofreram alterações na API, testes e documentação

### ✨ Novos recursos

- Criado novo Hook useAsync
- Criado novo Hook useCookie
- Criado novo Hook useCopyToClipboard
- Criado novo Hook useDebounce
- Criado novo Hook useEventListener
- Criado novo Hook useForm
- Criado novo Hook useIntersectionObserver
- Criado novo Hook useLocalStorage
- Criado novo Hook useMediaQuery
- Criado novo Hook useOnScreen
- Criado novo Hook OutsideClick
- Criado novo Hook Previous
- Criado novo Hook useToggle
- Criado novo Hook useTracking
- Criado novo Hook useTryCatch
- Criado novo Hook useWindownSize
- Criado novo Utils clsx
- Criado novo Utils encrypt
- Criado novo Utils masks
- Criado novo Utils sanitize

### 🚀 Melhorias

- Todos os componentes receberam testes unitários
- Todos os componentes foram documentados com JSDOC

### 🐛 Correções

- Ajustado tokens css

## [0.0.10] - 2025-04-11

### Componente Carousel

Ajuste no componente carousel

### 🐛 Correções

- Ajustado as variaveis do arquivo styles.scss

## [0.0.9] - 2025-04-11

### Novos componentes

Criado novos componentes disponibilizados

### ✨ Novos recursos

- Novo componente Button
- Novo componente Tooltip
- Novo componente Grid
- Novo componente Row
- Novo componente Modal
- Novo componente Notification
- Novo componente Carousel

### 🚀 Melhorias

- Adicionado loader do componente Input
- Adicionado loader do componente Dropdown
- Adicionado loader do componente Button

## [0.0.8] - 2025-04-10

### Novos componentes e ajuste na responsividade

Adição melhorias significativas na CLI.

### ✨ Novos recursos

- Criada nova option no cli de instalar todos os componentes
- Criada nova option no cli de criar relase notes

## [0.0.7] - 2025-04-11

### Novos componentes e melhorias na CLI

Adição de novos componentes e melhorias significativas na CLI.

### ✨ Novos recursos

- Novo componente Input com suporte a diferentes variantes
- Adição de tema escuro para todos os componentes

### 🚀 Melhorias

- Melhor desempenho na instalação de componentes
- Interface da CLI mais intuitiva

### 🐛 Correções

- Correção de problemas de estilo em dispositivos móveis

## [0.0.6] - 2025-04-11

### Melhorias na CLI

Adição do comando installAll para facilitar a instalação de todos os componentes de uma vez.

### ✨ Novos recursos

- Novo comando 'installAll' para instalar todos os componentes implementados de uma só vez
- Adição de comando para visualizar release notes

### 🚀 Melhorias

- Melhor tratamento de erros durante a instalação de componentes
- Feedback visual aprimorado durante a instalação

## [0.0.5] - 2025-04-01

### Componente Chip

### ✨ Novos recursos

- Adição do componente Chip
- Suporte para diferentes variantes de Chip

### 🚀 Melhorias

- Melhorias na documentação dos componentes

## [0.0.4] - 2025-03-15

### Comando de listagem

### ✨ Novos recursos

- Novo comando 'list' para exibir todos os componentes disponíveis

### 🐛 Correções

- Correção do caminho do binário da CLI

## [0.0.3] - 2025-03-01

### Melhorias na CLI

### 🚀 Melhorias

- Migração para @inquirer/prompts para melhor interatividade
- Adição de confirmação antes da instalação

### 🐛 Correções

- Correção na detecção do diretório de componentes

## [0.0.2] - 2025-02-15

### Componente Button

### ✨ Novos recursos

- Adição do componente Button
- Suporte para diferentes variantes de Button

### 🐛 Correções

- Correção na estrutura de arquivos do pacote

## [0.0.1] - 2025-02-01

### Primeira versão

Lançamento inicial da biblioteca SugarCSS com CLI básica.

### ✨ Novos recursos

- CLI básica para instalação de componentes
- Estrutura inicial do projeto

