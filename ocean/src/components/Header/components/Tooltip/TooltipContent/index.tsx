import type { HTMLAttributes } from "react";

import "./styles.scss";

export type TooltipContentProps = HTMLAttributes<HTMLDivElement>;

export const TooltipContent = ({
	className = "",
	children,
	...restProps
}: TooltipContentProps) => {
	return (
		<div className="tooltip__content" {...restProps}>
			{children}
		</div>
	);
};
