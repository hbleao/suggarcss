import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type TextProps = HTMLAttributes<HTMLParagraphElement>

export const Text = ({ className = '', children, ...restProps }: TextProps) => {
  return (
    <p className={joinClasses(['banner-hero__text', className])} {...restProps}>
      {children}
    </p>
  )
}
