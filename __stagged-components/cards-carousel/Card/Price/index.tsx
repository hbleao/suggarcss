import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type PriceProps = HTMLAttributes<HTMLParagraphElement>

export const Price = ({
  className = '',
  children,
  ...restProps
}: PriceProps) => {
  return (
    <p
      className={joinClasses(['cards-carousel__price', className])}
      {...restProps}
    >
      {children}
    </p>
  )
}
