import './styles.scss';

import { Typography } from '../Typography';

import type { CardIconProps } from './types';

export const CardIcon = ({
	icon,
	preTitle,
	title,
	description,
}: CardIconProps) => {
	return (
		<div className="card-icon__root --withoutLink">
			{icon && icon}

			{preTitle && (
				<Typography
					as="span"
					variant="body2"
					weight="regular"
					className="card-icon__pretitle"
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
				>
					{description}
				</Typography>
			)}
		</div>
	);
};
