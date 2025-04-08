import { joinClasses } from '@porto-ocean/utils';

import './styles.scss';

import { RootProps } from './types';

export const Root = ({
	className = '',
	variant = 'default',
	children,
	...restProps
}: RootProps) => {
	return (
		<div
			className={joinClasses(['checkbox__root', `--${variant}`, className])}
			{...restProps}
		>
			{children}
		</div>
	);
};
