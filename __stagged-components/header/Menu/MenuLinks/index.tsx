import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type MenuLinksProps = HTMLAttributes<HTMLUListElement>

export const MenuLinks = ({
  className = '',
  children,
  ...restProps
}: MenuLinksProps) => {
  return (
    <ul className={joinClasses(['menu__links', className])} {...restProps}>
      {children}
    </ul>
  )
}
