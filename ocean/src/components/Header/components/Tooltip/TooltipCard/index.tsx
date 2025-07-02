import type { HTMLAttributes } from "react";

import "./styles.scss";

export type TooltipCardProps = HTMLAttributes<HTMLDivElement> & {
	image: string;
};

export const TooltipCard = ({
	image,
	className = "",
	children,
	...restProps
}: TooltipCardProps) => {
	return (
		<div
			className="tooltip__card"
			style={{ backgroundImage: `url(${image})` }}
			{...restProps}
		>
			{children}
		</div>
	);
};
