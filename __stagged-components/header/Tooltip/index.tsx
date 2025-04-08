import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type TooltipProps = HTMLAttributes<HTMLDivElement>

export const Tooltip = ({
  className = '',
  children,
  ...restProps
}: TooltipProps) => {
  return (
    <div className={joinClasses(['header__tooltip', className])} {...restProps}>
      {children}
    </div>
  )
}
