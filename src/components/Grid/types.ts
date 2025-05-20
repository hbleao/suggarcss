import type { ReactNode } from "react";

export type GridProps = {
	children: ReactNode;
	columns?: number;
	gap?: string;
	className?: string;
	background?: string;
};
