import path from "node:path";
import fs from "fs-extra";
import { input, confirm, select } from "@inquirer/prompts";
// Importações das funções utilitárias
// Definindo tipos para as funções que serão importadas
type ComponentListFunction = () => string[];

// Importações das funções utilitárias
// Nota: O arquivo utils.ts deve existir no mesmo diretório que este arquivo
declare const getAvailableComponents: ComponentListFunction;
declare const getImplementedComponents: ComponentListFunction;

// Importação dinâmica para evitar erros de TypeScript durante o build
// As funções reais serão importadas em tempo de execução
let utils: {
	getAvailableComponents: ComponentListFunction;
	getImplementedComponents: ComponentListFunction;
};

try {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	utils = require("../utils");
} catch (error) {
	// Fallback para caso o módulo não seja encontrado
	utils = {
		getAvailableComponents: () => [],
		getImplementedComponents: () => [],
	};
}

/**
 * Instala um componente específico no diretório de destino
 * @param componentName Nome do componente a ser instalado
 * @param destDir Diretório de destino para instalação
 */
export async function installComponent(
	componentName: string,
	initialDestDir?: string
): Promise<void> {
	let destDir = initialDestDir;
	const available = utils.getAvailableComponents();
	const implemented = utils.getImplementedComponents();

	// Validar se o componente existe e está implementado
	if (!available.includes(componentName)) {
		console.error(`\n❌ Erro: Componente "${componentName}" não encontrado.`);
		process.exit(1);
	}

	if (!implemented.includes(componentName)) {
		console.error(`\n❌ Erro: Componente "${componentName}" ainda não está implementado.`);
		process.exit(1);
	}

	// Se o diretório de destino não foi especificado, perguntar ao usuário
	if (!destDir) {
		destDir = await input({
			message: "Digite o caminho para o diretório onde deseja instalar o componente:",
			default: "src/components", // Sugestão de diretório padrão
		});
	}

	// Confirmação antes da instalação (pular se o diretório foi fornecido como parâmetro)
	let confirmInstall = true;

	// Se o diretório não foi fornecido como parâmetro inicial, pedir confirmação
	if (destDir !== initialDestDir) {
		confirmInstall = await confirm({
			message: `Confirma a instalação do componente ${componentName} em ${path.resolve(process.cwd(), destDir)}?`,
			default: true,
		});
	} else {
		console.log(
			`\n📦 Instalando componente ${componentName} em ${path.resolve(process.cwd(), destDir)}...\n`
		);
	}

	if (!confirmInstall) {
		console.log("\n⚠️ Instalação cancelada pelo usuário.\n");
		process.exit(0);
	}

	try {
		// Possíveis caminhos do componente
		const possiblePaths = [
			// Caminhos relativos ao diretório atual
			path.join(process.cwd(), `src/components/${componentName}`),
			path.join(process.cwd(), `dist/components/${componentName}`),
			// Caminhos absolutos para o caso de estarmos em um diretório diferente
			path.join("/Users/henrique/dev/sugarcss/src/components/", componentName),
			path.join("/Users/henrique/dev/sugarcss/dist/components/", componentName),
			// Caminhos relativos ao diretório do pacote
			path.join(path.dirname(path.dirname(__dirname)), `dist/components/${componentName}`),
			path.join(path.dirname(path.dirname(__dirname)), `src/components/${componentName}`)
		]

		// Encontrar o caminho do componente
		let src = "";
		for (const possiblePath of possiblePaths) {
			if (fs.existsSync(possiblePath)) {
				src = possiblePath;
				console.log(`✅ Componente encontrado em: ${src}`);
				break;
			}
		}

		// Imprimir caminhos verificados para debug se o componente não for encontrado
		if (!src) {
			console.log("Caminhos verificados:", possiblePaths);
		}

		if (!src) {
			console.error(`❌ Componente ${componentName} não encontrado.`);
			process.exit(1);
		}

		// Destino para o componente
		const dest = path.join(path.resolve(process.cwd(), destDir), componentName);

		// Criar diretório de destino se não existir
		fs.ensureDirSync(dest);

		// Copiar arquivos
		fs.copySync(src, dest);

		console.log(`\n✅ Componente ${componentName} instalado com sucesso em ${dest}!\n`);
	} catch (error) {
		console.error(`\n❌ Erro ao instalar o componente ${componentName}:`, error);
		process.exit(1);
	}
}

/**
 * Instala todos os componentes implementados no diretório de destino
 * @param destDir Diretório de destino para instalação
 */
export async function installAllComponents(initialDestDir?: string): Promise<void> {
	let destDir = initialDestDir;
	const implemented = utils.getImplementedComponents();

	if (implemented.length === 0) {
		console.error("\n❌ Erro: Nenhum componente implementado encontrado.");
		process.exit(1);
	}

	// Se o diretório de destino não foi especificado, perguntar ao usuário
	if (!destDir) {
		destDir = await input({
			message: "Digite o caminho para o diretório onde deseja instalar os componentes:",
			default: "src/components", // Sugestão de diretório padrão
		});
	}

	// Confirmação antes da instalação (pular se o diretório foi fornecido como parâmetro)
	let confirmInstall = true;

	// Se o diretório não foi fornecido como parâmetro inicial, pedir confirmação
	if (destDir !== initialDestDir) {
		confirmInstall = await confirm({
			message: `Confirma a instalação de todos os ${implemented.length} componentes implementados em ${path.resolve(process.cwd(), destDir)}?`,
			default: true,
		});
	} else {
		console.log(
			`\n📦 Instalando todos os ${implemented.length} componentes implementados em ${path.resolve(process.cwd(), destDir)}...\n`
		);
	}

	if (!confirmInstall) {
		console.log("\n⚠️ Instalação cancelada pelo usuário.\n");
		process.exit(0);
	}

	console.log("\n🔄 Instalando todos os componentes implementados...\n");

	// Instalar cada componente implementado
	let successCount = 0;
	let failCount = 0;

	for (const component of implemented) {
		try {
			await installComponent(component, destDir);
			successCount++;
		} catch (error) {
			console.error(`\n❌ Erro ao instalar o componente ${component}:`, error);
			failCount++;
		}
	}

	console.log(`\n📊 Resumo da instalação:`);
	console.log(`✅ ${successCount} componentes instalados com sucesso`);
	if (failCount > 0) {
		console.log(`❌ ${failCount} componentes falharam na instalação`);
	}

	if (successCount > 0) {
		console.log(`\n✅ Instalação concluída!\n`);
	} else {
		console.error(`\n❌ Nenhum componente foi instalado com sucesso.\n`);
		process.exit(1);
	}
}

/**
 * Função principal para o comando de instalação de componentes
 * Permite instalação interativa ou direta de componentes
 */
interface InstallOptions {
	dir?: string;
	component?: string;
	allComponents?: boolean;
}

/**
 * Função principal para o comando de instalação de componentes
 * Permite instalação interativa ou direta de componentes
 * @param componentName Nome do componente a ser instalado (opcional)
 * @param options Opções de instalação
 */
export async function handleComponentInstallation(
	componentName?: string,
	options?: InstallOptions
): Promise<void> {
	// Se a opção --all-components foi especificada, instalar todos os componentes
	if (options?.allComponents) {
		return installAllComponents(options?.dir);
	}

	// Se um componente específico foi especificado, instalar esse componente
	if (componentName || options?.component) {
		const component = componentName || options?.component || "";
		if (!component) {
			console.error("\n❌ Erro: Nome do componente não especificado.\n");
			process.exit(1);
		}
		return installComponent(component, options?.dir);
	}

	// Caso contrário, mostrar lista interativa de componentes
	const available = utils.getAvailableComponents();
	const implemented = utils.getImplementedComponents();

	if (available.length === 0) {
		console.error("\n❌ Erro: Nenhum componente disponível encontrado.");
		process.exit(1);
	}

	console.log("\n📋 Componentes disponíveis:\n");

	// Marcar componentes implementados com um ✅
	const choices = available.map((comp: string) => ({
		name: `${comp} ${implemented.includes(comp) ? "✅" : "⚠️"}`,
		value: comp,
		disabled: !implemented.includes(comp),
	}));

	const selectedComponent = await select({
		message: "Selecione um componente para instalar (✅ = implementado, ⚠️ = em desenvolvimento):",
		choices,
	});

	// O valor retornado pelo select é garantido como string neste contexto
	return installComponent(selectedComponent as string, options?.dir);
}
