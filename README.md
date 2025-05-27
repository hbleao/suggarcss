# SugarCSS - Biblioteca de Componentes React

O SugarCSS é uma biblioteca de componentes React com SASS que fornece uma série de componentes reutilizáveis para construção de interfaces de usuário modernas. Este documento explica como utilizar a biblioteca, executar testes e visualizar a documentação interativa.

## Testes

O projeto utiliza Jest e React Testing Library para testes de componentes. Todos os componentes possuem testes unitários abrangentes para garantir a qualidade e o funcionamento correto.

### Executando Testes

Para executar todos os testes:

```bash
npm run test
```

Para executar testes com cobertura:

```bash
npm run test:coverage
```

Para executar testes em modo de observação (watch mode):

```bash
npm run test:watch
```

### Estrutura de Testes

Cada componente possui seu próprio arquivo de teste (`index.spec.tsx`) localizado no mesmo diretório do componente. Os testes verificam:

- Renderização correta do componente
- Comportamento com diferentes props
- Interações do usuário
- Acessibilidade

## Storybook

O projeto utiliza Storybook para documentação interativa dos componentes. O Storybook permite visualizar e interagir com os componentes em diferentes estados.

### Executando o Storybook

```bash
npm run storybook
```

O Storybook estará disponível em `http://localhost:6006`.

### Estrutura do Storybook

- `.storybook/stories/Components/` - Documentação de componentes
- `.storybook/stories/Foundations/` - Documentação de fundamentos do design system
- `.storybook/stories/hooks/` - Documentação dos hooks personalizados
- `.storybook/stories/` - Páginas de introdução e boas-vindas

## Documentação da CLI do Porto Ocean

A CLI (Command Line Interface) que criamos para o Porto Ocean é uma ferramenta que permite aos usuários instalar componentes React com SASS em seus projetos. Este documento explica como ela funciona e as bibliotecas que utiliza.

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
     .name("porto-ocean")
     .description("Instala componentes React com Sass do @porto/js-library-corp-hubv-porto-ocean")
     .version("0.1.0");
   ```
   - Define o nome, descrição e versão da CLI

3. **Definição de Comandos**:

   A CLI do porto-ocean os seguintes comandos:
F
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

## Storybook

O projeto utiliza Storybook para documentar e testar visualmente os componentes. O Storybook permite visualizar os componentes em diferentes estados e interagir com eles em um ambiente isolado.

### Executando o Storybook

Para iniciar o servidor de desenvolvimento do Storybook, execute o seguinte comando:

```bash
npm run storybook
```

Isto iniciará o Storybook em `http://localhost:6006` (ou outra porta, caso a 6006 esteja ocupada).

### Estrutura do Storybook

As stories do Storybook estão organizadas na pasta `.storybook/stories` seguindo a estrutura:

- `.storybook/stories/components/` - Stories para componentes individuais
- `.storybook/stories/Foundations/` - Documentação de fundamentos do design system
- `.storybook/stories/` - Páginas de introdução e boas-vindas

## Guia Detalhado de Uso da CLI

A CLI do Porto Ocean foi projetada para facilitar a integração dos componentes, estilos e utilitários em seu projeto. Abaixo, você encontrará instruções detalhadas sobre como usar cada comando.

### 1. Instalação de Componentes Individuais

#### Comando: `install`

O comando `install` permite instalar componentes individuais de forma interativa ou direta.

```bash
# Modo interativo (recomendado para iniciantes)
npx porto-ocean install

# Instalar um componente específico
npx porto-ocean install button

# Instalar um componente em um diretório específico
npx porto-ocean install chip --dir ./meu-projeto/src/components
```

**Fluxo interativo:**
1. Se nenhum componente for especificado, a CLI mostrará uma lista de todos os componentes disponíveis
2. Após selecionar o componente, você poderá escolher o diretório de destino
3. A CLI confirmará a instalação antes de prosseguir
4. Os arquivos do componente serão copiados para o diretório especificado

**Dica:** Use a opção `--dir` para especificar o diretório de destino diretamente, evitando a etapa interativa.

### 2. Instalação de Todos os Componentes

#### Comando: `installAll`

O comando `installAll` permite instalar todos os componentes implementados de uma só vez.

```bash
# Instalar todos os componentes no diretório atual
npx porto-ocean installAll

# Instalar todos os componentes em um diretório específico
npx porto-ocean installAll --dir ./meu-projeto/src/components
```

**Quando usar:** Este comando é ideal quando você está iniciando um novo projeto e deseja importar todos os componentes disponíveis de uma só vez.

**Nota:** Apenas os componentes já implementados serão instalados. Use o comando `list` para ver quais componentes estão disponíveis.

### 3. Instalação de Estilos e Assets

#### Comando: `install-styles`

O comando `install-styles` instala todos os estilos e assets do projeto, incluindo variáveis CSS, tokens de design, reset CSS e utilitários de estilo.

```bash
# Instalar estilos no diretório atual
npx porto-ocean install-styles

# Instalar estilos em um diretório específico
npx porto-ocean install-styles --dir ./meu-projeto
```

**O que é instalado:**
- Variáveis CSS e tokens de design (cores, espaçamentos, tipografia)
- Reset CSS para normalização entre navegadores
- Mixins e funções SCSS utilitárias
- Temas (claro/escuro)

**Estrutura de diretórios criada:**
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
