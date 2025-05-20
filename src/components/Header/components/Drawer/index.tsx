import type { HTMLAttributes } from "react";

import "./styles.scss";

export type DrawerProps = HTMLAttributes<HTMLElement> & {
	isOpen?: boolean;
};

export const Drawer = ({
	className = "",
	isOpen = false,
	children,
	...restProps
}: DrawerProps) => {
	const openedClass = isOpen ? "opened" : "";
	return (
		<div className={`header__drawer ${openedClass}`} {...restProps}>
			{children}
		</div>
	);
};
