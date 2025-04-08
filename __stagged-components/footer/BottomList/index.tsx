import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { BottomListProps } from './types'

export const BottomList = ({
  className = '',
  children,
  ...restProps
}: BottomListProps) => {
  return (
    <ul
      className={joinClasses(['footer__bottom-list', className])}
      {...restProps}
    >
      {children}
    </ul>
  )
}
