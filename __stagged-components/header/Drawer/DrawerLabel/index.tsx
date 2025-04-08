import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type DrawerListLabelProps = HTMLAttributes<HTMLParagraphElement>

export const DrawerListLabel = ({
  className = '',
  children,
  ...restProps
}: DrawerListLabelProps) => {
  return (
    <p className={joinClasses(['drawer__label', className])} {...restProps}>
      {children}
    </p>
  )
}
