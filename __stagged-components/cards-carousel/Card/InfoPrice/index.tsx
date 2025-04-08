import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type InfoPriceProps = HTMLAttributes<HTMLParagraphElement>

export const InfoPrice = ({
  className = '',
  children,
  ...restProps
}: InfoPriceProps) => {
  return (
    <p
      className={joinClasses(['cards-carousel__price-info', className])}
      {...restProps}
    >
      {children}
    </p>
  )
}
