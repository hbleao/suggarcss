import { joinClasses } from '@porto-ocean/utils'
import { Typography } from '@porto-ocean/typography'

import { TitleProps } from './types'

export const Title = ({
  className = '',
  children,
  ...restProps
}: TitleProps) => {
  return (
    <Typography
      variant="body1"
      weight="bold"
      as="h3"
      className={joinClasses(['notification__title', className])}
      {...restProps}
    >
      {children}
    </Typography>
  )
}
