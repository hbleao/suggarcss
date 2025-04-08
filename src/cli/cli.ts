/**
 * CLI do SugarCSS
 *
 * Esta CLI permite aos usuários instalar componentes React com SASS em seus projetos.
 * Usa commander para gerenciar os comandos e @inquirer/prompts para interatividade.
 *
 * Nota: O shebang (#!/usr/bin/env node) é adicionado automaticamente pelo npm
 * quando o pacote é instalado e o bin é configurado no package.json.
 */

import { confirm, input, select } from "@inquirer/prompts"; // Prompts interativos para CLI
import path from "node:path"; // Manipulação de caminhos de arquivos
import { fileURLToPath } from "node:url"; // Converter URLs para caminhos de sistema de arquivos
// Importações necessárias
import { Command } from "commander"; // Biblioteca para criar interfaces de linha de comando
import fs from "fs-extra"; // Extensão do fs nativo com métodos adicionais

// Inicialização do Commander
const program = new Command();

// Obtenção do caminho do diretório atual (importante para ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração básica do programa CLI
program
	.name("porto-ocean") // Nome do comando
	.description(
		"Instala componentes React com Sass do @porto/js-library-corp-hubv-porto-ocean",
	) // Descrição exibida na ajuda
	.version("0.1.0"); // Versão da CLI

/**
 * Comando de instalação
 *
 * Este é o comando principal da CLI, responsável por instalar componentes.
 * Suporta tanto modo interativo quanto instalação direta via argumentos.
 */
program
	.command("install") // Define o comando 'install'
	.argument("[component]", "Nome do componente para instalar (opcional)") // Argumento opcional entre colchetes
	.option(
		"-d, --dir <directory>", // Opção para especificar diretório de destino
		"Diretório de destino para instalar o componente",
		"", // Valor padrão vazio
	)
	.action(async (componentArg, options) => {
		// Função executada quando o comando é chamado
		// Lista de todos os componentes planejados para a biblioteca
		// Esta lista é usada tanto para validação quanto para exibição na interface interativa
		const available = [
			"button",
			"input",
			"modal",
			"dropdown",
			"textarea",
			"typography",
			"accordion",
			"tabs",
			"link",
			"chip",
		];

		// Componentes que já foram implementados e estão prontos para uso
		// Apenas estes componentes podem ser instalados pelos usuários
		const implemented = ["button", "chip"];

		/**
		 * Seleção interativa de componente
		 *
		 * Se o usuário não especificar um componente como argumento,
		 * apresentamos uma interface interativa para escolha.
		 */
		let component = componentArg;
		if (!component) {
			// Preparar as opções para o prompt de seleção
			// Para cada componente, criamos um objeto com:
			// - name: Nome exibido (com indicador "em breve" para não implementados)
			// - value: Valor retornado quando selecionado
			// - disabled: Impede seleção de componentes não implementados
			const availableChoices = available.map((comp) => ({
				name: `${comp}${implemented.includes(comp) ? "" : " (em breve)"}`,
				value: comp,
				disabled: !implemented.includes(comp),
			}));

			// Exibir prompt de seleção e aguardar escolha do usuário
			component = await select({
				message: "Selecione o componente que deseja instalar:",
				choices: availableChoices,
			});
		}

		/**
		 * Validação do componente selecionado
		 *
		 * Mesmo com a interface interativa, ainda precisamos validar o componente
		 * para o caso de o usuário especificar diretamente via argumento.
		 */
		// Verificar se o componente existe na lista de componentes planejados
		if (!available.includes(component)) {
			console.error(`Componente "${component}" não encontrado.`);
			process.exit(1); // Encerra o programa com código de erro
		}

		// Verificar se o componente já foi implementado
		if (!implemented.includes(component)) {
			console.error(`Componente "${component}" ainda não foi implementado.`);
			process.exit(1); // Encerra o programa com código de erro
		}

		/**
		 * Seleção do diretório de destino
		 *
		 * Se o usuário não especificar um diretório via opção --dir,
		 * perguntamos interativamente onde instalar o componente.
		 */
		let baseDir = options.dir;
		if (!baseDir) {
			// Primeiro, perguntamos se o usuário quer usar o diretório atual
			const useCurrentDir = await confirm({
				message: "Deseja instalar no diretório atual?",
				default: true, // Por padrão, sugerimos usar o diretório atual
			});

			if (useCurrentDir) {
				// Se sim, usamos o diretório de trabalho atual
				baseDir = process.cwd();
			} else {
				// Se não, pedimos para digitar um caminho personalizado
				baseDir = await input({
					message: "Digite o caminho do diretório de destino:",
					default: process.cwd(), // Sugerimos o diretório atual como padrão
				});
			}
		}

		/**
		 * Cálculo dos caminhos de origem e destino
		 *
		 * Precisamos determinar de onde copiar os arquivos do componente
		 * e para onde copiá-los no projeto do usuário.
		 */
		// Caminho para a raiz do pacote instalado
		const pkgPath = path.dirname(path.dirname(__dirname));

		// Caminho de origem: onde o componente está no pacote
		// Usamos a estrutura src/components/{nome-do-componente}
		const src = path.join(pkgPath, `src/components/${component}`);

		// Caminho de destino: onde o componente será instalado no projeto do usuário
		// Seguimos a convenção src/components/ui/{nome-do-componente}
		const dest = path.join(baseDir, `src/components/ui/${component}`);

		/**
		 * Confirmação final antes da instalação
		 *
		 * Pedimos confirmação ao usuário antes de prosseguir com a instalação,
		 * mostrando exatamente o que será feito.
		 */
		const confirmInstall = await confirm({
			message: `Confirma a instalação do componente "${component}" em ${dest}?`,
			default: true, // Por padrão, sugerimos confirmar
		});

		// Se o usuário cancelar, encerramos o programa sem erro
		if (!confirmInstall) {
			console.log("Instalação cancelada.");
			process.exit(0); // Código 0 indica saída sem erro
		}

		/**
		 * Execução da instalação
		 *
		 * Criamos o diretório de destino (se não existir) e
		 * copiamos todos os arquivos do componente.
		 */
		// Garantir que o diretório de destino exista
		await fs.ensureDir(dest);

		// Copiar todos os arquivos do componente para o destino
		// fs-extra.copy copia recursivamente todos os arquivos e subdiretórios
		await fs.copy(src, dest);

		// Exibir mensagem de sucesso
		console.log(
			`✅ Componente "${component}" instalado em src/components/ui/${component}`,
		);
	});

/**
 * Comando de listagem
 *
 * Este comando exibe todos os componentes disponíveis e seu status,
 * oferecendo uma visão rápida do que está disponível na biblioteca.
 */
program
	.command("list") // Define o comando 'list'
	.description("Lista todos os componentes disponíveis") // Descrição exibida na ajuda
	.action(() => {
		// Função executada quando o comando é chamado
		// Usamos as mesmas listas de componentes do comando install
		// para manter consistência
		const available = [
			"button",
			"input",
			"modal",
			"dropdown",
			"textarea",
			"typography",
			"accordion",
			"tabs",
			"link",
		];

		const implemented = ["button", "input"];

		// Exibir cabeçalho da lista
		console.log("\nComponentes disponíveis:");
		console.log("----------------------\n");

		// Iterar sobre todos os componentes e exibir seu status
		// Usamos for...of em vez de forEach por questões de performance e estilo
		for (const comp of available) {
			// Determinar o status do componente (disponível ou em breve)
			const status = implemented.includes(comp)
				? "✅ Disponível"
				: "🔄 Em breve";
			// padEnd garante alinhamento uniforme na saída do terminal
			console.log(`${comp.padEnd(15)} ${status}`);
		}

		// Exibir instruções de uso após a lista
		console.log("\nPara instalar um componente, execute:");
		console.log("  npx porto-ocean install <componente>");
		console.log("  ou simplesmente:");
		console.log("  npx porto-ocean install\n");
	});

/**
 * Iniciar o processamento dos argumentos da linha de comando
 *
 * Este comando analisa os argumentos passados pelo usuário e
 * executa o comando apropriado com suas opções e argumentos.
 */
program.parse();
