import { joinClasses } from "@porto-ocean/utils";

import "./styles.scss";

import type { BodyProps } from "./types";

export const Body = ({ className = "", children, ...restProps }: BodyProps) => {
	return (
		<div className={joinClasses(["modal__body", className])} {...restProps}>
			{children}
		</div>
	);
};
