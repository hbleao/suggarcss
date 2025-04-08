import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { RootProps } from './types'

export const Root = ({
  className = '',
  theme = 'light',
  children,
  ...restProps
}: RootProps) => {
  return (
    <div
      className={joinClasses(['card-content__root', className, `--${theme}`])}
      {...restProps}
    >
      {children}
    </div>
  )
}

