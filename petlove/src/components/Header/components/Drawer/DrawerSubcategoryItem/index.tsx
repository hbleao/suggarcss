import type { HTMLAttributes } from "react";

import "./styles.scss";

export type DrawerSubcategoryItemProps =
	HTMLAttributes<HTMLParagraphElement> & {
		isSelected: boolean;
	};

export const DrawerSubcategoryItem = ({
	className = "",
	isSelected,
	children,
	...restProps
}: DrawerSubcategoryItemProps) => {
	const selectedClass = isSelected ? "selected" : "";
	return (
		<p className={`drawer__subcategory-item ${selectedClass} `} {...restProps}>
			{children}
		</p>
	);
};
