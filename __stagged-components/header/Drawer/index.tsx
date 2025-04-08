import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type DrawerProps = HTMLAttributes<HTMLElement> & {
  isOpen?: boolean
}

export const Drawer = ({
  className = '',
  isOpen = false,
  children,
  ...restProps
}: DrawerProps) => {
  const openedClass = isOpen ? 'opened' : ''
  return (
    <div
      className={joinClasses(['header__drawer', openedClass, className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
