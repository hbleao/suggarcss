import { joinClasses } from '@porto-ocean/utils'
import { Typography } from '@porto-ocean/typography'

import { TextProps } from './types'

export const Text = ({ className = '', children, ...restProps }: TextProps) => {
  return (
    <Typography
      variant="body2"
      weight="regular"
      as="p"
      className={joinClasses(['text-body__text', className])}
      {...restProps}
    >
      {children}
    </Typography>
  )
}
