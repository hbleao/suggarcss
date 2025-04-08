import s from "./styles.module.scss";

import type { ButtonProps } from "./types";

export const Button = ({
	variant = "insurance",
	styles = "primary",
	size = "large",
	width = "contain",
	isLoading = false,
	className = "",
	children,
	...restProps
}: ButtonProps) => {
	const custom_className = `${s.btn} --${s[variant]}-${s[styles]} --${s[width]} --${s[size]}`;

	return (
		<button className={custom_className} {...restProps}>
			{children}
		</button>
	);
};
