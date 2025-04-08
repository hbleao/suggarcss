import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { ListItemProps } from './types'

export const ListItem = ({ className = '', children, ...restProps }: ListItemProps) => (
  <li className={joinClasses(['breadcrumb__list-item', className])} {...restProps}>
    {children}
  </li>
)

ListItem.displayname = 'Breadcrumb.ListItem'


