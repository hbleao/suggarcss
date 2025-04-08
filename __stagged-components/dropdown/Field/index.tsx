import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { FieldProps } from './types'

export const Field = ({
  className = '',
  readOnly = true,
  children,
  ...restProps
}: FieldProps) => {
  const readOnlyClass = readOnly ? '--readonly' : ''

  return (
    <input
      className={joinClasses(['dropdown__field', readOnlyClass, className])}
      readOnly={readOnly}
      {...restProps}
    />
  )
}
