# Fluxo Completo do Ocean Design System

## 1. Arquitetura Geral (Diagrama C4)

```plantuml
@startuml "Ocean Complete Flow"
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

Person(developer, "Desenvolvedor", "Usuário da biblioteca Ocean")

System_Boundary(ocean, "Ocean Design System") {
    Container(build_system, "Sistema de Build", "Node.js/tsup", "Compila e prepara os arquivos para distribuição")

    Container(cli, "CLI (ocean)", "Node.js/TypeScript", "Interface de linha de comando para instalação de recursos")

    Container_Boundary(commands, "Comandos CLI") {
        Component(installComponent, "installComponent", "TypeScript", "Instala componentes React específicos")
        Component(installStyles, "installStyles", "TypeScript", "Instala estilos base do projeto")
        Component(installHooks, "installHooks", "TypeScript", "Instala hooks React personalizados")
        Component(installUtils, "installUtils", "TypeScript", "Instala funções utilitárias")
        Component(listComponents, "listComponents", "TypeScript", "Lista todos os componentes disponíveis")
        Component(releaseNotes, "releaseNotes", "TypeScript", "Exibe notas de versão")
    }

    Container_Boundary(utils, "Utilitários CLI") {
        Component(getAvailableComponents, "getAvailableComponents", "TypeScript", "Retorna lista de componentes disponíveis")
        Component(getImplementedComponents, "getImplementedComponents", "TypeScript", "Retorna lista de componentes implementados")
        Component(findResourcePath, "findResourcePath", "TypeScript", "Encontra o caminho para um recurso específico")
    }

    Container_Boundary(resources, "Recursos") {
        Component(components, "Components", "React/TypeScript", "Componentes React reutilizáveis")
        Component(styles, "Styles", "SCSS", "Estilos base e temas")
        Component(hooks, "Hooks", "React/TypeScript", "Custom hooks React")
        Component(utilsFunctions, "Utils", "TypeScript", "Funções utilitárias")
    }

    Container_Boundary(scripts, "Scripts de Build") {
        Component(build_components, "build-components.js", "Node.js", "Compila componentes individualmente")
        Component(copy_files, "copy-files.js", "Node.js", "Copia e prepara arquivos para distribuição")
        Component(update_changelog, "update-changelog.js", "Node.js", "Atualiza o changelog do projeto")
    }

    Container(dist, "Pacote Distribuído", "npm package", "Versão compilada pronta para publicação")
    Container(projectDir, "Diretório do Projeto", "Sistema de Arquivos", "Projeto do usuário onde os recursos serão instalados")
}

Rel(developer, build_system, "Executa scripts de build")
Rel(developer, cli, "Executa comandos via terminal")

Rel(build_system, build_components, "Invoca para compilar componentes")
Rel(build_system, copy_files, "Invoca para preparar pacote")
Rel(build_system, update_changelog, "Invoca para atualizar changelog")

Rel(build_components, components, "Compila")
Rel(copy_files, resources, "Copia para dist")
Rel(build_system, dist, "Gera")

Rel(cli, installComponent, "Invoca quando solicitado")
Rel(cli, installStyles, "Invoca quando --styles é especificado")
Rel(cli, installHooks, "Invoca quando --hooks é especificado")
Rel(cli, installUtils, "Invoca quando --utils é especificado")
Rel(cli, listComponents, "Invoca quando comando list é usado")
Rel(cli, releaseNotes, "Invoca quando comando release-notes é usado")

Rel(installComponent, getAvailableComponents, "Usa para listar componentes")
Rel(installComponent, getImplementedComponents, "Usa para verificar componentes disponíveis")
Rel(installComponent, findResourcePath, "Usa para localizar componentes")
Rel(installStyles, findResourcePath, "Usa para localizar estilos")
Rel(installHooks, findResourcePath, "Usa para localizar hooks")
Rel(installUtils, findResourcePath, "Usa para localizar utils")
Rel(listComponents, getAvailableComponents, "Usa para listar componentes")

Rel(installComponent, components, "Lê")
Rel(installStyles, styles, "Lê")
Rel(installHooks, hooks, "Lê")
Rel(installUtils, utilsFunctions, "Lê")

Rel(installComponent, projectDir, "Copia componentes para")
Rel(installStyles, projectDir, "Copia estilos para")
Rel(installHooks, projectDir, "Copia hooks para")
Rel(installUtils, projectDir, "Copia utils para")

@enduml
```

## 2. Fluxo Detalhado do Sistema

### 2.1. Processo de Build

#### 2.1.1. Inicialização do Build
1. O desenvolvedor executa `npm run build` no terminal
2. Este comando aciona uma sequência de scripts definidos no package.json:
   ```
   "build": "npm run build:lib && npm run build:cli && npm run build:components && npm run copy-files"
   ```

#### 2.1.2. Build da Biblioteca Principal (`build:lib`)
1. Executa `tsup --config tsup.config.ts`
2. O tsup compila os arquivos TypeScript da biblioteca principal
3. Gera arquivos JavaScript otimizados e declarações de tipos (.d.ts)
4. Saída principal: arquivos na pasta `dist/` incluindo `index.js` e `index.d.ts`

#### 2.1.3. Build da CLI (`build:cli`)
1. Executa `tsup src/cli/cli.ts --format cjs --out-dir dist --minify --clean`
2. Compila o arquivo principal da CLI para CommonJS (compatível com Node.js)
3. Minifica o código para reduzir o tamanho
4. Saída: `dist/cli.cjs` - arquivo executável da CLI

#### 2.1.4. Build dos Componentes (`build:components`)
1. Executa `node scripts/build-components.js`
2. Este script personalizado:
   - Identifica todos os componentes na pasta `src/components`
   - Filtra componentes ignorados (definidos em `IGNORED_COMPONENTS`)
   - Para cada componente:
     - Localiza o arquivo de entrada (index.ts/tsx)
     - Compila usando tsup com opções específicas
     - Gera arquivos na pasta `dist/components/{ComponentName}`
   - Corrige o arquivo CLI compilado adicionando o shebang necessário
   - Relata estatísticas de compilação (sucesso, falhas, ignorados)

#### 2.1.5. Cópia de Arquivos (`copy-files`)
1. Executa `node scripts/copy-files.js`
2. Este script personalizado:
   - Lê o package.json original
   - Cria uma versão modificada para distribuição:
     - Remove campos desnecessários (devDependencies, scripts)
     - Ajusta caminhos relativos (main, types, bin)
   - Copia arquivos importantes:
     - README.md
     - CHANGELOG.md (se existir)
     - Componentes para `dist/components`
     - Hooks para `dist/hooks`
     - Styles para `dist/styles`
     - Comandos CLI para `dist/cli/commands`
     - Arquivos de utilitários da CLI
   - Copia arquivos de tipos TypeScript
   - Copia arquivos de configuração necessários

### 2.2. Estrutura da CLI

#### 2.2.1. Ponto de Entrada (`cli.ts`)
1. Arquivo principal da CLI que define os comandos disponíveis
2. Usa a biblioteca Commander para gerenciar comandos e opções
3. Comandos principais:
   - `install [componentName]`: Instala componentes, estilos, hooks ou utils
   - `list`: Lista componentes disponíveis
   - `release-notes [version]`: Exibe notas de versão

#### 2.2.2. Comandos Disponíveis
1. **installComponent.ts**:
   - Instala componentes React específicos
   - Permite instalação interativa ou direta
   - Suporta instalação de todos os componentes

2. **installStyles.ts**:
   - Instala estilos base do projeto
   - Fluxo:
     - Recebe diretório de destino (opcional)
     - Se não fornecido, solicita ao usuário
     - Confirma instalação (exceto se diretório fornecido como parâmetro)
     - Localiza estilos usando múltiplos caminhos possíveis
     - Copia arquivos para o diretório de destino

3. **installHooks.ts**:
   - Instala hooks React personalizados
   - Fluxo similar ao installStyles
   - Inclui hooks como useMediaQuery, useOutsideClick, etc.

4. **installUtils.ts**:
   - Instala funções utilitárias
   - Fluxo similar ao installStyles

5. **listComponents.ts**:
   - Lista todos os componentes disponíveis
   - Usa getAvailableComponents para obter a lista

6. **releaseNotes.ts**:
   - Exibe notas de versão do projeto
   - Pode mostrar versão específica ou todas as versões

#### 2.2.3. Utilitários da CLI
1. **getAvailableComponents**:
   - Busca componentes em múltiplos caminhos possíveis:
     - Caminhos relativos ao diretório atual
     - Caminhos absolutos para ambiente de desenvolvimento
     - Caminhos relativos ao diretório do pacote
   - Retorna array com nomes dos componentes disponíveis

2. **getImplementedComponents**:
   - Retorna componentes prontos para uso
   - Atualmente retorna todos os componentes disponíveis

3. **findResourcePath**:
   - Localiza recursos (componentes, estilos, hooks, utils)
   - Verifica múltiplos caminhos possíveis
   - Retorna o primeiro caminho válido encontrado

### 2.3. Fluxo de Execução da CLI

#### 2.3.1. Instalação de Componentes
1. Usuário executa `ocean install [componentName]`
2. CLI processa argumentos e opções
3. Se componentName fornecido, tenta instalar diretamente
4. Se não fornecido, mostra lista interativa de componentes
5. Fluxo detalhado:
   - Verifica se o componente existe usando getImplementedComponents
   - Solicita diretório de destino se não fornecido
   - Confirma instalação
   - Localiza arquivos do componente
   - Copia arquivos para o diretório de destino
   - Exibe mensagem de sucesso

#### 2.3.2. Instalação de Estilos
1. Usuário executa `ocean install --styles`
2. CLI invoca função installStyles
3. Fluxo detalhado:
   - Recebe diretório de destino (opcional via parâmetro -d/--dir)
   - Se não fornecido, solicita ao usuário (padrão: "src/styles")
   - Confirma instalação (exceto se diretório fornecido como parâmetro)
   - Localiza estilos usando múltiplos caminhos possíveis:
     ```javascript
     const possiblePaths = [
       path.join(process.cwd(), "dist/styles"),
       path.join(process.cwd(), "src/styles"),
       path.join("/Users/henrique/dev/sugarcss/dist/styles"),
       path.join("/Users/henrique/dev/sugarcss/src/styles"),
       path.join(path.dirname(path.dirname(__dirname)), "dist/styles"),
       path.join(path.dirname(path.dirname(__dirname)), "src/styles")
     ];
     ```
   - Seleciona o primeiro caminho válido
   - Cria diretório de destino se não existir
   - Copia arquivos para o diretório de destino
   - Exibe mensagem de sucesso

#### 2.3.3. Instalação de Hooks
1. Usuário executa `ocean install --hooks`
2. CLI invoca função installHooks
3. Fluxo similar ao installStyles, mas para hooks React
4. Inclui hooks como useMediaQuery, useOutsideClick, etc.

#### 2.3.4. Instalação de Utils
1. Usuário executa `ocean install --utils`
2. CLI invoca função installUtils
3. Fluxo similar ao installStyles, mas para funções utilitárias

#### 2.3.5. Listagem de Componentes
1. Usuário executa `ocean list`
2. CLI invoca função listComponents
3. Obtém lista de componentes usando getAvailableComponents
4. Exibe lista formatada no terminal

#### 2.3.6. Notas de Versão
1. Usuário executa `ocean release-notes [version]`
2. CLI invoca função handleReleaseNotes
3. Exibe notas de versão específica ou todas as versões

### 2.4. Publicação e Distribuição

#### 2.4.1. Preparação do Pacote
1. O script copy-files.js prepara o pacote para publicação:
   - Cria package.json otimizado
   - Inclui apenas arquivos necessários
   - Ajusta caminhos relativos

#### 2.4.2. Configuração de Arquivos Incluídos
1. O campo "files" no package.json controla quais arquivos são incluídos:
   ```json
   "files": [
     "dist/**/*",
     "src/**/*",
     "README.md"
   ]
   ```
2. Isso garante que tanto os arquivos compilados quanto os fontes estejam disponíveis

#### 2.4.3. Configuração do Binário CLI
1. O campo "bin" no package.json define o comando executável:
   ```json
   "bin": {
     "ocean": "./dist/cli.cjs"
   }
   ```
2. Isso permite que o usuário execute `ocean` após instalar o pacote

## 3. Resumo do Fluxo Completo

1. **Desenvolvimento**:
   - Componentes, hooks, utils e estilos são desenvolvidos em TypeScript/React
   - Testes são escritos para garantir qualidade

2. **Build**:
   - `npm run build` inicia o processo de build
   - Biblioteca principal é compilada com tsup
   - CLI é compilada para formato CommonJS
   - Componentes são compilados individualmente
   - Arquivos são preparados para distribuição

3. **Publicação**:
   - Pacote é publicado no registro npm
   - Inclui código compilado e fontes originais
   - Configurado para expor o comando `ocean`

4. **Instalação pelo Usuário**:
   - Usuário instala o pacote: `npm install @porto/js-library-corp-hubv-porto-ocean`
   - Comando `ocean` fica disponível globalmente

5. **Uso da CLI**:
   - Usuário executa comandos como:
     - `ocean install Button`
     - `ocean install --styles`
     - `ocean install --hooks`
     - `ocean list`
   - CLI localiza e instala os recursos solicitados no projeto do usuário

6. **Integração no Projeto**:
   - Componentes, estilos, hooks e utils são integrados no projeto do usuário
   - Usuário pode importar e utilizar os recursos em seu código

Este fluxo completo garante uma experiência fluida desde o desenvolvimento até o uso final dos recursos do SugarCSS Design System, facilitando a adoção e manutenção da biblioteca.
