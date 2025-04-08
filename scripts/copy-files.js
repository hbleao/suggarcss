#!/usr/bin/env node

import fs from "fs-extra";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.resolve(rootDir, "dist");

/**
 * Função principal que executa as operações de cópia
 */
async function main() {
	try {
		// Lê o package.json original
		const packageJson = await fs.readJSON(
			path.resolve(rootDir, "package.json"),
		);

		// Cria uma versão modificada para o dist
		// Você pode remover campos desnecessários para o pacote distribuído
		const distPackageJson = {
			...packageJson,
			// Remover campos que não são necessários na versão distribuída
			devDependencies: undefined,
			scripts: undefined,
			// Ajustar caminhos se necessário
			main: "./index.js", // Relativo à pasta dist
			types: "./index.d.ts", // Relativo à pasta dist
			bin: {
				"porto-ocean": "./cli/cli.js", // Relativo à pasta dist
			},
			// Você pode adicionar ou modificar outros campos conforme necessário
		};

		// Escreve o package.json modificado na pasta dist
		await fs.writeJSON(path.resolve(distDir, "package.json"), distPackageJson, {
			spaces: 2,
		});
		console.log("✅ package.json copiado para a pasta dist com sucesso!");

		// Copiar README.md para a pasta dist
		await fs.copy(
			path.resolve(rootDir, "README.md"),
			path.resolve(distDir, "README.md"),
		);
		console.log("✅ README.md copiado para a pasta dist com sucesso!");

		// Copiar a pasta src inteira para dentro da pasta dist
		await fs.copy(
			path.resolve(rootDir, "src"),
			path.resolve(distDir, "src"),
		);
		console.log("✅ Pasta src copiada para dentro da pasta dist com sucesso!");

		// Você pode adicionar mais arquivos para copiar aqui
		// Por exemplo, licença, changelog, etc.
	} catch (error) {
		console.error("❌ Erro ao copiar arquivos:", error);
		process.exit(1);
	}
}

// Executar a função principal
main();
