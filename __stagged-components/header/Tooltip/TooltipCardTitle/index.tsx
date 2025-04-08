import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type TooltipCardTitleProps = HTMLAttributes<HTMLParagraphElement>

export const TooltipCardTitle = ({
  className = '',
  children,
  ...restProps
}: TooltipCardTitleProps) => {
  return (
    <p
      className={joinClasses(['tooltip__card-title', className])}
      {...restProps}
    >
      {children}
    </p>
  )
}
