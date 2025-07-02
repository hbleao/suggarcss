import type { HTMLAttributes } from "react";

import "./styles.scss";

export type TooltipContainerProps = HTMLAttributes<HTMLElement>;

export const TooltipContainer = ({
	className = "",
	children,
	...restProps
}: TooltipContainerProps) => {
	return (
		<nav className="tooltip__container" {...restProps}>
			{children}
		</nav>
	);
};
