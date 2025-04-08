import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type ContentProps = HTMLAttributes<HTMLParagraphElement>

export const Content = ({
  className = '',
  children,
  ...restProps
}: ContentProps) => {
  return (
    <p
      className={joinClasses(['cards-carousel__content', className])}
      {...restProps}
    >
      {children}
    </p>
  )
}
