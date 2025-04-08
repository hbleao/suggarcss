import { HTMLAttributes } from 'react'
import { joinClasses } from '@porto-ocean/utils'

import './styles.scss'

export type TitleProps = HTMLAttributes<HTMLParagraphElement>

export const Title = ({
  className = '',
  children,
  ...restProps
}: TitleProps) => {
  return (
    <p
      className={joinClasses(['cards-carousel__title', className])}
      {...restProps}
    >
      {children}
    </p>
  )
}
