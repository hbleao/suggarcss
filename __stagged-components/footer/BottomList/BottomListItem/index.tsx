import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { BottomListItemProps } from './types'

export const BottomListItem = ({
  className = '',
  children,
  ...restProps
}: BottomListItemProps) => {
  return (
    <li
      className={joinClasses(['footer__bottom-list-item', className])}
      {...restProps}
    >
      {children}
    </li>
  )
}
