import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type TooltipSeparatorProps = HTMLAttributes<HTMLDivElement>

export const TooltipSeparator = ({
  className = '',
  children,
  ...restProps
}: TooltipSeparatorProps) => {
  return (
    <div
      className={joinClasses(['tooltip__separator', className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
