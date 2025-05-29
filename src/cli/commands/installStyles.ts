import { confirm, input } from '@inquirer/prompts';
import fs from 'fs-extra';
import path from 'node:path';

/**
 * Instala os estilos base do projeto no diretório de destino
 * @param destDir Diretório de destino para instalação
 */
export async function installStyles(initialDestDir?: string): Promise<void> {
  let destDir = initialDestDir;
  // Se o diretório de destino não foi especificado, perguntar ao usuário
  if (!destDir) {
    destDir = await input({
      message:
        "Digite o caminho para o diretório onde deseja instalar os estilos:",
      default: "src/styles",
    });
  }

  // Confirmação antes da instalação (pular se o diretório foi fornecido como parâmetro)
  let confirmInstall = true;

  // Se o diretório não foi fornecido como parâmetro inicial, pedir confirmação
  if (destDir !== initialDestDir) {
    confirmInstall = await confirm({
      message: `Confirma a instalação dos estilos base em ${path.resolve(process.cwd(), destDir)}?`,
      default: true,
    });
  } else {
    console.log(`\n📦 Instalando estilos base em ${path.resolve(process.cwd(), destDir)}...\n`);
  }

  if (!confirmInstall) {
    console.log("\n⚠️ Instalação cancelada pelo usuário.\n");
    process.exit(0);
  }

  try {
    // Possíveis caminhos dos estilos
    const possiblePaths = [
      // Caminhos relativos ao diretório atual
      path.join(process.cwd(), "dist/styles"),
      path.join(process.cwd(), "src/styles"),
      // Caminhos absolutos para o caso de estarmos em um diretório diferente
      path.join("/Users/henrique/dev/sugarcss/dist/styles"),
      path.join("/Users/henrique/dev/sugarcss/src/styles"),
      // Caminhos relativos ao diretório do pacote
      path.join(path.dirname(path.dirname(__dirname)), "dist/styles"),
      path.join(path.dirname(path.dirname(__dirname)), "src/styles")
    ];

    // Encontrar o caminho dos estilos
    let src = "";
    for (const possiblePath of possiblePaths) {
      if (fs.existsSync(possiblePath)) {
        src = possiblePath;
        console.log(`✅ Estilos encontrados em: ${src}`);
        break;
      }
    }

    if (!src) {
      console.error("❌ Estilos não encontrados.");
      process.exit(1);
    }

    // Destino para os estilos
    const dest = path.resolve(process.cwd(), destDir);

    // Criar diretório de destino se não existir
    fs.ensureDirSync(dest);

    // Copiar arquivos
    fs.copySync(src, dest);

    console.log(`\n✅ Estilos instalados com sucesso em ${dest}!\n`);
  } catch (error) {
    console.error("\n❌ Erro ao instalar os estilos:", error);
    process.exit(1);
  }
}
