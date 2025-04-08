import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { TitleTriggerProps } from './types'

export const TitleTrigger = ({
  className = '',
  children,
  ...restProps
}: TitleTriggerProps) => {
  return (
    <h3
      className={joinClasses(['footer__title-trigger', className])}
      {...restProps}
    >
      {children}
    </h3>
  )
}
