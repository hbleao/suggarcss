import { joinClasses } from "@porto-ocean/utils";

import "./styles.scss";

import type { ContentProps } from "./types";

export const Content = ({
	className = "",
	children,
	...restProps
}: ContentProps) => {
	return (
		<div className={joinClasses(["modal__content", className])} {...restProps}>
			{children}
		</div>
	);
};
