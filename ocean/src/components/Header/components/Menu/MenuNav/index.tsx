import type { HTMLAttributes } from "react";

import "./styles.scss";

export type MenuNavProps = HTMLAttributes<HTMLElement>;

export const MenuNav = ({
	className = "",
	children,
	...restProps
}: MenuNavProps) => {
	return (
		<nav className="menu__nav" {...restProps}>
			{children}
		</nav>
	);
};
