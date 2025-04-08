import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type ToolbarLabelProps = HTMLAttributes<HTMLSpanElement>

export const ToolbarLabel = ({
  className = '',
  children,
  ...restProps
}: ToolbarLabelProps) => {
  return (
    <span className={joinClasses(['toolbar__label', className])} {...restProps}>
      {children}
    </span>
  )
}
