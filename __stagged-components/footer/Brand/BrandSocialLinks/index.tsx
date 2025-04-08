import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { BrandSocialLinksProps } from './types'

export const BrandSocialLinks = ({
  className = '',
  children,
  ...restProps
}: BrandSocialLinksProps) => {
  return (
    <div
      className={joinClasses(['footer__brand-social-links', className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
