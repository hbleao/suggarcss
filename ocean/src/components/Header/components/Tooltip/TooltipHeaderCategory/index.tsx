import type { ButtonHTMLAttributes } from "react";

import "./styles.scss";

export type TooltipHeaderCategoryProps =
	ButtonHTMLAttributes<HTMLButtonElement> & {
		isSelected?: boolean;
	};

export const TooltipHeaderCategory = ({
	className = "",
	isSelected = false,
	children,
	...restProps
}: TooltipHeaderCategoryProps) => {
	const selectClass = isSelected ? "isSelected" : "";

	return (
		<button
			className={`tooltip__header-category ${selectClass}`}
			{...restProps}
		>
			{children}
		</button>
	);
};
