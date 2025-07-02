import fs from "node:fs";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  minify: true,
  clean: true,
  shims: true,
  external: [
    "react",
    "react-dom",
    "sanitize-html",
    "aes-js",
    "crypto-js",
    "next",
    "next/image",
    "next/link",
    "next/navigation",
    "@/assets/icons/ic-logo-porto.svg"
  ],
  noExternal: [],
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
