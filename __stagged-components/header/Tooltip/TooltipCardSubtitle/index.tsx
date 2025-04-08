import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type TooltipCardSubtitleProps = HTMLAttributes<HTMLParagraphElement>

export const TooltipCardSubtitle = ({
  className = '',
  children,
  ...restProps
}: TooltipCardSubtitleProps) => {
  return (
    <p
      className={joinClasses(['tooltip__card-subtitle', className])}
      {...restProps}
    >
      {children}
    </p>
  )
}
