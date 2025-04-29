import type { HTMLAttributes } from "react";

export type CheckboxProps = HTMLAttributes<HTMLDivElement> & {
	variant?: "default" | "checked" | "disabled";
	label?: string;
	name?: string;
	checked: boolean;
	disabled: boolean;
	onChange: (checked: boolean) => void;
};
