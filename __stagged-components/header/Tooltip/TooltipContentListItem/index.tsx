import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type TooltipContentListItemProps = HTMLAttributes<HTMLLIElement>

export const TooltipContentListItem = ({
  className = '',
  children,
  ...restProps
}: TooltipContentListItemProps) => {
  return (
    <li
      className={joinClasses(['tooltip__content-list-item', className])}
      {...restProps}
    >
      {children}
    </li>
  )
}
