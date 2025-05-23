import path from 'node:path';
import fs from 'fs-extra';
import { input, confirm } from '@inquirer/prompts';

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
      default: "src/utils", // Sugestão de diretório padrão
    });
  }

  // Confirmação antes da instalação
  const confirmInstall = await confirm({
    message: `Confirma a instalação das funções utilitárias em ${path.resolve(process.cwd(), destDir)}?`,
    default: true,
  });

  if (!confirmInstall) {
    console.log("\n⚠️ Instalação cancelada pelo usuário.\n");
    process.exit(0);
  }

  try {
    // Caminho para a raiz do pacote instalado
    const pkgPath = path.dirname(path.dirname(__dirname));
    
    // Possíveis caminhos das funções utilitárias
    const possiblePaths = [
      path.join(pkgPath, "dist/utils"),
      path.join(pkgPath, "src/utils"),
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
