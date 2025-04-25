import { useState } from 'react';

import './styles.scss';

import type { InputProps } from './types';

export const Input = ({
	className = '',
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
	const [focused, setFocused] = useState('');
	const disabledClass = disabled ? '--disabled' : '';
	const errorClass = errorMessage.length > 0 ? '--error' : '';
	const filledClass = value?.length > 0 ? '--filled' : '';

	const handleFocus = (isFocus: boolean) => {
		if (disabled || errorMessage.length > 0) return;
		isFocus ? setFocused('--focused') : setFocused('');
	};

	const handleInputChange = (value: string) => {
		onChange?.(value);
	};

	return (
		<div
			onFocus={() => handleFocus(true)}
			onBlur={() => handleFocus(false)}
			className={`input__root --${variant} ${width} ${filledClass} ${focused} ${disabledClass} ${errorClass} ${className}`.trim()}
			{...restProps}
		>
			<div className="input__box">
				{label && (
					<label htmlFor={`input-${label}`} className="input__label">
						{label}
					</label>
				)}
				<input
					id={`input-${label}`}
					name={`input-${label}`}
					type="text"
					className="input__field"
					value={value}
					onChange={(e) => handleInputChange(e.target.value)}
				/>
			</div>

			{isLoading && <span className="utils-loader input__loader" />}

			{helperText && !errorMessage && (
				<p className={'input__helper-text'}>{helperText}</p>
			)}
			{errorMessage && <p className={'input__error-message'}>{errorMessage}</p>}
		</div>
	);
};
