import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type DrawerListProps = HTMLAttributes<HTMLUListElement>

export const DrawerList = ({
  className = '',
  children,
  ...restProps
}: DrawerListProps) => {
  return (
    <ul className={joinClasses(['drawer__list', className])} {...restProps}>
      {children}
    </ul>
  )
}
