import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type DrawerCategoryListItemProps = HTMLAttributes<HTMLParagraphElement>

export const DrawerSubcategoryListItem = ({
  className = '',
  children,
  ...restProps
}: DrawerCategoryListItemProps) => {
  return (
    <p
      className={joinClasses(['drawer__subcategory-list-item', className])}
      {...restProps}
    >
      {children}
    </p>
  )
}
