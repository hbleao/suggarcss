import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type TooltipHeaderProps = HTMLAttributes<HTMLDivElement>

export const TooltipHeader = ({
  className = '',
  children,
  ...restProps
}: TooltipHeaderProps) => {
  return (
    <div className={joinClasses(['tooltip__header', className])} {...restProps}>
      {children}
    </div>
  )
}
