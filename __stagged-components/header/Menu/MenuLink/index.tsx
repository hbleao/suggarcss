import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type MenuLinkProps = HTMLAttributes<HTMLLIElement>

export const MenuLink = ({
  className = '',
  children,
  ...restProps
}: MenuLinkProps) => {
  return (
    <li className={joinClasses(['menu__link', className])} {...restProps}>
      {children}
    </li>
  )
}
