import { useState, useRef } from "react";
import type { KeyboardEvent, ChangeEvent } from "react";

import "./styles.scss";

import type { DropdownOption, DropdownProps } from "./types";

export const Dropdown = ({
	className = "",
	variant = "default",
	width = "contain",
	filled = false,
	disabled = false,
	errorText = "",
	helperText = "",
	label = "",
	options = [],
	value = "",
	onChange,
	children,
	...restProps
}: DropdownProps) => {
	const [focused, setFocused] = useState("");
	const selectRef = useRef<HTMLSelectElement>(null);
	const disabledClass = disabled ? "--disabled" : "";
	const errorClass = errorText.length > 0 ? "--error" : "";
	const filledClass = filled ? "--filled" : "";

	const handleFocus = (isFocus: boolean) => {
		if (disabled || errorText.length > 0) return;
		isFocus ? setFocused("--focused") : setFocused("");
	};

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		if (disabled) return;
		onChange?.(event.target.value);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLSelectElement>) => {
		if (disabled) return;
		
		// Handle keyboard navigation
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			// Toggle the native select dropdown
			selectRef.current?.click();
		}
	};

	return (
		<div
			onFocus={() => handleFocus(true)}
			onBlur={() => handleFocus(false)}
			className={`dropdown__root --${variant} --${width} ${filledClass} ${focused} ${disabledClass} ${errorClass} ${className}`}
			{...restProps}
		>
			<div className={`dropdown__trigger ${className}`}>
				{label && (
					<label
						htmlFor="dropdown-select"
						className={`dropdown__label ${className}`}
					>
						{label}
					</label>
				)}
				
				{/* Visually hidden native select for accessibility */}
				<select
					ref={selectRef}
					id="dropdown-select"
					className="dropdown__select visually-hidden"
					value={value}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					disabled={disabled}
					aria-describedby={errorText ? "dropdown-error" : helperText ? "dropdown-helper" : undefined}
				>
					<option value="" disabled={options.length > 0}>
						Select an option
					</option>
					{options.map((option: DropdownOption) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
					{options.length === 0 && children && (
						<option value="custom">{children}</option>
					)}
				</select>
				
				{/* Custom styled dropdown display */}
				<div 
					className={`dropdown__field ${className}`}
					onClick={() => !disabled && selectRef.current?.focus()}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							!disabled && selectRef.current?.focus();
						}
					}}
					tabIndex={disabled ? -1 : 0}
				>
					{value ? options.find(opt => opt.value === value)?.label || value : 'Select an option'}
				</div>
				<span className="dropdown__icon" aria-hidden="true">icon</span>
			</div>

			{helperText && !errorText && (
				<p id="dropdown-helper" className={"dropdown__helper-text"} {...restProps}>
					{helperText}
				</p>
			)}

			{errorText && (
				<p id="dropdown-error" className={"dropdown__error-text"} {...restProps}>
					{errorText}
				</p>
			)}
		</div>
	);
};
