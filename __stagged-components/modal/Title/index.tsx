import "./styles.scss";

import type { TitleProps } from "./types";

export const Title = ({
	as = "h2",
	weight = "medium",
	variant = "body1",
	className = "",
	children,
	...restProps
}: TitleProps) => {
	return (
		<p
			as={as}
			variant={variant}
			weight={weight}
			className="modal__title"
			{...restProps}
		>
			{children}
		</p>
	);
};
