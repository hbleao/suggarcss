import { joinClasses } from '@porto-ocean/utils'
import { Icon as Component } from '@porto-ocean/icon'

import './styles.scss'

import { IconProps } from './types'

export const Icon = ({
  className = '',
  iconName = 'icon-Short-arrow-down',
  rotate = false,
  children,
  ...restProps
}: IconProps) => {
  const rotateClass = rotate ? '--up' : '--down'

  return (
    <Component
      className={joinClasses(['dropdown__icon', rotateClass, className])}
      iconName={iconName}
      size="text-md"
      {...restProps}
    >
      {children}
    </Component>
  )
}
