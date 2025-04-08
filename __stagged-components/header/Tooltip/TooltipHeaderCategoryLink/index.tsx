import { ButtonHTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type TooltipLinkProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  iconName: string
}

export const TooltipLink = ({
  className = '',
  iconName,
  children,
  ...restProps
}: TooltipLinkProps) => {
  return (
    <button
      className={joinClasses(['tooltip__header-category-link', className])}
      {...restProps}
    >
      {children}
    </button>
  )
}
