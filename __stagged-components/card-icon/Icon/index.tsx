import { joinClasses } from '@porto-ocean/utils'
import { Icon as Component, IconProps } from '@porto-ocean/icon'

import './styles.scss'

export const Icon = ({ iconName, className = '', ...restProps }: IconProps) => {
  return (
    <Component
      className={joinClasses(['card-icon__icon', className])}
      size="text-6xl"
      iconName={iconName}
      {...restProps}
    />
  )
}
