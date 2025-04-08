import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type DrawerCategoriesProps = HTMLAttributes<HTMLElement>

export const DrawerCategories = ({
  className = '',
  children,
  ...restProps
}: DrawerCategoriesProps) => {
  return (
    <div
      className={joinClasses(['drawer__categories', className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
