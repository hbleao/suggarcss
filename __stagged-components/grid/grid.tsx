import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type GridProps = HTMLAttributes<HTMLDivElement>

export const Grid = ({ className = '', children, ...restProps }: GridProps) => {
  return (
    <div className={joinClasses(['grid', className])} {...restProps}>
      {children}
    </div>
  )
}
