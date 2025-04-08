import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { NameProps } from './types'

export const Name = ({ className = '', children, ...restProps }: NameProps) => {
  return (
    <p
      className={joinClasses(['card-testimonial__name', className])}
      {...restProps}
    >
      {children}
    </p>
  )
}
