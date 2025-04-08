import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { BoxProps } from './types'

export const Box = ({ className = '', children, ...restProps }: BoxProps) => {
  return (
    <div className={joinClasses(['input__box', className])} {...restProps}>
      {children}
    </div>
  )
}
