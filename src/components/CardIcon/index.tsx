import { Typography } from "../Typography";
import "./styles.scss";
import type { CardIconProps } from "./types";

export const CardIcon = ({
	theme = "light",
	variant = "link",
	icon,
	preTitle,
	title,
	description,
	href,
	onClick,
	titleProps,
	preTitleProps,
	descriptionProps,
	className = "",
}: CardIconProps) => {
	const CardContainer = variant === "link" && href ? "a" : "div";

	return (
		<CardContainer className={`card-icon__root --${variant}`}>
			{icon && { icon }}

			{preTitle && (
				<Typography
					as="span"
					variant="body2"
					weight="regular"
					className="card-icon__pretitle"
					{...preTitleProps}
				>
					{preTitle}
				</Typography>
			)}

			{title && (
				<Typography
					as="h3"
					variant="body1"
					weight="bold"
					className="card-icon__title"
					{...titleProps}
				>
					{title}
				</Typography>
			)}

			{description && (
				<Typography
					as="p"
					variant="body2"
					weight="regular"
					className="card-icon__description"
					{...descriptionProps}
				>
					{description}
				</Typography>
			)}
		</CardContainer>
	);
};
