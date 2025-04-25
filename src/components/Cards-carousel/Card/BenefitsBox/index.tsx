import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type BenefitsBoxProps = HTMLAttributes<HTMLDivElement>

export const BenefitsBox = ({
  className = '',
  children,
  ...restProps
}: BenefitsBoxProps) => {
  return (
    <div
      className={joinClasses(['cards-carousel__benefits-box', className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
