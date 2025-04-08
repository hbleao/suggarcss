import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type TooltipContentListProps = HTMLAttributes<HTMLUListElement>

export const TooltipContentList = ({
  className = '',
  children,
  ...restProps
}: TooltipContentListProps) => {
  return (
    <ul
      className={joinClasses(['tooltip__content-list', className])}
      {...restProps}
    >
      {children}
    </ul>
  )
}
