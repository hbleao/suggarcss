import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { HeaderProps } from './types'

export const Header = ({
  className = '',
  children,
  ...restProps
}: HeaderProps) => {
  return (
    <span
      className={joinClasses(['card-testimonial__header', className])}
      {...restProps}
    >
      {children}
    </span>
  )
}
