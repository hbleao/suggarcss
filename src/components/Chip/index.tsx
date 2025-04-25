import type { HTMLAttributes } from "react";

import "./styles.scss";

export type RootProps = HTMLAttributes<HTMLDivElement> & {
	theme?: "light" | "dark";
	variant?: "default" | "selected";
};

export const Chip = ({
	theme = "light",
	variant = "default",
	children,
}: RootProps) => {
	return (
		<div className={`chip --${theme} --${variant}`}>
			<div className="chip__text">{children}</div>
		</div>
	);
};
