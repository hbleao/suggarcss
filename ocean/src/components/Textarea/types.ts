import type { ChangeEvent, DetailedHTMLProps } from 'react';

export type TextareaProps = DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	value?: string;
	name?: string;
	label?: string;
	variant?: 'outlined' | 'default';
	width?: 'fluid' | 'contain';
	rows?: number;
	disabled?: boolean;
	helperText?: string;
	errorMessage?: string;
	onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};
