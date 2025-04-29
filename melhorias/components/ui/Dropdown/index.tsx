import { useState } from "react";
import "./styles.scss";

import { ArrowSvg } from "./Arrow";
import type { DropdownOption, DropdownProps } from "./types";

export const Dropdown = ({
	className = "",
	name = "",
	variant = "default",
	width = "contain",
	disabled = false,
	errorMessage = "",
	helperText = "",
	label = "",
	isLoading = false,
	options = [],
	value = "",
	readOnly = false,
	onChange,
	...restProps
}: DropdownProps) => {
	const [isFocused, setIsFocused] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const handleFocus = (focus: boolean) => {
		if (disabled || errorMessage) return;
		setIsFocused(focus);
	};

	const handleSelectOption = (option: DropdownOption) => {
		onChange?.(option.value);
		setIsOpen(false);
	};

	const toggleDropdown = () => {
		if (disabled || readOnly) return;
		setIsOpen((prev) => !prev);
	};

	return (
		<div
			className={`
        dropdown__root 
        --${variant} 
        --${width}
        ${value ? "--filled" : ""} 
        ${isFocused ? "--focused" : ""} 
        ${disabled ? "--disabled" : ""} 
        ${errorMessage ? "--error" : ""}
        ${className}
      `}
			onFocus={() => handleFocus(true)}
			onBlur={() => handleFocus(false)}
			{...restProps}
		>
			<div
				className="dropdown__trigger"
				onClick={toggleDropdown}
				role="button"
				tabIndex={0}
				onKeyDown={(e) =>
					e.key === "Enter" || e.key === " " ? toggleDropdown() : undefined
				}
			>
				{label && (
					<label htmlFor={name} className="dropdown__label">
						{label}
					</label>
				)}

				<input
					id={name}
					name={name}
					type="text"
					className={`dropdown__field ${readOnly ? "--readonly" : ""}`}
					value={value}
					readOnly
					tabIndex={-1}
				/>

				{isLoading ? (
					<span className="utils-loader" />
				) : (
					<ArrowSvg isOpen={isOpen} />
				)}
			</div>

			{isOpen && (
				<ul className="dropdown__list" role="listbox">
					{options.map((option) => (
						<li
							key={option.value}
							className="dropdown__item"
							role="option"
							aria-selected={value === option.value}
							onClick={() => handleSelectOption(option)}
							onKeyDown={(e) =>
								e.key === "Enter" || e.key === " "
									? handleSelectOption(option)
									: undefined
							}
							tabIndex={0}
						>
							{option.label}
						</li>
					))}
				</ul>
			)}

			{helperText && !errorMessage && (
				<p className="dropdown__helper-text">{helperText}</p>
			)}
			{errorMessage && (
				<p className="dropdown__error-message">{errorMessage}</p>
			)}
		</div>
	);
};
