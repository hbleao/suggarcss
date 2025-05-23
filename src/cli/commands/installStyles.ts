import path from 'node:path';
import fs from 'fs-extra';
import { input, confirm } from '@inquirer/prompts';

// Importação dinâmica para evitar erros de TypeScript durante o build
let utils: Record<string, any> = {};

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  utils = require('../utils');
} catch (error) {
  // Fallback para caso o módulo não seja encontrado
  utils = {};
}

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
      default: "src/styles", // Sugestão de diretório padrão
    });
  }

  // Confirmação antes da instalação
  const confirmInstall = await confirm({
    message: `Confirma a instalação dos estilos base em ${path.resolve(process.cwd(), destDir)}?`,
    default: true,
  });

  if (!confirmInstall) {
    console.log("\n⚠️ Instalação cancelada pelo usuário.\n");
    process.exit(0);
  }

  try {
    // Caminho para a raiz do pacote instalado
    const pkgPath = path.dirname(path.dirname(__dirname));
    
    // Possíveis caminhos dos estilos
    const possiblePaths = [
      path.join(pkgPath, "dist/styles"),
      path.join(pkgPath, "src/styles"),
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
