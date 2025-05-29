import { confirm, input } from '@inquirer/prompts';
import fs from 'fs-extra';
import path from 'node:path';

// Importação dinâmica para evitar erros de TypeScript durante o build
let utils: { [key: string]: () => string[] } = {};

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  utils = require('../utils');
} catch (error) {
  // Fallback para caso o módulo não seja encontrado
  utils = {};
}

/**
 * Instala as funções utilitárias do projeto no diretório de destino
 * @param destDir Diretório de destino para instalação
 */
export async function installUtils(initialDestDir?: string): Promise<void> {
  // Se o diretório de destino não foi especificado, perguntar ao usuário
  let destDir = initialDestDir;
  if (!destDir) {
    destDir = await input({
      message:
        "Digite o caminho para o diretório onde deseja instalar as funções utilitárias:",
      default: "src/utils",
    });
  }

  // Confirmação antes da instalação (pular se o diretório foi fornecido como parâmetro)
  let confirmInstall = true;

  // Se o diretório não foi fornecido como parâmetro inicial, pedir confirmação
  if (destDir !== initialDestDir) {
    confirmInstall = await confirm({
      message: `Confirma a instalação das funções utilitárias em ${path.resolve(process.cwd(), destDir)}?`,
      default: true,
    });
  } else {
    console.log(`\n📦 Instalando funções utilitárias em ${path.resolve(process.cwd(), destDir)}...\n`);
  }

  if (!confirmInstall) {
    console.log("\n⚠️ Instalação cancelada pelo usuário.\n");
    process.exit(0);
  }

  try {
    // Possíveis caminhos das funções utilitárias
    const possiblePaths = [
      // Caminhos relativos ao diretório atual
      path.join(process.cwd(), "dist/utils"),
      path.join(process.cwd(), "src/utils"),
      // Caminhos absolutos para o caso de estarmos em um diretório diferente
      path.join("/Users/henrique/dev/sugarcss/dist/utils"),
      path.join("/Users/henrique/dev/sugarcss/src/utils"),
      // Caminhos relativos ao diretório do pacote
      path.join(path.dirname(path.dirname(__dirname)), "dist/utils"),
      path.join(path.dirname(path.dirname(__dirname)), "src/utils")
    ];

    // Encontrar o caminho das funções utilitárias
    let src = "";
    for (const possiblePath of possiblePaths) {
      if (fs.existsSync(possiblePath)) {
        src = possiblePath;
        console.log(`✅ Funções utilitárias encontradas em: ${src}`);
        break;
      }
    }

    if (!src) {
      console.error("❌ Funções utilitárias não encontradas.");
      process.exit(1);
    }

    // Destino para as funções utilitárias
    const dest = path.resolve(process.cwd(), destDir);

    // Criar diretório de destino se não existir
    fs.ensureDirSync(dest);

    // Copiar arquivos
    fs.copySync(src, dest);

    console.log(`\n✅ Funções utilitárias instaladas com sucesso em ${dest}!\n`);
    console.log("Utilitários disponíveis:");
    console.log("- clsx: Para combinar classes CSS condicionalmente");
    console.log("- formatDate: Para formatação de datas");
    console.log("- sanitize: Para sanitização de dados");
    console.log("- encrypt: Para criptografia de dados");
  } catch (error) {
    console.error("\n❌ Erro ao instalar as funções utilitárias:", error);
    process.exit(1);
  }
}
