import type { HTMLAttributes } from "react";

export type DropdownOption = {
	value: string;
	label: string;
};

export type DropdownProps = HTMLAttributes<HTMLDivElement> & {
	filled?: boolean;
	variant?: "outlined" | "default";
	width?: "fluid" | "contain";
	disabled?: boolean;
	errorText?: string;
	helperText?: string;
	label?: string;
	options?: DropdownOption[];
	onChange?: (value: string) => void;
	value?: string;
};
