import { useState } from "react";

import "./styles.scss";

import { ArrowSvg } from "./Arrow";

import { clsx } from "@/utils/clsx";
import { Loader } from "../Loader";
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
	const classes = clsx(
		"dropdown__root",
		`--${variant}`,
		`--${width}`,
		{ "--filled": !!value },
		{ "--focused": isFocused },
		{ "--disabled": disabled },
		{ "--error": !!errorMessage },
		className,
	);

	const handleSelectOption = (option: DropdownOption) => {
		onChange?.(option.value);
		setIsOpen(false);
	};

	const toggleDropdown = () => {
		if (disabled) return;
		setIsOpen((prev) => !prev);
	};

	return (
		<div className={classes} {...restProps}>
			<div
				className="dropdown__trigger"
				onClick={toggleDropdown}
				onKeyDown={toggleDropdown}
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
					<Loader color="brand-insurance-900" />
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
