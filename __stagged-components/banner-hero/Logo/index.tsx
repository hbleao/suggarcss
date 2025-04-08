import { joinClasses } from '@porto-ocean/utils'
import { HTMLAttributes } from 'react'

import './styles.scss'

export type LogoProps = HTMLAttributes<HTMLImageElement>

export const Logo = ({ className = '', children, ...restProps }: LogoProps) => {
  return (
    <div
      className={joinClasses(['banner-hero__logo', className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
