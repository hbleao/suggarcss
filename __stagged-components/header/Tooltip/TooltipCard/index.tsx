import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type TooltipCardProps = HTMLAttributes<HTMLDivElement> & {
  image: string
}

export const TooltipCard = ({
  image,
  className = '',
  children,
  ...restProps
}: TooltipCardProps) => {
  return (
    <div
      className={joinClasses(['tooltip__card', className])}
      style={{ backgroundImage: `url(${image})` }}
      {...restProps}
    >
      {children}
    </div>
  )
}
