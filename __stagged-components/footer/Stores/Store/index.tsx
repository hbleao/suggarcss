import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { StoreProps } from './types'

export const Store = ({
  className = '',
  children,
  ...restProps
}: StoreProps) => {
  return (
    <a className={joinClasses(['footer__store', className])} {...restProps}>
      {children}
    </a>
  )
}
