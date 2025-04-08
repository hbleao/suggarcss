import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { LabelProps } from './types'

export const Label = ({
  className = '',
  children,
  ...restProps
}: LabelProps) => {
  return (
    <label className={joinClasses(['input__label', className])} {...restProps}>
      {children}
    </label>
  )
}
