import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { ContentProps } from './types'

export const Content = ({
  className = '',
  children,
  ...restProps
}: ContentProps) => {
  return (
    <div
      className={joinClasses(['card-testimonial__content', className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
