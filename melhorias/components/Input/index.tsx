import { clsx } from '@/utils/clsx';
import { useState } from 'react';

import './styles.scss';

import { Loader } from '../Loader';
import type { InputProps } from './types';

export const Input = ({
	className = '',
	name = '',
	variant = 'default',
	width = 'contain',
	disabled = false,
	value = '',
	isLoading = false,
	helperText = '',
	errorMessage = '',
	label = '',
	children,
	onChange,
	...restProps
}: InputProps) => {
	const [focused, setFocused] = useState(false);

	const handleFocus = (isFocus: boolean) => {
		if (disabled) return;
		setFocused(isFocus);
	};
	const isError = errorMessage.length > 0;
	const isFilled = value?.toString().length > 0;
	const classes = clsx(
		'input__root',
		`--${variant}`,
		`--${width}`,
		{ '--filled': !!isFilled },
		{ '--focused': focused },
		{ '--disabled': disabled },
		{ '--error': isError },
		className,
	);

	return (
		<div
			className={classes}
			onFocus={() => handleFocus(true)}
			onBlur={() => handleFocus(false)}
			{...restProps}
		>
			<div className="input__box">
				{label && (
					<label htmlFor={name} className="input__label">
						{label}
					</label>
				)}
				<input
					id={name}
					name={name}
					type="text"
					className="input__field"
					value={value}
					disabled={disabled}
					onChange={onChange}
				/>
			</div>

			{isLoading && (
				<Loader className="input__loader" color="brand-insurance-900" />
			)}

			{!isError && helperText && (
				<p className="input__helper-text">{helperText}</p>
			)}
			{isError && <p className="input__error-message">{errorMessage}</p>}
		</div>
	);
};
