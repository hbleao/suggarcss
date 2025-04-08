import { joinClasses } from '@porto-ocean/utils'
import { HTMLAttributes } from 'react'

import './styles.scss'

export type RootProps = HTMLAttributes<HTMLElement>

export const Root = ({ className = '', children, ...restProps }: RootProps) => {
  return (
    <header className={joinClasses(['header__root', className])} {...restProps}>
      {children}
    </header>
  )
}
