import type { HTMLAttributes } from "react";

import "./styles.scss";

export type TooltipProps = HTMLAttributes<HTMLDivElement>;

export const Tooltip = ({
	className = "",
	children,
	...restProps
}: TooltipProps) => {
	return (
		<div className="header__tooltip" {...restProps}>
			{children}
		</div>
	);
};
