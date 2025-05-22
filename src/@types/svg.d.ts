declare module "*.svg" {
  import type { FC, SVGProps } from "react";
  const SVG: string;
  export default SVG;
}

declare module "@/assets/icons/*.svg" {
  import type { FC, SVGProps } from "react";
  const SVG: string;
  export default SVG;
}
