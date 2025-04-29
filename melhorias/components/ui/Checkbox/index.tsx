"use client";

import React, { useState } from "react";

import "./styles.scss";

import { CheckSGV } from "./icon";

import type { CheckboxProps } from "./types";

export const Checkbox = ({
	name = "",
	label = "",
	checked = false,
	disabled = false,
	variant = "default",
	onChange,
	className = "",
	...restProps
}: CheckboxProps) => {
	const [isFocused, setIsFocused] = useState(false);

	const handleToggle = () => {
		if (disabled) return;
		onChange?.(!checked);
	};

	const classes = clsx(
		"checkbox__root",
		`--${variant}`,
		{
			"--checked": checked,
			"--disabled": disabled,
			"--focused": isFocused,
		},
		className,
	);

	return (
		<div
			className={classes}
			role="checkbox"
			aria-checked={checked}
			aria-disabled={disabled}
			tabIndex={disabled ? -1 : 0}
			onClick={handleToggle}
			onKeyDown={(e) =>
				e.key === "Enter" || e.key === " " ? handleToggle() : undefined
			}
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
			{...restProps}
		>
			<div className="checkbox__input">{checked && <CheckSGV />}</div>

			{label && (
				<label htmlFor={name} className="checkbox__label">
					{label}
				</label>
			)}
		</div>
	);
};
