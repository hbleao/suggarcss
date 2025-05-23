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

		// Copiar CHANGELOG.md para a pasta dist se existir
		const changelogPath = path.resolve(rootDir, "CHANGELOG.md");
		if (await fs.pathExists(changelogPath)) {
			await fs.copy(
				changelogPath,
				path.resolve(distDir, "CHANGELOG.md"),
			);
			console.log("✅ CHANGELOG.md copiado para a pasta dist com sucesso!");
		}

		// Copiar apenas os componentes para a pasta dist/components
		// Isso evita duplicações e mantém uma estrutura mais consistente
		await fs.copy(
			path.resolve(rootDir, "src/components"),
			path.resolve(distDir, "components"),
		);
		console.log("✅ Componentes copiados para a pasta dist/components com sucesso!");

		// Copiar os hooks para a pasta dist/hooks
		await fs.copy(
			path.resolve(rootDir, "src/hooks"),
			path.resolve(distDir, "hooks"),
		);
		console.log("✅ Hooks copiados para a pasta dist/hooks com sucesso!");

		// Copiar os arquivos da CLI refatorada
		await fs.copy(
			path.resolve(rootDir, "src/cli/commands"),
			path.resolve(distDir, "cli/commands"),
		);
		console.log("✅ Comandos da CLI copiados para a pasta dist/cli/commands com sucesso!");

		// Copiar o arquivo release-notes.ts da CLI
		await fs.copy(
			path.resolve(rootDir, "src/cli/release-notes.ts"),
			path.resolve(distDir, "cli/release-notes.ts"),
		);
		console.log("✅ Arquivo release-notes.ts copiado para a pasta dist/cli com sucesso!");

		// Copiar o arquivo utils.ts da CLI
		await fs.copy(
			path.resolve(rootDir, "src/cli/utils.ts"),
			path.resolve(distDir, "cli/utils.ts"),
		);
		console.log("✅ Arquivo utils.ts copiado para a pasta dist/cli com sucesso!");

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
