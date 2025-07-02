import type { HTMLAttributes } from "react";

import "./styles.scss";

export type TooltipCardSubtitleProps = HTMLAttributes<HTMLParagraphElement>;

export const TooltipCardSubtitle = ({
	className = "",
	children,
	...restProps
}: TooltipCardSubtitleProps) => {
	return (
		<p className="tooltip__card-subtitle" {...restProps}>
			{children}
		</p>
	);
};
