import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { ErrorMessageProps } from './types'

export const ErrorMessage = ({
  className = '',
  children,
  ...restProps
}: ErrorMessageProps) => {
  return (
    <span
      className={joinClasses(['textarea__error-message', className])}
      {...restProps}
    >
      {children}
    </span>
  )
}
