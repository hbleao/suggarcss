import { readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { confirm, input } from "@inquirer/prompts";
import chalk from "chalk";
import { copy } from "fs-extra";

import { __dirname } from "./dirname";

export async function addAllComponents() {
  const defaultPath = "src/components/ui";

  const targetPath = await input({
    message: "📂 Caminho de destino:",
    default: defaultPath,
  });

  const confirmacao = await confirm({
    message: `⚠️ Isso irá copiar todos os componentes para "${targetPath}". Deseja continuar?`,
    default: true,
  });

  if (!confirmacao) {
    console.log(chalk.yellow("🚫 Operação cancelada."));
    process.exit(0);
  }

  const sourceDir = join(__dirname, "./components");
  const folders = readdirSync(sourceDir).filter((name) =>
    statSync(join(sourceDir, name)).isDirectory(),
  );

  for (const folder of folders) {
    const from = join(sourceDir, folder);
    const to = resolve(targetPath, folder);

    try {
      await copy(from, to);
      console.log(chalk.green(`✅ Copiado: ${folder}`));
    } catch (err) {
      console.error(chalk.red(`❌ Erro ao copiar ${folder}:`), err);
    }
  }
}
