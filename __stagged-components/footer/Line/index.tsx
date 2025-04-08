import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { LineProps } from './types'

export const Line = ({ className = '', children, ...restProps }: LineProps) => {
  return (
    <hr className={joinClasses(['footer__line', className])} {...restProps} />
  )
}
