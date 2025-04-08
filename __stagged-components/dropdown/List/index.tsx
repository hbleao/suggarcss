import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { ListProps } from './types'

export const List = ({ className = '', children, ...restProps }: ListProps) => {
  return (
    <ul className={joinClasses(['dropdown__list', className])} {...restProps}>
      {children}
    </ul>
  )
}
