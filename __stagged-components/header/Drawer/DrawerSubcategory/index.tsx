import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type DrawerSubcategoryProps = HTMLAttributes<HTMLElement>

export const DrawerSubcategory = ({
  className = '',
  children,
  ...restProps
}: DrawerSubcategoryProps) => {
  return (
    <div
      className={joinClasses(['drawer__subcategory', className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
