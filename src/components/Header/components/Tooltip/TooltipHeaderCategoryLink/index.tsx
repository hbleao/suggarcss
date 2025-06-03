import type { ButtonHTMLAttributes } from "react";

import "./styles.scss";

export type TooltipLinkProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	iconName: string;
};

export const TooltipLink = ({
	className = "",
	iconName,
	children,
	...restProps
}: TooltipLinkProps) => {
	return (
		<button className="tooltip__header-category-link" {...restProps}>
			{children}
		</button>
	);
};
