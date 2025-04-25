import './styles.scss';

import type { ButtonProps } from './types';

export const Button = ({
	variant = 'insurance',
	styles = 'primary',
	size = 'large',
	width = 'contain',
	isLoading = false,
	className = '',
	children,
	...restProps
}: ButtonProps) => {
	const custom_className = `btn --${variant}-${styles} --${width} --${size}`;

	return (
		<button className={custom_className} {...restProps}>
			{isLoading ? <span className="utils-loader btn__loader" /> : children}
		</button>
	);
};
