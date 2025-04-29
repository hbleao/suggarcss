"use client";
import React from "react";

import "./styles.scss";
import type { RadioProps } from "./types";

export const Radio = ({
	className = "",
	variant = "default",
	description = "",
	checked = false,
	disabled = false,
	onChange,
	...restProps
}: RadioProps) => {
	const handleToggle = () => {
		if (disabled) return;
		onChange?.(!checked);
	};

	return (
		<div
			className={`
        radio__root 
        --${variant} 
        ${checked ? "--checked" : ""}
        ${disabled ? "--disabled" : ""}
        ${className}
      `}
			role="radio"
			aria-checked={checked}
			aria-disabled={disabled}
			tabIndex={disabled ? -1 : 0}
			onClick={handleToggle}
			onKeyDown={(e) =>
				e.key === "Enter" || e.key === " " ? handleToggle() : undefined
			}
			{...restProps}
		>
			<div className="radio__input">
				{checked && (
					<svg
						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="radio__svg"
					>
						<circle cx="6" cy="6" r="6" fill="white" />
					</svg>
				)}
			</div>

			{description && <p className="radio__label">{description}</p>}
		</div>
	);
};
