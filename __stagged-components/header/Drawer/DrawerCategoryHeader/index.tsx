import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type DrawerCategoryHeaderProps = HTMLAttributes<HTMLElement>

export const DrawerCategoryHeader = ({
  className = '',
  children,
  ...restProps
}: DrawerCategoryHeaderProps) => {
  return (
    <div
      className={joinClasses(['drawer__category-header', className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
