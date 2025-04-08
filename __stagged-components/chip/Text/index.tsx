import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type TextProps = HTMLAttributes<HTMLDivElement>

export const Text = ({ className = '', children, ...restProps }: TextProps) => {
  return (
    <div className={joinClasses(['chip__text', className])} {...restProps}>
      {children}
    </div>
  )
}
