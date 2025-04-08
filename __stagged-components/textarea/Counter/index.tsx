import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { CounterProps } from './types'

export const Counter = ({
  className = '',
  children,
  ...restProps
}: CounterProps) => {
  return (
    <span
      className={joinClasses(['textarea__counter', className])}
      {...restProps}
    >
      {children}
    </span>
  )
}
