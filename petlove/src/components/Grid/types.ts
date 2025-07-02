import type { HTMLAttributes, ReactNode } from "react";

export type GridProps = HTMLAttributes<HTMLDivElement> & {
	children?: ReactNode;
	columns?: number;
	gap?: string;
	className?: string;
	background?: string;
};
