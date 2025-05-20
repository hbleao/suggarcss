import type { HTMLAttributes } from "react";

type Size = "small" | "large";
type Styles = "primary" | "secondary" | "ghost";
type Variant = "insurance" | "banking" | "health" | "negative" | "disabled";

export type Button = HTMLAttributes<HTMLButtonElement> & {
	label: string;
	size?: Size;
	styles?: Styles;
	width?: "contain" | "fluid";
	variant?: Variant;
	disabled?: boolean;
	isLoading?: boolean;
};

export type TextBodyProps = HTMLAttributes<HTMLDivElement> & {
	title?: string;
	subtitle?: string;
	text?: string;
	buttons: Button[];
};
