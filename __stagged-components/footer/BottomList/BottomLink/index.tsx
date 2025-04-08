import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { BottomLinkProps } from './types'

export const BottomLink = ({
  className = '',
  children,
  ...restProps
}: BottomLinkProps) => {
  return (
    <a
      className={joinClasses(['footer__bottom-link', className])}
      {...restProps}
    >
      {children}
    </a>
  )
}
