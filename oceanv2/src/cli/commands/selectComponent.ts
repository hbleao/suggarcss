import { select } from "@inquirer/prompts";
import chalk from "chalk";

export const selectComponent = async (listComponents: any) => {
  if (listComponents.length === 0) {
    console.log(chalk.red("❌ Nenhum componente encontrado."));
    process.exit(1);
  }

  const selected = await select({
    message: "Qual componente você deseja instalar?",
    choices: [...listComponents, { name: chalk.red("Cancelar"), value: null }],
  });

  if (!selected) {
    console.log(chalk.yellow("🚫 Instalação cancelada."));
    process.exit(0);
  }

  console.log(chalk.greenBright(`\n✅ Você escolheu: ${selected}\n`));

  return selected;
};
