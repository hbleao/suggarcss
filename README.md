# Documentação da CLI do SugarCSS

A CLI (Command Line Interface) que criamos para o SugarCSS é uma ferramenta que permite aos usuários instalar componentes React com SASS em seus projetos. Este documento explica como ela funciona e as bibliotecas que utiliza.

## Estrutura Básica da CLI

A CLI é construída usando o padrão de design de linha de comando, onde definimos comandos, argumentos e opções que o usuário pode utilizar para interagir com a ferramenta. O arquivo principal está em `src/cli/cli.ts`.

## Bibliotecas Utilizadas

### 1. Commander.js

```typescript
import { Command } from "commander";
```

- **Função**: Commander é uma biblioteca popular para criar interfaces de linha de comando em Node.js.
- **Como é usada**: Usamos para definir comandos, argumentos e opções da CLI.
- **Recursos principais**:
  - Definição de comandos (ex: `install`)
  - Definição de argumentos (ex: `<component>`)
  - Definição de opções (ex: `--dir`)
  - Parsing automático dos argumentos da linha de comando
  - Geração de mensagens de ajuda

### 2. fs-extra

```typescript
import fs from "fs-extra";
```

- **Função**: Extensão do módulo `fs` nativo do Node.js com métodos adicionais e promessas.
- **Como é usada**: Para operações de sistema de arquivos como copiar componentes.
- **Recursos principais**:
  - `ensureDir`: Cria diretórios recursivamente se não existirem
  - `copy`: Copia arquivos e diretórios de forma recursiva
  - Versões com Promise de todas as operações de arquivo

### 3. path e url (Node.js nativo)

```typescript
import path from "node:path";
import { fileURLToPath } from "node:url";
```

- **Função**: Módulos nativos do Node.js para manipulação de caminhos e URLs.
- **Como são usados**: Para resolver caminhos de arquivos e diretórios.
- **Recursos principais**:
  - `path.join`: Combina segmentos de caminho
  - `path.dirname`: Obtém o diretório pai de um caminho
  - `fileURLToPath`: Converte uma URL de arquivo em um caminho de sistema de arquivos

## Fluxo de Execução da CLI

1. **Inicialização**:
   ```typescript
   const program = new Command();
   const __filename = fileURLToPath(import.meta.url);
   const __dirname = path.dirname(__filename);
   ```
   - Cria uma nova instância do Commander
   - Obtém o caminho do arquivo atual (importante para ESM)

2. **Configuração do Programa**:
   ```typescript
   program
     .name("sugarcss")
     .description("Instala componentes React com Sass do @sugarcss/react")
     .version("0.1.0");
   ```
   - Define o nome, descrição e versão da CLI

3. **Definição de Comandos**:

   A CLI do SugarCSS oferece os seguintes comandos:

   ### a. Comando `install`

   Instala um componente individual no projeto.

   ```typescript
   program
     .command("install")
     .description("Instala um componente individual dentre todos os componentes disponíveis")
     .argument("[component]", "Nome do componente para instalar (opcional)")
     .option("-d, --dir <directory>", "Diretório de destino para instalar o componente", "")
   ```

   **Parâmetros:**
   - `component` (opcional): Nome do componente a ser instalado. Se não for fornecido, será exibida uma interface interativa para seleção.
   - `-d, --dir <directory>` (opcional): Diretório de destino para instalar o componente. Se não for fornecido, será solicitado interativamente.

   ### b. Comando `installAll`

   Instala todos os componentes implementados de uma só vez.

   ```typescript
   program
     .command("installAll")
     .description("Instala todos os componentes implementados")
     .option("-d, --dir <directory>", "Diretório de destino para instalar os componentes", "")
   ```

   **Parâmetros:**
   - `-d, --dir <directory>` (opcional): Diretório de destino para instalar os componentes. Se não for fornecido, será solicitado interativamente.

   ### c. Comando `install-styles`

   Instala todos os estilos e assets do projeto.

   ```typescript
   program
     .command("install-styles")
     .description("Instala os estilos e assets do projeto")
     .option("-d, --dir <directory>", "Diretório de destino para instalar os estilos", "")
   ```

   **Parâmetros:**
   - `-d, --dir <directory>` (opcional): Diretório de destino para instalar os estilos. Se não for fornecido, será solicitado interativamente.

   ### d. Comando `install-hooks`

   Instala todos os hooks utilitários do projeto.

   ```typescript
   program
     .command("install-hooks")
     .description("Instala os hooks utilitários do projeto")
     .option("-d, --dir <directory>", "Diretório de destino para instalar os hooks", "")
   ```

   **Parâmetros:**
   - `-d, --dir <directory>` (opcional): Diretório de destino para instalar os hooks. Se não for fornecido, será solicitado interativamente.

   ### e. Comando `install-utils`

   Instala todas as funções utilitárias do projeto.

   ```typescript
   program
     .command("install-utils")
     .description("Instala as funções utilitárias do projeto")
     .option("-d, --dir <directory>", "Diretório de destino para instalar os utilitários", "")
   ```

   **Parâmetros:**
   - `-d, --dir <directory>` (opcional): Diretório de destino para instalar os utilitários. Se não for fornecido, será solicitado interativamente.

   ### f. Comando `list`

   Lista todos os componentes disponíveis e seu status de implementação.

   ```typescript
   program
     .command("list")
     .description("Lista todos os componentes disponíveis")
   ```

   ### g. Comando `release-notes`

   Exibe as notas de versão do projeto.

   ```typescript
   program
     .command("release-notes")
     .description("Exibe as notas de versão")
     .argument("[version]", "Versão específica para exibir (opcional)")
     .option("-a, --all", "Exibe todas as versões", false)
   ```

   **Parâmetros:**
   - `version` (opcional): Versão específica para exibir. Se não for fornecido, será exibida a versão mais recente.
   - `-a, --all` (opcional): Exibe um resumo de todas as versões disponíveis.

4. **Lógica de Instalação**:
   - Verifica se o componente solicitado existe na lista de componentes disponíveis
   - Verifica se o componente já foi implementado
   - Calcula os caminhos de origem e destino
   - Cria o diretório de destino se não existir
   - Copia os arquivos do componente para o diretório de destino

5. **Execução do Programa**:
   ```typescript
   program.parse();
   ```
   - Analisa os argumentos da linha de comando e executa o comando apropriado

## Sistema de Build (tsup)

Além da CLI, usamos o `tsup` (baseado em esbuild) para construir a biblioteca:

- **Configuração**: Definida em `tsup.config.ts`
- **Funcionalidades**:
  - Compilação de TypeScript para JavaScript
  - Geração de arquivos de declaração (.d.ts)
  - Minificação de código
  - Plugin personalizado para processar arquivos SCSS

## Guia Detalhado de Uso da CLI

A CLI do Porto Ocean foi projetada para facilitar a integração dos componentes, estilos e utilitários em seu projeto. Abaixo, você encontrará instruções detalhadas sobre como usar cada comando.

### 1. Instalação de Recursos

#### Comando: `install`

O comando `install` permite instalar componentes, estilos, hooks e utilitários da biblioteca. Cada tipo de recurso pode ser instalado usando uma opção específica.

##### Instalação de Componentes

```bash
# Modo interativo (apresenta uma lista de componentes disponíveis)
npx porto-ocean install

# Instalar um componente específico
npx porto-ocean install Button

# Instalar um componente específico usando a opção --component
npx porto-ocean install --component Button

# Instalar todos os componentes implementados
npx porto-ocean install --all-components

# Instalar em um diretório específico
npx porto-ocean install Button --dir ./meu-projeto/src/components
```

> **Nota:** Você pode especificar apenas uma opção por vez (`--all-components`, `--styles`, `--hooks` ou `--utils`)

**Fluxo interativo:**
1. Se nenhum componente for especificado, a CLI mostrará uma lista de todos os componentes disponíveis
2. Após selecionar um componente, você pode especificar o diretório de destino
3. A CLI confirmará a instalação antes de prosseguir

**Estrutura de diretórios após instalação:**
```
src/components/ui/Button/
  Button.tsx
  styles.scss
  types.ts
  index.ts
```

**Exemplo de uso após instalação:**
```tsx
import { Button } from '../components/ui/Button';

function MeuComponente() {
  return (
    <Button variant="primary">Clique aqui</Button>
  );
}
```

##### Instalação de Estilos

```bash
# Instalar apenas os estilos base do projeto
npx porto-ocean install --styles

# Especificar diretório de destino
npx porto-ocean install --styles --dir ./src/styles
```

**Fluxo de instalação:**
1. Se nenhum diretório for especificado, a CLI solicitará o diretório de destino
2. A CLI confirmará a instalação antes de prosseguir
3. Os arquivos de estilo serão copiados para o diretório especificado

**Estrutura de diretórios após instalação:**
```
src/styles/
  variables.scss
  mixins.scss
  reset.scss
  styles.scss
```

**Exemplo de uso após instalação:**
```scss
// No seu arquivo principal de estilos
@import "./styles/styles.scss";
```

##### Instalação de Hooks

```bash
# Instalar todos os hooks disponíveis
npx porto-ocean install --hooks

# Especificar diretório de destino
npx porto-ocean install --hooks --dir ./src/hooks
```

**Fluxo de instalação:**
1. Se nenhum diretório for especificado, a CLI solicitará o diretório de destino
2. A CLI confirmará a instalação antes de prosseguir
3. Todos os hooks serão copiados para o diretório especificado

**Estrutura de diretórios após instalação:**
```
src/hooks/
  useMediaQuery.ts
  useOutsideClick.ts
  useToggle.ts
  usePrevious.ts
  useWindowSize.ts
  useOnScreen.ts
  useCookie.ts
  index.ts
```

**Exemplo de uso após instalação:**
```tsx
import { useMediaQuery, useOutsideClick } from '../hooks';

function MeuComponente() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const ref = useOutsideClick(() => console.log('Clique fora do elemento'));
  
  return (
    <div ref={ref}>
      {isMobile ? 'Visão mobile' : 'Visão desktop'}
    </div>
  );
}
```

##### Instalação de Utilitários

```bash
# Instalar todas as funções utilitárias
npx porto-ocean install --utils

# Especificar diretório de destino
npx porto-ocean install --utils --dir ./src/utils
```

**Fluxo de instalação:**
1. Se nenhum diretório for especificado, a CLI solicitará o diretório de destino
2. A CLI confirmará a instalação antes de prosseguir
3. Todas as funções utilitárias serão copiadas para o diretório especificado

**Estrutura de diretórios após instalação:**
```
src/utils/
  clsx.ts
  formatDate.ts
  sanitize/
    index.ts
  encrypt/
    index.ts
```

**Exemplo de uso após instalação:**
```tsx
import { clsx } from '../utils/clsx';

function MeuComponente({ isActive }) {
  return (
    <div className={clsx('base-class', isActive && 'active-class')}>
      Conteúdo
    </div>
  );
}
```

### 2. Listagem de Componentes

#### Comando: `list`

O comando `list` exibe todos os componentes disponíveis na biblioteca, indicando quais estão implementados e prontos para uso.

```bash
# Listar todos os componentes
npx porto-ocean list
```

**Resultado:**
A saída mostrará uma lista de todos os componentes, com indicação visual de quais estão implementados e quais estão em desenvolvimento.

```
  Button    ✅ Implementado
  Card      ✅ Implementado
  Checkbox  ✅ Implementado
  Dialog    ✅ Implementado
  Footer    ✅ Implementado
  Header    ⚠️ Em desenvolvimento
  Input     ✅ Implementado
  Select    ✅ Implementado
  Tooltip   ✅ Implementado

Total: 9 componentes (8 implementados)
```

### 3. Notas de Versão

#### Comando: `release-notes`

O comando `release-notes` permite visualizar as notas de versão da biblioteca.

```bash
# Ver a versão mais recente
npx porto-ocean release-notes

# Ver uma versão específica
npx porto-ocean release-notes 0.0.5

# Listar todas as versões
npx porto-ocean release-notes --all
```

**Resultado:**
A saída mostrará as notas de versão formatadas, incluindo novas funcionalidades, correções e melhorias para a versão especificada.

```
🚀 Versão 0.1.0 - 22/05/2025
Melhoria da CLI com novos comandos e refatoração do código

✨ Novos recursos:
  • Comando install --component para instalar componentes específicos
  • Comando install --all-components para instalar todos os componentes
  • Comando install --styles para instalar estilos base
  • Comando install --hooks para instalar hooks
  • Comando install --utils para instalar utilitários

🐛 Correções de bugs:
  • Correção da importação de arquivos SVG
  • Correção da importação de arquivos SCSS

🔧 Melhorias:
  • Refatoração do código da CLI para melhor manutenção
  • Melhoria na documentação dos comandos
```

### 4. Processo de Criação de Release

Para criar uma nova release da biblioteca, siga estes passos:

1. Adicione uma nova entrada no array `releaseHistory` no arquivo `src/cli/release-notes.ts`
2. Atualize a versão no arquivo `package.json`
3. Execute `npm run update-changelog` para atualizar o CHANGELOG.md
4. Execute `npm run build` para compilar a biblioteca
5. Publique a nova versão com `npm publish`

### 5. Estrutura do Código da CLI

A CLI do Porto Ocean foi refatorada para uma estrutura modular, facilitando a manutenção e extensão:

```
src/cli/
  ├── cli.ts                # Ponto de entrada principal da CLI
  ├── utils.ts              # Funções utilitárias comuns
  ├── release-notes.ts      # Definições das notas de versão
  └── commands/            # Diretório com os comandos separados
      ├── index.ts          # Exportações de todos os comandos
      ├── installComponent.ts # Lógica de instalação de componentes
      ├── installStyles.ts   # Lógica de instalação de estilos
      ├── installHooks.ts    # Lógica de instalação de hooks
      ├── installUtils.ts    # Lógica de instalação de utilitários
      ├── listComponents.ts  # Lógica de listagem de componentes
      └── releaseNotes.ts    # Lógica de exibição de notas de versão
```

Esta estrutura modular facilita a adição de novos comandos e a manutenção do código existente.

**Estrutura de diretórios:**
```
src/
  styles/
    design-tokens/
    mixins/
    themes/
    reset.scss
    variables.scss
```

**Quando usar:** Execute este comando no início do projeto para configurar a base de estilos antes de instalar componentes individuais.

### 4. Instalação de Hooks

#### Comando: `install-hooks`

O comando `install-hooks` instala todos os hooks React utilitários da biblioteca.

```bash
# Instalar hooks no diretório atual
npx porto-ocean install-hooks

# Instalar hooks em um diretório específico
npx porto-ocean install-hooks --dir ./meu-projeto
```

**Hooks disponíveis:**
- `useMediaQuery` - Para detecção de breakpoints responsivos
- `useOutsideClick` - Para detectar cliques fora de um elemento
- `useLocalStorage` - Para persistir dados no localStorage
- `useTheme` - Para gerenciar temas claro/escuro
- E outros hooks utilitários

**Estrutura de diretórios criada:**
```
src/
  hooks/
    useMediaQuery.ts
    useOutsideClick.ts
    useLocalStorage.ts
    useTheme.ts
    index.ts
```

**Exemplo de uso após instalação:**
```tsx
import { useMediaQuery } from '../hooks/useMediaQuery';

function MeuComponente() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return (
    <div>
      {isMobile ? 'Visão mobile' : 'Visão desktop'}
    </div>
  );
}
```

### 5. Instalação de Utilitários

#### Comando: `install-utils`

O comando `install-utils` instala todas as funções utilitárias da biblioteca.

```bash
# Instalar utilitários no diretório atual
npx porto-ocean install-utils

# Instalar utilitários em um diretório específico
npx porto-ocean install-utils --dir ./meu-projeto
```

**Utilitários disponíveis:**
- `clsx` - Para composição de nomes de classe CSS
- `formatters` - Para formatação de dados (datas, moedas, etc.)
- `validators` - Para validação de dados (email, CPF, etc.)
- `animations` - Funções auxiliares para animações

**Estrutura de diretórios criada:**
```
src/
  utils/
    clsx.ts
    formatters.ts
    validators.ts
    animations.ts
    index.ts
```

**Exemplo de uso após instalação:**
```tsx
import { clsx } from '../utils/clsx';

function MeuBotao({ variant, size, className }) {
  return (
    <button 
      className={clsx(
        'botao',
        `botao--${variant}`,
        `botao--${size}`,
        className
      )}
    >
      Clique aqui
    </button>
  );
}
```

### 6. Listagem de Componentes

#### Comando: `list`

O comando `list` exibe todos os componentes disponíveis na biblioteca e seu status de implementação.

```bash
npx porto-ocean list
```

**Saída de exemplo:**
```
Componentes disponíveis no @porto/js-library-corp-hubv-porto-ocean:

✅ button - Implementado
✅ chip - Implementado
✅ accordion - Implementado
❌ dropdown - Não implementado ainda
❌ modal - Não implementado ainda
```

**Quando usar:** Use este comando para verificar quais componentes estão disponíveis antes de tentar instalá-los.

### 7. Notas de Versão

#### Comando: `release-notes`

O comando `release-notes` exibe as notas de versão do projeto.

```bash
# Ver a versão mais recente
npx porto-ocean release-notes

# Ver uma versão específica
npx porto-ocean release-notes 0.0.8

# Listar todas as versões disponíveis
npx porto-ocean release-notes --all
```

**Quando usar:** Use este comando para verificar as mudanças em cada versão da biblioteca, especialmente ao atualizar para uma nova versão.

### Fluxo de Trabalho Recomendado

Para obter o melhor resultado ao integrar a biblioteca em seu projeto, recomendamos seguir este fluxo de trabalho:

1. **Iniciar com os estilos base:**
   ```bash
   npx porto-ocean install-styles
   ```

2. **Instalar utilitários e hooks:**
   ```bash
   npx porto-ocean install-utils
   npx porto-ocean install-hooks
   ```

3. **Instalar componentes específicos conforme necessário:**
   ```bash
   npx porto-ocean install button
   npx porto-ocean install chip
   ```
   
4. **Ou instalar todos os componentes de uma vez:**
   ```bash
   npx porto-ocean installAll
   ```

5. **Verificar as notas de versão para atualizações:**
   ```bash
   npx porto-ocean release-notes
   ```

### Processo de Criação de uma Nova Release

Para criar e publicar uma nova versão do pacote, siga estes passos:

1. **Atualizar o histórico de versões**:
   - Edite o arquivo `src/cli/release-notes.ts`
   - Adicione uma nova entrada no array `releaseHistory` no topo da lista
   - Inclua a versão, data, título e mudanças categorizadas (features, fixes, etc.)

2. **Atualizar a versão no package.json**:
   ```bash
   npm version patch # para atualizações pequenas (0.0.x)
   npm version minor # para novos recursos (0.x.0)
   npm version major # para mudanças significativas (x.0.0)
   ```

3. **Gerar o CHANGELOG atualizado**:
   ```bash
   npm run update-changelog
   ```

4. **Compilar o pacote**:
   ```bash
   npm run build
   ```

5. **Testar localmente (opcional)**:
   ```bash
   npm pack
   ```
   Isso criará um arquivo `.tgz` que você pode instalar em outro projeto para testar.

6. **Publicar no npm**:
   ```bash
   npm publish
   ```

### Dicas e Solução de Problemas

- **Diretório não encontrado?** Certifique-se de que o diretório de destino existe antes de executar os comandos.

- **Componente não encontrado?** Use `npx porto-ocean list` para verificar os componentes disponíveis.

- **Conflitos de arquivo?** A CLI nunca sobrescreve arquivos existentes sem confirmação.

- **Problemas com importações?** Certifique-se de que seu projeto está configurado para suportar TypeScript e SCSS.

- **Executando em CI/CD?** Use a opção `--dir` para evitar prompts interativos em ambientes automatizados.

- **Erros de compilação?** Alguns componentes podem falhar na compilação devido a dependências específicas. Use o comando `build:components` para compilar apenas os componentes que funcionam corretamente.

### Desenvolvimento e Testes

```bash
# Testar a CLI localmente durante o desenvolvimento
node dist/cli/cli.js install button

# Executar a CLI após a compilação
npm run test:cli
```
