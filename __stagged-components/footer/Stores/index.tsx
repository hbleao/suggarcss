import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { StoresProps } from './types'

export const Stores = ({
  className = '',
  children,
  ...restProps
}: StoresProps) => {
  return (
    <div className={joinClasses(['footer__stores', className])} {...restProps}>
      {children}
    </div>
  )
}
