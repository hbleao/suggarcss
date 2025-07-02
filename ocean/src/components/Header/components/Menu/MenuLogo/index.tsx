import type { HTMLAttributes } from "react";

import "./styles.scss";

export type MenuLogoProps = HTMLAttributes<HTMLDivElement>;

export const MenuLogo = ({
	className = "",
	children,
	...restProps
}: MenuLogoProps) => {
	return (
		<div className="menu__logo" {...restProps}>
			{children}
		</div>
	);
};
