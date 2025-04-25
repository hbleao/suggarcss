import { joinClasses } from '@porto-ocean/utils'
import { Typography } from '@porto-ocean/typography'

import { DescriptionProps } from './types'

export const Description = ({
  className = '',
  as = 'p',
  variant = 'body2',
  weight = 'regular',
  children,
  ...restProps
}: DescriptionProps) => {
  return (
    <Typography
      as={as}
      variant={variant}
      weight={weight}
      className={joinClasses(['card-icon__description', className])}
      {...restProps}
    >
      {children}
    </Typography>
  )
}
