import type { HTMLAttributes } from "react";

import "./styles.scss";

export type TooltipContentListProps = HTMLAttributes<HTMLUListElement>;

export const TooltipContentList = ({
	className = "",
	children,
	...restProps
}: TooltipContentListProps) => {
	return (
		<ul className="tooltip__content-list" {...restProps}>
			{children}
		</ul>
	);
};
