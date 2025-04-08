import { AnchorHTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type TooltipHeaderLogoProps = AnchorHTMLAttributes<HTMLAnchorElement>

export const TooltipHeaderLogo = ({
  className = '',
  children,
  ...restProps
}: TooltipHeaderLogoProps) => {
  return (
    <a
      className={joinClasses(['tooltip__header-logo', className])}
      {...restProps}
    >
      {children}
    </a>
  )
}
