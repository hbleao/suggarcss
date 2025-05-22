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
// Importar funções de release notes
import {
	formatReleaseNote,
	getAllReleaseNotes,
	getReleaseNote,
} from "./release-notes";

// Inicialização do Commander
const program = new Command();

// Obtenção do caminho do diretório atual (importante para ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lista de todos os componentes planejados para a biblioteca
// Esta lista é usada tanto para validação quanto para exibição na interface interativa
const available = [
	"Accordion",
	"BannerBody",
	"BannerHero",
	"Breadcrumb",
	"Button",
	"CardContent",
	"CardIcon",
	"CardTestimonial",
	"CardsCarousel",
	"Carousel",
	"Checkbox",
	"Chip",
	"styles",
	"Dialog",
	"Dropdown",
	"Footer",
	"Grid",
	"Header",
	"hooks",
	"Input",
	"Link",
	"Loader",
	"Modal",
	"ProgressBar",
	"Notification",
	"Radio",
	"Row",
	"Skeleton",
	"Stepper",
	"Textarea",
	"Tooltip",
	"Typography"
];

// Componentes que já foram implementados e estão prontos para uso
// Apenas estes componentes podem ser instalados pelos usuários
const implemented = [
	"Accordion",
	"BannerBody",
	"BannerHero",
	"Breadcrumb",
	"Button",
	"CardContent",
	"CardIcon",
	"CardTestimonial",
	"CardsCarousel",
	"Carousel",
	"Checkbox",
	"Chip",
	"styles",
	"Dialog",
	"Dropdown",
	"Footer",
	"Grid",
	"Header",
	"hooks",
	"Input",
	"Link",
	"Loader",
	"Modal",
	"ProgressBar",
	"Notification",
	"Radio",
	"Row",
	"Skeleton",
	"Stepper",
	"Textarea",
	"Tooltip",
	"Typography"
];

// Configuração básica do programa CLI
program
	.name("porto-ocean") // Nome do comando
	.description(
		"Instala componentes React com Sass do @porto/js-library-corp-hubv-porto-ocean",
	) // Descrição exibida na ajuda
	.version("0.1.0") // Versão da CLI
	.option(
		"-a, --all",
		"Exibe todas as versões ou instala todos os componentes implementados",
		false,
	)
	.option(
		"-d, --dir <directory>",
		"Diretório de destino para instalar os componentes",
		"",
	);

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
 * Comando de instalação
 *
 * Este é o comando principal da CLI, responsável por instalar componentes.
 * Suporta tanto modo interativo quanto instalação direta via argumentos.
 */
program
	.command("install") // Define o comando 'install'
	.description(
		"Instala um componente individual dentre todos os componentes disponíveis",
	) // Descrição exibida na ajuda
	.argument("[component]", "Nome do componente para instalar (opcional)") // Argumento opcional entre colchetes
	.option(
		"-d, --dir <directory>", // Opção para especificar diretório de destino
		"Diretório de destino para instalar o componente",
		"", // Valor padrão vazio
	)
	.action(async (componentArg, options, command) => {
		// Obter as opções globais do programa principal
		const programOptions = command.parent?.opts() || {};

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

			// Exibir o prompt de seleção para o usuário
			component = await select({
				message: "Selecione um componente para instalar:",
				choices: availableChoices,
			});
		}

		// Validar se o componente existe e está implementado
		if (!available.includes(component)) {
			console.error(`\n❌ Erro: Componente "${component}" não encontrado.`);
			console.log(
				`\nExecute "npx porto-ocean list" para ver todos os componentes disponíveis.\n`,
			);
			process.exit(1);
		}

		if (!implemented.includes(component)) {
			console.error(
				`\n❌ Erro: Componente "${component}" ainda não está implementado.`,
			);
			console.log(`\nEste componente estará disponível em breve!\n`);
			process.exit(1);
		}

		/**
		 * Seleção do diretório de destino
		 *
		 * O usuário pode especificar o diretório via:
		 * 1. Opção específica do comando (-d, --dir)
		 * 2. Opção global do programa
		 * 3. Prompt interativo
		 */
		let targetDir = options.dir || programOptions.dir;
		if (!targetDir) {
			// Se nenhum diretório foi especificado, perguntar ao usuário
			targetDir = await input({
				message:
					"Digite o caminho para o diretório onde deseja instalar o componente:",
				default: "src/components/ui", // Sugestão de diretório padrão
			});
		}

		// Garantir que o diretório de destino exista
		const dest = path.resolve(process.cwd(), targetDir, component);
		if (fs.existsSync(dest)) {
			// Verificar se o usuário deseja sobrescrever
			const overwrite = await confirm({
				message: `O diretório "${dest}" já existe. Deseja sobrescrever?`,
				default: false, // Por segurança, sugerimos não sobrescrever
			});

			if (!overwrite) {
				console.log("\n⚠️ Instalação cancelada pelo usuário.\n");
				process.exit(0);
			}
		}

		// Confirmação final antes da instalação
		const confirmInstall = await confirm({
			message: `Confirma a instalação do componente "${component}" em ${dest}?`,
			default: true, // Por padrão, sugerimos confirmar
		});

		if (!confirmInstall) {
			console.log("\n⚠️ Instalação cancelada pelo usuário.\n");
			process.exit(0);
		}

		// Caminho para a raiz do pacote instalado
		const pkgPath = path.dirname(path.dirname(__dirname));
		
		// Exibir informações de depuração sobre o ambiente
		console.log(`\nℹ️ Informações de depuração:`);
		console.log(`- Diretório atual: ${process.cwd()}`);
		console.log(`- Diretório do pacote: ${pkgPath}`);
		console.log(`- Componente solicitado: ${component}`);
		
		// Tentamos encontrar o componente em caminhos padronizados
		// Isso garante que a CLI funcione independentemente de como o pacote foi instalado
		const possiblePaths = [
			// Caminho principal: components dentro da pasta dist (nova estrutura padronizada)
			path.join(pkgPath, `dist/components/${component}`),
			// Caminho alternativo: src/components na raiz do pacote (para desenvolvimento local)
			path.join(pkgPath, `src/components/${component}`),
		];
		
		console.log(`- Caminhos possíveis:`);
		possiblePaths.forEach((path, index) => {
			console.log(`  ${index + 1}. ${path} (${fs.existsSync(path) ? 'existe' : 'não existe'})`);
		});

		// Verificamos qual caminho existe
		let src = "";
		for (const possiblePath of possiblePaths) {
			try {
				if (fs.existsSync(possiblePath)) {
					src = possiblePath;
					console.log(`\n✅ Componente encontrado em: ${src}`);
					break;
				}
			} catch (error) {
				// Exibir erro para facilitar a depuração
				console.error(`\n❌ Erro ao verificar caminho ${possiblePath}:`, error);
				// Continuar tentando outros caminhos
			}
		}

		// Se não encontramos o componente em nenhum caminho, exibir erro
		if (!src) {
			console.error(
				`\n❌ Erro: Não foi possível encontrar o componente "${component}" em nenhum dos caminhos possíveis.`,
			);
			process.exit(1);
		}

		// Criar o diretório de destino se não existir
		fs.ensureDirSync(dest);

		// Copiar o componente para o destino
		try {
			await fs.copy(src, dest);
			console.log(`\n✅ Componente "${component}" instalado em ${dest}`);
		} catch (error) {
			console.error(`\n❌ Erro ao copiar o componente:`, error);
			process.exit(1);
		}

		// Mensagem de sucesso e próximos passos
		console.log("\n🎉 Instalação concluída com sucesso!");
		console.log(
			`\nAgora você pode importar o componente em seu código:\n`,
		);
		console.log(
			`import { ${component} } from "${path.relative(
				process.cwd(),
				dest,
			)}";\n`,
		);
	});

/**
 * Comando release-notes
 * 
 * Este comando exibe as notas de versão do pacote.
 */
program
	.command("release-notes") // Define o comando 'release-notes'
	.description("Exibe as notas de versão") // Descrição exibida na ajuda
	.argument("[version]", "Versão específica para exibir (opcional)")
	.action(async (version, options, command) => {
		// Obter as opções globais do programa principal
		const programOptions = command.parent?.opts() || {};

		if (programOptions.all) {
			// Exibir todas as versões
			const allNotes = getAllReleaseNotes();
			console.log("\n📋 Histórico completo de versões:\n");
			allNotes.forEach((note) => {
				console.log(formatReleaseNote(note));
				console.log("-----------------------------------\n");
			});
		} else if (version) {
			// Exibir uma versão específica
			const note = getReleaseNote(version);
			if (note) {
				console.log(formatReleaseNote(note));
			} else {
				console.error(`\n❌ Erro: Versão "${version}" não encontrada.`);
				process.exit(1);
			}
		} else {
			// Exibir a versão mais recente
			const latestNote = getAllReleaseNotes()[0]; // A primeira é a mais recente
			console.log("\n📋 Notas da versão mais recente:\n");
			console.log(formatReleaseNote(latestNote));
		}
	});

// Analisar os argumentos da linha de comando e executar o comando apropriado
program.parse(process.argv);

// Se nenhum comando for especificado, exibir a ajuda
if (!process.argv.slice(2).length) {
	program.outputHelp();
}
