import { clsx } from '@/utils/clsx';

import './styles.scss';

import type { ButtonProps } from './types';

export const Button = ({
	variant = 'insurance',
	styles = 'primary',
	size = 'large',
	width = 'contain',
	isLoading = false,
	disabled = false,
	className = '',
	children,
	...restProps
}: ButtonProps) => {
	const composedClassName = clsx(
		'btn',
		{
			[`--disabled-${styles}`]: disabled,
			[`--${variant}-${styles}`]: !disabled,
		},
		`--${size}`,
		`--${width}`,
		className,
	);

	return (
		<button className={composedClassName} disabled={disabled} {...restProps}>
			{isLoading ? <span className="btn__loader" /> : children}
		</button>
	);
};
