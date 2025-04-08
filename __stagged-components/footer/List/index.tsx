import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { ListProps } from './types'

export const List = ({
  isOpen = false,
  className = '',
  children,
  ...restProps
}: ListProps) => {
  const isOpenClass = isOpen ? 'isOpen' : 'isClose'

  return (
    <ul
      className={joinClasses(['footer__list', isOpenClass, className])}
      {...restProps}
    >
      {children}
    </ul>
  )
}
