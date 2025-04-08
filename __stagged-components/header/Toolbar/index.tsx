import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type ToolbarProps = HTMLAttributes<HTMLElement>

export const Toolbar = ({
  className = '',
  children,
  ...restProps
}: ToolbarProps) => {
  return (
    <nav className={joinClasses(['header__toolbar', className])} {...restProps}>
      {children}
    </nav>
  )
}
