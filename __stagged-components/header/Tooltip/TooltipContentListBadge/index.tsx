import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type TooltipContentListBadgeProps = HTMLAttributes<HTMLSpanElement>

export const TooltipContentListBadge = ({
  className = '',
  children,
  ...restProps
}: TooltipContentListBadgeProps) => {
  return (
    <span
      className={joinClasses(['tooltip__content-list-badge', className])}
      {...restProps}
    >
      {children}
    </span>
  )
}
