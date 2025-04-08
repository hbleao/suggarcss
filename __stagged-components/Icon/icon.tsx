import { joinClasses } from '@porto-ocean/utils'

import { IconProps } from './src/types'

export const Icon = ({
  color = 'black100',
  size = 'text-md',
  iconName = '',
  className = '',
  ...restProps
}: IconProps) => {
  const custom_className = `${iconName} --color-${color} --font-size-${size}`

  return (
    <i
      className={joinClasses(['icon', custom_className, className])}
      {...restProps}
    />
  )
}
