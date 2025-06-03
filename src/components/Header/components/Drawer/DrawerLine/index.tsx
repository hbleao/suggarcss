import type { HTMLAttributes } from "react";

import "./styles.scss";

export type DrawerLineProps = HTMLAttributes<HTMLElement>;

export const DrawerLine = ({
	className = "",
	...restProps
}: DrawerLineProps) => {
	return <div className="drawer__line" {...restProps} />;
};
