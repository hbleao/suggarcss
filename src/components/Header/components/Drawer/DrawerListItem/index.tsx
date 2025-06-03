import type { LiHTMLAttributes } from "react";

import "./styles.scss";

export type DrawerListItemProps = LiHTMLAttributes<HTMLLIElement>;

export const DrawerListItem = ({
	className = "",
	children,
	...restProps
}: DrawerListItemProps) => {
	return (
		<li className="drawer__list-item" {...restProps}>
			{children}
		</li>
	);
};
