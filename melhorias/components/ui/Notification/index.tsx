"use client";

import { clsx } from "@/utils/clsx"; // Usando o seu utilitário
import "./styles.scss";
import type { NotificationProps } from "./types";

export const Notification = ({
	title,
	icon,
	variant = "default",
	description,
	className = "",
	link,
	...restProps
}: NotificationProps) => {
	return (
		<div
			className={clsx("notification__root", `--${variant}`, className)}
			role="alert"
			{...restProps}
		>
			{icon && <div className="notification__icon">{icon}</div>}

			<div className="notification__content">
				{title && <p className="notification__title">{title}</p>}
				{description && (
					<p className="notification__description">{description}</p>
				)}

				{link?.label && (
					<a href={link.href} className="notification__link">
						{link.label}
					</a>
				)}
			</div>
		</div>
	);
};
