import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { ListIconProps } from './types'

export const ListIcon = ({
  className = '',
  children,
  ...restProps
}: ListIconProps) => {
  return (
    <div
      className={joinClasses(['footer__list-icon', className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
