import chalk from "chalk";
import { addAllComponents } from "./commands";

export async function addAllCommand() {
  console.log(chalk.cyan("\n📦 Adicionar TODOS os componentes SugarCSS\n"));

  await addAllComponents();

  console.log(
    chalk.greenBright(
      `\n🎉 Todos os componentes foram instalados com sucesso."\n`,
    ),
  );
}
