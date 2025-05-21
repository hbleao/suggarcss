import type { ReactNode } from "react";

type Size = "small" | "large";
type Styles = "primary" | "secondary" | "ghost";
type Variant = "insurance" | "banking" | "health" | "negative" | "disabled";
type Theme = "light" | "dark";
type ColorToken = string;

type BannerHeroButton = {
	label: string;
	variant?: string;
	styles?: string;
	size?: string;
	onClick?: () => void;
	href?: string;
};

export interface BannerHeroProps {
	theme?: Theme;
	bgColor?: ColorToken;
	title?: ReactNode;
	subtitle?: ReactNode;
	text?: ReactNode;
	logo?: ReactNode;
	image?: ReactNode;
	buttons?: BannerHeroButton[];
	stores?: BannerHeroStore[];
	contentProps?: Record<string, unknown>;
	className?: string;
}

export interface BannerHeroStore {
	icon: ReactNode;
	href: string;
	name?: string;
}
