import { AnchorHTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type MenuLinkItemProps = AnchorHTMLAttributes<HTMLAnchorElement>

export const MenuLinkItem = ({
  className = '',
  children,
  ...restProps
}: MenuLinkItemProps) => {
  return (
    <a className={joinClasses(['menu__link-item', className])} {...restProps}>
      {children}
    </a>
  )
}
