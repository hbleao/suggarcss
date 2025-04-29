import React, { useState } from "react";

import "./styles.scss";

import type { TextareaProps } from "./types";

export const Textarea = ({
	className = "",
	name = "",
	variant = "default",
	width = "contain",
	value = "",
	label = "",
	onChange,
	disabled = false,
	rows = 5,
	helperText = "",
	errorMessage = "",
	maxLength = 200,
	...restProps
}: TextareaProps) => {
	const [isFocused, setIsFocused] = useState(false);

	const filledClass = value.length > 0 ? "--filled" : "";
	const focusedClass = isFocused ? "--focused" : "";
	const errorClass = errorMessage ? "--error" : "";
	const disabledClass = disabled ? "--disabled" : "";

	const handleFocus = (focus: boolean) => {
		if (disabled) return;
		setIsFocused(focus);
	};

	return (
		<div
			className={`textarea__root --${variant} --${width} ${filledClass} ${focusedClass} ${errorClass} ${disabledClass} ${className}`}
			onFocus={() => handleFocus(true)}
			onBlur={() => handleFocus(false)}
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
				disabled={disabled}
				maxLength={maxLength}
				value={value}
				aria-invalid={!!errorMessage}
				aria-describedby={errorMessage ? `${name}-error` : undefined}
				onChange={(e) => onChange?.(e.target.value)}
			/>

			<span className="textarea__counter">
				{value.length} / {maxLength}
			</span>

			{!errorMessage && helperText && (
				<p className="textarea__helper-text">{helperText}</p>
			)}

			{errorMessage && (
				<p id={`${name}-error`} className="textarea__error-message">
					{errorMessage}
				</p>
			)}
		</div>
	);
};
