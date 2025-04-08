import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { TriggerProps } from './types'

export const Trigger = ({
  className = '',
  children,
  ...restProps
}: TriggerProps) => {
  return (
    <div
      className={joinClasses(['accordion__trigger', className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
