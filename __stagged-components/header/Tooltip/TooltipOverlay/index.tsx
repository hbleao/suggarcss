import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type TooltipOverlayProps = HTMLAttributes<HTMLElement>

export const TooltipOverlay = ({
  className = '',
  children,
  ...restProps
}: TooltipOverlayProps) => {
  return (
    <div
      className={joinClasses(['tooltip__overlay', className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
