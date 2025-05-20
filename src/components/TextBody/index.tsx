import "./styles.scss";

import { Typography } from "../Typography";

import { Button } from "../Button";
import type { RootProps } from "./types";

export const Root = ({
	title = "title",
	subtitle = "",
	text = "",
	buttons,
	className = "",
	children,
	...restProps
}: RootProps) => {
	return (
		<div className="text-body__root" {...restProps}>
			<Typography
				variant="title4"
				weight="medium"
				as="h3"
				className="text-body__title"
				{...restProps}
			>
				{title}
			</Typography>

			{!!subtitle && (
				<Typography
					variant="body1"
					weight="bold"
					as="p"
					color="neutral-700"
					className="text-body__subtitle"
					{...restProps}
				>
					{subtitle}
				</Typography>
			)}

			{text && (
				<Typography
					variant="body2"
					weight="regular"
					as="p"
					className="text-body__text"
					{...restProps}
				>
					{children}
				</Typography>
			)}
			{buttons.length > 0 && (
				<div className="text-body__buttons" {...restProps}>
					{buttons.map((button) => (
						<Button key={button.label} {...button}>
							{button.label}
						</Button>
					))}
				</div>
			)}
		</div>
	);
};
