import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { RootProps } from './types'

export const Root = ({
  theme = 'light',
  variant = 'link',
  className = '',
  children,
  ...restProps
}: RootProps) => {
  return (
    <div
      className={joinClasses([
        'card-icon__root',
        className,
        `--${theme}`,
        `--${variant}`,
      ])}
      {...restProps}
    >
      {children}
    </div>
  )
}

