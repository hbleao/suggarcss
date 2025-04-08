import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { RootProps } from './types'

export const Root = ({
  variant = 'default',
  className = '',
  children,
  ...restProps
}: RootProps) => {
  return (
    <div
      className={joinClasses(['notification__root', `--${variant}`, className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
