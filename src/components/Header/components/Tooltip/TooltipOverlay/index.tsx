import type { HTMLAttributes } from "react";

import "./styles.scss";

export type TooltipOverlayProps = HTMLAttributes<HTMLElement>;

export const TooltipOverlay = ({
	className = "",
	children,
	...restProps
}: TooltipOverlayProps) => {
	return (
		<div className="tooltip__overlay" {...restProps}>
			{children}
		</div>
	);
};
