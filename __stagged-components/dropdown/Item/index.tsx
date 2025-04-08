import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { ItemProps } from './types'

export const Item = ({ className = '', children, ...restProps }: ItemProps) => {
  return (
    <li className={joinClasses(['dropdown__item', className])} {...restProps}>
      {children}
    </li>
  )
}
