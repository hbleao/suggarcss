import chalk from "chalk";
import { addComponent, listComponents, selectComponent } from "./commands";

export async function addCommand() {
  console.log(
    chalk.cyanBright("\n✨ Vamos adicionar um novo componente UI!\n"),
  );

  const list = listComponents() as any;

  const selected = (await selectComponent(list)) as string;

  addComponent(selected);
}
