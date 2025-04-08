import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type TooltipContentProps = HTMLAttributes<HTMLDivElement>

export const TooltipContent = ({
  className = '',
  children,
  ...restProps
}: TooltipContentProps) => {
  return (
    <div
      className={joinClasses(['tooltip__content', className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
