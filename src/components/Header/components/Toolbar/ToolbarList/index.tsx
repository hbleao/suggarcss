import type { HTMLAttributes } from "react";

import "./styles.scss";

export type ToolbarListProps = HTMLAttributes<HTMLUListElement>;

export const ToolbarList = ({
	className = "",
	children,
	...restProps
}: ToolbarListProps) => {
	return (
		<ul className="toolbar__list" {...restProps}>
			{children}
		</ul>
	);
};
