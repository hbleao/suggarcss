import { useState } from 'react';

import './styles.scss';

import { ArrowSvg } from './Arrow';
import type { DropdownOption, DropdownProps } from './types';

export const Dropdown = ({
	className = '',
	name = '',
	variant = 'default',
	width = 'contain',
	disabled = false,
	errorMessage = '',
	helperText = '',
	label = '',
	isLoading = false,
	options = [],
	value = '',
	readOnly,
	onChange,
	children,
	...restProps
}: DropdownProps) => {
	const [focused, setFocused] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const disabledClass = disabled ? '--disabled' : '';
	const errorClass = errorMessage ? '--error' : '';
	const filledClass = value?.length > 0 ? '--filled' : '';
	const readOnlyClass = readOnly ? '--readonly' : '';

	const handleFocus = (isFocus: boolean) => {
		if (disabled || errorMessage) return;
		isFocus ? setFocused('--focused') : setFocused('');
	};

	const handleSelectedOption = (option: DropdownOption) => {
		onChange?.(option.value);
		setIsOpen(false);
	};

	return (
		<div
			onFocus={() => handleFocus(true)}
			onBlur={() => handleFocus(false)}
			className={`dropdown__root --${variant} --${width} ${filledClass} ${focused} ${disabledClass} ${errorClass}`}
			{...restProps}
		>
			<div
				className="dropdown__trigger"
				onClick={() => setIsOpen((old) => !old)}
				onKeyDown={() => setIsOpen((old) => !old)}
			>
				{label && (
					<label htmlFor={name} className="dropdown__label">
						{label}
					</label>
				)}
				<input
					id={name}
					name={name}
					value={value}
					className={`dropdown__field ${readOnlyClass}`}
					readOnly={readOnly}
				/>
				{isLoading ? (
					<span className="utils-loader" />
				) : (
					<ArrowSvg isOpen={isOpen} />
				)}
			</div>
			<ul className={`dropdown__list ${isOpen ? 'block' : 'none'}`}>
				{options.map((option) => (
					<li
						key={option.label}
						className="dropdown__item"
						onClick={() => handleSelectedOption(option)}
						onKeyDown={() => handleSelectedOption(option)}
					>
						{option.label}
					</li>
				))}
			</ul>

			{helperText && !errorMessage && (
				<p className="dropdown__helper-text">{helperText}</p>
			)}
			{errorMessage && (
				<p className="dropdown__error-message">{errorMessage}</p>
			)}
		</div>
	);
};
