import type { HTMLAttributes } from "react";

import "./styles.scss";

export type ToolbarLabelProps = HTMLAttributes<HTMLSpanElement>;

export const ToolbarLabel = ({
	className = "",
	children,
	...restProps
}: ToolbarLabelProps) => {
	return (
		<span className="toolbar__label" {...restProps}>
			{children}
		</span>
	);
};
