import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { RootProps } from './types'

export const Root = ({
  theme = 'light',
  className = '',
  children,
  ...restProps
}: RootProps) => {
  return (
    <div
      className={joinClasses(['text-body__root', `--${theme}`, className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
