import type { HTMLAttributes, ReactNode } from "react";

export interface CardTestimonialProps extends HTMLAttributes<HTMLDivElement> {
	image?: ReactNode;
	name?: ReactNode;
	position?: ReactNode;
	date?: ReactNode;
	text?: ReactNode;
	showSeparator?: boolean;
}
