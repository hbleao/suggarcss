import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type ToolbarIconProps = HTMLAttributes<HTMLDivElement>

export const ToolbarIcon = ({
  className = '',
  children,
  ...restProps
}: ToolbarIconProps) => {
  return (
    <div className={joinClasses(['toolbar__icon', className])} {...restProps}>
      {children}
    </div>
  )
}
