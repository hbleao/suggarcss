import { joinClasses } from '@porto-ocean/utils'
import { Typography, TypographyProps } from '@porto-ocean/typography'

type PreTitleProps = TypographyProps

export const Pretitle = ({
  className = '',
  as = 'span',
  variant = 'body2',
  weight = 'regular',
  children,
  ...restProps
}: PreTitleProps) => {
  return (
    <Typography
      as={as}
      variant={variant}
      weight={weight}
      className={joinClasses(['card-icon__pretitle', className])}
      {...restProps}
    >
      {children}
    </Typography>
  )
}
