import type { HTMLAttributes } from "react";

import "./styles.scss";

export type TooltipSeparatorProps = HTMLAttributes<HTMLDivElement>;

export const TooltipSeparator = ({
	className = "",
	children,
	...restProps
}: TooltipSeparatorProps) => {
	return (
		<div className="tooltip__separator" {...restProps}>
			{children}
		</div>
	);
};
