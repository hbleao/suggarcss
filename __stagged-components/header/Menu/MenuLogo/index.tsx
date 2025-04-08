import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type MenuLogoProps = HTMLAttributes<HTMLDivElement>

export const MenuLogo = ({
  className = '',
  children,
  ...restProps
}: MenuLogoProps) => {
  return (
    <div className={joinClasses(['menu__logo', className])} {...restProps}>
      {children}
    </div>
  )
}
