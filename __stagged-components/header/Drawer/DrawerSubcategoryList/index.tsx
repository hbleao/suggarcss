import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type DrawerSubcategoryListProps = HTMLAttributes<HTMLUListElement>

export const DrawerSubcategoryList = ({
  className = '',
  children,
  ...restProps
}: DrawerSubcategoryListProps) => {
  return (
    <ul
      className={joinClasses(['drawer__subcategory-list', className])}
      {...restProps}
    >
      {children}
    </ul>
  )
}
