export type TextareaProps = {
	className?: string;
	name?: string;
	variant?: "default" | "outlined";
	width?: "fluid" | "contain";
	value: string;
	label?: string;
	onChange?: (value: string) => void;
	disabled?: boolean;
	rows?: number;
	helperText?: string;
	errorMessage?: string;
	maxLength?: number;
};
