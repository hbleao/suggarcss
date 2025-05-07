import './styles.scss';

import type { CheckboxProps } from './types';

export const Checkbox = ({
	className = '',
	variant = 'default',
	label = '',
	title = '',
	...restProps
}: CheckboxProps) => {
	return (
		<div className={`checkbox__root --${variant} ${className}`} {...restProps}>
			<div className="checkbox__input" title={title}>
				<svg
					width="21"
					height="20"
					viewBox="0 0 21 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="checkbox__svg"
				>
					<title>checkbox</title>
					<path
						d="M5.5 9.16604L9.61714 13.3334L15.5 6.66676"
						stroke="white"
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
			<span
				className="checkbox__label"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{ __html: label }}
			/>
		</div>
	);
};
