import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { RootProps } from './types'

export const Root = ({ className = '', children, ...restProps }: RootProps) => {
  return (
    <div
      className={joinClasses(['card-testimonial__root', className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
