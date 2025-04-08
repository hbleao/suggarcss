import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { TypographyProps } from './types'

export const Typography = ({
  children = 'Typography',
  variant = 'title1',
  as = 'h1',
  color = 'black100',
  weight = 'regular',
  fontStyle = 'normal',
  className = '',
  ...restProps
}: TypographyProps) => {
  const Component = as

  return (
    <Component
      className={joinClasses([
        `typography`,
        `--${variant}`,
        `--color-${color}`,
        `--font-weight-${weight}`,
        `--font-style-${fontStyle}`,
        className,
      ])}
      {...restProps}
    >
      {children}
    </Component>
  )
}
