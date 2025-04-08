import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type ToolbarListProps = HTMLAttributes<HTMLUListElement>

export const ToolbarList = ({
  className = '',
  children,
  ...restProps
}: ToolbarListProps) => {
  return (
    <ul className={joinClasses(['toolbar__list', className])} {...restProps}>
      {children}
    </ul>
  )
}
