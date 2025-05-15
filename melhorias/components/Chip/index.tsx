import type { HTMLAttributes } from "react";

import "./styles.scss";

export type RootProps = HTMLAttributes<HTMLDivElement> & {
	variant?: "default" | "selected";
};

export const Chip = ({ variant = "default", children }: RootProps) => {
	return (
		<div className={`chip --${variant}`}>
			<div className="chip__text">{children}</div>
		</div>
	);
};
