import chalk from "chalk";
import { addPackage } from "./commands";

export const addPackageCommand = async () => {
  console.log(chalk.yellow("\n📦 Pacotes disponíveis:\n"));

  await addPackage();
};
