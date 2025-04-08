import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { BrandProps } from './types'

export const Brand = ({
  className = '',
  children,
  ...restProps
}: BrandProps) => {
  return (
    <div className={joinClasses(['footer__brand', className])} {...restProps}>
      {children}
    </div>
  )
}
