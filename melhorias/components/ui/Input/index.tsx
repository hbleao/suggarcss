import { useState } from "react";
import "./styles.scss";
import type { InputProps } from "./types";

export const Input = ({
	className = "",
	name = "",
	variant = "default",
	width = "contain",
	disabled = false,
	value = "",
	isLoading = false,
	helperText = "",
	errorMessage = "",
	label = "",
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

	const classes = [
		"input__root",
		`--${variant}`,
		`--${width}`,
		isFilled ? "--filled" : "",
		focused ? "--focused" : "",
		disabled ? "--disabled" : "",
		isError ? "--error" : "",
		className,
	]
		.filter(Boolean)
		.join(" ");

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

			{isLoading && <span className="input__loader utils-loader" />}

			{!isError && helperText && (
				<p className="input__helper-text">{helperText}</p>
			)}
			{isError && <p className="input__error-message">{errorMessage}</p>}
		</div>
	);
};
