import type { HTMLAttributes } from "react";

export type AccordionProps = HTMLAttributes<HTMLDivElement> & {
	title: string;
	variant?: "default" | "negative";
	border?: "top" | "none" | "base";
	width?: "fluid" | "contain";
	children?: React.ReactNode;
};
