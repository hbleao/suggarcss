import fs from "node:fs";
import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts", "src/cli.ts"],
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
				build.onLoad({ filter: /\.scss$/ }, async (args) => {
					const contents = await fs.promises.readFile(args.path, "utf8");
					const cssModuleKeys =
						contents
							.match(/\.([\w-]+)\s*{/g)
							?.map((selector) => selector.replace(/\.\s*|\s*{/g, ""))
							.filter(Boolean) || [];

					const cssModuleExports = cssModuleKeys.reduce(
						(acc, key) => {
							acc[key] = key;
							return acc;
						},
						{} as Record<string, string>,
					);

					return {
						contents: `export default ${JSON.stringify(cssModuleExports)};`,
						loader: "js",
					};
				});
			},
		},
	],
});
