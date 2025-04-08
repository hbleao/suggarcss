import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type DrawerCategoryProps = HTMLAttributes<HTMLElement> & {
  isOpen: boolean
}

export const DrawerCategory = ({
  className = '',
  isOpen,
  children,
  ...restProps
}: DrawerCategoryProps) => {
  const openedClass = isOpen ? 'opened' : ''
  return (
    <div
      className={joinClasses(['drawer__category', openedClass, className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
