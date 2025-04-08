import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { ButtonsProps } from './types'

export const Buttons = ({
  className = '',
  children,
  ...restProps
}: ButtonsProps) => {
  return (
    <div
      className={joinClasses(['card-content__buttons', className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
