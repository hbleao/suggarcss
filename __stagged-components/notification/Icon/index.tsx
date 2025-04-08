import { Icon as Component } from '@porto-ocean/icon'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { IconProps } from './types'

export const Icon = ({
  iconName = '',
  className = '',
  iconSide = 'left',
  children,
  ...restProps
}: IconProps) => {
  return (
    <Component
      iconName={iconName}
      className={joinClasses(['notification__icon', iconSide, className])}
      size="text-2xl"
      {...restProps}
    />
  )
}
