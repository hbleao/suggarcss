import { joinClasses } from '@porto-ocean/utils'
import { Typography } from '@porto-ocean/typography'

import './styles.scss'

import { TitleProps } from './types'

export const Title = ({
  className = '',
  children,
  ...restProps
}: TitleProps) => {
  return (
    <Typography
      variant="title4"
      weight="medium"
      as="h3"
      className={joinClasses(['text-body__title', className])}
      {...restProps}
    >
      {children}
    </Typography>
  )
}
