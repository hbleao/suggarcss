import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

import { DescriptionProps } from './types'

export const Description = ({
  className = '',
  children,
  ...restProps
}: DescriptionProps) => {
  return (
    <p
      className={joinClasses(['card-content__description', className])}
      {...restProps}
    >
      {children}
    </p>
  )
}
