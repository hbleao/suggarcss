import type { HTMLAttributes } from "react";

import "./styles.scss";

export type ToolbarListItemProps = HTMLAttributes<HTMLLIElement> & {
	isSelected: boolean;
};

export const ToolbarListItem = ({
	className = "",
	isSelected = true,
	children,
	...restProps
}: ToolbarListItemProps) => {
	const isSelectedClass = isSelected ? "isSelected" : "";

	return (
		<li className={`toolbar__list-item ${isSelectedClass}`} {...restProps}>
			{children}
		</li>
	);
};
