import fs from "fs-extra";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Obter o caminho do arquivo atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Encontra os possíveis caminhos para um tipo de recurso
 * @param resourceType Tipo de recurso (components, styles, hooks, utils)
 * @returns Array de possíveis caminhos para o recurso
 */
function findPossiblePaths(resourceType: string): string[] {
	// Determinar o caminho base do pacote (onde o código está sendo executado)
	// Subir até 3 níveis de diretórios para encontrar a raiz do pacote
	const possibleBasePaths = [];
	
	// Adicionar o diretório atual do processo
	possibleBasePaths.push(process.cwd());
	
	// Adicionar caminhos relativos ao arquivo atual
	let currentDir = __dirname;
	for (let i = 0; i < 5; i++) {
		possibleBasePaths.push(currentDir);
		currentDir = path.dirname(currentDir);
	}
	
	// Gerar todos os possíveis caminhos para o recurso
	const possiblePaths: string[] = [];
	
	// Para cada caminho base possível, adicionar as variações src/ e dist/
	for (const basePath of possibleBasePaths) {
		possiblePaths.push(
			path.join(basePath, `src/${resourceType}`),
			path.join(basePath, `dist/${resourceType}`)
		);
	}
	
	// Se o Node.js estiver sendo executado em um ambiente global, verificar o diretório global
	if (process.env.NODE_PATH) {
		const nodePaths = process.env.NODE_PATH.split(path.delimiter);
		for (const nodePath of nodePaths) {
			possiblePaths.push(
				path.join(nodePath, `@porto/js-library-corp-hubv-porto-ocean/src/${resourceType}`),
				path.join(nodePath, `@porto/js-library-corp-hubv-porto-ocean/dist/${resourceType}`)
			);
		}
	}
	
	return possiblePaths;
}

/**
 * Retorna a lista de todos os componentes disponíveis
 * @returns Array com os nomes dos componentes disponíveis
 */
export function getAvailableComponents(): string[] {
	try {
		// Obter possíveis caminhos para os componentes
		const possiblePaths = findPossiblePaths("components");

		// Encontrar o caminho dos componentes
		let componentsPath = "";
		for (const possiblePath of possiblePaths) {
			if (fs.existsSync(possiblePath)) {
				componentsPath = possiblePath;
				break;
			}
		}

		if (!componentsPath) {
			console.error("Nenhum caminho de componentes encontrado. Caminhos verificados:", possiblePaths);
			return [];
		}

		// Listar diretórios de componentes
		const directories = fs.readdirSync(componentsPath).filter((dir) => {
			try {
				return fs.statSync(path.join(componentsPath, dir)).isDirectory();
			} catch (_error) {
				// Ignorar erros ao verificar se é um diretório
				return false;
			}
		});

		return directories;
	} catch (error) {
		console.error("Erro ao obter componentes disponíveis:", error);
		return [];
	}
}

/**
 * Retorna a lista de componentes implementados (prontos para uso)
 * @returns Array com os nomes dos componentes implementados
 */
export function getImplementedComponents(): string[] {
	// Como todos os componentes estão funcionando, retornamos todos os componentes disponíveis
	return getAvailableComponents();
}

/**
 * Função utilitária para encontrar o caminho de um recurso
 * @param resourceType Tipo de recurso (components, styles, hooks, utils)
 * @returns Caminho para o recurso ou string vazia se não encontrado
 */
export function findResourcePath(resourceType: string): string {
	// Obter possíveis caminhos para o recurso usando a função genérica
	const possiblePaths = findPossiblePaths(resourceType);

	// Encontrar o caminho do recurso
	for (const possiblePath of possiblePaths) {
		if (fs.existsSync(possiblePath)) {
			return possiblePath;
		}
	}

	// Usar console.error em vez de console.log para mensagens de erro
	console.error(
		`Nenhum caminho para ${resourceType} encontrado. Caminhos verificados:`,
		possiblePaths
	);
	return "";
}
