import type { HTMLAttributes } from "react";

export type DropdownOption = {
	value: string;
	label: string;
};

export type DropdownProps = HTMLAttributes<HTMLDivElement> & {
	variant?: "outlined" | "default";
	width?: "fluid" | "contain";
	disabled?: boolean;
	errorMessage?: string;
	helperText?: string;
	readOnly?: boolean;
	isLoading?: boolean;
	label?: string;
	options?: DropdownOption[];
	onChange?: (value: string) => void;
	value?: string;
};
