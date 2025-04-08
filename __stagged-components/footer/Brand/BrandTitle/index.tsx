import { Typography } from '@porto-ocean/typography'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { BrandTitleProps } from './types'

export const BrandTitle = ({
  className = '',
  children,
  ...restProps
}: BrandTitleProps) => {
  return (
    <Typography
      as="h3"
      variant="title6"
      weight="bold"
      color="white"
      className={joinClasses(['footer__brand-title', className])}
      {...restProps}
    >
      {children}
    </Typography>
  )
}
