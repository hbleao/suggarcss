import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { ListLinkProps } from './types'

export const ListLink = ({
  className = '',
  children,
  ...restProps
}: ListLinkProps) => {
  return (
    <a className={joinClasses(['footer__list-link', className])} {...restProps}>
      {children}
    </a>
  )
}
