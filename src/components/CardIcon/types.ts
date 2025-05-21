import type { HTMLAttributes, ReactNode } from "react";

export type CardIconProps = HTMLAttributes<HTMLDivElement> & {
	icon?: ReactNode | null;
	title?: ReactNode;
	preTitle?: ReactNode;
	description?: ReactNode;
	variant?: "link" | "static";
	href?: string;
	titleProps?: Record<string, unknown>;
	descriptionProps?: Record<string, unknown>;
};
