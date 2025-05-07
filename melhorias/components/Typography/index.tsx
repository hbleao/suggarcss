import './styles.scss';

import { clsx } from '@/utils/clsx';

import type { TypographyProps } from './types';

export const Typography = ({
	children = 'Typography',
	variant = 'title1',
	as = 'h1',
	color = 'neutral-900',
	weight = 'regular',
	fontStyle = 'normal',
	className = '',
	...restProps
}: TypographyProps) => {
	const Component = as;

	const classes = clsx(
		'typography',
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
