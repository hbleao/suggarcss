import { useState } from 'react';

import './styles.scss';

import { clsx } from '@/utils';

import type { TextareaProps } from './types';

export const Textarea = ({
	className = '',
	name = 'adsfads',
	variant = 'default',
	width = 'contain',
	value = '',
	label = 'label',
	onChange,
	disabled = false,
	rows = 5,
	helperText = '',
	errorMessage = '',
	children,
	...restProps
}: TextareaProps) => {
	const [focused, setFocused] = useState('');
	const classes = clsx(
		'textarea__root',
		`--${variant}`,
		`--${width}`,
		{ '--disabled': disabled },
		{ '--error': errorMessage.length > 0 },
		{ '--filled': value.length > 0 },
		{ '--focused': focused.length > 0 },
	);

	const handleFocus = (isFocus: boolean) => {
		if (disabled || errorMessage.length > 0) return;
		isFocus ? setFocused('--focused') : setFocused('');
	};

	return (
		<div
			onFocus={() => handleFocus(true)}
			onBlur={() => handleFocus(false)}
			className={classes}
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
