#!/usr/bin/env node

import { Command } from "commander";
import {
	handleComponentInstallation,
	handleReleaseNotes,
	installHooks,
	installStyles,
	installUtils,
	listComponents,
} from "./commands";

// Criar programa principal
const program = new Command();

// Configurar informações do programa
program.name("ocean").description("CLI para o Porto Ocean Design System").version("0.1.0");

// Comando install - Instalação de componentes, estilos, hooks e utils
program
	.command("install [componentName]")
	.description("Instala um componente específico ou mostra uma lista interativa")
	.option("-d, --dir <directory>", "Diretório de destino para instalação")
	.option("-c, --component <name>", "Nome do componente a ser instalado")
	.option("-a, --all-components", "Instala todos os componentes implementados")
	.option("-s, --styles", "Instala os estilos base do projeto")
	.option("-h, --hooks", "Instala os hooks do projeto")
	.option("-u, --utils", "Instala as funções utilitárias do projeto")
	.action(async (componentName, options) => {
		// Verificar se múltiplas opções foram especificadas
		const optionsCount = [
			options.allComponents,
			options.styles,
			options.hooks,
			options.utils,
		].filter(Boolean).length;

		if (optionsCount > 1) {
			console.error(
				"\n❌ Erro: Especifique apenas uma opção por vez (--all-components, --styles, --hooks ou --utils).\n"
			);
			process.exit(1);
		}

		// Executar a opção correspondente
		if (options.styles) {
			await installStyles(options.dir);
		} else if (options.hooks) {
			await installHooks(options.dir);
		} else if (options.utils) {
			await installUtils(options.dir);
		} else {
			// Instalação de componentes (padrão)
			await handleComponentInstallation(componentName, options);
		}
	});

// Comando list - Lista todos os componentes disponíveis
program
	.command("list")
	.description("Lista todos os componentes disponíveis")
	.action(() => {
		listComponents();
	});

// Comando release-notes - Exibe notas de versão
program
	.command("release-notes [version]")
	.description("Exibe as notas de versão")
	.option("-a, --all", "Exibe todas as versões")
	.action((version, options) => {
		handleReleaseNotes(version, options);
	});

// Analisar argumentos da linha de comando
program.parse(process.argv);

// Se nenhum comando foi especificado, mostrar ajuda
if (!process.argv.slice(2).length) {
	program.outputHelp();
}
