import chalk from "chalk";
import { listComponents } from "./commands";

export const listCommand = async () => {
  console.log(chalk.yellow("\n📋 Componentes disponíveis:\n"));

  const components = listComponents();

  components.forEach((name) => console.log(`🧩 ${name}`));

  console.log(
    chalk.yellow(`\nTotal: ${components.length} componentes disponíveis.\n`),
  );
};
