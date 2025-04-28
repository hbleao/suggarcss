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
	const classDisabledVariant = disabled
		? `--disabled-${styles}`
		: `--${variant}-${styles}`;
	const custom_className = `btn ${classDisabledVariant} --${width} --${size} ${className}`;

	return (
		<button className={custom_className} disabled={disabled} {...restProps}>
			{isLoading ? <span className="utils-loader btn__loader" /> : children}
		</button>
	);
};
