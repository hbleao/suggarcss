import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type DrawerLineProps = HTMLAttributes<HTMLElement>

export const DrawerLine = ({
  className = '',
  ...restProps
}: DrawerLineProps) => {
  return (
    <div className={joinClasses(['drawer__line', className])} {...restProps} />
  )
}
