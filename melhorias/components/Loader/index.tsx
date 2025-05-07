import type { JSX } from 'react';

import { clsx } from '@/utils/clsx';
import './styles.scss';

type LoaderProps = {
	color?: ColorToken;
	size?: number;
	className?: string;
};

export const Loader = ({
	color = 'neutral-900',
	size = 24,
	className,
}: LoaderProps): JSX.Element => {
	const classes = clsx('loader', `--border-${color}`, className);

	return (
		<span
			className={classes}
			style={{
				width: size,
				height: size - 1,
				borderBottomColor: 'transparent',
			}}
		/>
	);
};
