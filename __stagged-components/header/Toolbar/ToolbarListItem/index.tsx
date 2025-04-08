import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type ToolbarListItemProps = HTMLAttributes<HTMLLIElement> & {
  isSelected: boolean
}

export const ToolbarListItem = ({
  className = '',
  isSelected = true,
  children,
  ...restProps
}: ToolbarListItemProps) => {
  const isSelectedClass = isSelected ? 'isSelected' : ''

  return (
    <li
      className={joinClasses([
        'toolbar__list-item',
        isSelectedClass,
        className,
      ])}
      {...restProps}
    >
      {children}
    </li>
  )
}
