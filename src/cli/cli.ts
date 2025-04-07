import { Command } from "commander";
import fs from "fs-extra";
import path from "node:path";
import { fileURLToPath } from "node:url";

const program = new Command();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

program
	.name("sugarcss")
	.description("Instala componentes React com Sass do @sugarcss/react")
	.version("0.1.0");

program
	.command("install")
	.argument("<component>", "Nome do componente para instalar")
	.option("-d, --dir <directory>", "Diretório de destino para instalar o componente", "")
	.action(async (component, options) => {
		const available = [
			"button",
			"input",
			"modal",
			"dropdown",
			"textarea",
			"typography",
			"accordion",
			"tabs",
			"link",
		];
		
		// Verificar se o componente está na lista mas ainda não foi implementado
		const implemented = ["button", "input"];
		if (!available.includes(component)) {
			console.error(`Componente "${component}" não encontrado.`);
			process.exit(1);
		}
		
		if (!implemented.includes(component)) {
			console.error(`Componente "${component}" ainda não foi implementado.`);
			process.exit(1);
		}

		// Ajustar o caminho para apontar para a pasta src/components
		const srcPath = path.dirname(path.dirname(__dirname));
		const src = path.join(srcPath, `src/components/${component}`);
		// Usar o diretório especificado ou o diretório atual
		const baseDir = options.dir ? options.dir : process.cwd();
		const dest = path.join(baseDir, `src/components/ui/${component}`);

		await fs.ensureDir(dest);
		await fs.copy(src, dest);

		console.log(
			`✅ Componente "${component}" instalado em src/components/ui/${component}`,
		);
	});

program.parse();
