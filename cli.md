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
   ```typescript
   program
     .command("install")
     .argument("<component>", "Nome do componente para instalar")
     .option("-d, --dir <directory>", "Diretório de destino para instalar o componente", "")
     .action(async (component, options) => {
       // Lógica de instalação
     });
   ```
   - Define o comando `install`
   - Requer um argumento `component`
   - Adiciona uma opção opcional `--dir` para especificar o diretório de destino

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

## Exemplo de Uso

```bash
# Instalar um componente no projeto atual
node dist/cli/cli.js install button

# Instalar um componente em um diretório específico
node dist/cli/cli.js install input --dir /caminho/para/seu/projeto
```
