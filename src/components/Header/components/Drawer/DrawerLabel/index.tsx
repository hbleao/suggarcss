import type { HTMLAttributes } from "react";

import "./styles.scss";

export type DrawerListLabelProps = HTMLAttributes<HTMLParagraphElement>;

export const DrawerListLabel = ({
	className = "",
	children,
	...restProps
}: DrawerListLabelProps) => {
	return (
		<p className="drawer__label" {...restProps}>
			{children}
		</p>
	);
};
