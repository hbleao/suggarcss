import "./styles.scss";

import type { NotificationProps } from "./types";

export const Notification = ({
	title,
	icon,
	variant,
	description,
	className,
	link,
	...restProps
}: NotificationProps) => {
	return (
		<div
			className={`notification__root --${variant} ${className}`}
			{...restProps}
		>
			<div className="notification__icon">{icon}</div>
			<div className="notification__content">
				<p className="notification__title">{title}</p>
				<p className="notification__description">{description}</p>
			</div>
			{link?.label && (
				<a href={link.href} className="notification__link">
					{link.label}
				</a>
			)}
		</div>
	);
};
