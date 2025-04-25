import type { HTMLAttributes } from 'react';

export type InputProps = HTMLAttributes<HTMLDivElement> & {
	label?: string;
	value?: string;
	variant?: 'outlined' | 'default';
	width?: 'fluid' | 'contain';
	disabled?: boolean;
	isLoading?: boolean;
	helperText?: string;
	errorMessage?: string;
	onChange?: (value: string) => void;
};
