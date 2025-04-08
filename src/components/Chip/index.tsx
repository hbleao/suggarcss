import type { HTMLAttributes } from "react";

import s from "./styles.module.scss";

export type RootProps = HTMLAttributes<HTMLDivElement> & {
	theme?: "light" | "dark";
	variant?: "default" | "selected";
};

export const Root = ({
	theme = "light",
	variant = "default",
	children,
}: RootProps) => {
	return (
		<div className={`${s.chip} --${theme} --${variant}`}>
			<div className={s.chip__text}>{children}</div>
		</div>
	);
};
