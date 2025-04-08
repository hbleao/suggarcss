import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type InstallmentsProps = HTMLAttributes<HTMLDivElement>

export const Installments = ({
  className = '',
  children,
  ...restProps
}: InstallmentsProps) => {
  return (
    <div
      className={joinClasses(['cards-carousel__installments', className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
