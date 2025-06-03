import type { HTMLAttributes } from "react";

import "./styles.scss";

export type MenuProps = HTMLAttributes<HTMLDivElement>;

export const Menu = ({ className = "", children, ...restProps }: MenuProps) => {
	return (
		<div className="header__menu" {...restProps}>
			{children}
		</div>
	);
};
