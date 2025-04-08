import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  mode: 'light' | 'dark'
}

export const Card = ({
  mode = 'light',
  className = '',
  children,
  ...restProps
}: CardProps) => {
  return (
    <div
      className={joinClasses(['cards-carousel__card', mode, className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
