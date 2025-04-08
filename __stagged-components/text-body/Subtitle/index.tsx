import { joinClasses } from '@porto-ocean/utils'
import { Typography } from '@porto-ocean/typography'

import { SubtitleProps } from './types'

export const Subtitle = ({
  className = '',
  children,
  ...restProps
}: SubtitleProps) => {
  return (
    <Typography
      variant="body1"
      weight="bold"
      as="p"
      className={joinClasses(['text-body__subtitle', className])}
      {...restProps}
    >
      {children}
    </Typography>
  )
}
