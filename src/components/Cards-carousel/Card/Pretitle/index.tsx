import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type PretitleProps = HTMLAttributes<HTMLSpanElement>

export const Pretitle = ({
  className = '',
  children,
  ...restProps
}: PretitleProps) => {
  return (
    <span
      className={joinClasses(['cards-carousel__pretitle', className])}
      {...restProps}
    >
      {children}
    </span>
  )
}
