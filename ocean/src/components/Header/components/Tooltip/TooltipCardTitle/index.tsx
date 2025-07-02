import type { HTMLAttributes } from "react";

import "./styles.scss";

export type TooltipCardTitleProps = HTMLAttributes<HTMLParagraphElement>;

export const TooltipCardTitle = ({
	className = "",
	children,
	...restProps
}: TooltipCardTitleProps) => {
	return (
		<p className="tooltip__card-title" {...restProps}>
			{children}
		</p>
	);
};
