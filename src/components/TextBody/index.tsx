import "./styles.scss";

import { Typography } from "@/components";

import { Button } from "../Button";

import type { TextBodyProps } from "./types";

export const TextBody = ({
	title = "title",
	subtitle = "",
	text = "",
	buttons,
	className = "",
	...restProps
}: TextBodyProps) => {
	return (
		<div className="text-body__root" {...restProps}>
			<Typography
				variant="title4"
				weight="medium"
				as="h3"
				className="text-body__title"
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
				>
					{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
					<span dangerouslySetInnerHTML={{ __html: text }} />
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
