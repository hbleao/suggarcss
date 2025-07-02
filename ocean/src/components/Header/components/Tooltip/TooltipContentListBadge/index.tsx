import type { HTMLAttributes } from "react";

import "./styles.scss";

export type TooltipContentListBadgeProps = HTMLAttributes<HTMLSpanElement>;

export const TooltipContentListBadge = ({
	className = "",
	children,
	...restProps
}: TooltipContentListBadgeProps) => {
	return (
		<span className="tooltip__content-list-badge" {...restProps}>
			{children}
		</span>
	);
};
