// import './styles.scss';

// import type { CheckboxProps } from './types';

// export const Checkbox = ({
// 	className = '',
// 	variant = 'default',
// 	label = '',
// 	title = '',
// 	...restProps
// }: CheckboxProps) => {
// 	return (
// 		<div className={`checkbox__root --${variant} ${className}`} {...restProps}>
// 			<div className="checkbox__input" title={title}>
// 				<svg
// 					width="21"
// 					height="20"
// 					viewBox="0 0 21 20"
// 					fill="none"
// 					xmlns="http://www.w3.org/2000/svg"
// 					className="checkbox__svg"
// 				>
// 					<title>checkbox</title>
// 					<path
// 						d="M15.5 6.66676L9.61714 13.3334L5.5 9.16604"
// 						stroke="white"
// 						strokeWidth="3"
// 						strokeLinecap="round"
// 						strokeLinejoin="round"
// 					/>
// 				</svg>
// 			</div>
// 			<span
// 				className="checkbox__label"
// 				dangerouslySetInnerHTML={{ __html: label }}
// 			/>
// 		</div>
// 	);
// };

"use client";

import { useState } from "react";
import "./styles.scss";

import { CheckSvg } from "./Check"; // Seu SVG de check pode ser separado.

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

	return (
		<div
			className={`
        checkbox__root
        --${variant}
        ${checked ? "--checked" : ""}
        ${disabled ? "--disabled" : ""}
        ${isFocused ? "--focused" : ""}
        ${className}
      `}
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
			<div className="checkbox__input">{checked && <CheckSvg />}</div>

			{label && (
				<label htmlFor={name} className="checkbox__label">
					{label}
				</label>
			)}
		</div>
	);
};
