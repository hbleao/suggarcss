import type { HTMLAttributes } from "react";

import "./styles.scss";

export type DrawerCategoryProps = HTMLAttributes<HTMLElement> & {
	isOpen: boolean;
};

export const DrawerCategory = ({
	className = "",
	isOpen,
	children,
	...restProps
}: DrawerCategoryProps) => {
	const openedClass = isOpen ? "opened" : "";
	return (
		<div className={`drawer__category ${openedClass}`} {...restProps}>
			{children}
		</div>
	);
};
