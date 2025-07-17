import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

import { __dirname } from "./dirname";

const dir = join(__dirname, "components");

export const listComponents = () => {
  return readdirSync(dir).filter((name) => {
    return statSync(join(dir, name)).isDirectory();
  });
};
