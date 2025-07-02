import type { AnchorHTMLAttributes } from "react";

import "./styles.scss";

export type MenuLinkItemProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export const MenuLinkItem = ({
	className = "",
	children,
	...restProps
}: MenuLinkItemProps) => {
	return (
		<a className="menu__link-item" {...restProps}>
			{children}
		</a>
	);
};
