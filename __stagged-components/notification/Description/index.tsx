import { joinClasses } from '@porto-ocean/utils'
import { Typography } from '@porto-ocean/typography'

import { DescriptionProps } from './types'

export const Description = ({
  className = '',
  children,
  ...restProps
}: DescriptionProps) => {
  return (
    <Typography
      variant="body2"
      weight="regular"
      as="p"
      className={joinClasses(['notification__description', className])}
      {...restProps}
    >
      {children}
    </Typography>
  )
}
