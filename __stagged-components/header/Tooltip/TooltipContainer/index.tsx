import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type TooltipContainerProps = HTMLAttributes<HTMLElement>

export const TooltipContainer = ({
  className = '',
  children,
  ...restProps
}: TooltipContainerProps) => {
  return (
    <nav
      className={joinClasses(['tooltip__container', className])}
      {...restProps}
    >
      {children}
    </nav>
  )
}
