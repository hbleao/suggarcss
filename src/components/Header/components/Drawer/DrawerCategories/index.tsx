import type { HTMLAttributes } from "react";

import "./styles.scss";

export type DrawerCategoriesProps = HTMLAttributes<HTMLElement>;

export const DrawerCategories = ({
	className = "",
	children,
	...restProps
}: DrawerCategoriesProps) => {
	return (
		<div className="drawer__categories" {...restProps}>
			{children}
		</div>
	);
};
