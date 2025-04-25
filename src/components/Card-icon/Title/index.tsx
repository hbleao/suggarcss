import { joinClasses } from '@porto-ocean/utils'
import { Typography } from '@porto-ocean/typography'

import { TitleProps } from './types'

export const Title = ({
  className = '',
  as = 'h3',
  variant = 'body1',
  weight = 'bold',
  children,
  ...restProps
}: TitleProps) => {
  return (
    <Typography
      as={as}
      variant={variant}
      weight={weight}
      className={joinClasses(['card-icon__title', className])}
      {...restProps}
    >
      {children}
    </Typography>
  )
}
