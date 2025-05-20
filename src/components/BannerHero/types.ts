import type { ReactNode } from "react";

type Size = "small" | "large";
type Styles = "primary" | "secondary" | "ghost";
type Variant = "insurance" | "banking" | "health" | "negative" | "disabled";

export interface BannerHeroProps {
	bgColor?: ColorToken;
	title?: ReactNode;
	subtitle?: ReactNode;
	text?: ReactNode;
	logo?: ReactNode;
	image?: ReactNode;
	buttons?: {
		label: string;
		variant: Variant;
		styles: Styles;
		size: Size;
		onClick: () => void;
	}[];
	stores?: BannerHeroStore[];
	contentProps?: any;
	className?: string;
}

export interface BannerHeroStore {
	icon: ReactNode;
	href: string;
	name?: string;
}
