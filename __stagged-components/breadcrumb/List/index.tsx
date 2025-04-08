import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { ListProps } from './types'

export const List = ({ className = '', children, ...restProps }: ListProps) => (
  <ul className={joinClasses(['breadcrumb__list', className])} {...restProps}>
    {children}
  </ul>
)

List.displayname = 'Breadcrumb.List'
