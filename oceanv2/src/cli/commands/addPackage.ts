import { join, resolve } from "node:path";
import { select } from "@inquirer/prompts";
import chalk from "chalk";
import { copy } from "fs-extra";

import { __dirname } from "./dirname";

export async function addPackage() {
  const options = ["styles", "helpers", "hooks", "@types"];

  const selected = await select({
    message: "📦 Qual pacote deseja instalar?",
    choices: options.map((pkg) => ({ name: pkg, value: pkg })),
  });

  const from = join(__dirname, "./", selected);
  const to = resolve("dist", selected);

  try {
    await copy(from, to);
    console.log(chalk.green(`✅ Pacote "${selected}" instalado com sucesso.`));
  } catch (err) {
    console.error(chalk.red(`❌ Erro ao instalar o pacote "${selected}"`), err);
  }
}
