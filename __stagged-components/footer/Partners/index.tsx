import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { PartnersProps } from './types'

export const Partners = ({
  className = '',
  children,
  ...restProps
}: PartnersProps) => {
  return (
    <div
      className={joinClasses(['footer__partners', className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
