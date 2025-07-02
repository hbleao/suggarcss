import type { HTMLAttributes } from "react";

import "./styles.scss";

export type RootProps = HTMLAttributes<HTMLElement>;

export const Root = ({ className = "", children, ...restProps }: RootProps) => {
	return (
		<header className="header__root" {...restProps}>
			{children}
		</header>
	);
};
