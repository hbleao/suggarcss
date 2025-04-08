import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { DateProps } from './types'

export const Date = ({ className = '', children, ...restProps }: DateProps) => {
  return (
    <span
      className={joinClasses(['card-testimonial__date', className])}
      {...restProps}
    >
      {children}
    </span>
  )
}
