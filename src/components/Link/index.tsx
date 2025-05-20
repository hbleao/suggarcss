import { clsx } from "@/utils/clsx";
import NextLink from "next/link";

import "./styles.scss";

import type { LinkProps } from "./types";

export const Link = ({
	variant = "insurance",
	styles = "primary",
	size = "large",
	width = "contain",
	href = "#",
	disabled = false,
	className = "",
	children,
	...restProps
}: LinkProps) => {
	const classes = clsx(
		"link",
		{
			[`--disabled-${styles}`]: disabled,
			[`--${variant}-${styles}`]: !disabled,
		},
		`--${size}`,
		`--${width}`,
		className,
	);

	return (
		<NextLink
			href={href}
			target="_blank"
			className={classes}
			disabled={disabled}
			{...restProps}
		>
			{children}
		</NextLink>
	);
};
