import type { HTMLAttributes } from "react";

import "./styles.scss";

export type DrawerSubcategoryListProps = HTMLAttributes<HTMLUListElement>;

export const DrawerSubcategoryList = ({
	className = "",
	children,
	...restProps
}: DrawerSubcategoryListProps) => {
	return (
		<ul className="drawer__subcategory-list" {...restProps}>
			{children}
		</ul>
	);
};
