import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { CardProps } from './types'

export const Image = ({
  className = '',
  children,
  ...restProps
}: CardProps) => {
  return (
    <div
      className={joinClasses(['card-content__image', className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
