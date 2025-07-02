import type { HTMLAttributes } from "react";

import "./styles.scss";

export type DrawerSubcategoryProps = HTMLAttributes<HTMLElement>;

export const DrawerSubcategory = ({
	className = "",
	children,
	...restProps
}: DrawerSubcategoryProps) => {
	return (
		<div className="drawer__subcategory" {...restProps}>
			{children}
		</div>
	);
};
