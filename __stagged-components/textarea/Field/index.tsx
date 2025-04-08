import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { FieldProps } from './types'

export const Field = ({
  className = '',
  children,
  ...restProps
}: FieldProps) => {
  return (
    <textarea
      className={joinClasses(['textarea__field', className])}
      rows={1}
      {...restProps}
    />
  )
}
