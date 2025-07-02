#!/usr/bin/env node

/**
 * Script para atualizar o CHANGELOG.md automaticamente
 * 
 * Este script lê o arquivo release-notes.ts diretamente e gera um CHANGELOG.md atualizado.
 * Pode ser executado manualmente ou como parte do processo de build.
 */

import fs from "fs-extra";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

// Obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

/**
 * Função principal que atualiza o CHANGELOG.md
 */
async function main() {
  try {
    // Caminho para o arquivo release-notes.ts
    const releaseNotesPath = path.resolve(rootDir, 'src/cli/release-notes.ts');
    
    // Verificar se o arquivo existe
    if (!await fs.pathExists(releaseNotesPath)) {
      console.error(`❌ Arquivo ${releaseNotesPath} não encontrado.`);
      process.exit(1);
    }
    
    // Executar um script temporário para extrair o conteúdo do changelog
    // Criamos um arquivo temporário que importa o módulo e gera o changelog
    const tempScriptPath = path.resolve(rootDir, 'temp-changelog-generator.js');
    
    // Conteúdo do script temporário
    const tempScriptContent = `
    import { register } from 'node:module';
    register('ts-node/esm', import.meta.url);
    
    import { generateChangelog } from './src/cli/release-notes.js';
    import fs from 'fs';
    
    // Gerar o changelog e escrever em um arquivo temporário
    const changelog = generateChangelog();
    fs.writeFileSync('./temp-changelog.txt', changelog, 'utf8');
    console.log('Changelog gerado com sucesso!');
    `;
    
    // Escrever o script temporário
    await fs.writeFile(tempScriptPath, tempScriptContent, 'utf8');
    
    try {
      // Executar o script temporário
      execSync('node --experimental-specifier-resolution=node --loader ts-node/esm temp-changelog-generator.js', {
        cwd: rootDir,
        stdio: 'inherit'
      });
      
      // Ler o conteúdo do changelog gerado
      const changelogContent = await fs.readFile(path.resolve(rootDir, 'temp-changelog.txt'), 'utf8');
      
      // Limpar arquivos temporários
      await fs.remove(tempScriptPath);
      await fs.remove(path.resolve(rootDir, 'temp-changelog.txt'));
      
      // Escrever o conteúdo no arquivo CHANGELOG.md
      await fs.writeFile(
        path.resolve(rootDir, "CHANGELOG.md"),
        changelogContent,
        'utf8'
      );
      
      console.log("✅ CHANGELOG.md atualizado com sucesso!");
      
      // Também copiar o CHANGELOG.md para a pasta dist se ela existir
      const distDir = path.resolve(rootDir, "dist");
      if (await fs.pathExists(distDir)) {
        await fs.writeFile(
          path.resolve(distDir, "CHANGELOG.md"),
          changelogContent,
          'utf8'
        );
        console.log("✅ CHANGELOG.md copiado para a pasta dist com sucesso!");
      }
    } catch (error) {
      console.error(`❌ Erro ao executar o script temporário: ${error}`);
    }
  } catch (error) {
    console.error("❌ Erro ao atualizar o CHANGELOG.md:", error);
    process.exit(1);
  }
}

// Executar a função principal
main();
