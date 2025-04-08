import { Typography, TypographyProps } from '@porto-ocean/typography';

import { joinClasses } from '@porto-ocean/utils';

export const Legend = ({ children, className = '', ...props }: TypographyProps) => {
	return (
		<Typography
			variant="body2"
			as="span"
			className={joinClasses(['stepper__legend', className])}
			{...props}
		>
			{children}
		</Typography>
	);
};
