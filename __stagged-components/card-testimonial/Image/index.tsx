import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { ImageProps } from './types'

export const Image = ({
  className = '',
  children,
  ...restProps
}: ImageProps) => {
  return (
    <div
      className={joinClasses(['card-testimonial__image', className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
