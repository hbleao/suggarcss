import type { HTMLAttributes } from "react";

import "./styles.scss";

export type MenuLinkProps = HTMLAttributes<HTMLLIElement>;

export const MenuLink = ({
	className = "",
	children,
	...restProps
}: MenuLinkProps) => {
	return (
		<li className="menu__link" {...restProps}>
			{children}
		</li>
	);
};
