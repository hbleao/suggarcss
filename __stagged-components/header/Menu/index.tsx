import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type MenuProps = HTMLAttributes<HTMLDivElement>

export const Menu = ({ className = '', children, ...restProps }: MenuProps) => {
  return (
    <div className={joinClasses(['header__menu', className])} {...restProps}>
      {children}
    </div>
  )
}
