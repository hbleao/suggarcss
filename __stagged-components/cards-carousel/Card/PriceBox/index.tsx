import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type PriceBoxProps = HTMLAttributes<HTMLDivElement>

export const PriceBox = ({
  className = '',
  children,
  ...restProps
}: PriceBoxProps) => {
  return (
    <div
      className={joinClasses(['cards-carousel__price-box', className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
