import React from "react";

import "./styles.scss";
import { clsx } from "@/utils/clsx"; // caminho correto onde salvou

import type { TypographyProps } from "./types";

export const Typography = ({
	children = "Typography",
	variant = "title1",
	as = "h1",
	color = "black100",
	weight = "regular",
	fontStyle = "normal",
	className = "",
	...restProps
}: TypographyProps) => {
	const Component = as;

	const classes = clsx(
		"typography",
		`--${variant}`,
		`--color-${color}`,
		`--font-weight-${weight}`,
		`--font-style-${fontStyle}`,
		className,
	);

	return (
		<Component className={classes} {...restProps}>
			{children}
		</Component>
	);
};
