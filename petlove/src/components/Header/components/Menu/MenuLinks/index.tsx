import type { HTMLAttributes } from "react";

import "./styles.scss";

export type MenuLinksProps = HTMLAttributes<HTMLUListElement>;

export const MenuLinks = ({
	className = "",
	children,
	...restProps
}: MenuLinksProps) => {
	return (
		<ul className="menu__links" {...restProps}>
			{children}
		</ul>
	);
};
