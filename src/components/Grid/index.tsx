import type { HTMLAttributes } from "react";

import "./styles.scss";

export type GridProps = HTMLAttributes<HTMLDivElement>;

export const Grid = ({ className = "", children, ...restProps }: GridProps) => {
	return (
		<div className={`grid ${className}`} {...restProps}>
			{children}
		</div>
	);
};
