import { useState } from 'react';

import './styles.scss';

import type { TextareaProps } from './types';

export const Textarea = ({
	className = '',
	name = '',
	variant = 'default',
	width = 'contain',
	value = '',
	label = '',
	onChange,
	disabled = false,
	rows = 5,
	helperText = '',
	errorMessage = '',
	children,
	...restProps
}: TextareaProps) => {
	const [focused, setFocused] = useState('');
	const disabledClass = disabled ? '--disabled' : '';
	const errorClass = errorMessage.length > 0 ? '--error' : '';
	const filledClass = value.length > 0 ? '--filled' : '';

	const handleFocus = (isFocus: boolean) => {
		if (disabled || errorMessage.length > 0) return;
		isFocus ? setFocused('--focused') : setFocused('');
	};

	return (
		<div
			onFocus={() => handleFocus(true)}
			onBlur={() => handleFocus(false)}
			className={`textarea__root --${variant} --${width} ${filledClass} ${focused} ${disabledClass} ${errorClass}`}
			{...restProps}
		>
			{label && (
				<label htmlFor={name} className="textarea__label">
					{label}
				</label>
			)}
			<textarea
				id={name}
				name={name}
				className="textarea__field"
				rows={rows}
				onChange={onChange}
			/>
			<span className="textarea__counter">{value.length} / 200</span>
			{helperText && !errorMessage && (
				<p className="input__helper-text">{helperText}</p>
			)}
			{errorMessage && <p className="input__error-message">{errorMessage}</p>}
		</div>
	);
};
