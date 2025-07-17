import { join, resolve } from "node:path";
import { input } from "@inquirer/prompts";
import chalk from "chalk";
import { copy } from "fs-extra";

import { __dirname } from "./dirname";

export async function addComponent(name: string) {
  const targetPath = await input({
    message: "Caminho de destino:",
    default: "src/components/ui",
  });

  const from = join(__dirname, "./components", name);
  const to = resolve(targetPath, name);

  try {
    await copy(from, to);
    console.log(chalk.green(`\n✅ Componente "${name}" instalado em: ${to}\n`));
  } catch (err) {
    console.error(chalk.red("❌ Erro ao copiar componente:"), err);
  }
}
