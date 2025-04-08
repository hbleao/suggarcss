import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type RootProps = HTMLAttributes<HTMLDivElement> & {
  theme?: 'light' | 'dark'
  variant?: 'default' | 'selected'
}

export const Root = ({
  theme = 'light',
  variant = 'default',
  className = '',
  children,
  ...restProps
}: RootProps) => {
  return (
    <div
      className={joinClasses(['chip', `--${theme}`, `--${variant}`, className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
