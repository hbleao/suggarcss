import type { HTMLAttributes } from "react";

import "./styles.scss";

export type TooltipContentListItemProps = HTMLAttributes<HTMLLIElement>;

export const TooltipContentListItem = ({
	className = "",
	children,
	...restProps
}: TooltipContentListItemProps) => {
	return (
		<li className="tooltip__content-list-item" {...restProps}>
			{children}
		</li>
	);
};
