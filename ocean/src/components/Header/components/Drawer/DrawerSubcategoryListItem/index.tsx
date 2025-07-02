import type { HTMLAttributes } from "react";

import "./styles.scss";

export type DrawerCategoryListItemProps = HTMLAttributes<HTMLParagraphElement>;

export const DrawerSubcategoryListItem = ({
	className = "",
	children,
	...restProps
}: DrawerCategoryListItemProps) => {
	return (
		<p className="drawer__subcategory-list-item" {...restProps}>
			{children}
		</p>
	);
};
