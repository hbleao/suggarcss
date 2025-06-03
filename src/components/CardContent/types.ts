import type { HTMLAttributes } from "react";

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
	title?: string;
	description?: string;
	image?: {
		url: string;
		alt: string;
	};
	links?: {
		label: string;
		href: string;
	}[];
}
