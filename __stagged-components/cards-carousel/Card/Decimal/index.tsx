import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type DecimalProps = HTMLAttributes<HTMLElement>

export const Decimal = ({
  className = '',
  children,
  ...restProps
}: DecimalProps) => {
  return (
    <span
      className={joinClasses(['cards-carousel__decimal', className])}
      {...restProps}
    >
      {children}
    </span>
  )
}
