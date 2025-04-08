import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { SeparatorProps } from './types'

export const Separator = ({ className = '' }: SeparatorProps) => {
  return (
    <hr className={joinClasses(['card-testimonial__separator', className])} />
  )
}
