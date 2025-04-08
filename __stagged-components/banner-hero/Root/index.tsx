import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { RootProps } from './types'

export const Root = ({
  theme = 'light',
  bgColor = 'portoSaudePrimary',
  children,
  className = '',
  ...restProps
}: RootProps) => {
  return (
    <section
      className={joinClasses([
        'banner-hero__root',
        `--bg-${bgColor}`,
        `--${theme}`,
        className,
      ])}
      {...restProps}
    >
      {children}
    </section>
  )
}
