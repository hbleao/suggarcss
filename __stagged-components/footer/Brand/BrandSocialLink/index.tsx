import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { BrandSocialLinkProps } from './types'

export const BrandSocialLink = ({
  className = '',
  children,
  ...restProps
}: BrandSocialLinkProps) => {
  return (
    <a
      className={joinClasses(['footer__brand-social-link', className])}
      {...restProps}
    >
      {children}
    </a>
  )
}
