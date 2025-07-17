#!/usr/bin/env node
import { Command } from "commander";
import { addAllCommand } from "./addAllCommands.js";
import { addCommand } from "./addCommand.js";
import { addPackageCommand } from "./addPackageCommand.js";
import { listCommand } from "./listCommand.js";

const program = new Command();

program
  .name("suggar")
  .version("0.0.1")
  .description("CLI para instalação de componentes");

program
  .command("list")
  .option("--list", "Lista todos os componentes")
  .action(() => {
    listCommand();
  });

program
  .command("add")
  .option("--add", "Adiciona um componente")
  .action(() => {
    addCommand();
  });

program
  .command("addAll")
  .option("--addAll", "Adiciona todos os componentes")
  .action(() => {
    addAllCommand();
  });

program
  .command("install")
  .description("Instala um pacote utilitário (styles, helpers, hooks...)")
  .action(() => {
    addPackageCommand();
  });

program.parse();
