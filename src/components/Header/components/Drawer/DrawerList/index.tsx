import type { HTMLAttributes } from "react";

import "./styles.scss";

export type DrawerListProps = HTMLAttributes<HTMLUListElement>;

export const DrawerList = ({
	className = "",
	children,
	...restProps
}: DrawerListProps) => {
	return (
		<ul className="drawer__list" {...restProps}>
			{children}
		</ul>
	);
};
