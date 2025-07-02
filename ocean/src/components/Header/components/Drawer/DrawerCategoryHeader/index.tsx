import type { HTMLAttributes } from "react";

import "./styles.scss";

export type DrawerCategoryHeaderProps = HTMLAttributes<HTMLElement>;

export const DrawerCategoryHeader = ({
	className = "",
	children,
	...restProps
}: DrawerCategoryHeaderProps) => {
	return (
		<div className={"drawer__category-header"} {...restProps}>
			{children}
		</div>
	);
};
