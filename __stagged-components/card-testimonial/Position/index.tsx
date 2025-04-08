import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { PositionProps } from './types'

export const Position = ({
  className = '',
  children,
  ...restProps
}: PositionProps) => {
  return (
    <div
      className={joinClasses(['card-testimonial__position', className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
