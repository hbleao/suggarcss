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
			module: "./index.js", // Garantir que o módulo ESM também funcione
			types: "./index.d.ts", // Relativo à pasta dist
			bin: {
				"porto-ocean": "./cli/cli.js", // Relativo à pasta dist
			},
			// Garantir que os arquivos corretos sejam incluídos
			files: [
				".", // Incluir todos os arquivos na raiz da pasta dist
				"**/*" // Incluir todos os arquivos em todas as subpastas
			],
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

		// Copiar os componentes para a raiz da pasta dist para maior compatibilidade
		await fs.copy(
			path.resolve(rootDir, "src/components"),
			path.resolve(distDir, "components"),
		);
		console.log("✅ Componentes copiados para a raiz da pasta dist com sucesso!");

		// Verificar e garantir que os arquivos chunk estão presentes
		const distFiles = await fs.readdir(distDir);
		const chunkFiles = distFiles.filter(file => file.includes('chunk'));
		if (chunkFiles.length > 0) {
			console.log(`✅ Arquivos chunk encontrados: ${chunkFiles.join(', ')}`);
		} else {
			console.warn('⚠️ Nenhum arquivo chunk encontrado na pasta dist!');
		}

		// Listar todos os arquivos na pasta dist para verificar
		console.log('ℹ️ Arquivos na pasta dist:');
		const allFiles = await fs.readdir(distDir, { recursive: false });
		for (const file of allFiles) {
			console.log(`  - ${file}`);
		}

		// Você pode adicionar mais arquivos para copiar aqui
		// Por exemplo, licença, changelog, etc.
	} catch (error) {
		console.error("❌ Erro ao copiar arquivos:", error);
		process.exit(1);
	}
}

// Executar a função principal
main();
