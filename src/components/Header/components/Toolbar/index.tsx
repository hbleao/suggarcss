import type { HTMLAttributes } from "react";

import "./styles.scss";

export type ToolbarProps = HTMLAttributes<HTMLElement>;

export const Toolbar = ({
	className = "",
	children,
	...restProps
}: ToolbarProps) => {
	return (
		<nav className="header__toolbar" {...restProps}>
			{children}
		</nav>
	);
};
