import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { ListItemProps } from './types'

export const ListItem = ({
  className = '',
  children,
  ...restProps
}: ListItemProps) => {
  return (
    <li
      className={joinClasses(['footer__list-item', className])}
      {...restProps}
    >
      {children}
    </li>
  )
}
