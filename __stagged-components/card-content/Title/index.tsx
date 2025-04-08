import { Typography, TypographyProps } from '@porto-ocean/typography'
import { joinClasses } from '@porto-ocean/utils'

export type TitleProps = TypographyProps

export const Title = ({
  className = '',
  children,
  ...restProps
}: TitleProps) => (
  <Typography
    className={joinClasses(['card-content__title', className])}
    as="h3"
    variant="title5"
    weight="bold"
    {...restProps}
  >
    {children}
  </Typography>
)
