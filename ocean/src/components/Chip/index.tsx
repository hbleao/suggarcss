import "./styles.scss";

import type { ChipProps } from "./types";

export const Chip = ({
	variant = "default",
	children,
	...props
}: ChipProps) => {
	return (
		<div className={`chip --${variant}`} {...props}>
			<div className="chip__text">{children}</div>
		</div>
	);
};
