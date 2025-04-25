import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type BenefitsTitleProps = HTMLAttributes<HTMLParagraphElement>

export const BenefitsTitle = ({
  className = '',
  children,
  ...restProps
}: BenefitsTitleProps) => {
  return (
    <p
      className={joinClasses(['cards-carousel__benefits-title', className])}
      {...restProps}
    >
      {children}
    </p>
  )
}
