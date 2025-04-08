import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type MenuNavProps = HTMLAttributes<HTMLElement>

export const MenuNav = ({
  className = '',
  children,
  ...restProps
}: MenuNavProps) => {
  return (
    <nav className={joinClasses(['menu__nav', className])} {...restProps}>
      {children}
    </nav>
  )
}
