import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type DrawerSubcategoryItemProps =
  HTMLAttributes<HTMLParagraphElement> & {
    isSelected: boolean
  }

export const DrawerSubcategoryItem = ({
  className = '',
  isSelected,
  children,
  ...restProps
}: DrawerSubcategoryItemProps) => {
  const selectedClass = isSelected ? 'selected' : ''
  return (
    <p
      className={joinClasses([
        'drawer__subcategory-item',
        selectedClass,
        className,
      ])}
      {...restProps}
    >
      {children}
    </p>
  )
}
