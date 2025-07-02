import type { HTMLAttributes } from "react";

import "./styles.scss";

export type ToolbarIconProps = HTMLAttributes<HTMLDivElement>;

export const ToolbarIcon = ({
	className = "",
	children,
	...restProps
}: ToolbarIconProps) => {
	return (
		<div className="toolbar__icon" {...restProps}>
			{children}
		</div>
	);
};
