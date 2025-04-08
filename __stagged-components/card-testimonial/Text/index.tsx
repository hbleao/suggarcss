import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { TextProps } from './types'

export const Text = ({ className = '', children, ...restProps }: TextProps) => {
  return (
    <p
      className={joinClasses(['card-testimonial__text', className])}
      {...restProps}
    >
      {children}
    </p>
  )
}
