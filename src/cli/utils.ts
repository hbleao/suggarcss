import fs from "fs-extra";
import path from "node:path";

/**
 * Retorna a lista de todos os componentes disponíveis
 * @returns Array com os nomes dos componentes disponíveis
 */
export function getAvailableComponents(): string[] {
	try {
		// Possíveis caminhos dos componentes
		let possiblePaths = [
			// Caminhos relativos ao diretório atual
			path.join(process.cwd(), "src/components"),
			path.join(process.cwd(), "dist/components"),
			// Caminhos absolutos para o caso de estarmos em um diretório diferente
			path.join("/Users/henrique/dev/sugarcss/src/components"),
			path.join("/Users/henrique/dev/sugarcss/dist/components"),
			// Caminhos relativos ao diretório do pacote
			path.join(path.dirname(path.dirname(__dirname)), "dist/components"),
			path.join(path.dirname(path.dirname(__dirname)), "src/components")
		]

		// Encontrar o caminho dos componentes
		let componentsPath = "";
		for (const possiblePath of possiblePaths) {
			if (fs.existsSync(possiblePath)) {
				componentsPath = possiblePath;
				break;
			}
		}

		if (!componentsPath) {
			console.log("Nenhum caminho de componentes encontrado. Caminhos verificados:", possiblePaths);
			return [];
		}

		// Listar diretórios de componentes
		const directories = fs.readdirSync(componentsPath).filter((dir) => {
			try {
				return fs.statSync(path.join(componentsPath, dir)).isDirectory();
			} catch (error) {
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
	// Possíveis caminhos do recurso
	const possiblePaths = [
		// Caminhos relativos ao diretório atual
		path.join(process.cwd(), `src/${resourceType}`),
		path.join(process.cwd(), `dist/${resourceType}`),
		// Caminhos absolutos para o caso de estarmos em um diretório diferente
		path.join("/Users/henrique/dev/sugarcss/src/", resourceType),
		path.join("/Users/henrique/dev/sugarcss/dist/", resourceType),
		// Caminhos relativos ao diretório do pacote
		path.join(path.dirname(path.dirname(__dirname)), `dist/${resourceType}`),
		path.join(path.dirname(path.dirname(__dirname)), `src/${resourceType}`)
	]

	// Encontrar o caminho do recurso
	for (const possiblePath of possiblePaths) {
		if (fs.existsSync(possiblePath)) {
			return possiblePath;
		}
	}

	console.log(
		`Nenhum caminho para ${resourceType} encontrado. Caminhos verificados:`,
		possiblePaths
	);
	return "";
}
