import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { IconTriggerProps } from './types'

export const IconTrigger = ({
  isOpen = false,
  className = '',
  children,
  ...restProps
}: IconTriggerProps) => {
  const isOpenClass = isOpen ? 'up' : 'down'

  return (
    <div
      className={joinClasses(['footer__icon-trigger', isOpenClass, className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
