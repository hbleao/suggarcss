import { LiHTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type DrawerListItemProps = LiHTMLAttributes<HTMLLIElement>

export const DrawerListItem = ({
  className = '',
  children,
  ...restProps
}: DrawerListItemProps) => {
  return (
    <li
      className={joinClasses(['drawer__list-item', className])}
      {...restProps}
    >
      {children}
    </li>
  )
}
