import path from 'node:path';
import fs from 'fs-extra';
import { input, confirm } from '@inquirer/prompts';

// Importação dinâmica para evitar erros de TypeScript durante o build
let utils: any;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  utils = require('../utils');
} catch (error) {
  // Fallback para caso o módulo não seja encontrado
  utils = {};
}

/**
 * Instala os hooks do projeto no diretório de destino
 * @param destDir Diretório de destino para instalação
 */
export async function installHooks(initialDestDir?: string): Promise<void> {
  let destDir = initialDestDir;
  // Se o diretório de destino não foi especificado, perguntar ao usuário
  if (!destDir) {
    destDir = await input({
      message:
        "Digite o caminho para o diretório onde deseja instalar os hooks:",
      default: "src/hooks", // Sugestão de diretório padrão
    });
  }

  // Confirmação antes da instalação
  const confirmInstall = await confirm({
    message: `Confirma a instalação dos hooks em ${path.resolve(process.cwd(), destDir)}?`,
    default: true,
  });

  if (!confirmInstall) {
    console.log("\n⚠️ Instalação cancelada pelo usuário.\n");
    process.exit(0);
  }

  try {
    // Caminho para a raiz do pacote instalado
    const pkgPath = path.dirname(path.dirname(__dirname));
    
    // Possíveis caminhos dos hooks
    const possiblePaths = [
      path.join(pkgPath, "dist/hooks"),
      path.join(pkgPath, "src/hooks"),
    ];
    
    // Encontrar o caminho dos hooks
    let src = "";
    for (const possiblePath of possiblePaths) {
      if (fs.existsSync(possiblePath)) {
        src = possiblePath;
        console.log(`✅ Hooks encontrados em: ${src}`);
        break;
      }
    }
    
    if (!src) {
      console.error("❌ Hooks não encontrados.");
      process.exit(1);
    }
    
    // Destino para os hooks
    const dest = path.resolve(process.cwd(), destDir);
    
    // Criar diretório de destino se não existir
    fs.ensureDirSync(dest);
    
    // Copiar arquivos
    fs.copySync(src, dest);
    
    console.log(`\n✅ Hooks instalados com sucesso em ${dest}!\n`);
    console.log("Hooks disponíveis:");
    console.log("- useMediaQuery: Para detectar media queries CSS");
    console.log("- useOutsideClick: Para detectar cliques fora de um elemento");
    console.log("- useToggle: Para alternar entre valores booleanos ou personalizados");
    console.log("- usePrevious: Para armazenar o valor anterior de uma variável");
    console.log("- useWindowSize: Para monitorar as dimensões da janela");
    console.log("- useOnScreen: Para detectar quando um elemento entra na viewport");
    console.log("- useCookie: Para gerenciar cookies no navegador");
  } catch (error) {
    console.error("\n❌ Erro ao instalar os hooks:", error);
    process.exit(1);
  }
}
