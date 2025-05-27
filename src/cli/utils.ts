import fs from "fs-extra";
import path from "node:path";

/**
 * Retorna a lista de todos os componentes disponíveis
 * @returns Array com os nomes dos componentes disponíveis
 */
export function getAvailableComponents(): string[] {
	try {
		// Detectar se estamos no ambiente de desenvolvimento ou no pacote instalado
		const isDevEnvironment = process.cwd().includes("ocean");

		// Possíveis caminhos dos componentes
		let possiblePaths = [];

		if (isDevEnvironment) {
			// No ambiente de desenvolvimento, usar caminhos relativos ao diretório atual
			possiblePaths = [
				path.join(process.cwd(), "src/components"),
				path.join(process.cwd(), "dist/components"),
			];
		} else {
			// No pacote instalado, usar caminhos relativos ao diretório do pacote
			const pkgPath = path.dirname(path.dirname(__dirname));
			possiblePaths = [path.join(pkgPath, "dist/components"), path.join(pkgPath, "src/components")];
		}

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
	// Componentes que estão prontos para uso
	// Esta lista pode ser atualizada manualmente ou gerada dinamicamente
	// verificando se cada componente tem os arquivos necessários
	const available = getAvailableComponents();

	return available.filter((component) => {
		// Detectar se estamos no ambiente de desenvolvimento ou no pacote instalado
		const isDevEnvironment = process.cwd().includes("ocean");

		// Possíveis caminhos do componente
		let possiblePaths = [];

		if (isDevEnvironment) {
			// No ambiente de desenvolvimento, usar caminhos relativos ao diretório atual
			possiblePaths = [
				path.join(process.cwd(), `src/components/${component}`),
				path.join(process.cwd(), `dist/components/${component}`),
			];
		} else {
			// No pacote instalado, usar caminhos relativos ao diretório do pacote
			const pkgPath = path.dirname(path.dirname(__dirname));
			possiblePaths = [
				path.join(pkgPath, `dist/components/${component}`),
				path.join(pkgPath, `src/components/${component}`),
			];
		}

		// Verificar se o componente tem os arquivos necessários
		for (const possiblePath of possiblePaths) {
			if (fs.existsSync(possiblePath)) {
				// Verificar se tem pelo menos um arquivo index.ts ou index.tsx
				const hasIndexFile =
					fs.existsSync(path.join(possiblePath, "index.ts")) ||
					fs.existsSync(path.join(possiblePath, "index.tsx"));

				return hasIndexFile;
			}
		}

		return false;
	});
}

/**
 * Função utilitária para encontrar o caminho de um recurso
 * @param resourceType Tipo de recurso (components, styles, hooks, utils)
 * @returns Caminho para o recurso ou string vazia se não encontrado
 */
export function findResourcePath(resourceType: string): string {
	// Detectar se estamos no ambiente de desenvolvimento ou no pacote instalado
	const isDevEnvironment = process.cwd().includes("ocean");

	// Possíveis caminhos do recurso
	let possiblePaths = [];

	if (isDevEnvironment) {
		// No ambiente de desenvolvimento, usar caminhos relativos ao diretório atual
		possiblePaths = [
			path.join(process.cwd(), `src/${resourceType}`),
			path.join(process.cwd(), `dist/${resourceType}`),
		];
	} else {
		// No pacote instalado, usar caminhos relativos ao diretório do pacote
		const pkgPath = path.dirname(path.dirname(__dirname));
		possiblePaths = [
			path.join(pkgPath, `dist/${resourceType}`),
			path.join(pkgPath, `src/${resourceType}`),
		];
	}

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
