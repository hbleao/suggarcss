import type { AnchorHTMLAttributes } from "react";

import "./styles.scss";

export type TooltipHeaderLogoProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export const TooltipHeaderLogo = ({
	className = "",
	children,
	...restProps
}: TooltipHeaderLogoProps) => {
	return (
		<a className="tooltip__header-logo" {...restProps}>
			{children}
		</a>
	);
};
