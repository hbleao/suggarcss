import type { HTMLAttributes } from "react";

import "./styles.scss";

export type TooltipHeaderProps = HTMLAttributes<HTMLDivElement>;

export const TooltipHeader = ({
	className = "",
	children,
	...restProps
}: TooltipHeaderProps) => {
	return (
		<div className="tooltip__header" {...restProps}>
			{children}
		</div>
	);
};
