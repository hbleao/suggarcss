import fs from "node:fs";
import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts", "src/cli/cli.ts"],
	format: ["esm"],
	dts: true,
	minify: true,
	clean: true,
	shims: true,
	banner: {
		js: "#!/usr/bin/env node",
	},
	esbuildPlugins: [
		{
			name: "scss-module",
			setup(build) {
				// Intercepta importações de arquivos .scss
				build.onLoad({ filter: /\.scss$/ }, async (args) => {
					const contents = await fs.promises.readFile(args.path, "utf8");
					const cssModuleKeys =
						contents
							.match(/\.([\w-]+)\s*{/g)
							?.map((selector) => selector.replace(/\.\s*|\s*{/g, ""))
							.filter(Boolean) || [];

					// Cria um objeto com as classes CSS como chaves
					const cssModuleExports = cssModuleKeys.reduce(
						(acc, key) => {
							acc[key] = key;
							return acc;
						},
						{} as Record<string, string>,
					);

					// Retorna um módulo JavaScript que exporta as classes CSS
					return {
						contents: `export default ${JSON.stringify(cssModuleExports)};`,
						loader: "js",
					};
				});
			},
		},
	],
});
