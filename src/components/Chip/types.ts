import type { HTMLAttributes } from "react";

export type ChipProps = HTMLAttributes<HTMLDivElement> & {
	variant?: "default" | "selected";
};
