import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { LinkProps } from './types'

export const Link = ({ className = '', children, ...restProps }: LinkProps) => {
  return (
    <a
      className={joinClasses(['notification__link', className])}
      {...restProps}
    >
      {children}
    </a>
  )
}
